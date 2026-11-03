import { useMemo } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft, BarChart3, Download, FolderKanban, ShieldCheck } from 'lucide-react'
import {
  Badge,
  Button,
  Card,
  CardHeader,
  EmptyState,
  PageHeader,
  ProgressBar,
  Select,
  StackedBar,
} from '../components/ui'
import { CHART_COLORS, DonutChart, DonutLegend } from '../components/DonutChart'
import { useStore } from '../store/StoreContext'
import { cn, computeGate, computeStats, formatDate } from '../lib/utils'
import { EXEC_STATUSES, PRIORITIES, TEST_TYPES, type ExecStats, type Project } from '../types'

function statSegments(s: ExecStats) {
  return [
    { label: 'Passed', value: s.pass, color: CHART_COLORS.pass },
    { label: 'Failed', value: s.fail, color: CHART_COLORS.fail },
    { label: 'Blocked', value: s.blocked, color: CHART_COLORS.blocked },
    { label: 'Not Run', value: s.notRun, color: CHART_COLORS.notRun },
  ]
}

function barSegments(s: ExecStats) {
  return [
    { label: 'Pass', value: s.pass, className: 'bg-emerald-500' },
    { label: 'Fail', value: s.fail, className: 'bg-rose-500' },
    { label: 'Blocked', value: s.blocked, className: 'bg-amber-500' },
    { label: 'Not Run', value: s.notRun, className: 'bg-slate-200' },
  ]
}

function MetricTile({
  label,
  value,
  tone = 'text-slate-900',
  hint,
}: {
  label: string
  value: string | number
  tone?: string
  hint?: string
}) {
  return (
    <div className="rounded-lg border border-slate-200 px-4 py-3">
      <p className="text-2xs font-semibold uppercase tracking-wider text-slate-500">{label}</p>
      <p className={`mt-1.5 text-2xl font-semibold tracking-tight tabular-nums ${tone}`}>{value}</p>
      {hint ? <p className="mt-0.5 text-2xs text-slate-500">{hint}</p> : null}
    </div>
  )
}

