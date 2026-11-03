import { useMemo, useState } from 'react'
import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom'
import {
  AlertTriangle,
  BarChart3,
  CheckCircle2,
  FileCheck2,
  FolderKanban,
  LayoutDashboard,
  Layers,
  History,
  LogIn,
  LogOut,
  Users,
  Menu,
  Plus,
  RotateCcw,
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
  { to: '/test-cases', label: 'Test Case Library', icon: FileCheck2, end: false },
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

  return (
    <>
      <div className="flex h-14 items-center gap-2.5 border-b border-slate-200 px-4">
        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-600 text-white">
          <CheckCircle2 style={{ width: 18, height: 18 }} />
        </span>
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold tracking-tight text-slate-900">TestForge</p>
          <p className="truncate text-2xs text-slate-500">Feature &amp; QA Management</p>
        </div>
      </div>

      <nav className="flex-1 space-y-0.5 overflow-y-auto p-3">
        {[
          ...NAV,
          ...(isAdmin
            ? [
                { to: '/users', label: 'Users & access', icon: Users, end: false },
                { to: '/history', label: 'History', icon: History, end: false },
              ]
            : []),
        ].map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            onClick={onNavigate}
            className={({ isActive }) =>
              cn(
                'flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-sm font-medium transition',
                isActive
                  ? 'bg-brand-50 text-brand-700'
                  : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900',
              )
            }
          >
            {({ isActive }) => (
              <>
                <item.icon className={cn('h-4 w-4', isActive ? 'text-brand-600' : 'text-slate-400')} />
                <span className="flex-1 truncate">{item.label}</span>
                {item.to === '/projects' && projects.length > 0 ? (
                  <span className="rounded bg-slate-100 px-1.5 py-0.5 text-2xs font-semibold tabular-nums text-slate-600">
                    {projects.length}
                  </span>
                ) : null}
              </>
            )}
          </NavLink>
        ))}

        <div className="pt-4">
          <p className="px-2.5 pb-2 text-2xs font-semibold uppercase tracking-wider text-slate-400">
            Master library
          </p>
          <dl className="space-y-1.5 px-2.5 text-xs">
            {[
              ['Categories', stats.categories],
              ['Modules', stats.modules],
              ['Features', stats.features],
              ['Test cases', stats.testCases],
            ].map(([label, value]) => (
              <div key={label as string} className="flex items-center justify-between">
                <dt className="text-slate-500">{label}</dt>
                <dd className="font-medium tabular-nums text-slate-700">{value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </nav>

      <div className="border-t border-slate-200 p-3">
        <div className="mb-1 flex items-center justify-between px-2.5 text-2xs">
          <span className="text-slate-400">Stored locally</span>
          <span className="font-medium tabular-nums text-slate-600" title="Projects held in this browser's IndexedDB">
            {formatBytes(footprint)}
          </span>
        </div>
        {isAdmin ? (
          <Button
            variant="ghost"
            size="sm"
            icon={RotateCcw}
            className="w-full justify-start"
            onClick={() => setConfirmReset(true)}
          >
            Reset demo data
          </Button>
        ) : null}
        {user ? (
          <>
            <p className="px-2.5 pt-1 text-2xs text-slate-400">
              Signed in as <span className="font-medium text-slate-600">{user.username}</span>
              {isAdmin ? ' (admin)' : ''}
            </p>
            <Button variant="ghost" size="sm" icon={LogOut} className="w-full justify-start" onClick={() => void logout()}>
              Sign out
            </Button>
          </>
        ) : (
          <Link
            to="/admin"
            onClick={onNavigate}
            className="flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-medium text-slate-500 hover:bg-slate-100 hover:text-slate-800"
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

  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* desktop sidebar */}
      <aside className="hidden w-60 shrink-0 flex-col border-r border-slate-200 bg-white lg:flex">
        <SidebarContent />
      </aside>

      {/* mobile drawer */}
      {mobileOpen ? (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
            role="presentation"
          />
          <aside className="relative flex h-full w-64 flex-col border-r border-slate-200 bg-white">
            <button
              type="button"
              onClick={() => setMobileOpen(false)}
              aria-label="Close navigation"
              className="absolute right-2 top-3 rounded-lg p-1.5 text-slate-400 hover:bg-slate-100"
            >
              <X className="h-4 w-4" />
            </button>
            <SidebarContent onNavigate={() => setMobileOpen(false)} />
          </aside>
        </div>
      ) : null}

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-30 flex h-14 items-center gap-3 border-b border-slate-200 bg-white/90 px-4 backdrop-blur lg:px-6">
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

        <main className="min-w-0 flex-1 p-4 lg:p-6">
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
            {ready ? <Outlet /> : <LoadingState />}
          </div>
        </main>
      </div>
    </div>
  )
}
