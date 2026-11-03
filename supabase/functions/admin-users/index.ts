// Admin user management. Creating and changing auth users needs the service-role key, which must
// never reach the browser, so it lives here. Every call is checked against the caller's own JWT.
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const cors = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}
const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { ...cors, 'Content-Type': 'application/json' } })

// Supabase Auth is email-based; users sign in with a username, mapped to a synthetic address.
const emailFor = (username: string) => `${username.toLowerCase()}@testforge.local`

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: cors })

  const url = Deno.env.get('SUPABASE_URL')!
  const admin = createClient(url, Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!)
  const caller = createClient(url, Deno.env.get('SUPABASE_ANON_KEY')!, {
    global: { headers: { Authorization: req.headers.get('Authorization') ?? '' } },
  })

  const { data: auth } = await caller.auth.getUser()
  if (!auth.user) return json({ error: 'Sign in required.' }, 401)
  const { data: me } = await admin.from('profiles').select('id, username, role, active').eq('id', auth.user.id).single()
  if (!me || me.role !== 'admin' || !me.active) return json({ error: 'Admin access required.' }, 403)

  const log = (action: string, detail: string) =>
    admin.from('audit_log').insert({ actor: me.username, action, detail })
  const activeAdmins = async () =>
    (await admin.from('profiles').select('id', { count: 'exact', head: true }).eq('role', 'admin').eq('active', true)).count ?? 0

  const body = await req.json().catch(() => ({}))

  if (body.action === 'list') {
    const { data, error } = await admin
      .from('profiles')
      .select('id, username, role, active, created_at, created_by')
      .order('created_at')
    if (error) return json({ error: error.message }, 500)
    return json({
      users: data.map((u) => ({ id: u.id, username: u.username, role: u.role, active: u.active, createdAt: u.created_at, createdBy: u.created_by })),
    })
  }

  if (body.action === 'create') {
    const username = String(body.username ?? '').trim()
    const password = String(body.password ?? '')
    const role = body.role === 'admin' ? 'admin' : 'user'
    if (!/^[A-Za-z0-9._-]{3,32}$/.test(username)) {
      return json({ error: 'Username must be 3–32 letters, numbers, dots, dashes or underscores.' }, 400)
    }
    if (password.length < 8) return json({ error: 'Password must be at least 8 characters.' }, 400)
    const { data: taken } = await admin.from('profiles').select('id').ilike('username', username).maybeSingle()
    if (taken) return json({ error: 'That username is already taken.' }, 409)
    const created = await admin.auth.admin.createUser({ email: emailFor(username), password, email_confirm: true })
    if (created.error || !created.data.user) return json({ error: created.error?.message ?? 'Could not create the user.' }, 400)
    const { error } = await admin
      .from('profiles')
      .insert({ id: created.data.user.id, username, role, created_by: me.username })
    if (error) {
      await admin.auth.admin.deleteUser(created.data.user.id)
      return json({ error: error.message }, 500)
    }
    await log('user.create', `Created ${role} "${username}"`)
    return json({ ok: true }, 201)
  }

  if (body.action === 'update') {
    const { data: target } = await admin.from('profiles').select('*').eq('id', body.id).maybeSingle()
    if (!target) return json({ error: 'User not found.' }, 404)
    const nextRole = body.role === undefined ? target.role : body.role
    const nextActive = body.active === undefined ? target.active : Boolean(body.active)
    if (nextRole !== 'admin' && nextRole !== 'user') return json({ error: 'Invalid role.' }, 400)
    if (body.password !== undefined && String(body.password).length < 8) {
      return json({ error: 'Password must be at least 8 characters.' }, 400)
    }
    const losesAdmin = target.role === 'admin' && target.active && (nextRole !== 'admin' || !nextActive)
    if (losesAdmin && (await activeAdmins()) <= 1) return json({ error: 'There must be at least one active admin.' }, 409)
    if (target.id === me.id && (!nextActive || nextRole !== target.role)) {
      return json({ error: 'You cannot change your own role or deactivate yourself.' }, 409)
    }

    const changes: string[] = []
    if (nextRole !== target.role || nextActive !== target.active) {
      await admin.from('profiles').update({ role: nextRole, active: nextActive }).eq('id', target.id)
    }
    if (nextRole !== target.role) changes.push(`role ${target.role} → ${nextRole}`)
    if (nextActive !== target.active) {
      // Banning also invalidates the user's ability to refresh a session.
      await admin.auth.admin.updateUserById(target.id, { ban_duration: nextActive ? 'none' : '876000h' })
      changes.push(nextActive ? 'reactivated' : 'deactivated')
    }
    if (body.password !== undefined) {
      await admin.auth.admin.updateUserById(target.id, { password: String(body.password) })
      changes.push('password reset')
    }
    if (changes.length) await log('user.update', `"${target.username}": ${changes.join(', ')}`)
    return json({ ok: true })
  }

  return json({ error: 'Unknown action.' }, 400)
})
