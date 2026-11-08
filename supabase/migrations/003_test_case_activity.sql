-- Comments and audit history for project test cases. Run after 002_ai_providers.sql.
--
-- * Comments are their own rows, so two people commenting at once never overwrite each other.
-- * History is written only by triggers (security definer): every change to a test case inside a
--   saved project, and every comment added, edited or removed. Nobody can write or edit it directly.

create table if not exists public.test_case_comments (
  id bigint generated always as identity primary key,
  project_id text not null,
  test_case_id text not null,
  author text not null,
  body text not null check (char_length(body) between 1 and 5000),
  created_at timestamptz not null default now(),
  edited_at timestamptz
);
create index if not exists idx_tc_comments on public.test_case_comments (project_id, test_case_id);

create table if not exists public.test_case_events (
  id bigint generated always as identity primary key,
  project_id text not null,
  test_case_id text not null,
  at timestamptz not null default now(),
  actor text not null,
  action text not null,          -- created | updated | deleted | comment.added | comment.edited | comment.deleted
  field text,                    -- for "updated": which field changed
  old_value text,
  new_value text
);
create index if not exists idx_tc_events on public.test_case_events (project_id, test_case_id, id desc);

alter table public.test_case_comments enable row level security;
alter table public.test_case_events enable row level security;

-- Everyone can read and add comments (the app is open, like projects). Only the author — or an
-- admin — can edit or delete one. Signed-out comments are "guest" and only admins can change them.
drop policy if exists comments_read on public.test_case_comments;
create policy comments_read on public.test_case_comments for select using (true);
drop policy if exists comments_insert on public.test_case_comments;
create policy comments_insert on public.test_case_comments for insert with check (true);
drop policy if exists comments_update on public.test_case_comments;
create policy comments_update on public.test_case_comments for update
  using (public.is_admin() or (auth.uid() is not null and author = public.current_actor()));
drop policy if exists comments_delete on public.test_case_comments;
create policy comments_delete on public.test_case_comments for delete
  using (public.is_admin() or (auth.uid() is not null and author = public.current_actor()));

-- History is read-only for everyone; there are deliberately no write policies.
drop policy if exists events_read on public.test_case_events;
create policy events_read on public.test_case_events for select using (true);

/* --------------------------------- comments -------------------------------- */

-- The author and timestamps always come from the server, never from the request.
create or replace function public.comment_before_write() returns trigger
language plpgsql security definer set search_path = public as $$
begin
  if tg_op = 'INSERT' then
    if not exists (
      select 1 from public.projects
      where id = new.project_id
        and data -> 'testCases' @> jsonb_build_array(jsonb_build_object('id', new.test_case_id))
    ) then
      raise exception 'Test case not found. Wait a moment for the project to save, then try again.';
    end if;
    new.author := public.current_actor();
    new.created_at := now();
    new.edited_at := null;
  else
    new.project_id := old.project_id;
    new.test_case_id := old.test_case_id;
    new.author := old.author;
    new.created_at := old.created_at;
    new.edited_at := now();
  end if;
  new.body := trim(new.body);
  return new;
end $$;
drop trigger if exists trg_comment_before_write on public.test_case_comments;
create trigger trg_comment_before_write before insert or update on public.test_case_comments
  for each row execute function public.comment_before_write();

create or replace function public.comment_after_write() returns trigger
language plpgsql security definer set search_path = public as $$
begin
  if tg_op = 'INSERT' then
    insert into public.test_case_events (project_id, test_case_id, actor, action, new_value)
    values (new.project_id, new.test_case_id, public.current_actor(), 'comment.added', left(new.body, 2000));
  elsif tg_op = 'UPDATE' then
    if new.body is distinct from old.body then
      insert into public.test_case_events (project_id, test_case_id, actor, action, old_value, new_value)
      values (new.project_id, new.test_case_id, public.current_actor(), 'comment.edited', left(old.body, 2000), left(new.body, 2000));
    end if;
  else
    insert into public.test_case_events (project_id, test_case_id, actor, action, old_value)
    values (old.project_id, old.test_case_id, public.current_actor(), 'comment.deleted', left(old.body, 2000));
  end if;
  return null;
end $$;
drop trigger if exists trg_comment_after_write on public.test_case_comments;
create trigger trg_comment_after_write after insert or update or delete on public.test_case_comments
  for each row execute function public.comment_after_write();

/* ------------------------------ test case changes --------------------------- */

create or replace function public.tc_value_text(v jsonb) returns text
language sql immutable as $$
  select left(case jsonb_typeof(v)
    when 'array' then (select string_agg(x, E'\n') from jsonb_array_elements_text(v) x)
    when 'string' then v #>> '{}'
    when 'null' then null
    else v::text
  end, 2000)
$$;

-- Compares the test cases in the old and new project document and records what changed.
create or replace function public.log_test_case_changes() returns trigger
language plpgsql security definer set search_path = public as $$
declare
  who text := public.current_actor();
  old_map jsonb;
  new_map jsonb;
  o jsonb;
  n jsonb;
  f text;
  fields text[] := array['status', 'title', 'description', 'preconditions', 'steps', 'expectedResult',
                         'actualResult', 'notes', 'testType', 'priority', 'isMandatory'];
begin
  -- Bulk resets of the demo data are not individual edits.
  if coalesce(current_setting('app.bulk', true), '') = '1' then return new; end if;
  if old.data -> 'testCases' is not distinct from new.data -> 'testCases' then return new; end if;

  select coalesce(jsonb_object_agg(e ->> 'id', e), '{}'::jsonb) into old_map
    from jsonb_array_elements(coalesce(old.data -> 'testCases', '[]'::jsonb)) e;
  select coalesce(jsonb_object_agg(e ->> 'id', e), '{}'::jsonb) into new_map
    from jsonb_array_elements(coalesce(new.data -> 'testCases', '[]'::jsonb)) e;

  for n in select value from jsonb_each(new_map) loop
    o := old_map -> (n ->> 'id');
    if o is null then
      insert into public.test_case_events (project_id, test_case_id, actor, action, new_value)
      values (new.id, n ->> 'id', who, 'created', left(n ->> 'title', 2000));
    elsif o is distinct from n then
      foreach f in array fields loop
        if (o -> f) is distinct from (n -> f) then
          insert into public.test_case_events (project_id, test_case_id, actor, action, field, old_value, new_value)
          values (new.id, n ->> 'id', who, 'updated', f, public.tc_value_text(o -> f), public.tc_value_text(n -> f));
        end if;
      end loop;
    end if;
  end loop;

  for o in select value from jsonb_each(old_map) loop
    if not new_map ? (o ->> 'id') then
      insert into public.test_case_events (project_id, test_case_id, actor, action, old_value)
      values (new.id, o ->> 'id', who, 'deleted', left(o ->> 'title', 2000));
    end if;
  end loop;

  return new;
end $$;
drop trigger if exists trg_log_test_case_changes on public.projects;
create trigger trg_log_test_case_changes after update on public.projects
  for each row execute function public.log_test_case_changes();
