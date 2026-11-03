import { createElement, useEffect, useRef, type ButtonHTMLAttributes, type ReactNode } from 'react'
import type { LucideIcon } from 'lucide-react'
import {
  AudioLines,
  BedDouble,
  Bot,
  BrainCircuit,
  Box,
  Boxes,
  Building2,
  CalendarCheck,
  Car,
  Cog,
  Dumbbell,
  Factory,
  FolderOpen,
  GraduationCap,
  HardHat,
  HeartHandshake,
  Home,
  KanbanSquare,
  Landmark,
  LifeBuoy,
  Newspaper,
  Plane,
  Repeat,
  Scale,
  ScanEye,
  Search,
  ShieldCheck,
  ShoppingCart,
  Signal,
  Sparkles,
  Sprout,
  Stethoscope,
  Store,
  Ticket,
  Truck,
  UserCog,
  Users,
  UtensilsCrossed,
  Wrench,
  X,
  Zap,
} from 'lucide-react'
import type { ExecStatus, Priority, TestType } from '../types'
import { cn } from '../lib/utils'

/* --------------------------------- icons ---------------------------------- */

/** Only the icons the master catalog references, so the icon set is not bundled whole. */
const CATEGORY_ICONS: Record<string, LucideIcon> = {
  Users,
  Repeat,
  ShoppingCart,
  Factory,
  UserCog,
  KanbanSquare,
  Boxes,
  Stethoscope,
  GraduationCap,
  Building2,
  CalendarCheck,
  FolderOpen,
  Home,
  Store,
  Landmark,
  BedDouble,
  UtensilsCrossed,
  Truck,
  Wrench,
  ShieldCheck,
  Scale,
  HardHat,
  Car,
  Dumbbell,
  Ticket,
  HeartHandshake,
  Sprout,
  Zap,
  Plane,
  LifeBuoy,
  Cog,
  Newspaper,
  Signal,
  AudioLines,
  Bot,
  Sparkles,
  BrainCircuit,
  ScanEye,
}

export function DynamicIcon({ name, className }: { name: string; className?: string }) {
  return createElement(CATEGORY_ICONS[name] ?? Box, { className })
}

/* --------------------------------- button --------------------------------- */

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger' | 'subtle'
type ButtonSize = 'sm' | 'md'

const BUTTON_VARIANTS: Record<ButtonVariant, string> = {
  primary:
    'bg-brand-600 text-white shadow-sm hover:bg-brand-700 focus-visible:ring-brand-500/40 disabled:bg-brand-300',
  secondary:
    'border border-slate-300 bg-white text-slate-700 shadow-sm hover:bg-slate-50 focus-visible:ring-slate-400/30',
  ghost: 'text-slate-600 hover:bg-slate-100 hover:text-slate-900 focus-visible:ring-slate-400/30',
  subtle: 'bg-slate-100 text-slate-700 hover:bg-slate-200 focus-visible:ring-slate-400/30',
  danger: 'bg-rose-600 text-white shadow-sm hover:bg-rose-700 focus-visible:ring-rose-500/40',
}

const BUTTON_SIZES: Record<ButtonSize, string> = {
  sm: 'h-8 gap-1.5 px-2.5 text-xs',
  md: 'h-9 gap-2 px-3.5 text-sm',
}

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
  icon?: LucideIcon
}

export function Button({
  variant = 'secondary',
  size = 'md',
  icon: Icon,
  className,
  children,
  ...rest
}: ButtonProps) {
  return (
    <button
      type="button"
      className={cn(
        'inline-flex shrink-0 items-center justify-center rounded-lg font-medium transition',
        'focus:outline-none focus-visible:ring-2 disabled:cursor-not-allowed disabled:opacity-60',
        BUTTON_VARIANTS[variant],
        BUTTON_SIZES[size],
        className,
      )}
      {...rest}
    >
      {Icon ? <Icon className={size === 'sm' ? 'h-3.5 w-3.5' : 'h-4 w-4'} /> : null}
      {children}
    </button>
  )
}

