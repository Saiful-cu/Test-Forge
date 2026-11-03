import { useCallback, useEffect, useState, type FormEvent } from 'react'
import { UserPlus } from 'lucide-react'
import { Badge, Button, Card, Modal, PageHeader } from '../components/ui'
import { api } from '../lib/api'
import { formatDate } from '../lib/utils'
import { useAuth } from '../store/AuthContext'

interface UserRow {
  id: string
  username: string
  role: 'admin' | 'user'
  active: boolean
  createdAt: string
  createdBy: string | null
}

const input =
  'mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20'

export function UsersPage() {
  const { user: me } = useAuth()
  const [users, setUsers] = useState<UserRow[]>([])
  const [error, setError] = useState<string | null>(null)
  const [createOpen, setCreateOpen] = useState(false)
  const [form, setForm] = useState({ username: '', password: '', role: 'user' as 'admin' | 'user' })
  const [resetFor, setResetFor] = useState<UserRow | null>(null)
  const [newPassword, setNewPassword] = useState('')
  const [formError, setFormError] = useState<string | null>(null)

  const load = useCallback(async () => {
    try {
      setUsers((await api<{ users: UserRow[] }>('GET', '/users')).users)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not load users.')
    }
  }, [])

  useEffect(() => {
    void load()
  }, [load])

  const patch = async (u: UserRow, body: object) => {
    setError(null)
    try {
      await api('PATCH', `/users/${u.id}`, body)
      await load()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Update failed.')
    }
  }

  const create = async (e: FormEvent) => {
    e.preventDefault()
    setFormError(null)
    try {
      await api('POST', '/users', form)
      setCreateOpen(false)
      setForm({ username: '', password: '', role: 'user' })
      await load()
    } catch (err) {
      setFormError(err instanceof Error ? err.message : 'Could not create the user.')
    }
  }

  const resetPassword = async () => {
    if (!resetFor) return
    setFormError(null)
    try {
      await api('PATCH', `/users/${resetFor.id}`, { password: newPassword })
      setResetFor(null)
      setNewPassword('')
    } catch (err) {
      setFormError(err instanceof Error ? err.message : 'Could not reset the password.')
    }
  }

  return (
    <>
      <PageHeader
        title="Users & access"
        subtitle="Admins can edit the libraries, delete projects and manage users. Regular users can view the libraries and work inside projects."
        action={
          <Button
            variant="primary"
            icon={UserPlus}
            onClick={() => {
              setFormError(null)
              setCreateOpen(true)
            }}
          >
            New user
          </Button>
        }
      />
      {error ? (
        <p role="alert" className="mb-3 rounded-lg bg-rose-50 px-3 py-2 text-sm text-rose-700">
          {error}
        </p>
      ) : null}
      <Card className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-slate-200 text-xs uppercase tracking-wide text-slate-500">
            <tr>
              <th className="px-4 py-3 font-medium">User</th>
              <th className="px-4 py-3 font-medium">Access</th>
              <th className="px-4 py-3 font-medium">Status</th>
              <th className="px-4 py-3 font-medium">Created</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {users.map((u) => {
              const self = u.id === me?.id
              return (
                <tr key={u.id}>
                  <td className="px-4 py-3 font-medium text-slate-900">
                    {u.username}
                    {self ? <span className="ml-2 text-xs font-normal text-slate-400">(you)</span> : null}
                  </td>
                  <td className="px-4 py-3">
                    <Badge className={u.role === 'admin' ? 'bg-brand-50 text-brand-700 ring-brand-600/20' : undefined}>
                      {u.role === 'admin' ? 'Admin · full access' : 'User · view libraries'}
                    </Badge>
                  </td>
                  <td className="px-4 py-3 text-slate-600">{u.active ? 'Active' : 'Deactivated'}</td>
                  <td className="px-4 py-3 text-xs text-slate-500">
                    {formatDate(u.createdAt)}
                    {u.createdBy ? ` by ${u.createdBy}` : ''}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex justify-end gap-1.5">
                      <Button size="sm" disabled={self} onClick={() => patch(u, { role: u.role === 'admin' ? 'user' : 'admin' })}>
                        {u.role === 'admin' ? 'Make user' : 'Make admin'}
                      </Button>
                      <Button
                        size="sm"
                        onClick={() => {
                          setFormError(null)
                          setResetFor(u)
                        }}
                      >
                        Reset password
                      </Button>
                      <Button size="sm" disabled={self} onClick={() => patch(u, { active: !u.active })}>
                        {u.active ? 'Deactivate' : 'Reactivate'}
                      </Button>
                    </div>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </Card>

      <Modal open={createOpen} onClose={() => setCreateOpen(false)} title="New user" description="They can sign in straight away with these details.">
        <form onSubmit={create}>
          <label className="block text-xs font-medium text-slate-600" htmlFor="nu-name">
            Username
          </label>
          <input id="nu-name" autoFocus value={form.username} onChange={(e) => setForm({ ...form, username: e.target.value })} className={`${input} mb-3`} />
          <label className="block text-xs font-medium text-slate-600" htmlFor="nu-pass">
            Password (8+ characters)
          </label>
          <input id="nu-pass" type="text" autoComplete="off" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} className={`${input} mb-3`} />
          <label className="block text-xs font-medium text-slate-600" htmlFor="nu-role">
            Access
          </label>
          <select id="nu-role" value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value as 'admin' | 'user' })} className={input}>
            <option value="user">User — view libraries, work in projects</option>
            <option value="admin">Admin — full access</option>
          </select>
          {formError ? (
            <p role="alert" className="mt-3 text-xs text-rose-600">
              {formError}
            </p>
          ) : null}
          <div className="mt-5 flex justify-end gap-2">
            <Button onClick={() => setCreateOpen(false)}>Cancel</Button>
            <Button type="submit" variant="primary" disabled={!form.username || form.password.length < 8}>
              Create user
            </Button>
          </div>
        </form>
      </Modal>

      <Modal
        open={Boolean(resetFor)}
        onClose={() => setResetFor(null)}
        title={`Reset password for ${resetFor?.username ?? ''}`}
        description="They will be signed out everywhere."
        footer={
          <>
            <Button onClick={() => setResetFor(null)}>Cancel</Button>
            <Button variant="primary" disabled={newPassword.length < 8} onClick={resetPassword}>
              Reset password
            </Button>
          </>
        }
      >
        <label className="block text-xs font-medium text-slate-600" htmlFor="rp-pass">
          New password (8+ characters)
        </label>
        <input id="rp-pass" type="text" autoComplete="off" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} className={input} />
        {formError ? (
          <p role="alert" className="mt-3 text-xs text-rose-600">
            {formError}
          </p>
        ) : null}
      </Modal>
    </>
  )
}
