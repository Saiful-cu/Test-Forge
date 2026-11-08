-- AI providers for test case generation. Run after 001_init.sql.
--
-- API keys are secrets: row-level security is on and there are NO policies, so neither the
-- anon key nor a signed-in user can read this table. Only the `ai` Edge Function (service role)
-- reads it, and it never returns a key — only its last four characters.

create table if not exists public.ai_providers (
  id uuid primary key default gen_random_uuid(),
  label text not null,
  provider text not null check (provider in ('anthropic', 'openai', 'gemini', 'openai_compatible')),
  model text not null,
  base_url text,
  api_key text not null default '',
  is_active boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  updated_by text
);

-- At most one provider is in use at a time.
create unique index if not exists ai_providers_one_active on public.ai_providers ((true)) where is_active;

alter table public.ai_providers enable row level security;
revoke all on public.ai_providers from anon, authenticated;

-- Whether signed-out visitors may generate test cases (it spends the organisation's API credit).
insert into public.app_settings (key, value) values ('ai_allow_guests', '0') on conflict do nothing;