/* ---------------------------------- badges -------------------------------- */

export const STATUS_STYLES: Record<ExecStatus, { badge: string; dot: string; bar: string; text: string }> = {
  Pass: {
    badge: 'bg-emerald-50 text-emerald-700 ring-emerald-600/20',
    dot: 'bg-emerald-500',
    bar: 'bg-emerald-500',
    text: 'text-emerald-700',
  },
  Fail: {
    badge: 'bg-rose-50 text-rose-700 ring-rose-600/20',
    dot: 'bg-rose-500',
    bar: 'bg-rose-500',
    text: 'text-rose-700',
  },
  Blocked: {
    badge: 'bg-amber-50 text-amber-700 ring-amber-600/20',
    dot: 'bg-amber-500',
    bar: 'bg-amber-500',
    text: 'text-amber-700',
  },
  'Not Run': {
    badge: 'bg-slate-100 text-slate-600 ring-slate-500/20',
    dot: 'bg-slate-400',
    bar: 'bg-slate-300',
    text: 'text-slate-600',
  },
}

const PRIORITY_STYLES: Record<Priority, string> = {
  Critical: 'bg-rose-50 text-rose-700 ring-rose-600/20',
  High: 'bg-orange-50 text-orange-700 ring-orange-600/20',
  Medium: 'bg-sky-50 text-sky-700 ring-sky-600/20',
  Low: 'bg-slate-100 text-slate-600 ring-slate-500/20',
}

export function Badge({
  children,
  className,
  size = 'md',
}: {
  children: ReactNode
  className?: string
  size?: 'sm' | 'md'
}) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded-md font-medium ring-1 ring-inset',
        size === 'sm' ? 'px-1.5 py-0.5 text-2xs' : 'px-2 py-0.5 text-xs',
        className ?? 'bg-slate-100 text-slate-600 ring-slate-500/20',
      )}
    >
      {children}
    </span>
  )
}

export function StatusBadge({ status, size = 'md' }: { status: ExecStatus; size?: 'sm' | 'md' }) {
  const s = STATUS_STYLES[status]
  return (
    <Badge className={s.badge} size={size}>
      <span className={cn('h-1.5 w-1.5 rounded-full', s.dot)} />
      {status}
    </Badge>
  )
}

export function PriorityBadge({ priority, size = 'md' }: { priority: Priority; size?: 'sm' | 'md' }) {
  return (
    <Badge className={PRIORITY_STYLES[priority]} size={size}>
      {priority}
    </Badge>
  )
}

export function MandatoryBadge({ size = 'md' }: { size?: 'sm' | 'md' }) {
  return (
    <Badge className="bg-indigo-50 text-indigo-700 ring-indigo-600/20" size={size}>
      <ShieldCheck className="h-3 w-3" />
      Mandatory
    </Badge>
  )
}

export function TypeBadge({ type, size = 'md' }: { type: TestType; size?: 'sm' | 'md' }) {
  return (
    <Badge className="bg-brand-50 text-brand-700 ring-brand-600/20" size={size}>
      {type}
    </Badge>
  )
}

/* ---------------------------------- layout -------------------------------- */

export function Card({ className, children }: { className?: string; children: ReactNode }) {
  return <div className={cn('card', className)}>{children}</div>
}

export function CardHeader({
  title,
  subtitle,
  action,
  className,
}: {
  title: ReactNode
  subtitle?: ReactNode
  action?: ReactNode
  className?: string
}) {
  return (
    <div className={cn('flex items-start justify-between gap-4 border-b border-slate-200 px-5 py-4', className)}>
      <div className="min-w-0">
        <h2 className="truncate text-sm font-semibold text-slate-900">{title}</h2>
        {subtitle ? <p className="mt-0.5 text-xs text-slate-500">{subtitle}</p> : null}
      </div>
      {action}
    </div>
  )
}

