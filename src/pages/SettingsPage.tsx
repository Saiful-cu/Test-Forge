import { NavLink, Outlet } from 'react-router-dom'
import { History, Sparkles, Users } from 'lucide-react'
import { cn } from '../lib/utils'

const TABS = [
  { to: '/settings/users', label: 'Users & access', icon: Users },
  { to: '/settings/history', label: 'History', icon: History },
  { to: '/settings/ai', label: 'AI settings', icon: Sparkles },
]

/** Admin settings: one sidebar entry, with each area on its own tab (and its own URL). */
export function SettingsPage() {
  return (
    <>
      <div className="mb-5">
        <h1 className="text-[1.375rem] font-semibold leading-tight tracking-tight text-slate-900">Settings</h1>
        <p className="mt-1.5 text-sm text-slate-500">Manage who has access, review the activity history, and connect AI.</p>
      </div>
      <nav
        className="mb-7 inline-flex max-w-full gap-1 overflow-x-auto rounded-xl bg-slate-200/60 p-1"
        aria-label="Settings sections"
      >
        {TABS.map((tab) => (
          <NavLink
            key={tab.to}
            to={tab.to}
            className={({ isActive }) =>
              cn(
                'flex shrink-0 items-center gap-2 rounded-lg px-3.5 py-2 text-sm font-medium transition',
                isActive ? 'bg-white text-slate-900 shadow-sm ring-1 ring-slate-900/5' : 'text-slate-500 hover:text-slate-800',
              )
            }
          >
            <tab.icon className="h-4 w-4" />
            {tab.label}
          </NavLink>
        ))}
      </nav>
      <Outlet />
    </>
  )
}
