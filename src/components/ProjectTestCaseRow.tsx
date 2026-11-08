import { useEffect, useState } from 'react'
import { ChevronDown, Pencil, RotateCcw, Save, Trash2, X } from 'lucide-react'
import {
  Badge,
  Button,
  MandatoryBadge,
  PriorityBadge,
  STATUS_STYLES,
  Select,
  StatusBadge,
  TypeBadge,
} from './ui'
import { DetailBlock, TestCaseBody } from './TestCaseBody'
import {
  EXEC_STATUSES,
  PRIORITIES,
  TEST_TYPES,
  type ExecStatus,
  type Priority,
  type ProjectTestCase,
  type TestType,
} from '../types'
import { cn, formatDateTime } from '../lib/utils'

const QUICK_STATUSES: ExecStatus[] = ['Pass', 'Fail', 'Blocked']

interface Draft {
  title: string
  description: string
  preconditions: string
  stepsText: string
  expectedResult: string
  testType: TestType
  priority: Priority
  isMandatory: boolean
  actualResult: string
  notes: string
}

const draftOf = (tc: ProjectTestCase): Draft => ({
  title: tc.title,
  description: tc.description,
  preconditions: tc.preconditions,
  stepsText: tc.steps.join('\n'),
  expectedResult: tc.expectedResult,
  testType: tc.testType,
  priority: tc.priority,
  isMandatory: tc.isMandatory,
  actualResult: tc.actualResult,
  notes: tc.notes,
})

function EditLabel({ children }: { children: string }) {
  return (
    <span className="mb-1.5 block text-2xs font-semibold uppercase tracking-wider text-slate-500">{children}</span>
  )
}

