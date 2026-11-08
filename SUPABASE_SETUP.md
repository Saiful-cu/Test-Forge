# Hosting on Supabase

Supabase hosts the database, logins and the user-management function. The React app itself is a
static site, so deploy `dist/` to any static host (Netlify, Vercel, Cloudflare Pages, GitHub Pages) —
Supabase does not serve front-end builds.

## 1. Database
Supabase dashboard → SQL editor → paste and run `supabase/migrations/001_init.sql`.

## 2. First admin
1. Authentication → Users → **Add user** → email `admin@testforge.local` (use `<username>@testforge.local`
   for any other name), a strong password, tick **Auto Confirm User**.
2. Copy that user's UUID, then run in the SQL editor:
   ```sql
   insert into public.profiles (id, username, role, created_by)
   values ('PASTE-UUID-HERE', 'admin', 'admin', 'setup');
   ```
3. Authentication → Providers → Email: turn **off** "Allow new users to sign up", so only admins can create accounts.

## 3. Edge Function (lets admins create users)
The CLI cannot be installed with `npm -g`; run it through `npx` (add `--use-api` to the last command if it asks for Docker):
```
npx supabase@latest login
npx supabase@latest link --project-ref YOUR-PROJECT-REF
npx supabase@latest functions deploy admin-users
```
Or, with no CLI: dashboard -> Edge Functions -> Deploy a new function -> Via Editor, name it exactly
`admin-users`, and paste in `supabase/functions/admin-users/index.ts`.

`SUPABASE_URL`, `SUPABASE_ANON_KEY` and `SUPABASE_SERVICE_ROLE_KEY` are provided to functions automatically.

## 4. Front end
Copy `.env.example` to `.env.local` and fill in the project URL and **anon** key
(Project settings → API). Never put the service-role key in the front end.

```
npm run dev      # local
npm run build    # produces dist/ — deploy it to your static host, with the same two env vars set there
```
For `yourdomain/admin` to work, the host must serve `index.html` for unknown paths
(`public/_redirects` and `netlify.toml` do this on Netlify and Cloudflare Pages).

## 5. AI test case generation
1. SQL editor → run `supabase/migrations/002_ai_providers.sql`.
2. Deploy the `ai` Edge Function, the same way as `admin-users`:
   ```
   npx supabase@latest functions deploy ai
   ```
   (or dashboard → Edge Functions → Via Editor, name it exactly `ai`, paste `supabase/functions/ai/index.ts`).
3. Sign in as an admin → **AI settings** → **Add AI provider**. Supported: Anthropic (Claude), OpenAI,
   Google Gemini, and any OpenAI-compatible API (Groq, Mistral, OpenRouter, DeepSeek, Together, Ollama, …)
   via its base URL. Use **Test** to check the key and model, and **Use this one** to pick the active provider.

API keys are stored in `ai_providers`, which has row-level security on and no policies, so the browser can
never read them; only the function (service role) does. Generation is limited to signed-in users unless an
admin ticks "Let signed-out visitors generate test cases". Each generation is written to the activity log.
