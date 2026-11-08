import { useCallback, useEffect, useMemo, useState } from 'react'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'
import {
  ArrowLeft,
  BarChart3,
  CheckCircle2,
  ChevronDown,
  CircleSlash,
  FileCheck2,
  FileJson,
  FolderKanban,
  FolderOpen,
  Layers,
  Plus,
  RotateCcw,
  SearchX,
  ShieldCheck,
  Sparkles,
  Trash2,
  XCircle,
} from 'lucide-react'
import {
  Badge,
  Button,
  Card,
  EmptyState,
  Field,
  Modal,
  PageHeader,
  ProgressBar,
  SearchInput,
  Select,
  StackedBar,
  StatCard,
} from '../components/ui'
import { ProjectTestCaseRow } from '../components/ProjectTestCaseRow'
import { FeaturePicker } from '../components/FeaturePicker'
import { useStore } from '../store/StoreContext'
import { useMasterLibrary } from '../store/MasterLibraryContext'
import {
  EXEC_STATUSES,
  PRIORITIES,
  TEST_TYPES,
  type ExecStatus,
  type Priority,
  type Project,
  type ProjectFeature,
  type ProjectTestCase,
  type TestType,
} from '../types'
import { cn, computeGate, computeStats, formatDate } from '../lib/utils'
import { api } from '../lib/api'
import { ProjectVersionsDialog } from '../components/ProjectVersionsDialog'
import { ImportJsonDialog } from '../components/ImportJsonDialog'
import { AiGenerateDialog } from '../components/AiGenerateDialog'

const ALL = 'all'