export function ProjectTestCaseRow({
  testCase,
  expanded,
  onToggle,
  onPatch,
  onDelete,
}: {
  testCase: ProjectTestCase
  expanded: boolean
  onToggle: () => void
  onPatch: (patch: Partial<ProjectTestCase>) => void
  onDelete: () => void
}) {
  const [editing, setEditing] = useState(false)
  const [draft, setDraft] = useState<Draft>(() => draftOf(testCase))

  // Re-sync the draft whenever the underlying record changes or the editor is reopened.
  useEffect(() => {
    setDraft(draftOf(testCase))
  }, [testCase, editing])

  const set = <K extends keyof Draft>(key: K, value: Draft[K]) => setDraft((d) => ({ ...d, [key]: value }))

  const saved = draftOf(testCase)
  const dirty = (Object.keys(draft) as Array<keyof Draft>).some((k) => draft[k] !== saved[k])
  const titleValid = draft.title.trim().length > 0

  const save = () => {
    if (!titleValid) return
    onPatch({
      title: draft.title.trim(),
      description: draft.description.trim(),
      preconditions: draft.preconditions.trim(),
      steps: draft.stepsText
        .split('\n')
        .map((s) => s.trim())
        .filter(Boolean),
      expectedResult: draft.expectedResult.trim(),
      testType: draft.testType,
      priority: draft.priority,
      isMandatory: draft.isMandatory,
      actualResult: draft.actualResult,
      notes: draft.notes,
    })
    setEditing(false)
  }

  const styles = STATUS_STYLES[testCase.status]

  return (
    <li className={cn('relative', expanded && 'bg-slate-50/70')}>
      <span className={cn('absolute inset-y-0 left-0 w-0.5', styles.bar)} aria-hidden />
      <div className="flex items-start gap-3 py-3 pl-4 pr-3">
        <button
          type="button"
          onClick={onToggle}
          aria-expanded={expanded}
          aria-label={expanded ? 'Collapse test case' : 'Expand test case'}
          className="mt-0.5 rounded p-0.5 text-slate-400 transition hover:bg-slate-200 hover:text-slate-600"
        >
          <ChevronDown className={cn('h-4 w-4 transition', expanded ? 'rotate-0' : '-rotate-90')} />
        </button>

        <div className="min-w-0 flex-1">
          <button type="button" onClick={onToggle} className="block w-full text-left">
            <span className="block text-sm font-medium text-slate-900">{testCase.title}</span>
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
            onClick={() => {
              if (!expanded) onToggle()
              setEditing(true)
            }}
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

      {expanded ? (
        <div className="border-t border-slate-200 px-4 py-4 pl-10">
          {editing ? (
            <div className="space-y-4">
              <label className="block">
                <EditLabel>Title</EditLabel>
                <input
                  className="input-base"
                  value={draft.title}
                  onChange={(e) => set('title', e.target.value)}
                  placeholder="What the test verifies"
                />
                {!titleValid ? <span className="mt-1 block text-xs text-rose-600">A title is required.</span> : null}
              </label>

              <label className="flex cursor-pointer items-start gap-3 rounded-lg border border-slate-200 bg-white px-3 py-2.5">
                <input
                  type="checkbox"
                  checked={draft.isMandatory}
                  onChange={(e) => set('isMandatory', e.target.checked)}
                  className="mt-0.5 h-4 w-4 shrink-0 cursor-pointer rounded border-slate-300 text-brand-600 focus:ring-brand-500"
                />
                <span className="min-w-0">
                  <span className="block text-sm font-medium text-slate-900">Mandatory test case</span>
                  <span className="block text-xs text-slate-500">
                    Counts towards the release gate and must pass before sign-off.
                  </span>
                </span>
              </label>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <label className="block">
                  <EditLabel>Test type</EditLabel>
                  <Select
                    value={draft.testType}
                    onChange={(v) => set('testType', v as TestType)}
                    options={TEST_TYPES.map((t) => ({ value: t, label: t }))}
                  />
                </label>
                <label className="block">
                  <EditLabel>Priority</EditLabel>
                  <Select
                    value={draft.priority}
                    onChange={(v) => set('priority', v as Priority)}
                    options={PRIORITIES.map((p) => ({ value: p, label: p }))}
                  />
                </label>
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="space-y-4">
                  <label className="block">
                    <EditLabel>Description</EditLabel>
                    <textarea
                      className="input-base min-h-[72px] resize-y"
                      value={draft.description}
                      onChange={(e) => set('description', e.target.value)}
                    />
                  </label>
                  <label className="block">
                    <EditLabel>Preconditions</EditLabel>
                    <textarea
                      className="input-base min-h-[72px] resize-y"
                      value={draft.preconditions}
                      onChange={(e) => set('preconditions', e.target.value)}
                    />
                  </label>
                  <label className="block">
                    <EditLabel>Test steps (one per line)</EditLabel>
                    <textarea
                      className="input-base min-h-[140px] resize-y font-mono text-xs leading-relaxed"
                      value={draft.stepsText}
                      onChange={(e) => set('stepsText', e.target.value)}
                    />
                  </label>
                </div>
                <div className="space-y-4">
                  <label className="block">
                    <EditLabel>Expected result</EditLabel>
                    <textarea
                      className="input-base min-h-[96px] resize-y"
                      value={draft.expectedResult}
                      onChange={(e) => set('expectedResult', e.target.value)}
                    />
                  </label>
                  <label className="block">
                    <EditLabel>Actual result</EditLabel>
                    <textarea
                      className="input-base min-h-[96px] resize-y"
                      value={draft.actualResult}
                      onChange={(e) => set('actualResult', e.target.value)}
                      placeholder="What actually happened when the test was run"
                    />
                  </label>
                  <label className="block">
                    <EditLabel>Execution notes</EditLabel>
                    <textarea
                      className="input-base min-h-[96px] resize-y"
                      value={draft.notes}
                      onChange={(e) => set('notes', e.target.value)}
                      placeholder="Environment, defect reference, blockers"
                    />
                  </label>
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="text-2xs text-slate-500">
                  Edits apply to this project copy only — the master test case is never modified.
                </p>
                <div className="flex gap-2">
                  <Button size="sm" icon={X} onClick={() => setEditing(false)}>
                    Cancel
                  </Button>
                  <Button size="sm" variant="primary" icon={Save} disabled={!dirty || !titleValid} onClick={save}>
                    Save changes
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            <>
              <TestCaseBody
                description={testCase.description}
                preconditions={testCase.preconditions}
                steps={testCase.steps}
                expectedResult={testCase.expectedResult}
              />

              <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
                <DetailBlock label="Actual result">
                  {testCase.actualResult ? (
                    <span
                      className={cn(
                        'block rounded-lg px-3 py-2',
                        testCase.status === 'Fail'
                          ? 'border border-rose-200 bg-rose-50/60 text-rose-900'
                          : 'border border-slate-200 bg-white',
                      )}
                    >
                      {testCase.actualResult}
                    </span>
                  ) : (
                    <span className="text-slate-400">Not recorded</span>
                  )}
                </DetailBlock>
                <DetailBlock label="Execution notes">
                  {testCase.notes ? (
                    <span className="block rounded-lg border border-slate-200 bg-white px-3 py-2">
                      {testCase.notes}
                    </span>
                  ) : (
                    <span className="text-slate-400">No notes</span>
                  )}
                </DetailBlock>
              </div>

              <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <span className="text-2xs font-semibold uppercase tracking-wider text-slate-500">Status</span>
                  <Select
                    aria-label="Execution status"
                    value={testCase.status}
                    onChange={(v) => onPatch({ status: v as ExecStatus })}
                    options={EXEC_STATUSES.map((s) => ({ value: s, label: s }))}
                    className="w-36"
                  />
                </div>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="ghost"
                    icon={Trash2}
                    className="text-slate-400 hover:bg-rose-50 hover:text-rose-600"
                    onClick={onDelete}
                  >
                    Delete
                  </Button>
                  <Button size="sm" icon={Pencil} onClick={() => setEditing(true)}>
                    Edit test case
                  </Button>
                </div>
              </div>
            </>
          )}
        </div>
      ) : null}
    </li>
  )
}
