import type { ExecStats, ExecStatus, ProjectTestCase } from '../types'

let counter = 0

export function uid(prefix = 'id'): string {
  counter += 1
  return `${prefix}_${Date.now().toString(36)}${counter.toString(36)}${Math.random().toString(36).slice(2, 7)}`
}

export function cn(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(' ')
}

export function computeStats(cases: ProjectTestCase[]): ExecStats {
  const total = cases.length
  let pass = 0
  let fail = 0
  let blocked = 0
  for (const c of cases) {
    if (c.status === 'Pass') pass += 1
    else if (c.status === 'Fail') fail += 1
    else if (c.status === 'Blocked') blocked += 1
  }
  const executed = pass + fail + blocked
  const notRun = total - executed
  return {
    total,
    pass,
    fail,
    blocked,
    notRun,
    executed,
    executionPct: total === 0 ? 0 : Math.round((executed / total) * 100),
    passPct: executed === 0 ? 0 : Math.round((pass / executed) * 100),
  }
}

export const STATUS_ORDER: ExecStatus[] = ['Pass', 'Fail', 'Blocked', 'Not Run']

/**
 * The release gate: every mandatory test case must have passed. Anything still failing,
 * blocked or unrun counts as outstanding.
 */
export function computeGate(cases: ProjectTestCase[]) {
  const mandatory = cases.filter((c) => c.isMandatory)
  const stats = computeStats(mandatory)
  return {
    ...stats,
    outstanding: stats.fail + stats.blocked + stats.notRun,
    passed: mandatory.length > 0 && stats.pass === mandatory.length,
    /** False when the project has no mandatory cases, so there is no gate to meet yet. */
    applicable: mandatory.length > 0,
  }
}

export function formatDate(iso: string): string {
  const d = new Date(iso)
  if (Number.isNaN(d.getTime())) return '—'
  return d.toLocaleDateString(undefined, { day: '2-digit', month: 'short', year: 'numeric' })
}

export function formatDateTime(iso: string | null): string {
  if (!iso) return '—'
  const d = new Date(iso)
  if (Number.isNaN(d.getTime())) return '—'
  return d.toLocaleString(undefined, {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

export function relativeDate(iso: string): string {
  const then = new Date(iso).getTime()
  if (Number.isNaN(then)) return '—'
  const diff = Date.now() - then
  const day = 86_400_000
  if (diff < 60_000) return 'just now'
  if (diff < 3_600_000) return `${Math.floor(diff / 60_000)}m ago`
  if (diff < day) return `${Math.floor(diff / 3_600_000)}h ago`
  if (diff < 7 * day) return `${Math.floor(diff / day)}d ago`
  return formatDate(iso)
}

/** Stable, non-cryptographic hash used to make seeded demo data deterministic. */
export function hashString(s: string): number {
  let h = 2166136261
  for (let i = 0; i < s.length; i += 1) {
    h ^= s.charCodeAt(i)
    h = Math.imul(h, 16777619)
  }
  return Math.abs(h)
}