function ProjectWorkspace({ project }: { project: Project }) {
  const navigate = useNavigate()
  const {
    updateTestCase,
    deleteTestCase,
    addFeaturesToProject,
    removeFeature,
    addCustomTestCase,
    bulkSetStatus,
    importFeatures,
  } = useStore()
  const { categoryById, featureById } = useMasterLibrary()

  const [query, setQuery] = useState('')
  const [status, setStatus] = useState<string>(ALL)
  const [priority, setPriority] = useState<string>(ALL)
  const [testType, setTestType] = useState<string>(ALL)
  const [scope, setScope] = useState<string>(ALL)
  // Coming back from a test case page re-opens the feature it belongs to.
  const location = useLocation()
  const [openFeatures, setOpenFeatures] = useState<string[]>(() => {
    const id = (location.state as { openFeatureId?: string } | null)?.openFeatureId
    return id ? [id] : []
  })
  const [collapsedGroups, setCollapsedGroups] = useState<string[]>([])
  // `moduleName: null` imports into a group the person names (from the page header).
  const [importTarget, setImportTarget] = useState<{ moduleName: string | null } | null>(null)
  const [aiTarget, setAiTarget] = useState<{ groupKey: string; featureId?: string } | null>(null)
  const [importNote, setImportNote] = useState<string | null>(null)
  const [commentCounts, setCommentCounts] = useState<Record<string, number>>({})

  // One query per project for the comment counts shown on each row; comments themselves load on expand.
  useEffect(() => {
    let cancelled = false
    api<{ counts: Record<string, number> }>('GET', `/projects/${project.id}/comment-counts`)
      .then((r) => !cancelled && setCommentCounts(r.counts))
      .catch(() => undefined)
    return () => {
      cancelled = true
    }
  }, [project.id])
  const [addOpen, setAddOpen] = useState(false)
  const [versionsOpen, setVersionsOpen] = useState(false)
  const [pendingFeatureIds, setPendingFeatureIds] = useState<string[]>([])
  const [removeTarget, setRemoveTarget] = useState<string | null>(null)
  const [deleteCase, setDeleteCase] = useState<ProjectTestCase | null>(null)
  const [bulk, setBulk] = useState<{ ids: string[]; status: ExecStatus; label: string } | null>(null)
  const [customFor, setCustomFor] = useState<string | null>(null)
  const [custom, setCustom] = useState({
    title: '',
    description: '',
    preconditions: '',
    steps: '',
    expectedResult: '',
    testType: 'Functional' as TestType,
    priority: 'Medium' as Priority,
    isMandatory: false,
  })

  const stats = computeStats(project.testCases)
  const gate = computeGate(project.testCases)
  const category = categoryById.get(project.categoryId)

  const q = query.trim().toLowerCase()
  const visibleCases = project.testCases.filter((tc) => {
    if (status !== ALL && tc.status !== status) return false
    if (priority !== ALL && tc.priority !== priority) return false
    if (testType !== ALL && tc.testType !== testType) return false
    if (scope === 'mandatory' && !tc.isMandatory) return false
    if (scope === 'optional' && tc.isMandatory) return false
    if (q && !`${tc.masterTestCaseId ?? ''} ${tc.title} ${tc.description}`.toLowerCase().includes(q)) return false
    return true
  })

  const filtersActive = Boolean(q) || status !== ALL || priority !== ALL || testType !== ALL || scope !== ALL

  const byFeature = useMemo(() => {
    const map = new Map<string, typeof project.testCases>()
    for (const tc of project.testCases) {
      const list = map.get(tc.projectFeatureId) ?? []
      list.push(tc)
      map.set(tc.projectFeatureId, list)
    }
    return map
  }, [project.testCases])

  const visibleByFeature = useMemo(() => {
    const map = new Map<string, typeof project.testCases>()
    for (const tc of visibleCases) {
      const list = map.get(tc.projectFeatureId) ?? []
      list.push(tc)
      map.set(tc.projectFeatureId, list)
    }
    return map
  }, [visibleCases])

  // Master ids already in the project, so neither tab of the picker can offer a duplicate.
  const takenFeatureIds = useMemo(
    () => project.features.map((f) => f.masterFeatureId).filter((id): id is string => Boolean(id)),
    [project.features],
  )

  const availableFeatures = useMemo(() => {
    const taken = new Set(takenFeatureIds)
    return (category?.modules ?? []).map((mod) => ({
      module: mod,
      features: mod.features.filter((f) => !taken.has(f.id)),
    }))
  }, [category, takenFeatureIds])

  const availableCount = availableFeatures.reduce((n, g) => n + g.features.length, 0)

  const toggleFeatureOpen = (id: string) =>
    setOpenFeatures((prev) => (prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]))

  const resetFilters = () => {
    setQuery('')
    setStatus(ALL)
    setPriority(ALL)
    setTestType(ALL)
    setScope(ALL)
  }

  const submitCustom = () => {
    if (!customFor || !custom.title.trim()) return
    addCustomTestCase(project.id, customFor, {
      title: custom.title.trim(),
      description: custom.description.trim(),
      preconditions: custom.preconditions.trim(),
      steps: custom.steps
        .split('\n')
        .map((s) => s.trim())
        .filter(Boolean),
      expectedResult: custom.expectedResult.trim(),
      testType: custom.testType,
      priority: custom.priority,
      isMandatory: custom.isMandatory,
    })
    setCustom({
      title: '',
      description: '',
      preconditions: '',
      steps: '',
      expectedResult: '',
      testType: 'Functional',
      priority: 'Medium',
      isMandatory: false,
    })
    setCustomFor(null)
  }

  // Features are grouped by module (and by source category when pulled in from another one),
  // in the order they first appear in the project.
  const groupInfo = useCallback(
    (feature: ProjectFeature) => {
      const master = feature.masterFeatureId ? featureById.get(feature.masterFeatureId) : undefined
      const categoryName = master && master.categoryId !== project.categoryId ? master.categoryName : null
      const moduleName = feature.moduleName || (feature.isCustom ? 'Custom features' : 'Other')
      return { key: `${categoryName ?? ''}::${moduleName}`, categoryName, moduleName }
    },
    [featureById, project.categoryId],
  )

  const featureGroups = useMemo(() => {
    const groups = new Map<string, { key: string; moduleName: string; categoryName: string | null; features: ProjectFeature[] }>()
    for (const feature of project.features) {
      const { key, categoryName, moduleName } = groupInfo(feature)
      const group = groups.get(key) ?? { key, moduleName, categoryName, features: [] }
      group.features.push(feature)
      groups.set(key, group)
    }
    return [...groups.values()]
  }, [project.features, groupInfo])

  const aiGroup = aiTarget ? featureGroups.find((g) => g.key === aiTarget.groupKey) : undefined

  const toggleGroup = (key: string) =>
    setCollapsedGroups((prev) => (prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]))

  const renderFeature = (feature: ProjectFeature) => {
    const all = byFeature.get(feature.id) ?? []
    const shown = visibleByFeature.get(feature.id) ?? []
    const fs = computeStats(all)
    const open = openFeatures.includes(feature.id)
    const hiddenByFilter = filtersActive && shown.length === 0

    return (
      <Card key={feature.id} className={cn('overflow-hidden', hiddenByFilter && 'opacity-60')}>
        <div className="flex items-start gap-3 px-4 py-3.5">
          <button
            type="button"
            onClick={() => toggleFeatureOpen(feature.id)}
            aria-expanded={open}
            aria-label={open ? `Collapse ${feature.name}` : `Expand ${feature.name}`}
            className="mt-0.5 rounded p-0.5 text-slate-400 transition hover:bg-slate-100 hover:text-slate-600"
          >
            <ChevronDown className={cn('h-4 w-4 transition', open ? 'rotate-0' : '-rotate-90')} />
          </button>

          <div className="min-w-0 flex-1">
            <button
              type="button"
              onClick={() => toggleFeatureOpen(feature.id)}
              className="block w-full text-left"
            >
              <span className="flex flex-wrap items-center gap-2">
                <span className="text-sm font-semibold text-slate-900">{feature.name}</span>
                {feature.isCustom ? (
                  <Badge size="sm" className="bg-violet-50 text-violet-700 ring-violet-600/20">
                    Custom feature
                  </Badge>
                ) : null}
                {feature.knowledge ? (
                  <Badge size="sm" className="bg-sky-50 text-sky-700 ring-sky-600/20">
                    Has knowledge
                  </Badge>
                ) : null}
              </span>
              <span className="mt-1 block line-clamp-1 text-xs text-slate-500">{feature.description}</span>
            </button>

            <div className="mt-2.5 flex items-center gap-3">
              <StackedBar
                className="max-w-xs flex-1"
                segments={[
                  { label: 'Pass', value: fs.pass, className: 'bg-emerald-500' },
                  { label: 'Fail', value: fs.fail, className: 'bg-rose-500' },
                  { label: 'Blocked', value: fs.blocked, className: 'bg-amber-500' },
                  { label: 'Not Run', value: fs.notRun, className: 'bg-slate-200' },
                ]}
              />
              <span className="shrink-0 text-2xs tabular-nums text-slate-500">
                {fs.executed}/{fs.total} executed · {fs.executionPct}%
              </span>
            </div>
          </div>

          <div className="hidden shrink-0 items-center gap-1.5 sm:flex">
            <Badge size="sm" className="bg-emerald-50 text-emerald-700 ring-emerald-600/20">
              {fs.pass} pass
            </Badge>
            <Badge size="sm" className="bg-rose-50 text-rose-700 ring-rose-600/20">
              {fs.fail} fail
            </Badge>
            <Badge size="sm" className="bg-amber-50 text-amber-700 ring-amber-600/20">
              {fs.blocked} blocked
            </Badge>
            <Badge size="sm" className="bg-slate-100 text-slate-600 ring-slate-500/20">
              {fs.notRun} not run
            </Badge>
            <Button
              size="sm"
              variant="ghost"
              icon={Trash2}
              aria-label={`Remove ${feature.name}`}
              className="text-slate-400 hover:bg-rose-50 hover:text-rose-600"
              onClick={() => setRemoveTarget(feature.id)}
            />
          </div>
        </div>

        {open ? (
          <div className="border-t border-slate-200">
            {shown.length === 0 ? (
              <p className="px-4 py-6 text-center text-sm text-slate-500">
                {all.length === 0
                  ? 'This feature has no test cases yet.'
                  : 'No test cases in this feature match the current filters.'}
              </p>
            ) : (
              <ul className="divide-y divide-slate-100">
                {shown.map((tc) => (
                  <ProjectTestCaseRow
                    key={tc.id}
                    testCase={tc}
                    commentCount={commentCounts[tc.id] ?? 0}
                    onOpen={() => navigate(`/projects/${project.id}/test-cases/${tc.id}`)}
                    onEdit={() => navigate(`/projects/${project.id}/test-cases/${tc.id}?edit=1`)}
                    onPatch={(patch) => updateTestCase(project.id, tc.id, patch)}
                    onDelete={() => setDeleteCase(tc)}
                  />
                ))}
              </ul>
            )}
            <div className="flex flex-wrap items-center justify-between gap-2 border-t border-slate-200 bg-slate-50/60 px-4 py-2.5">
              <div className="flex flex-wrap gap-2">
                <Button
                  size="sm"
                  onClick={() =>
                    setBulk({
                      ids: shown.filter((tc) => tc.status === 'Not Run').map((tc) => tc.id),
                      status: 'Pass',
                      label: `mark as Pass in ${feature.name}`,
                    })
                  }
                  disabled={shown.every((tc) => tc.status !== 'Not Run')}
                >
                  Mark shown not-run as Pass
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  icon={RotateCcw}
                  onClick={() =>
                    setBulk({
                      ids: shown.map((tc) => tc.id),
                      status: 'Not Run',
                      label: `reset to Not Run in ${feature.name}`,
                    })
                  }
                  disabled={shown.every((tc) => tc.status === 'Not Run')}
                >
                  Reset shown
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                <Button
                  size="sm"
                  icon={Sparkles}
                  onClick={() => setAiTarget({ groupKey: groupInfo(feature).key, featureId: feature.id })}
                >
                  Knowledge &amp; AI
                </Button>
                <Button size="sm" variant="primary" icon={Plus} onClick={() => setCustomFor(feature.id)}>
                  Add test case
                </Button>
              </div>
            </div>
          </div>
        ) : null}
      </Card>
    )
  }

  return (
    <>
      <div className="mb-4">
        <Link
          to="/projects"
          className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-500 transition hover:text-slate-900"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          All projects
        </Link>
      </div>

      <PageHeader
        title={project.name}
        subtitle={project.description}
        action={
          <>
            <Button onClick={() => setVersionsOpen(true)}>Versions</Button>
            <Button icon={FileJson} onClick={() => setImportTarget({ moduleName: null })}>
              Import JSON
            </Button>
            <Button icon={Plus} onClick={() => setAddOpen(true)} disabled={availableCount === 0}>
              Add features
            </Button>
            <Button variant="primary" icon={BarChart3} onClick={() => navigate(`/reports/${project.id}`)}>
              View report
            </Button>
          </>
        }
      />

      <div className="mb-4 flex flex-wrap items-center gap-1.5">
        <Badge className="bg-brand-50 text-brand-700 ring-brand-600/20">{project.categoryName}</Badge>
        <Badge className="bg-slate-100 text-slate-600 ring-slate-500/20">
          <Layers className="h-3 w-3" />
          {project.features.length} features
        </Badge>
        <Badge className="bg-slate-100 text-slate-600 ring-slate-500/20">
          <FileCheck2 className="h-3 w-3" />
          {stats.total} test cases
        </Badge>
        <Badge className="bg-slate-100 text-slate-600 ring-slate-500/20">Created {formatDate(project.createdAt)}</Badge>
      </div>

      <div
        className={cn(
          'mb-4 flex flex-col gap-3 rounded-xl border px-5 py-4 sm:flex-row sm:items-center sm:justify-between',
          !gate.applicable
            ? 'border-slate-200 bg-white'
            : gate.passed
              ? 'border-emerald-200 bg-emerald-50/70'
              : 'border-amber-200 bg-amber-50/70',
        )}
      >
        <div className="flex items-start gap-3">
          <span
            className={cn(
              'flex h-9 w-9 shrink-0 items-center justify-center rounded-lg',
              !gate.applicable
                ? 'bg-slate-100 text-slate-500'
                : gate.passed
                  ? 'bg-emerald-100 text-emerald-700'
                  : 'bg-amber-100 text-amber-700',
            )}
          >
            <ShieldCheck style={{ width: 18, height: 18 }} />
          </span>
          <div className="min-w-0">
            <p
              className={cn(
                'text-sm font-semibold',
                !gate.applicable ? 'text-slate-900' : gate.passed ? 'text-emerald-900' : 'text-amber-900',
              )}
            >
              {!gate.applicable
                ? 'No release gate yet'
                : gate.passed
                  ? 'Release gate met — every mandatory test case has passed'
                  : `Release gate not met — ${gate.outstanding} mandatory ${
                      gate.outstanding === 1 ? 'test case has' : 'test cases have'
                    } not passed`}
            </p>
            <p
              className={cn(
                'mt-0.5 text-xs',
                !gate.applicable ? 'text-slate-500' : gate.passed ? 'text-emerald-800' : 'text-amber-800',
              )}
            >
              {!gate.applicable
                ? 'Add features to this project to import their mandatory common checks.'
                : `${gate.pass} of ${gate.total} mandatory test cases passed${
                    gate.outstanding > 0
                      ? ` · ${gate.fail} failed, ${gate.blocked} blocked, ${gate.notRun} not run`
                      : ''
                  }`}
            </p>
          </div>
        </div>
        <div className={cn('flex shrink-0 items-center gap-3', !gate.applicable && 'hidden')}>
          <div className="w-40">
            <ProgressBar
              value={gate.total === 0 ? 0 : Math.round((gate.pass / gate.total) * 100)}
              barClassName={gate.passed ? 'bg-emerald-500' : 'bg-amber-500'}
            />
          </div>
          {gate.outstanding > 0 ? (
            <Button
              size="sm"
              onClick={() => {
                setScope('mandatory')
                setStatus(ALL)
                setCollapsedGroups([])
                setOpenFeatures(project.features.map((f) => f.id))
              }}
            >
              Show outstanding
            </Button>
          ) : null}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-5">
        <Card className="col-span-2 p-4 lg:col-span-1">
          <p className="text-xs font-medium uppercase tracking-wide text-slate-500">Execution</p>
          <p className="mt-2 text-2xl font-semibold tracking-tight text-slate-900">{stats.executionPct}%</p>
          <ProgressBar value={stats.executionPct} className="mt-3" />
          <p className="mt-2 text-xs text-slate-500">
            {stats.executed} of {stats.total} executed
          </p>
        </Card>
        <StatCard label="Passed" value={stats.pass} icon={CheckCircle2} tone="positive" hint={`${stats.passPct}% pass rate`} />
        <StatCard label="Failed" value={stats.fail} icon={XCircle} tone="negative" hint="Needs triage" />
        <StatCard label="Blocked" value={stats.blocked} icon={CircleSlash} tone="warning" hint="Dependencies" />
        <StatCard label="Not run" value={stats.notRun} icon={FileCheck2} hint="Remaining scope" />
      </div>

      <Card className="mt-4 p-4">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
          <SearchInput
            value={query}
            onChange={setQuery}
            placeholder="Search test cases in this project…"
            className="flex-1"
          />
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:w-auto lg:grid-cols-4">
            <Select
              aria-label="Test case scope"
              value={scope}
              onChange={setScope}
              className="lg:w-40"
              options={[
                { value: ALL, label: 'All test cases' },
                { value: 'mandatory', label: 'Mandatory only' },
                { value: 'optional', label: 'Optional only' },
              ]}
            />
            <Select
              aria-label="Execution status"
              value={status}
              onChange={setStatus}
              className="lg:w-40"
              options={[
                { value: ALL, label: 'All statuses' },
                ...EXEC_STATUSES.map((s) => ({ value: s as string, label: s })),
              ]}
            />
            <Select
              aria-label="Priority"
              value={priority}
              onChange={setPriority}
              className="lg:w-40"
              options={[
                { value: ALL, label: 'All priorities' },
                ...PRIORITIES.map((p) => ({ value: p as string, label: p })),
              ]}
            />
            <Select
              aria-label="Test type"
              value={testType}
              onChange={setTestType}
              className="lg:w-40"
              options={[
                { value: ALL, label: 'All test types' },
                ...TEST_TYPES.map((t) => ({ value: t as string, label: t })),
              ]}
            />
          </div>
        </div>
        <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
          <p className="text-xs text-slate-500">
            <span className="font-medium text-slate-700">{visibleCases.length}</span> of {stats.total} test cases shown
          </p>
          <div className="flex items-center gap-2">
            {filtersActive ? (
              <Button size="sm" variant="ghost" icon={RotateCcw} onClick={resetFilters}>
                Reset filters
              </Button>
            ) : null}
            <Button
              size="sm"
              onClick={() => setOpenFeatures(openFeatures.length ? [] : project.features.map((f) => f.id))}
            >
              {openFeatures.length ? 'Collapse all' : 'Expand all'}
            </Button>
          </div>
        </div>
      </Card>

      {importNote ? (
        <div
          role="status"
          className="mt-4 flex items-center justify-between gap-3 rounded-lg bg-emerald-50 px-3 py-2 text-sm text-emerald-800"
        >
          <span>{importNote}</span>
          <button type="button" className="text-xs font-medium hover:underline" onClick={() => setImportNote(null)}>
            Dismiss
          </button>
        </div>
      ) : null}

      {project.features.length === 0 ? (
        <Card className="mt-4">
          <EmptyState
            icon={Layers}
            title="No features selected yet"
            description="Add features from the master library to import their test cases into this project."
            action={
              <div className="flex flex-wrap justify-center gap-2">
                <Button variant="primary" icon={Plus} onClick={() => setAddOpen(true)}>
                  Add features
                </Button>
                <Button icon={FileJson} onClick={() => setImportTarget({ moduleName: null })}>
                  Import JSON
                </Button>
              </div>
            }
          />
        </Card>
      ) : (
        <div className="mt-4 space-y-5">
          {featureGroups.map((group) => {
            const gs = computeStats(group.features.flatMap((f) => byFeature.get(f.id) ?? []))
            const collapsed = collapsedGroups.includes(group.key)
            const groupShown = group.features.reduce((n, f) => n + (visibleByFeature.get(f.id)?.length ?? 0), 0)

            return (
              <section key={group.key} className={cn(filtersActive && groupShown === 0 && 'opacity-60')}>
                <div className="mb-2 flex flex-wrap items-center gap-2">
                  <button
                    type="button"
                    onClick={() => toggleGroup(group.key)}
                    aria-expanded={!collapsed}
                    className="flex min-w-0 flex-1 flex-wrap items-center gap-x-3 gap-y-2 rounded-lg px-1 py-1.5 text-left transition hover:bg-slate-100/70"
                  >
                  <ChevronDown className={cn('h-4 w-4 shrink-0 text-slate-400 transition', collapsed && '-rotate-90')} />
                  <FolderOpen className="h-4 w-4 shrink-0 text-brand-600" />
                  <span className="text-sm font-semibold text-slate-800">{group.moduleName}</span>
                  {group.categoryName ? (
                    <Badge size="sm" className="bg-amber-50 text-amber-700 ring-amber-600/20">
                      {group.categoryName}
                    </Badge>
                  ) : null}
                  <Badge size="sm" className="bg-slate-100 text-slate-600 ring-slate-500/20">
                    {group.features.length} {group.features.length === 1 ? 'feature' : 'features'}
                  </Badge>
                  <span className="ml-auto flex items-center gap-3">
                    <StackedBar
                      className="hidden w-32 sm:flex"
                      segments={[
                        { label: 'Pass', value: gs.pass, className: 'bg-emerald-500' },
                        { label: 'Fail', value: gs.fail, className: 'bg-rose-500' },
                        { label: 'Blocked', value: gs.blocked, className: 'bg-amber-500' },
                        { label: 'Not Run', value: gs.notRun, className: 'bg-slate-200' },
                      ]}
                    />
                    <span className="text-2xs tabular-nums text-slate-500">
                      {gs.executed}/{gs.total} executed · {gs.executionPct}%
                    </span>
                  </span>
                  </button>
                  <div className="flex shrink-0 gap-1.5">
                    <Button size="sm" icon={FileJson} onClick={() => setImportTarget({ moduleName: group.moduleName })}>
                      Import JSON
                    </Button>
                    <Button size="sm" icon={Sparkles} onClick={() => setAiTarget({ groupKey: group.key })}>
                      Generate with AI
                    </Button>
                  </div>
                </div>
                {collapsed ? null : (
                  <div className="space-y-3 border-l-2 border-slate-200 pl-3 sm:ml-2 sm:pl-4">
                    {group.features.map(renderFeature)}
                  </div>
                )}
              </section>
            )
          })}

          {filtersActive && visibleCases.length === 0 ? (
            <Card>
              <EmptyState
                icon={SearchX}
                title="No test cases match these filters"
                description="Reset the filters to see the full project scope again."
                action={
                  <Button icon={RotateCcw} onClick={resetFilters}>
                    Reset filters
                  </Button>
                }
              />
            </Card>
          ) : null}
        </div>
      )}

      <ImportJsonDialog
        open={Boolean(importTarget)}
        onClose={() => setImportTarget(null)}
        moduleName={importTarget?.moduleName ?? null}
        existingFeatureNames={
          importTarget?.moduleName
            ? project.features.filter((f) => f.moduleName === importTarget.moduleName).map((f) => f.name)
            : []
        }
        onImport={(moduleName, drafts) => {
          const r = importFeatures(project.id, moduleName, drafts, 'import')
          setCollapsedGroups((prev) => prev.filter((k) => !k.endsWith(`::${moduleName}`)))
          setImportNote(
            `Imported into ${moduleName}: ${r.features} new ${r.features === 1 ? 'feature' : 'features'}` +
              `${r.mergedInto ? `, ${r.mergedInto} existing updated` : ''}, ${r.testCases} test cases.`,
          )
        }}
      />

      {aiGroup && aiTarget ? (
        <AiGenerateDialog
          key={`${aiTarget.groupKey}|${aiTarget.featureId ?? ''}`}
          project={project}
          moduleName={aiGroup.moduleName}
          features={aiGroup.features}
          initialFeatureId={aiTarget.featureId}
          onClose={() => setAiTarget(null)}
        />
      ) : null}

      {/* add features */}
      <ProjectVersionsDialog open={versionsOpen} onClose={() => setVersionsOpen(false)} project={project} />

      <Modal
        open={addOpen}
        onClose={() => {
          setAddOpen(false)
          setPendingFeatureIds([])
        }}
        width="max-w-3xl"
        title="Add features to this project"
        description={`${availableCount} ${project.categoryName} features are not yet in this project — and the All categories tab reaches every other category.`}
        footer={
          <>
            <Button
              onClick={() => {
                setAddOpen(false)
                setPendingFeatureIds([])
              }}
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              disabled={pendingFeatureIds.length === 0}
              onClick={() => {
                addFeaturesToProject(project.id, pendingFeatureIds)
                setAddOpen(false)
                setPendingFeatureIds([])
              }}
            >
              Add {pendingFeatureIds.length || ''} {pendingFeatureIds.length === 1 ? 'feature' : 'features'} &amp;
              import test cases
            </Button>
          </>
        }
      >
        <FeaturePicker
          scopeGroups={availableFeatures}
          scopeCategoryId={project.categoryId}
          scopeLabel={project.categoryName}
          selectedIds={pendingFeatureIds}
          onToggle={(id) =>
            setPendingFeatureIds((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]))
          }
          onToggleMany={(ids, on) =>
            setPendingFeatureIds((prev) => {
              if (on) return Array.from(new Set([...prev, ...ids]))
              const drop = new Set(ids)
              return prev.filter((id) => !drop.has(id))
            })
          }
          excludeIds={takenFeatureIds}
          listClassName="max-h-[50vh] overflow-y-auto pr-1"
        />
      </Modal>

      {/* remove feature */}
      <Modal
        open={Boolean(removeTarget)}
        onClose={() => setRemoveTarget(null)}
        title="Remove this feature?"
        footer={
          <>
            <Button onClick={() => setRemoveTarget(null)}>Cancel</Button>
            <Button
              variant="danger"
              onClick={() => {
                if (removeTarget) removeFeature(project.id, removeTarget)
                setRemoveTarget(null)
              }}
            >
              Remove feature
            </Button>
          </>
        }
      >
        <p className="text-sm text-slate-600">
          Removing{' '}
          <span className="font-medium text-slate-900">
            {project.features.find((f) => f.id === removeTarget)?.name}
          </span>{' '}
          also deletes its{' '}
          <span className="font-medium text-slate-900">
            {(byFeature.get(removeTarget ?? '') ?? []).length} project test cases
          </span>{' '}
          and their execution results. The master library is unaffected.
        </p>
      </Modal>

      {/* bulk status change */}
      <Modal
        open={Boolean(bulk)}
        onClose={() => setBulk(null)}
        title={`Change ${bulk?.ids.length ?? 0} test ${bulk?.ids.length === 1 ? 'case' : 'cases'}?`}
        footer={
          <>
            <Button onClick={() => setBulk(null)}>Cancel</Button>
            <Button
              variant="primary"
              onClick={() => {
                if (bulk) bulkSetStatus(project.id, bulk.ids, bulk.status)
                setBulk(null)
              }}
            >
              Apply to {bulk?.ids.length ?? 0}
            </Button>
          </>
        }
      >
        <p className="text-sm text-slate-600">
          This will {bulk?.label} in one step. Existing actual results and notes are kept, but the execution
          status and timestamp of each case are overwritten, and this cannot be undone.
        </p>
      </Modal>

      {/* delete a test case */}
      <Modal
        open={Boolean(deleteCase)}
        onClose={() => setDeleteCase(null)}
        title="Delete this test case?"
        footer={
          <>
            <Button onClick={() => setDeleteCase(null)}>Cancel</Button>
            <Button
              variant="danger"
              onClick={() => {
                if (deleteCase) {
                  deleteTestCase(project.id, deleteCase.id)
                }
                setDeleteCase(null)
              }}
            >
              Delete test case
            </Button>
          </>
        }
      >
        <p className="text-sm text-slate-600">
          <span className="font-medium text-slate-900">{deleteCase?.title}</span> will be removed from this project
          along with its execution result, and the project totals will be recalculated.
        </p>
        <p className="mt-3 rounded-lg bg-slate-50 px-3 py-2 text-xs text-slate-500">
          {deleteCase?.isCustom
            ? 'This is a custom test case, so it only exists in this project.'
            : `This only removes the project copy (${deleteCase?.masterTestCaseId}). The master library keeps the original, and re-adding the feature to another project imports it again.`}
        </p>
      </Modal>

      {/* custom test case */}
      <Modal
        open={Boolean(customFor)}
        onClose={() => setCustomFor(null)}
        width="max-w-2xl"
        title="Add a test case"
        description={`Added to ${project.features.find((f) => f.id === customFor)?.name ?? 'this feature'} in this project only.`}
        footer={
          <>
            <Button onClick={() => setCustomFor(null)}>Cancel</Button>
            <Button variant="primary" disabled={!custom.title.trim()} onClick={submitCustom}>
              Add test case
            </Button>
          </>
        }
      >
        <div className="space-y-4">
          <label className="flex cursor-pointer items-start gap-3 rounded-lg border border-slate-200 bg-slate-50/60 px-3 py-2.5">
            <input
              type="checkbox"
              checked={custom.isMandatory}
              onChange={(e) => setCustom({ ...custom, isMandatory: e.target.checked })}
              className="mt-0.5 h-4 w-4 shrink-0 cursor-pointer rounded border-slate-300 text-brand-600 focus:ring-brand-500"
            />
            <span className="min-w-0">
              <span className="block text-sm font-medium text-slate-900">Mandatory test case</span>
              <span className="block text-xs text-slate-500">
                Counts towards this project's release gate and must pass before sign-off.
              </span>
            </span>
          </label>

          <Field label="Title" required>
            <input
              className="input-base"
              value={custom.title}
              onChange={(e) => setCustom({ ...custom, title: e.target.value })}
              placeholder="What the test verifies"
            />
          </Field>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Field label="Test type">
              <Select
                value={custom.testType}
                onChange={(v) => setCustom({ ...custom, testType: v as TestType })}
                options={TEST_TYPES.map((t) => ({ value: t, label: t }))}
              />
            </Field>
            <Field label="Priority">
              <Select
                value={custom.priority}
                onChange={(v) => setCustom({ ...custom, priority: v as Priority })}
                options={PRIORITIES.map((p) => ({ value: p, label: p }))}
              />
            </Field>
          </div>
          <Field label="Description">
            <textarea
              className="input-base min-h-[64px] resize-y"
              value={custom.description}
              onChange={(e) => setCustom({ ...custom, description: e.target.value })}
            />
          </Field>
          <Field label="Preconditions">
            <textarea
              className="input-base min-h-[64px] resize-y"
              value={custom.preconditions}
              onChange={(e) => setCustom({ ...custom, preconditions: e.target.value })}
            />
          </Field>
          <Field label="Test steps" hint="One step per line.">
            <textarea
              className="input-base min-h-[96px] resize-y font-mono text-xs"
              value={custom.steps}
              onChange={(e) => setCustom({ ...custom, steps: e.target.value })}
              placeholder={'Open the screen.\nEnter the data.\nSubmit the form.'}
            />
          </Field>
          <Field label="Expected result">
            <textarea
              className="input-base min-h-[64px] resize-y"
              value={custom.expectedResult}
              onChange={(e) => setCustom({ ...custom, expectedResult: e.target.value })}
            />
          </Field>
        </div>
      </Modal>
    </>
  )
}

export function ProjectDetail() {
  const { projectId = '' } = useParams()
  const navigate = useNavigate()
  const { getProject } = useStore()
  const project = getProject(projectId)

  if (!project) {
    return (
      <Card>
        <EmptyState
          icon={FolderKanban}
          title="Project not found"
          description="It may have been deleted, or the link points at a project from a different browser."
          action={
            <Button icon={ArrowLeft} onClick={() => navigate('/projects')}>
              Back to projects
            </Button>
          }
        />
      </Card>
    )
  }

  // Remount on project change so per-project UI state (filters, open rows) does not leak across.
  return <ProjectWorkspace key={project.id} project={project} />
}