export function PageHeader({
  title,
  subtitle,
  action,
}: {
  title: string
  subtitle?: string
  action?: ReactNode
}) {
  return (
    <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <h1 className="text-xl font-semibold tracking-tight text-slate-900">{title}</h1>
        {subtitle ? <p className="mt-1 text-sm text-slate-500">{subtitle}</p> : null}
      </div>
      {/* Wraps rather than overflowing: some pages carry four actions. */}
      {action ? <div className="flex flex-wrap items-center gap-2 sm:justify-end">{action}</div> : null}
    </div>
  )
}

export function StatCard({
  label,
  value,
  icon: Icon,
  hint,
  tone = 'default',
}: {
  label: string
  value: ReactNode
  icon: LucideIcon
  hint?: ReactNode
  tone?: 'default' | 'positive' | 'negative' | 'warning' | 'brand'
}) {
  const tones = {
    default: 'bg-slate-100 text-slate-600',
    brand: 'bg-brand-50 text-brand-600',
    positive: 'bg-emerald-50 text-emerald-600',
    negative: 'bg-rose-50 text-rose-600',
    warning: 'bg-amber-50 text-amber-600',
  } as const
  return (
    <Card className="p-4">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="truncate text-xs font-medium uppercase tracking-wide text-slate-500">{label}</p>
          <p className="mt-2 text-2xl font-semibold tracking-tight text-slate-900">{value}</p>
          {hint ? <p className="mt-1 text-xs text-slate-500">{hint}</p> : null}
        </div>
        <span className={cn('flex h-9 w-9 shrink-0 items-center justify-center rounded-lg', tones[tone])}>
          <Icon style={{ width: 18, height: 18 }} />
        </span>
      </div>
    </Card>
  )
}

export function EmptyState({
  icon: Icon,
  title,
  description,
  action,
}: {
  icon: LucideIcon
  title: string
  description?: string
  action?: ReactNode
}) {
  return (
    <div className="flex flex-col items-center justify-center px-6 py-14 text-center">
      <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-100 text-slate-500">
        <Icon className="h-5 w-5" />
      </span>
      <h3 className="mt-4 text-sm font-semibold text-slate-900">{title}</h3>
      {description ? <p className="mt-1 max-w-sm text-sm text-slate-500">{description}</p> : null}
      {action ? <div className="mt-4">{action}</div> : null}
    </div>
  )
}

/* ---------------------------------- inputs -------------------------------- */

export function SearchInput({
  value,
  onChange,
  placeholder = 'Search…',
  className,
}: {
  value: string
  onChange: (v: string) => void
  placeholder?: string
  className?: string
}) {
  return (
    <div className={cn('relative', className)}>
      <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="input-base pl-9 pr-8"
      />
      {value ? (
        <button
          type="button"
          onClick={() => onChange('')}
          aria-label="Clear search"
          className="absolute right-2 top-1/2 -translate-y-1/2 rounded p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
        >
          <X className="h-3.5 w-3.5" />
        </button>
      ) : null}
    </div>
  )
}

export function Field({
  label,
  hint,
  error,
  required,
  children,
}: {
  label: string
  hint?: string
  error?: string
  required?: boolean
  children: ReactNode
}) {
  return (
    <label className="block">
      <span className="mb-1.5 flex items-center gap-1 text-sm font-medium text-slate-700">
        {label}
        {required ? <span className="text-rose-500">*</span> : null}
      </span>
      {children}
      {error ? <span className="mt-1 block text-xs text-rose-600">{error}</span> : null}
      {!error && hint ? <span className="mt-1 block text-xs text-slate-500">{hint}</span> : null}
    </label>
  )
}

