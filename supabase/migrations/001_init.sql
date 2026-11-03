-- TestForge schema. Run once in the Supabase SQL editor (or `supabase db push`).
--
-- Access model
--   * Everyone (including signed-out visitors) can read the libraries and read/create/edit projects.
--   * Only admins can change the master library, delete projects, and see users / history / activity.
--   * Admin accounts are Supabase Auth users whose row in `profiles` has role = 'admin'.

create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  username text not null unique,
  role text not null default 'user' check (role in ('admin', 'user')),
  active boolean not null default true,
  created_at timestamptz not null default now(),
  created_by text
);

create table if not exists public.library_versions (
  version bigint generated always as identity primary key,
  overlay jsonb not null,
  message text not null,
  author text not null,
  created_at timestamptz not null default now()
);

create table if not exists public.projects (
  id text primary key,
  data jsonb not null,
  updated_at timestamptz not null default now()
);

create table if not exists public.project_snapshots (
  id bigint generated always as identity primary key,
  project_id text not null,
  label text not null,
  data jsonb not null,
  author text not null,
  created_at timestamptz not null default now()
);
create index if not exists idx_snapshots_project on public.project_snapshots (project_id);

create table if not exists public.audit_log (
  id bigint generated always as identity primary key,
  at timestamptz not null default now(),
  actor text not null,
  action text not null,
  detail text not null
);

create table if not exists public.app_settings (key text primary key, value text not null);

/* ------------------------------- helpers ---------------------------------- */

create or replace function public.is_admin() returns boolean
language sql stable security definer set search_path = public as $$
  select exists (select 1 from public.profiles where id = auth.uid() and role = 'admin' and active)
$$;

create or replace function public.current_actor() returns text
language sql stable security definer set search_path = public as $$
  select coalesce((select username from public.profiles where id = auth.uid()), 'guest')
$$;

create or replace function public.log_audit(p_action text, p_detail text) returns void
language sql security definer set search_path = public as $$
  insert into public.audit_log (actor, action, detail) values (public.current_actor(), p_action, p_detail)
$$;
revoke all on function public.log_audit(text, text) from public, anon, authenticated;

/* --------------------------- row level security --------------------------- */

alter table public.profiles enable row level security;
alter table public.library_versions enable row level security;
alter table public.projects enable row level security;
alter table public.project_snapshots enable row level security;
alter table public.audit_log enable row level security;
alter table public.app_settings enable row level security;

-- profiles: you can read your own row; admins read everyone. Writes go through the Edge Function.
drop policy if exists profiles_self on public.profiles;
create policy profiles_self on public.profiles for select using (id = auth.uid() or public.is_admin());

-- library history and the activity log are admin-only to read (guests use get_library()).
drop policy if exists versions_admin on public.library_versions;
create policy versions_admin on public.library_versions for select using (public.is_admin());
drop policy if exists audit_admin on public.audit_log;
create policy audit_admin on public.audit_log for select using (public.is_admin());

-- projects are open to everyone to read, create and edit; only admins may delete.
drop policy if exists projects_read on public.projects;
create policy projects_read on public.projects for select using (true);
drop policy if exists projects_insert on public.projects;
create policy projects_insert on public.projects for insert with check (true);
drop policy if exists projects_update on public.projects;
create policy projects_update on public.projects for update using (true) with check (true);
drop policy if exists projects_delete on public.projects;
create policy projects_delete on public.projects for delete using (public.is_admin());

drop policy if exists snapshots_read on public.project_snapshots;
create policy snapshots_read on public.project_snapshots for select using (true);

drop policy if exists settings_read on public.app_settings;
create policy settings_read on public.app_settings for select using (true);

/* --------------------------------- library -------------------------------- */

create or replace function public.get_library() returns jsonb
language sql stable security definer set search_path = public as $$
  select coalesce(
    (select jsonb_build_object('version', version, 'overlay', overlay) from public.library_versions order by version desc limit 1),
    jsonb_build_object('version', 0, 'overlay', null)
  )
$$;

create or replace function public.save_library(p_base bigint, p_overlay jsonb, p_message text) returns jsonb
language plpgsql security definer set search_path = public as $$
declare
  cur bigint;
  cur_overlay jsonb;
  new_version bigint;
begin
  if not public.is_admin() then raise exception 'Admin access required.' using errcode = '42501'; end if;
  perform pg_advisory_xact_lock(7001);
  select version, overlay into cur, cur_overlay from public.library_versions order by version desc limit 1;
  cur := coalesce(cur, 0);
  if p_base <> cur then
    return jsonb_build_object('conflict', true, 'version', cur, 'overlay', cur_overlay);
  end if;
  insert into public.library_versions (overlay, message, author)
  values (p_overlay, left(coalesce(nullif(p_message, ''), 'Library updated'), 300), public.current_actor())
  returning version into new_version;
  return jsonb_build_object('version', new_version);
end $$;