function downloadCsv(project: Project) {
  const header = [
    'Test Case ID',
    'Feature',
    'Module',
    'Title',
    'Test Type',
    'Priority',
    'Status',
    'Actual Result',
    'Notes',
    'Executed At',
  ]
  const escape = (v: string) => `"${v.replace(/"/g, '""').replace(/\r?\n/g, ' ')}"`
  const featureName = (id: string) => project.features.find((f) => f.id === id)
  const rows = project.testCases.map((tc) => {
    const f = featureName(tc.projectFeatureId)
    return [
      tc.masterTestCaseId ?? 'CUSTOM',
      f?.name ?? '',
      f?.moduleName ?? '',
      tc.title,
      tc.testType,
      tc.priority,
      tc.status,
      tc.actualResult,
      tc.notes,
      tc.executedAt ?? '',
    ]
      .map((v) => escape(String(v)))
      .join(',')
  })
  const csv = [header.map(escape).join(','), ...rows].join('\r\n')
  const blob = new Blob([`﻿${csv}`], { type: 'text/csv;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `${project.name.replace(/[^a-z0-9]+/gi, '-').toLowerCase()}-test-report.csv`
  document.body.appendChild(a)
  a.click()
  a.remove()
  URL.revokeObjectURL(url)
}

function ProjectReport({ project }: { project: Project }) {
  const navigate = useNavigate()
  const { projects } = useStore()
  const stats = computeStats(project.testCases)
  const gate = computeGate(project.testCases)

  const perFeature = useMemo(
    () =>
      project.features
        .map((f) => ({
          feature: f,
          stats: computeStats(project.testCases.filter((tc) => tc.projectFeatureId === f.id)),
        }))
        .sort((a, b) => b.stats.total - a.stats.total),
    [project],
  )

  const byPriority = useMemo(
    () =>
      PRIORITIES.map((p) => ({
        key: p,
        stats: computeStats(project.testCases.filter((tc) => tc.priority === p)),
      })).filter((r) => r.stats.total > 0),
    [project],
  )

  const byType = useMemo(
    () =>
      TEST_TYPES.map((t) => ({
        key: t,
        stats: computeStats(project.testCases.filter((tc) => tc.testType === t)),
      })).filter((r) => r.stats.total > 0),
    [project],
  )

  const failing = useMemo(
    () => project.testCases.filter((tc) => tc.status === 'Fail' || tc.status === 'Blocked'),
    [project],
  )

  return (
    <>
      <div className="mb-4 flex items-center justify-between gap-3">
        <Link
          to="/reports"
          className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-500 transition hover:text-slate-900"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          All reports
        </Link>
        {projects.length > 1 ? (
          <Select
            aria-label="Switch project"
            value={project.id}
            onChange={(v) => navigate(`/reports/${v}`)}
            className="w-56"
            options={projects.map((p) => ({ value: p.id, label: p.name }))}
          />
        ) : null}
      </div>

      <PageHeader
        title={`${project.name} — test report`}
        subtitle={`${project.categoryName} · ${project.features.length} features · created ${formatDate(
          project.createdAt,
        )}. All figures are calculated from the current execution statuses.`}
        action={
          <>
            <Button icon={Download} onClick={() => downloadCsv(project)}>
              Export CSV
            </Button>
            <Button variant="primary" onClick={() => navigate(`/projects/${project.id}`)}>
              Open project
            </Button>
          </>
        }
      />

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4 xl:grid-cols-7">
        <MetricTile label="Total" value={stats.total} />
        <MetricTile label="Passed" value={stats.pass} tone="text-emerald-600" />
        <MetricTile label="Failed" value={stats.fail} tone="text-rose-600" />
        <MetricTile label="Blocked" value={stats.blocked} tone="text-amber-600" />
        <MetricTile label="Not run" value={stats.notRun} tone="text-slate-600" />
        <MetricTile
          label="Execution"
          value={`${stats.executionPct}%`}
          tone="text-brand-700"
          hint={`${stats.executed}/${stats.total} run`}
        />
        <MetricTile
          label="Pass rate"
          value={`${stats.passPct}%`}
          tone="text-emerald-700"
          hint="of executed cases"
        />
      </div>

      <Card
        className={cn(
          'mt-4 border-l-4 p-5',
          !gate.applicable ? 'border-l-slate-300' : gate.passed ? 'border-l-emerald-500' : 'border-l-amber-500',
        )}
      >
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-3">
            <span
              className={cn(
                'flex h-9 w-9 shrink-0 items-center justify-center rounded-lg',
                !gate.applicable
                  ? 'bg-slate-100 text-slate-500'
                  : gate.passed
                    ? 'bg-emerald-50 text-emerald-600'
                    : 'bg-amber-50 text-amber-600',
              )}
            >
              <ShieldCheck style={{ width: 18, height: 18 }} />
            </span>
            <div>
              <h2 className="text-sm font-semibold text-slate-900">Mandatory test case gate</h2>
              <p className="mt-0.5 text-xs text-slate-500">
                Common checks every feature must pass before this project can be signed off.
              </p>
            </div>
          </div>
          <Badge
            className={
              !gate.applicable
                ? 'bg-slate-100 text-slate-600 ring-slate-500/20'
                : gate.passed
                  ? 'bg-emerald-50 text-emerald-700 ring-emerald-600/20'
                  : 'bg-amber-50 text-amber-700 ring-amber-600/20'
            }
          >
            {!gate.applicable ? 'No gate yet' : gate.passed ? 'Gate met' : `${gate.outstanding} outstanding`}
          </Badge>
        </div>
        <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-5">
          <MetricTile label="Mandatory" value={gate.total} />
          <MetricTile label="Passed" value={gate.pass} tone="text-emerald-600" />
          <MetricTile label="Failed" value={gate.fail} tone="text-rose-600" />
          <MetricTile label="Blocked" value={gate.blocked} tone="text-amber-600" />
          <MetricTile label="Not run" value={gate.notRun} tone="text-slate-600" />
        </div>
      </Card>

      <div className="mt-4 grid grid-cols-1 gap-4 xl:grid-cols-3">
        <Card className="self-start">
          <CardHeader title="Status distribution" subtitle="Every test case in this project" />
          <div className="flex flex-col items-center gap-6 px-5 py-6 sm:flex-row">
            <DonutChart segments={statSegments(stats)} centerValue={`${stats.executionPct}%`} centerLabel="Executed" />
            <DonutLegend segments={statSegments(stats)} total={stats.total} />
          </div>
        </Card>

        <Card className="xl:col-span-2">
          <CardHeader title="Feature-wise execution progress" subtitle="Ordered by test case volume" />
          <div className="overflow-x-auto">
            <table className="w-full min-w-[46rem] border-collapse">
              <thead>
                <tr className="table-head">
                  <th className="px-5 py-2.5">Feature</th>
                  <th className="px-3 py-2.5 text-right">Total</th>
                  <th className="px-3 py-2.5 text-right">Pass</th>
                  <th className="px-3 py-2.5 text-right">Fail</th>
                  <th className="px-3 py-2.5 text-right">Blocked</th>
                  <th className="px-3 py-2.5 text-right">Not run</th>
                  <th className="px-3 py-2.5 text-right">Mandatory</th>
                  <th className="w-48 px-5 py-2.5">Progress</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {perFeature.map(({ feature, stats: s }) => (
                  <tr key={feature.id} className="transition hover:bg-slate-50">
                    <td className="px-5 py-3">
                      <span className="block text-sm font-medium text-slate-900">{feature.name}</span>
                      <span className="block text-2xs text-slate-500">{feature.moduleName}</span>
                    </td>
                    <td className="px-3 py-3 text-right text-sm tabular-nums text-slate-700">{s.total}</td>
                    <td className="px-3 py-3 text-right text-sm tabular-nums text-emerald-600">{s.pass}</td>
                    <td className="px-3 py-3 text-right text-sm tabular-nums text-rose-600">{s.fail}</td>
                    <td className="px-3 py-3 text-right text-sm tabular-nums text-amber-600">{s.blocked}</td>
                    <td className="px-3 py-3 text-right text-sm tabular-nums text-slate-500">{s.notRun}</td>
                    <td className="px-3 py-3 text-right text-sm tabular-nums">
                      {(() => {
                        const g = computeGate(project.testCases.filter((tc) => tc.projectFeatureId === feature.id))
                        return (
                          <span className={g.passed ? 'text-emerald-600' : 'text-amber-600'}>
                            {g.pass}/{g.total}
                          </span>
                        )
                      })()}
                    </td>
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-2">
                        <StackedBar className="flex-1" segments={barSegments(s)} />
                        <span className="w-9 shrink-0 text-right text-2xs tabular-nums text-slate-500">
                          {s.executionPct}%
                        </span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader title="Execution by priority" subtitle="Where the remaining risk sits" />
          <ul className="divide-y divide-slate-100">
            {byPriority.map(({ key, stats: s }) => (
              <li key={key} className="px-5 py-3">
                <div className="flex items-center justify-between gap-3 text-sm">
                  <span className="font-medium text-slate-700">{key}</span>
                  <span className="text-xs tabular-nums text-slate-500">
                    {s.executed}/{s.total} executed · {s.passPct}% pass
                  </span>
                </div>
                <StackedBar className="mt-2" segments={barSegments(s)} />
              </li>
            ))}
          </ul>
        </Card>

        <Card>
          <CardHeader title="Execution by test type" subtitle="Coverage across scenario types" />
          <ul className="divide-y divide-slate-100">
            {byType.map(({ key, stats: s }) => (
              <li key={key} className="px-5 py-3">
                <div className="flex items-center justify-between gap-3 text-sm">
                  <span className="font-medium text-slate-700">{key}</span>
                  <span className="text-xs tabular-nums text-slate-500">
                    {s.executed}/{s.total} executed · {s.passPct}% pass
                  </span>
                </div>
                <StackedBar className="mt-2" segments={barSegments(s)} />
              </li>
            ))}
          </ul>
        </Card>
      </div>

      <Card className="mt-4">
        <CardHeader
          title="Failed and blocked test cases"
          subtitle={`${failing.length} ${failing.length === 1 ? 'case' : 'cases'} need attention`}
          action={
            <Button size="sm" onClick={() => navigate(`/projects/${project.id}`)}>
              Go to execution
            </Button>
          }
        />
        {failing.length === 0 ? (
          <EmptyState
            icon={BarChart3}
            title="Nothing failed or blocked"
            description="Every executed test case in this project has passed."
          />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[48rem] border-collapse">
              <thead>
                <tr className="table-head">
                  <th className="px-5 py-2.5">Test case</th>
                  <th className="px-3 py-2.5">Feature</th>
                  <th className="px-3 py-2.5">Status</th>
                  <th className="px-3 py-2.5">Priority</th>
                  <th className="px-5 py-2.5">Notes</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {failing.map((tc) => {
                  const feature = project.features.find((f) => f.id === tc.projectFeatureId)
                  return (
                    <tr key={tc.id} className="align-top transition hover:bg-slate-50">
                      <td className="px-5 py-3">
                        <span className="block text-sm font-medium text-slate-900">{tc.title}</span>
                        <span className="block font-mono text-2xs text-slate-400">
                          {tc.masterTestCaseId ?? 'CUSTOM'}
                        </span>
                      </td>
                      <td className="px-3 py-3 text-xs text-slate-600">{feature?.name}</td>
                      <td className="px-3 py-3">
                        <Badge
                          size="sm"
                          className={
                            tc.status === 'Fail'
                              ? 'bg-rose-50 text-rose-700 ring-rose-600/20'
                              : 'bg-amber-50 text-amber-700 ring-amber-600/20'
                          }
                        >
                          {tc.status}
                        </Badge>
                      </td>
                      <td className="px-3 py-3 text-xs text-slate-600">{tc.priority}</td>
                      <td className="max-w-sm px-5 py-3 text-xs leading-relaxed text-slate-600">
                        {tc.notes || tc.actualResult || '—'}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </>
  )
}

function ReportsOverview() {
  const { projects } = useStore()
  const navigate = useNavigate()
  const overall = useMemo(() => computeStats(projects.flatMap((p) => p.testCases)), [projects])

  if (projects.length === 0) {
    return (
      <>
        <PageHeader title="Reports" subtitle="Testing reports are generated from live execution data." />
        <Card>
          <EmptyState
            icon={FolderKanban}
            title="No projects to report on"
            description="Create a project and execute some test cases to see reports here."
            action={
              <Button variant="primary" onClick={() => navigate('/projects/new')}>
                Create Project
              </Button>
            }
          />
        </Card>
      </>
    )
  }

  return (
    <>
      <PageHeader
        title="Reports"
        subtitle="Pick a project for its full test report, or review the workspace roll-up below."
      />

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-3">
        <Card className="self-start">
          <CardHeader title="Workspace roll-up" subtitle="Every project combined" />
          <div className="flex flex-col items-center gap-6 px-5 py-6 sm:flex-row">
            <DonutChart
              segments={statSegments(overall)}
              centerValue={`${overall.executionPct}%`}
              centerLabel="Executed"
            />
            <DonutLegend segments={statSegments(overall)} total={overall.total} />
          </div>
          <div className="grid grid-cols-2 gap-px border-t border-slate-200 bg-slate-200">
            <div className="bg-white px-5 py-3">
              <p className="text-2xs uppercase tracking-wide text-slate-500">Total test cases</p>
              <p className="mt-0.5 text-lg font-semibold tabular-nums text-slate-900">{overall.total}</p>
            </div>
            <div className="bg-white px-5 py-3">
              <p className="text-2xs uppercase tracking-wide text-slate-500">Pass rate</p>
              <p className="mt-0.5 text-lg font-semibold tabular-nums text-emerald-600">{overall.passPct}%</p>
            </div>
          </div>
        </Card>

        <Card className="xl:col-span-2">
          <CardHeader title="Project reports" subtitle="Calculated from current execution statuses" />
          <div className="overflow-x-auto">
            <table className="w-full min-w-[44rem] border-collapse">
              <thead>
                <tr className="table-head">
                  <th className="px-5 py-2.5">Project</th>
                  <th className="px-3 py-2.5 text-right">Cases</th>
                  <th className="px-3 py-2.5 text-right">Executed</th>
                  <th className="px-3 py-2.5 text-right">Pass rate</th>
                  <th className="w-40 px-3 py-2.5">Progress</th>
                  <th className="px-5 py-2.5" />
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {projects.map((p) => {
                  const s = computeStats(p.testCases)
                  return (
                    <tr key={p.id} className="transition hover:bg-slate-50">
                      <td className="px-5 py-3">
                        <Link
                          to={`/reports/${p.id}`}
                          className="block text-sm font-medium text-slate-900 hover:text-brand-700"
                        >
                          {p.name}
                        </Link>
                        <span className="block text-2xs text-slate-500">{p.categoryName}</span>
                      </td>
                      <td className="px-3 py-3 text-right text-sm tabular-nums text-slate-700">{s.total}</td>
                      <td className="px-3 py-3 text-right text-sm tabular-nums text-slate-700">
                        {s.executionPct}%
                      </td>
                      <td className="px-3 py-3 text-right text-sm tabular-nums text-emerald-600">{s.passPct}%</td>
                      <td className="px-3 py-3">
                        <ProgressBar value={s.executionPct} />
                      </td>
                      <td className="px-5 py-3 text-right">
                        <Button size="sm" onClick={() => navigate(`/reports/${p.id}`)}>
                          Report
                        </Button>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </Card>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {EXEC_STATUSES.map((s) => {
          const value =
            s === 'Pass'
              ? overall.pass
              : s === 'Fail'
                ? overall.fail
                : s === 'Blocked'
                  ? overall.blocked
                  : overall.notRun
          const tone =
            s === 'Pass'
              ? 'text-emerald-600'
              : s === 'Fail'
                ? 'text-rose-600'
                : s === 'Blocked'
                  ? 'text-amber-600'
                  : 'text-slate-600'
          return <MetricTile key={s} label={s} value={value} tone={tone} hint="across all projects" />
        })}
      </div>
    </>
  )
}

export function Reports() {
  const { projectId } = useParams()
  const { getProject } = useStore()
  const navigate = useNavigate()

  if (!projectId) return <ReportsOverview />

  const project = getProject(projectId)
  if (!project) {
    return (
      <Card>
        <EmptyState
          icon={FolderKanban}
          title="Report not available"
          description="That project no longer exists in this browser."
          action={
            <Button icon={ArrowLeft} onClick={() => navigate('/reports')}>
              Back to reports
            </Button>
          }
        />
      </Card>
    )
  }
  return <ProjectReport project={project} />
}
