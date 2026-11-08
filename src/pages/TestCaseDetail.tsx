import { useEffect, useMemo, useState } from 'react'
import { Link, useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { ArrowLeft, ChevronLeft, ChevronRight, FileCheck2, RotateCcw } from 'lucide-react'
import {
  Badge,
  Button,
  Card,
  EmptyState,
  MandatoryBadge,
  Modal,
  PriorityBadge,
  STATUS_STYLES,
  StatusBadge,
  TypeBadge,
} from '../components/ui'
import { TestCaseEditor } from '../components/TestCaseEditor'
import { useStore } from '../store/StoreContext'
import { cn, formatDateTime } from '../lib/utils'
import type { ExecStatus } from '../types'

const QUICK_STATUSES: ExecStatus[] = ['Pass', 'Fail', 'Blocked']

/** One project test case on its own page, with previous / next within the same feature. */
export function TestCaseDetail() {
  const { projectId = '', testCaseId = '' } = useParams()
  const [search] = useSearchParams()
  const navigate = useNavigate()
  const { getProject, updateTestCase, deleteTestCase, ready } = useStore()
  const [confirmDelete, setConfirmDelete] = useState(false)

  const project = getProject(projectId)
  const testCase = project?.testCases.find((tc) => tc.id === testCaseId)
  const feature = project?.features.find((f) => f.id === testCase?.projectFeatureId)

  // Same order as the feature's list on the project page.
  const siblings = useMemo(
    () => (project && testCase ? project.testCases.filter((tc) => tc.projectFeatureId === testCase.projectFeatureId) : []),
    [project, testCase],
  )
  const index = siblings.findIndex((tc) => tc.id === testCaseId)
  const prev = index > 0 ? siblings[index - 1] : undefined
  const next = index >= 0 && index < siblings.length - 1 ? siblings[index + 1] : undefined

  const caseUrl = (id: string) => `/projects/${projectId}/test-cases/${id}`
  const backTo = { pathname: `/projects/${projectId}` }
  const backState = feature ? { openFeatureId: feature.id } : undefined

  // J / K (or the arrow keys) step through the feature, unless the person is typing.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const el = e.target as HTMLElement | null
      if (el && (el.isContentEditable || ['INPUT', 'TEXTAREA', 'SELECT'].includes(el.tagName))) return
      if (e.altKey || e.ctrlKey || e.metaKey || document.querySelector('[role="dialog"]')) return
      if ((e.key === 'j' || e.key === 'ArrowRight') && next) navigate(caseUrl(next.id))
      if ((e.key === 'k' || e.key === 'ArrowLeft') && prev) navigate(caseUrl(prev.id))
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
    // caseUrl only depends on projectId
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [next, prev, navigate, projectId])

  if (!ready) return <div aria-busy="true" />

  if (!project || !testCase) {
    return (
      <Card>
        <EmptyState
          icon={FileCheck2}
          title="Test case not found"
          description="It may have been deleted, or the link points at a project from a different browser."
          action={
            <Button icon={ArrowLeft} onClick={() => navigate(project ? backTo.pathname : '/projects')}>
              {project ? `Back to ${project.name}` : 'Back to projects'}
            </Button>
          }
        />
      </Card>
    )
  }

  const remove = () => {
    const goTo = next ?? prev
    deleteTestCase(project.id, testCase.id)
    setConfirmDelete(false)
    if (goTo) navigate(caseUrl(goTo.id), { replace: true })
    else navigate(backTo.pathname, { replace: true, state: backState })
  }

  return (
    <>
      <nav className="mb-4 flex flex-wrap items-center gap-1.5 text-xs text-slate-500" aria-label="Breadcrumb">
        <Link to="/projects" className="hover:text-slate-900">
          Projects
        </Link>
        <span>/</span>
        <Link to={backTo} state={backState} className="hover:text-slate-900">
          {project.name}
        </Link>
        {feature ? (
          <>
            <span>/</span>
            <span>{feature.moduleName}</span>
            <span>/</span>
            <Link to={backTo} state={backState} className="font-medium text-slate-700 hover:text-slate-900">
              {feature.name}
            </Link>
          </>
        ) : null}
      </nav>

      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <Link
          to={backTo}
          state={backState}
          className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-500 transition hover:text-slate-900"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Back to feature
        </Link>
        <div className="flex items-center gap-2">
          <span className="text-xs tabular-nums text-slate-500" title="Shortcuts: K / ← previous, J / → next">
            {index + 1} of {siblings.length} in {feature?.name ?? 'this feature'}
          </span>
          <Button size="sm" icon={ChevronLeft} disabled={!prev} onClick={() => prev && navigate(caseUrl(prev.id))}>
            Previous
          </Button>
          <Button size="sm" disabled={!next} onClick={() => next && navigate(caseUrl(next.id))}>
            Next
            <ChevronRight className="h-3.5 w-3.5" />
          </Button>
        </div>
      </div>

      <Card className="overflow-hidden">
        <div className={cn('h-1', STATUS_STYLES[testCase.status].bar)} aria-hidden />
        <div className="flex flex-col gap-4 border-b border-slate-200 px-5 py-4 lg:flex-row lg:items-start lg:justify-between">
          <div className="min-w-0">
            <h1 className="text-lg font-semibold tracking-tight text-slate-900">{testCase.title}</h1>
            <div className="mt-2 flex flex-wrap items-center gap-1.5">
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

          <div className="flex shrink-0 items-center gap-1.5">
            {QUICK_STATUSES.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => updateTestCase(project.id, testCase.id, { status: s })}
                className={cn(
                  'rounded-md px-2.5 py-1.5 text-xs font-semibold uppercase tracking-wide ring-1 ring-inset transition',
                  testCase.status === s
                    ? STATUS_STYLES[s].badge
                    : 'bg-white text-slate-500 ring-slate-200 hover:bg-slate-50 hover:text-slate-700',
                )}
              >
                {s}
              </button>
            ))}
            <button
              type="button"
              onClick={() => updateTestCase(project.id, testCase.id, { status: 'Not Run' })}
              title="Reset to Not Run"
              aria-label="Reset to Not Run"
              disabled={testCase.status === 'Not Run'}
              className="rounded-md p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-600 disabled:opacity-40"
            >
              <RotateCcw className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="px-5 py-5">
          {/* Keyed by id so moving to the next case starts with a fresh editor. */}
          <TestCaseEditor
            key={testCase.id}
            projectId={project.id}
            testCase={testCase}
            startEditing={search.get('edit') === '1'}
            onPatch={(patch) => updateTestCase(project.id, testCase.id, patch)}
            onDelete={() => setConfirmDelete(true)}
          />
        </div>
      </Card>

      <div className="mt-4 flex items-center justify-between gap-3">
        {prev ? (
          <Link
            to={caseUrl(prev.id)}
            className="group flex min-w-0 max-w-[48%] items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-left transition hover:border-slate-300"
          >
            <ChevronLeft className="h-4 w-4 shrink-0 text-slate-400 group-hover:text-slate-600" />
            <span className="min-w-0">
              <span className="block text-2xs uppercase tracking-wide text-slate-400">Previous</span>
              <span className="block truncate text-xs font-medium text-slate-700">{prev.title}</span>
            </span>
          </Link>
        ) : (
          <span />
        )}
        {next ? (
          <Link
            to={caseUrl(next.id)}
            className="group ml-auto flex min-w-0 max-w-[48%] items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-right transition hover:border-slate-300"
          >
            <span className="min-w-0">
              <span className="block text-2xs uppercase tracking-wide text-slate-400">Next</span>
              <span className="block truncate text-xs font-medium text-slate-700">{next.title}</span>
            </span>
            <ChevronRight className="h-4 w-4 shrink-0 text-slate-400 group-hover:text-slate-600" />
          </Link>
        ) : null}
      </div>

      <Modal
        open={confirmDelete}
        onClose={() => setConfirmDelete(false)}
        title="Delete this test case?"
        footer={
          <>
            <Button onClick={() => setConfirmDelete(false)}>Cancel</Button>
            <Button variant="danger" onClick={remove}>
              Delete test case
            </Button>
          </>
        }
      >
        <p className="text-sm text-slate-600">
          <span className="font-medium text-slate-900">{testCase.title}</span> will be removed from this project along
          with its execution result.{' '}
          {next || prev ? 'You will move on to the next test case in this feature.' : 'You will go back to the project.'}
        </p>
      </Modal>
    </>
  )
}
