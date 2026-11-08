import { useMemo, useState } from 'react'
import { Link, NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom'
import {
  AlertTriangle,
  BarChart3,
  CheckCircle2,
  FolderKanban,
  LayoutDashboard,
  Layers,
  LogIn,
  LogOut,
  Menu,
  Plus,
  RotateCcw,
  Settings,
  X,
} from 'lucide-react'
import { cn } from '../lib/utils'
import { Button, Modal } from './ui'
import { GlobalSearch } from './GlobalSearch'
import { useStore } from '../store/StoreContext'
import { useMasterLibrary } from '../store/MasterLibraryContext'
import { useAuth } from '../store/AuthContext'
const formatBytes = (bytes: number) =>
  bytes < 1024 ? `${bytes} B` : bytes < 1048576 ? `${Math.round(bytes / 1024)} KB` : `${(bytes / 1048576).toFixed(1)} MB`

const NAV = [
  { to: '/', label: 'Dashboard', icon: LayoutDashboard, end: true },
  { to: '/projects', label: 'Projects', icon: FolderKanban, end: false },
  { to: '/features', label: 'Feature Library', icon: Layers, end: false },
  { to: '/reports', label: 'Reports', icon: BarChart3, end: false },
]

function SidebarContent({ onNavigate }: { onNavigate?: () => void }) {
  const { projects, resetDemoData } = useStore()
  const { stats, changeCount, resetLibrary } = useMasterLibrary()
  const { user, isAdmin, logout } = useAuth()
  const [confirmReset, setConfirmReset] = useState(false)

  // Measured from what is in memory, which is exactly what gets written to IndexedDB —
  // reading the database back would race the save that follows each change.
  const footprint = useMemo(() => new Blob([JSON.stringify(projects)]).size, [projects])

  const navItems = [...NAV, ...(isAdmin ? [{ to: '/settings', label: 'Settings', icon: Settings, end: false }] : [])]

  return (
    <>
      <div className="flex h-16 items-center gap-3 px-5">
        <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-brand-400 to-brand-600 text-white shadow-lg shadow-brand-900/40 ring-1 ring-inset ring-white/20">
          <CheckCircle2 style={{ width: 19, height: 19 }} />
        </span>
        <div className="min-w-0">
          <p className="truncate text-[0.95rem] font-semibold tracking-tight text-white">TestForge</p>
          <p className="truncate text-2xs text-slate-400">Feature &amp; QA Management</p>
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto px-3 pb-3 pt-2">
        <p className="px-3 pb-2 text-2xs font-semibold uppercase tracking-[0.12em] text-slate-500">Workspace</p>
        <div className="space-y-0.5">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              onClick={onNavigate}
              className={({ isActive }) =>
                cn(
                  'group relative flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition',
                  isActive ? 'bg-white/[0.08] text-white' : 'text-slate-400 hover:bg-white/[0.04] hover:text-slate-100',
                )
              }
            >
              {({ isActive }) => (
                <>
                  {isActive ? (
                    <span className="absolute inset-y-1.5 left-0 w-[3px] rounded-r-full bg-brand-400" aria-hidden />
                  ) : null}
                  <item.icon
                    className={cn('h-[18px] w-[18px]', isActive ? 'text-brand-300' : 'text-slate-500 group-hover:text-slate-300')}
                  />
                  <span className="flex-1 truncate">{item.label}</span>
                  {item.to === '/projects' && projects.length > 0 ? (
                    <span
                      className={cn(
                        'rounded-full px-2 py-px text-2xs font-semibold tabular-nums',
                        isActive ? 'bg-brand-500/25 text-brand-100' : 'bg-white/[0.06] text-slate-400',
                      )}
                    >
                      {projects.length}
                    </span>
                  ) : null}
                </>
              )}
            </NavLink>
          ))}
        </div>

        <div className="mt-6">
          <p className="px-3 pb-2 text-2xs font-semibold uppercase tracking-[0.12em] text-slate-500">Master library</p>
          <dl className="grid grid-cols-2 gap-1.5 px-1">
            {[
              ['Categories', stats.categories],
              ['Modules', stats.modules],
              ['Features', stats.features],
              ['Test cases', stats.testCases],
            ].map(([label, value]) => (
              <div key={label as string} className="rounded-lg bg-white/[0.03] px-2.5 py-2 ring-1 ring-inset ring-white/[0.05]">
                <dd className="text-sm font-semibold tabular-nums text-slate-100">{Number(value).toLocaleString()}</dd>
                <dt className="text-2xs text-slate-500">{label}</dt>
              </div>
            ))}
          </dl>
        </div>
      </nav>

      <div className="space-y-1 border-t border-white/[0.06] p-3">
        <div className="flex items-center justify-between px-3 pb-1 text-2xs">
          <span className="text-slate-500">Project data</span>
          <span className="font-medium tabular-nums text-slate-400" title="Size of all project data">
            {formatBytes(footprint)}
          </span>
        </div>
        {isAdmin ? (
          <button
            type="button"
            onClick={() => setConfirmReset(true)}
            className="flex w-full items-center gap-2.5 rounded-lg px-3 py-1.5 text-xs font-medium text-slate-400 transition hover:bg-white/[0.04] hover:text-slate-100"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            Reset demo data
          </button>
        ) : null}
        {user ? (
          <div className="mt-1 flex items-center gap-2.5 rounded-xl bg-white/[0.04] p-2 ring-1 ring-inset ring-white/[0.05]">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-brand-400 to-violet-500 text-xs font-semibold uppercase text-white">
              {user.username.slice(0, 2)}
            </span>
            <div className="min-w-0 flex-1">
              <p className="truncate text-xs font-semibold text-slate-100">{user.username}</p>
              <p className="truncate text-2xs text-slate-500">{isAdmin ? 'Administrator' : 'Member'}</p>
            </div>
            <button
              type="button"
              onClick={() => void logout()}
              title="Sign out"
              aria-label="Sign out"
              className="rounded-lg p-1.5 text-slate-500 transition hover:bg-white/[0.06] hover:text-slate-100"
            >
              <LogOut className="h-4 w-4" />
            </button>
          </div>
        ) : (
          <Link
            to="/admin"
            onClick={onNavigate}
            className="mt-1 flex items-center justify-center gap-2 rounded-lg bg-white/[0.06] px-3 py-2 text-xs font-medium text-slate-200 ring-1 ring-inset ring-white/[0.06] transition hover:bg-white/[0.1] hover:text-white"
          >
            <LogIn className="h-3.5 w-3.5" />
            Admin sign in
          </Link>
        )}
      </div>

      <Modal
        open={confirmReset}
        onClose={() => setConfirmReset(false)}
        title="Reset demo data?"
        description="This replaces all current projects with the original sample set."
        footer={
          <>
            <Button onClick={() => setConfirmReset(false)}>Cancel</Button>
            <Button
              variant="danger"
              onClick={() => {
                resetDemoData()
                resetLibrary()
                setConfirmReset(false)
                onNavigate?.()
              }}
            >
              Reset data
            </Button>
          </>
        }
      >
        <p className="text-sm text-slate-600">
          Any projects you created and every execution result recorded in this browser will be discarded and the
          three sample projects will be restored.
        </p>
        {changeCount > 0 ? (
          <p className="mt-3 rounded-lg bg-slate-50 px-3 py-2 text-xs text-slate-500">
            Your {changeCount} master library {changeCount === 1 ? 'change' : 'changes'} will also be reverted to the
            built-in library.
          </p>
        ) : null}
      </Modal>
    </>
  )
}

