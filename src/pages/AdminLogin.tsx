import { useState, type FormEvent } from 'react'
import { CheckCircle2 } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Button } from '../components/ui'
import { useAuth } from '../store/AuthContext'

export function AdminLogin() {
  const { login } = useAuth()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [busy, setBusy] = useState(false)

  const submit = async (e: FormEvent) => {
    e.preventDefault()
    setBusy(true)
    setError(await login(username, password))
    setBusy(false)
  }

  const input =
    'mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20'

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
      <form onSubmit={submit} className="w-full max-w-sm rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="mb-5 flex items-center gap-2.5">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-600 text-white">
            <CheckCircle2 style={{ width: 18, height: 18 }} />
          </span>
          <div>
            <p className="text-sm font-semibold text-slate-900">TestForge</p>
            <p className="text-xs text-slate-500">Sign in for admin access</p>
          </div>
        </div>
        <label className="block text-xs font-medium text-slate-600" htmlFor="login-user">
          Username
        </label>
        <input id="login-user" autoFocus autoComplete="username" value={username} onChange={(e) => setUsername(e.target.value)} className={`${input} mb-3`} />
        <label className="block text-xs font-medium text-slate-600" htmlFor="login-pass">
          Password
        </label>
        <input id="login-pass" type="password" autoComplete="current-password" value={password} onChange={(e) => setPassword(e.target.value)} className={input} />
        {error ? (
          <p role="alert" className="mt-3 text-xs text-rose-600">
            {error}
          </p>
        ) : null}
        <Button type="submit" variant="primary" disabled={busy || !username || !password} className="mt-5 w-full">
          {busy ? 'Signing in…' : 'Sign in'}
        </Button>
        <Link to="/" className="mt-3 block text-center text-xs text-slate-500 hover:text-slate-700">
          Continue without signing in
        </Link>
      </form>
    </div>
  )
}