export function Select<T extends string>({
  value,
  onChange,
  options,
  className,
  'aria-label': ariaLabel,
}: {
  value: T
  onChange: (v: T) => void
  options: Array<{ value: T; label: string }>
  className?: string
  'aria-label'?: string
}) {
  return (
    <select
      aria-label={ariaLabel}
      value={value}
      onChange={(e) => onChange(e.target.value as T)}
      className={cn('input-base cursor-pointer pr-8', className)}
    >
      {options.map((o) => (
        <option key={o.value} value={o.value}>
          {o.label}
        </option>
      ))}
    </select>
  )
}

/* --------------------------------- progress ------------------------------- */

export function ProgressBar({
  value,
  className,
  barClassName,
}: {
  value: number
  className?: string
  barClassName?: string
}) {
  return (
    <div className={cn('h-1.5 w-full overflow-hidden rounded-full bg-slate-200', className)}>
      <div
        className={cn('h-full rounded-full transition-all duration-500', barClassName ?? 'bg-brand-600')}
        style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
      />
    </div>
  )
}

export interface Segment {
  label: string
  value: number
  className: string
}

export function StackedBar({ segments, className }: { segments: Segment[]; className?: string }) {
  const total = segments.reduce((n, s) => n + s.value, 0)
  if (total === 0) {
    return <div className={cn('h-2 w-full rounded-full bg-slate-200', className)} />
  }
  return (
    <div className={cn('flex h-2 w-full overflow-hidden rounded-full bg-slate-200', className)}>
      {segments
        .filter((s) => s.value > 0)
        .map((s) => (
          <div
            key={s.label}
            title={`${s.label}: ${s.value}`}
            className={cn('h-full transition-all duration-500', s.className)}
            style={{ width: `${(s.value / total) * 100}%` }}
          />
        ))}
    </div>
  )
}

/* ---------------------------------- modal --------------------------------- */

const FOCUSABLE =
  'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'

export function Modal({
  open,
  onClose,
  title,
  description,
  children,
  footer,
  width = 'max-w-lg',
}: {
  open: boolean
  onClose: () => void
  title: string
  description?: string
  children?: ReactNode
  footer?: ReactNode
  width?: string
}) {
  const panelRef = useRef<HTMLDivElement>(null)
  // Held in a ref so the effect below depends only on `open`. Depending on `onClose`, which
  // callers pass as an inline arrow, would re-run it on every render — that moved focus back
  // to the close button mid-typing, and a space then activated it and shut the dialog.
  const onCloseRef = useRef(onClose)
  onCloseRef.current = onClose

  // Escape to close, Tab kept inside the dialog, and focus returned where it came from.
  useEffect(() => {
    if (!open) return
    const returnTo = document.activeElement as HTMLElement | null
    const items = () => Array.from(panelRef.current?.querySelectorAll<HTMLElement>(FOCUSABLE) ?? [])
    items()[0]?.focus()

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        onCloseRef.current()
        return
      }
      if (e.key !== 'Tab') return
      const focusable = items()
      if (focusable.length === 0) return
      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', onKeyDown)
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = previousOverflow
      returnTo?.focus?.()
    }
  }, [open])

  if (!open) return null
  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-slate-900/40 p-4 pt-[8vh] backdrop-blur-sm"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onCloseRef.current()
      }}
    >
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label={title}
        className={cn('w-full rounded-xl border border-slate-200 bg-white shadow-pop', width)}
      >
        <div className="flex items-start justify-between gap-4 border-b border-slate-200 px-5 py-4">
          <div>
            <h2 className="text-sm font-semibold text-slate-900">{title}</h2>
            {description ? <p className="mt-0.5 text-xs text-slate-500">{description}</p> : null}
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close dialog"
            className="rounded-lg p-1.5 text-slate-400 transition hover:bg-slate-100 hover:text-slate-600"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
        {children ? <div className="px-5 py-4">{children}</div> : null}
        {footer ? (
          <div className="flex items-center justify-end gap-2 border-t border-slate-200 bg-slate-50/60 px-5 py-3">
            {footer}
          </div>
        ) : null}
      </div>
    </div>
  )
}
