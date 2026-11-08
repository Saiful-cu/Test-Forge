import { ChevronRight, MessageSquare, Pencil, RotateCcw, Trash2 } from 'lucide-react'
import { Badge, MandatoryBadge, PriorityBadge, STATUS_STYLES, StatusBadge, TypeBadge } from './ui'
import type { ExecStatus, ProjectTestCase } from '../types'
import { cn, formatDateTime } from '../lib/utils'

const QUICK_STATUSES: ExecStatus[] = ['Pass', 'Fail', 'Blocked']

export function ProjectTestCaseRow({
  testCase,
  onOpen,
  onEdit,
  onPatch,
  onDelete,
  commentCount = 0,
}: {
  testCase: ProjectTestCase
  /** Opens the test case on its own page. */
  onOpen: () => void
  onEdit: () => void
  onPatch: (patch: Partial<ProjectTestCase>) => void
  onDelete: () => void
  commentCount?: number
}) {
  const styles = STATUS_STYLES[testCase.status]

  return (
    <li className="relative transition hover:bg-slate-50/70">
      <span className={cn('absolute inset-y-0 left-0 w-0.5', styles.bar)} aria-hidden />
      <div className="flex items-start gap-3 py-3 pl-4 pr-3">
        <button
          type="button"
          onClick={onOpen}
          aria-label={`Open ${testCase.title}`}
          className="mt-0.5 rounded p-0.5 text-slate-400 transition hover:bg-slate-200 hover:text-slate-600"
        >
          <ChevronRight className="h-4 w-4" />
        </button>

        <div className="min-w-0 flex-1">
          <button type="button" onClick={onOpen} className="block w-full text-left">
            <span className="block text-sm font-medium text-slate-900 hover:text-brand-700 hover:underline">
              {testCase.title}
            </span>
          </button>
          <div className="mt-1.5 flex flex-wrap items-center gap-1.5">
            <StatusBadge status={testCase.status} size="sm" />
            <Badge size="sm" className="bg-slate-100 font-mono text-slate-500 ring-slate-500/20">
              {testCase.masterTestCaseId ?? 'CUSTOM'}
            </Badge>
            <TypeBadge type={testCase.testType} size="sm" />
            <PriorityBadge priority={testCase.priority} size="sm" />
            {testCase.isMandatory ? <MandatoryBadge size="sm" /> : null}
            {testCase.isCustom ? (
              <Badge size="sm" className="bg-violet-50 text-violet-700 ring-violet-600/20">
                {testCase.source === 'ai' ? 'AI generated' : testCase.source === 'import' ? 'Imported' : 'Custom'}
              </Badge>
            ) : null}
            {commentCount > 0 ? (
              <span className="inline-flex items-center gap-1 text-2xs text-slate-500" title={`${commentCount} comments`}>
                <MessageSquare className="h-3 w-3" />
                {commentCount}
              </span>
            ) : null}
            {testCase.executedAt ? (
              <span className="text-2xs text-slate-400">executed {formatDateTime(testCase.executedAt)}</span>
            ) : null}
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-1">
          {QUICK_STATUSES.map((s) => {
            const active = testCase.status === s
            return (
              <button
                key={s}
                type="button"
                onClick={() => onPatch({ status: s })}
                title={`Mark as ${s}`}
                className={cn(
                  'rounded-md px-2 py-1 text-2xs font-semibold uppercase tracking-wide ring-1 ring-inset transition',
                  active
                    ? STATUS_STYLES[s].badge
                    : 'bg-white text-slate-400 ring-slate-200 hover:bg-slate-50 hover:text-slate-600',
                )}
              >
                {s}
              </button>
            )
          })}
          <button
            type="button"
            onClick={() => onPatch({ status: 'Not Run' })}
            title="Reset to Not Run"
            disabled={testCase.status === 'Not Run'}
            className="rounded-md p-1.5 text-slate-400 transition hover:bg-slate-100 hover:text-slate-600 disabled:opacity-40"
          >
            <RotateCcw className="h-3.5 w-3.5" />
          </button>
          <button
            type="button"
            onClick={onEdit}
            title="Edit this test case"
            aria-label="Edit this test case"
            className="rounded-md p-1.5 text-slate-400 transition hover:bg-slate-100 hover:text-slate-600"
          >
            <Pencil className="h-3.5 w-3.5" />
          </button>
          <button
            type="button"
            onClick={onDelete}
            title="Delete this test case"
            aria-label="Delete this test case"
            className="rounded-md p-1.5 text-slate-400 transition hover:bg-rose-50 hover:text-rose-600"
          >
            <Trash2 className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </li>
  )
}
