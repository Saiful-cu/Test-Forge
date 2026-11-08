import { useEffect, useState } from 'react'
import { Pencil, Save, Trash2, X } from 'lucide-react'
import { Button, Select } from './ui'
import { DetailBlock, TestCaseBody } from './TestCaseBody'
import { TestCaseActivity } from './TestCaseActivity'
import {
  EXEC_STATUSES,
  PRIORITIES,
  TEST_TYPES,
  type ExecStatus,
  type Priority,
  type ProjectTestCase,
  type TestType,
} from '../types'
import { cn } from '../lib/utils'

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

/** The full view of one project test case: specification, results, editing, comments and history. */
export function TestCaseEditor({
  projectId,
  testCase,
  onPatch,
  onDelete,
  startEditing = false,
  onCommentCountChange,
}: {
  projectId: string
  testCase: ProjectTestCase
  onPatch: (patch: Partial<ProjectTestCase>) => void
  onDelete: () => void
  startEditing?: boolean
  onCommentCountChange?: (count: number) => void
}) {
  const [editing, setEditing] = useState(startEditing)
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

  return (
    <div>
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

        <TestCaseActivity
          projectId={projectId}
          testCaseId={testCase.id}
          changeSignal={testCase}
          onCountChange={onCommentCountChange}
        />
      </>
    )}
    </div>
  )
}
