import { createClient, type SupabaseClient } from '@supabase/supabase-js'

/**
 * The data layer. Pages call `api(method, path, body)`; this file maps each call onto Supabase
 * (tables and functions in supabase/migrations, the admin-users Edge Function). Access is enforced
 * by row-level security in the database, so what the UI hides is also refused server-side.
 */

export class ApiError extends Error {
  status: number
  body: unknown
  constructor(message: string, status: number, body: unknown = null) {
    super(message)
    this.status = status
    this.body = body
  }
}

const url = import.meta.env.VITE_SUPABASE_URL as string | undefined
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined

export const supabase: SupabaseClient | null = url && anonKey ? createClient(url, anonKey) : null

// Supabase Auth is email-based; people sign in with a username, mapped to a synthetic address.
const emailFor = (username: string) => `${username.trim().toLowerCase()}@testforge.local`

function client(): SupabaseClient {
  if (!supabase) {
    throw new ApiError('Supabase is not configured. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.', 500)
  }
  return supabase
}

function fail(error: { message: string; code?: string } | null, status = 400): never {
  const forbidden = error?.code === '42501' || /row-level security|Admin access required/i.test(error?.message ?? '')
  throw new ApiError(error?.message ?? 'Request failed.', forbidden ? 403 : status)
}

async function invokeFunction<T>(name: string, body: object): Promise<T> {
  const { data, error } = await client().functions.invoke(name, { body })
  if (error) {
    // functions.invoke hides the JSON error body inside the response context.
    const res = (error as { context?: Response }).context
    const detail = res ? await res.json().catch(() => null) : null
    throw new ApiError((detail as { error?: string } | null)?.error ?? error.message, res?.status ?? 500, detail)
  }
  return data as T
}

const invokeAdminUsers = <T,>(body: object) => invokeFunction<T>('admin-users', body)
const invokeAi = <T,>(body: object) => invokeFunction<T>('ai', body)

async function currentUser() {
  const sb = client()
  const { data } = await sb.auth.getSession()
  const uid = data.session?.user.id
  if (!uid) return null
  const { data: profile } = await sb.from('profiles').select('id, username, role, active').eq('id', uid).maybeSingle()
  if (!profile || !profile.active) return null
  return { id: profile.id as string, username: profile.username as string, role: profile.role as 'admin' | 'user' }
}