-- Restoring writes a NEW version with the old content, so history is never rewritten.
create or replace function public.restore_library(p_version bigint) returns jsonb
language plpgsql security definer set search_path = public as $$
declare
  old_overlay jsonb;
  new_version bigint;
begin
  if not public.is_admin() then raise exception 'Admin access required.' using errcode = '42501'; end if;
  perform pg_advisory_xact_lock(7001);
  if p_version = 0 then
    old_overlay := null;
  else
    select overlay into old_overlay from public.library_versions where version = p_version;
    if not found then raise exception 'Version not found.'; end if;
  end if;
  insert into public.library_versions (overlay, message, author)
  values (coalesce(old_overlay, '{}'::jsonb),
          case when p_version = 0 then 'Restored built-in library' else 'Restored version ' || p_version end,
          public.current_actor())
  returning version into new_version;
  perform public.log_audit('library.restore',
    case when p_version = 0 then 'Restored built-in library' else 'Restored version ' || p_version || ' as version ' || new_version end);
  return jsonb_build_object('version', new_version, 'overlay', old_overlay);
end $$;

/* --------------------------------- projects ------------------------------- */

create or replace function public.mark_seeded() returns trigger
language plpgsql security definer set search_path = public as $$
begin
  insert into public.app_settings (key, value) values ('seeded', '1') on conflict do nothing;
  return new;
end $$;
drop trigger if exists trg_mark_seeded on public.projects;
create trigger trg_mark_seeded after insert on public.projects for each row execute function public.mark_seeded();

-- Every delete keeps a final snapshot, so a deleted project can still be recovered from the database.
create or replace function public.snapshot_before_delete() returns trigger
language plpgsql security definer set search_path = public as $$
begin
  insert into public.project_snapshots (project_id, label, data, author)
  values (old.id, case when current_setting('app.bulk', true) = '1' then 'Before reset' else 'Before delete' end, old.data, public.current_actor());
  if coalesce(current_setting('app.bulk', true), '') <> '1' then
    perform public.log_audit('project.delete', 'Deleted project "' || (old.data ->> 'name') || '"');
  end if;
  return old;
end $$;
drop trigger if exists trg_snapshot_delete on public.projects;
create trigger trg_snapshot_delete before delete on public.projects for each row execute function public.snapshot_before_delete();

create or replace function public.replace_projects(p_projects jsonb) returns void
language plpgsql security definer set search_path = public as $$
declare item jsonb;
begin
  if not public.is_admin() then raise exception 'Admin access required.' using errcode = '42501'; end if;
  perform set_config('app.bulk', '1', true);
  delete from public.projects;
  for item in select * from jsonb_array_elements(p_projects) loop
    insert into public.projects (id, data) values (item ->> 'id', item);
  end loop;
  perform public.log_audit('project.reset', 'Replaced all projects with ' || jsonb_array_length(p_projects) || ' sample projects');
end $$;

create or replace function public.create_snapshot(p_project text, p_label text) returns void
language plpgsql security definer set search_path = public as $$
declare proj jsonb;
begin
  select data into proj from public.projects where id = p_project;
  if proj is null then raise exception 'Project not found.'; end if;
  insert into public.project_snapshots (project_id, label, data, author)
  values (p_project, left(coalesce(nullif(trim(p_label), ''), 'Manual snapshot'), 120), proj, public.current_actor());
  perform public.log_audit('project.snapshot', '"' || (proj ->> 'name') || '": ' || coalesce(nullif(trim(p_label), ''), 'Manual snapshot'));
end $$;

create or replace function public.restore_snapshot(p_project text, p_snapshot bigint) returns jsonb
language plpgsql security definer set search_path = public as $$
declare
  snap record;
  cur jsonb;
  restored jsonb;
begin
  select data, label into snap from public.project_snapshots where id = p_snapshot and project_id = p_project;
  if not found then raise exception 'Snapshot not found.'; end if;
  select data into cur from public.projects where id = p_project;
  if cur is not null then
    insert into public.project_snapshots (project_id, label, data, author) values (p_project, 'Before restore', cur, public.current_actor());
  end if;
  restored := jsonb_set(snap.data, '{updatedAt}', to_jsonb(now()));
  insert into public.projects (id, data, updated_at) values (p_project, restored, now())
  on conflict (id) do update set data = excluded.data, updated_at = excluded.updated_at;
  perform public.log_audit('project.restore', '"' || (restored ->> 'name') || '": restored "' || snap.label || '"');
  return restored;
end $$;

grant execute on function public.get_library() to anon, authenticated;
grant execute on function public.save_library(bigint, jsonb, text) to authenticated;
grant execute on function public.restore_library(bigint) to authenticated;
grant execute on function public.replace_projects(jsonb) to authenticated;
grant execute on function public.create_snapshot(text, text) to anon, authenticated;
grant execute on function public.restore_snapshot(text, bigint) to anon, authenticated;
grant execute on function public.is_admin() to anon, authenticated;