function LoadingState() {
  return (
    <div className="space-y-4" aria-busy="true" aria-label="Loading saved projects">
      <div className="h-7 w-48 animate-pulse rounded-lg bg-slate-200" />
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="h-28 animate-pulse rounded-xl border border-slate-200 bg-white" />
        ))}
      </div>
      <div className="h-72 animate-pulse rounded-xl border border-slate-200 bg-white" />
    </div>
  )
}

export function Layout() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const { ready, saveError } = useStore()
  const { syncError } = useMasterLibrary()
  const navigate = useNavigate()
  const location = useLocation()

  return (
    <div className="flex min-h-screen bg-canvas">
      {/* desktop sidebar */}
      <aside className="sticky top-0 hidden h-screen w-64 shrink-0 flex-col bg-ink-900 lg:flex">
        <SidebarContent />
      </aside>

      {/* mobile drawer */}
      {mobileOpen ? (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 animate-fade-in bg-ink-950/60 backdrop-blur-[2px]"
            onClick={() => setMobileOpen(false)}
            role="presentation"
          />
          <aside className="relative flex h-full w-72 animate-rise-in flex-col bg-ink-900">
            <button
              type="button"
              onClick={() => setMobileOpen(false)}
              aria-label="Close navigation"
              className="absolute right-3 top-4 rounded-lg p-1.5 text-slate-400 hover:bg-white/10 hover:text-white"
            >
              <X className="h-4 w-4" />
            </button>
            <SidebarContent onNavigate={() => setMobileOpen(false)} />
          </aside>
        </div>
      ) : null}

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b border-slate-200/70 bg-white/75 px-4 backdrop-blur-md lg:px-8">
          <button
            type="button"
            onClick={() => setMobileOpen(true)}
            aria-label="Open navigation"
            className="rounded-lg p-1.5 text-slate-500 hover:bg-slate-100 lg:hidden"
          >
            <Menu style={{ width: 18, height: 18 }} />
          </button>
          <Link to="/" className="text-sm font-semibold text-slate-900 lg:hidden">
            TestForge
          </Link>
          <div className="hidden min-w-0 flex-1 lg:block">
            <GlobalSearch />
          </div>
          <div className="flex flex-1 items-center justify-end gap-2 lg:flex-none">
            <Button variant="primary" icon={Plus} onClick={() => navigate('/projects/new')}>
              <span className="hidden sm:inline">New Project</span>
              <span className="sm:hidden">New</span>
            </Button>
          </div>
        </header>

        <div className="px-4 pb-4 pt-3 lg:hidden">
          <GlobalSearch />
        </div>

        <main className="min-w-0 flex-1 p-4 lg:px-8 lg:py-7">
          <div className="mx-auto max-w-[1400px]">
            {syncError ? (
              <div className="mb-4 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-900">{syncError}</div>
            ) : null}
            {saveError ? (
              <div className="mb-4 flex items-start gap-3 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3">
                <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-rose-600" />
                <div className="min-w-0 text-sm">
                  <p className="font-medium text-rose-900">Your changes are not being saved</p>
                  <p className="mt-0.5 text-xs text-rose-800">{saveError}</p>
                </div>
              </div>
            ) : null}
            {ready ? (
              <div key={location.pathname} className="animate-rise-in">
                <Outlet />
              </div>
            ) : (
              <LoadingState />
            )}
          </div>
        </main>
      </div>
    </div>
  )
}