export async function api<T = unknown>(method: string, path: string, body?: any): Promise<T> {
  const sb = client()
  const route = `${method} ${path}`
  let m: RegExpMatchArray | null

  const result = await (async (): Promise<unknown> => {
    /* ------------------------------ session ------------------------------ */
    if (route === 'GET /me') return { user: await currentUser() }

    if (route === 'POST /login') {
      const { error } = await sb.auth.signInWithPassword({ email: emailFor(body.username), password: body.password })
      if (error) throw new ApiError('Incorrect username or password.', 401)
      const user = await currentUser()
      if (!user) {
        await sb.auth.signOut()
        throw new ApiError('This account is not set up or has been deactivated.', 403)
      }
      return { user }
    }

    if (route === 'POST /logout') {
      await sb.auth.signOut()
      return { ok: true }
    }

    /* ------------------------------- users ------------------------------- */
    if (route === 'GET /users') return invokeAdminUsers({ action: 'list' })
    if (route === 'POST /users') return invokeAdminUsers({ action: 'create', ...body })
    if ((m = path.match(/^\/users\/([^/]+)$/)) && method === 'PATCH') {
      return invokeAdminUsers({ action: 'update', id: m[1], ...body })
    }

    /* --------------------------------- ai -------------------------------- */
    if (route === 'GET /ai/status') return invokeAi({ action: 'status' })
    if (route === 'GET /ai/providers') return invokeAi({ action: 'list' })
    if (route === 'POST /ai/providers') return invokeAi({ action: 'save', ...body })
    if (route === 'PUT /ai/settings') return invokeAi({ action: 'settings', ...body })
    if (route === 'POST /ai/generate') return invokeAi({ action: 'generate', ...body })
    if ((m = path.match(/^\/ai\/providers\/([^/]+)$/))) {
      if (method === 'PATCH') return invokeAi({ action: 'save', ...body, id: m[1] })
      if (method === 'DELETE') return invokeAi({ action: 'delete', id: m[1] })
    }
    if ((m = path.match(/^\/ai\/providers\/([^/]+)\/(activate|test)$/)) && method === 'POST') {
      return invokeAi({ action: m[2], id: m[1] })
    }

    /* ------------------------------ library ------------------------------ */
    if (route === 'GET /library') {
      const { data, error } = await sb.rpc('get_library')
      if (error) fail(error)
      return data
    }

    if (route === 'PUT /library') {
      const { data, error } = await sb.rpc('save_library', {
        p_base: body.baseVersion,
        p_overlay: body.overlay,
        p_message: body.message ?? '',
      })
      if (error) fail(error)
      const res = data as { conflict?: boolean; version: number; overlay?: unknown }
      if (res.conflict) {
        throw new ApiError('The library was changed by someone else. Your view has been refreshed.', 409, res)
      }
      return res
    }

    if (route === 'GET /library/versions') {
      const { data, error } = await sb
        .from('library_versions')
        .select('version, message, author, created_at')
        .order('version', { ascending: false })
        .limit(500)
      if (error) fail(error)
      return {
        versions: (data ?? []).map((v) => ({ version: v.version, message: v.message, author: v.author, createdAt: v.created_at })),
      }
    }

    if ((m = path.match(/^\/library\/versions\/(\d+)\/restore$/)) && method === 'POST') {
      const { data, error } = await sb.rpc('restore_library', { p_version: Number(m[1]) })
      if (error) fail(error)
      return data
    }

    /* ------------------------------ projects ----------------------------- */
    if (route === 'GET /projects') {
      const [rows, seeded] = await Promise.all([
        sb.from('projects').select('data').order('updated_at', { ascending: false }),
        sb.from('app_settings').select('key').eq('key', 'seeded').maybeSingle(),
      ])
      if (rows.error) fail(rows.error)
      return { projects: (rows.data ?? []).map((r) => r.data), seeded: Boolean(seeded.data) }
    }

    if (route === 'POST /projects/replace') {
      const { error } = await sb.rpc('replace_projects', { p_projects: body.projects })
      if (error) fail(error)
      return { ok: true }
    }

    if ((m = path.match(/^\/projects\/([^/]+)$/))) {
      if (method === 'PUT') {
        const { error } = await sb.from('projects').upsert({ id: m[1], data: body, updated_at: new Date().toISOString() })
        if (error) fail(error)
        return { ok: true }
      }
      if (method === 'DELETE') {
        const { data, error } = await sb.from('projects').delete().eq('id', m[1]).select('id')
        if (error) fail(error)
        // Row-level security turns a refused delete into "0 rows", so say so out loud.
        if (!data?.length) throw new ApiError('Only an admin can delete a project.', 403)
        return { ok: true }
      }
    }

    if ((m = path.match(/^\/projects\/([^/]+)\/snapshots$/))) {
      if (method === 'GET') {
        const { data, error } = await sb
          .from('project_snapshots')
          .select('id, label, author, created_at')
          .eq('project_id', m[1])
          .order('id', { ascending: false })
          .limit(200)
        if (error) fail(error)
        return { snapshots: (data ?? []).map((s) => ({ id: s.id, label: s.label, author: s.author, createdAt: s.created_at })) }
      }
      if (method === 'POST') {
        const { error } = await sb.rpc('create_snapshot', { p_project: m[1], p_label: body?.label ?? '' })
        if (error) fail(error)
        return { ok: true }
      }
    }

    if ((m = path.match(/^\/projects\/([^/]+)\/snapshots\/(\d+)\/restore$/)) && method === 'POST') {
      const { data, error } = await sb.rpc('restore_snapshot', { p_project: m[1], p_snapshot: Number(m[2]) })
      if (error) fail(error)
      return { project: data }
    }

    /* -------------------------------- audit ------------------------------ */
    if (route === 'GET /audit') {
      const { data, error } = await sb.from('audit_log').select('id, at, actor, action, detail').order('id', { ascending: false }).limit(500)
      if (error) fail(error)
      return { entries: data ?? [] }
    }

    throw new ApiError(`Unknown request: ${route}`, 404)
  })()

  return result as T
}
