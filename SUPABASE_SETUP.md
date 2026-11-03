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
```
npm i -g supabase
supabase login
supabase link --project-ref YOUR-PROJECT-REF
supabase functions deploy admin-users
```
`SUPABASE_URL`, `SUPABASE_ANON_KEY` and `SUPABASE_SERVICE_ROLE_KEY` are provided to functions automatically.

## 4. Front end
Copy `.env.example` to `.env.local` and fill in the project URL and **anon** key
(Project settings → API). Never put the service-role key in the front end.

```
npm run dev      # local
npm run build    # produces dist/ — deploy it to your static host, with the same two env vars set there
```
For `yourdomain/admin` to work, the host must serve `index.html` for unknown paths
(`public/_redirects` does this on Netlify and Cloudflare Pages). `yourdomain/#/admin` always works.
