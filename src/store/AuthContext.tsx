import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import { api } from '../lib/api'

export interface AuthUser {
  id: string
  username: string
  role: 'admin' | 'user'
}

interface AuthValue {
  user: AuthUser | null
  isAdmin: boolean
  /** False until the first /api/me check has finished. */
  checked: boolean
  login: (username: string, password: string) => Promise<string | null>
  logout: () => Promise<void>
}

const AuthContext = createContext<AuthValue | null>(null)

/**
 * Sessions live on the server (httpOnly cookie); the role is re-read from the database on every
 * request, so the checks here only decide what to show — the API is what actually enforces access.
 */
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null)
  const [checked, setChecked] = useState(false)

  useEffect(() => {
    api<{ user: AuthUser | null }>('GET', '/me')
      .then((r) => setUser(r.user))
      .catch(() => setUser(null))
      .finally(() => setChecked(true))
  }, [])

  const login = useCallback(async (username: string, password: string) => {
    try {
      const r = await api<{ user: AuthUser }>('POST', '/login', { username, password })
      setUser(r.user)
      return null
    } catch (err) {
      return err instanceof Error ? err.message : 'Could not sign in.'
    }
  }, [])

  const logout = useCallback(async () => {
    await api('POST', '/logout', {}).catch(() => undefined)
    setUser(null)
  }, [])

  const value = useMemo(
    () => ({ user, isAdmin: user?.role === 'admin', checked, login, logout }),
    [user, checked, login, logout],
  )
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth(): AuthValue {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used inside an AuthProvider')
  return ctx
}
