import { useState, type FormEvent } from 'react'
import { ArrowLeft, CheckCircle2, FileCheck2, Layers, Sparkles } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Button } from '../components/ui'
import { useAuth } from '../store/AuthContext'

const HIGHLIGHTS = [
  { icon: Layers, text: 'A master library of features and test cases for every industry' },
  { icon: FileCheck2, text: 'Run projects feature by feature with a release gate, comments and history' },
  { icon: Sparkles, text: 'Generate edge-case test cases from feature knowledge with AI' },
]

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

  return (
    <div className="grid min-h-screen bg-canvas lg:grid-cols-[1.1fr_1fr]">
      {/* brand panel */}
      <div className="relative hidden overflow-hidden bg-ink-900 p-12 lg:flex lg:flex-col lg:justify-between">
        <div
          className="pointer-events-none absolute -left-24 -top-24 h-96 w-96 rounded-full bg-brand-600/30 blur-3xl"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute -bottom-32 right-0 h-96 w-96 rounded-full bg-violet-600/20 blur-3xl"
          aria-hidden
        />
        <div className="relative flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-brand-400 to-brand-600 text-white shadow-lg shadow-brand-900/40 ring-1 ring-inset ring-white/20">
            <CheckCircle2 style={{ width: 21, height: 21 }} />
          </span>
          <div>
            <p className="text-base font-semibold text-white">TestForge</p>
            <p className="text-xs text-slate-400">Feature &amp; QA Management</p>
          </div>
        </div>

        <div className="relative max-w-md">
          <h2 className="text-3xl font-semibold leading-tight tracking-tight text-white">
            Ship with confidence, one feature at a time.
          </h2>
          <ul className="mt-8 space-y-4">
            {HIGHLIGHTS.map(({ icon: Icon, text }) => (
              <li key={text} className="flex items-start gap-3 text-sm text-slate-300">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white/[0.06] text-brand-300 ring-1 ring-inset ring-white/10">
                  <Icon className="h-4 w-4" />
                </span>
                <span className="pt-1.5">{text}</span>
              </li>
            ))}
          </ul>
        </div>

        <p className="relative text-xs text-slate-500">Admin access unlocks settings, users, history and AI.</p>
      </div>

      {/* form */}
      <div className="flex items-center justify-center px-4 py-12">
        <form onSubmit={submit} className="w-full max-w-sm animate-rise-in">
          <div className="mb-8 flex items-center gap-3 lg:hidden">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-brand-400 to-brand-600 text-white">
              <CheckCircle2 style={{ width: 19, height: 19 }} />
            </span>
            <p className="text-base font-semibold text-slate-900">TestForge</p>
          </div>

          <h1 className="text-2xl font-semibold tracking-tight text-slate-900">Welcome back</h1>
          <p className="mt-1.5 text-sm text-slate-500">Sign in for admin access.</p>

          <div className="mt-8 space-y-4">
            <label className="block" htmlFor="login-user">
              <span className="mb-1.5 block text-sm font-medium text-slate-700">Username or email</span>
              <input
                id="login-user"
                autoFocus
                autoComplete="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="input-base py-2.5"
              />
            </label>
            <label className="block" htmlFor="login-pass">
              <span className="mb-1.5 block text-sm font-medium text-slate-700">Password</span>
              <input
                id="login-pass"
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input-base py-2.5"
              />
            </label>
          </div>

          {error ? (
            <p role="alert" className="mt-4 rounded-lg bg-rose-50 px-3 py-2 text-sm text-rose-700 ring-1 ring-inset ring-rose-200">
              {error}
            </p>
          ) : null}

          <Button type="submit" variant="primary" disabled={busy || !username || !password} className="mt-6 h-10 w-full">
            {busy ? 'Signing in…' : 'Sign in'}
          </Button>
          <Link
            to="/"
            className="mt-5 flex items-center justify-center gap-1.5 text-sm text-slate-500 transition hover:text-slate-800"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Continue without signing in
          </Link>
        </form>
      </div>
    </div>
  )
}
