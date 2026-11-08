import { useMemo } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  ArrowRight,
  BarChart3,
  CheckCircle2,
  FileCheck2,
  FolderKanban,
  Layers,
  Plus,
  ShieldCheck,
  TrendingUp,
  XCircle,
} from 'lucide-react'
import {
  Badge,
  Button,
  Card,
  CardHeader,
  EmptyState,
  PageHeader,
  ProgressBar,
  StackedBar,
  StatCard,
} from '../components/ui'
import { CHART_COLORS, DonutChart, DonutLegend } from '../components/DonutChart'
import { useStore } from '../store/StoreContext'
import { useMasterLibrary } from '../store/MasterLibraryContext'
import { computeGate, computeStats, relativeDate } from '../lib/utils'

export function Dashboard() {
  const { projects } = useStore()
  const { stats: masterStats, categories: MASTER_CATEGORIES } = useMasterLibrary()
  const navigate = useNavigate()

  const allCases = useMemo(() => projects.flatMap((p) => p.testCases), [projects])
  const stats = useMemo(() => computeStats(allCases), [allCases])
  const gate = useMemo(() => computeGate(allCases), [allCases])

  const perProject = useMemo(
    () =>
      projects
        .map((p) => ({ project: p, stats: computeStats(p.testCases) }))
        .sort((a, b) => b.stats.executionPct - a.stats.executionPct),
    [projects],
  )

  const recent = useMemo(
    () => [...projects].sort((a, b) => b.updatedAt.localeCompare(a.updatedAt)).slice(0, 4),
    [projects],
  )

  const coverage = useMemo(() => {
    const used = new Map<string, Set<string>>()
    for (const p of projects) {
      for (const f of p.features) {
        if (!f.masterFeatureId) continue
        const set = used.get(p.categoryId) ?? new Set<string>()
        set.add(f.masterFeatureId)
        used.set(p.categoryId, set)
      }
    }
    return MASTER_CATEGORIES.map((c) => {
      const total = c.modules.reduce((n, m) => n + m.features.length, 0)
      const selected = used.get(c.id)?.size ?? 0
      return { category: c, total, selected, pct: total === 0 ? 0 : Math.round((selected / total) * 100) }
    })
      .sort((a, b) => b.selected - a.selected || a.category.priority - b.category.priority)
      .slice(0, 8)
  }, [projects])

  const donut = [
    { label: 'Passed', value: stats.pass, color: CHART_COLORS.pass },
    { label: 'Failed', value: stats.fail, color: CHART_COLORS.fail },
    { label: 'Blocked', value: stats.blocked, color: CHART_COLORS.blocked },
    { label: 'Not Run', value: stats.notRun, color: CHART_COLORS.notRun },
  ]

  return (
    <>
      <PageHeader
        title="Dashboard"
        subtitle="Live testing position across every project in this workspace."
        action={
          <Button variant="primary" icon={Plus} onClick={() => navigate('/projects/new')}>
            Create Project
          </Button>
        }
      />

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard label="Projects" value={projects.length} icon={FolderKanban} tone="brand" hint="Active QA cycles" />
        <StatCard
          label="Master Features"
          value={masterStats.features}
          icon={Layers}
          hint={`Across ${masterStats.categories} categories`}
        />
        <StatCard
          label="Test Cases"
          value={stats.total}
          icon={FileCheck2}
          hint={`${masterStats.testCases} in master library`}
        />
        <StatCard
          label="Executed"
          value={stats.executed}
          icon={TrendingUp}
          hint={`${stats.notRun} still not run`}
        />
        <StatCard label="Passed" value={stats.pass} icon={CheckCircle2} tone="positive" hint={`${stats.passPct}% pass rate`} />
        <StatCard label="Failed" value={stats.fail} icon={XCircle} tone="negative" hint="Defects to triage" />
        <StatCard
          label="Mandatory passed"
          value={`${gate.pass}/${gate.total}`}
          icon={ShieldCheck}
          tone={gate.passed ? 'positive' : 'warning'}
          hint={gate.outstanding === 0 ? 'All release gates met' : `${gate.outstanding} outstanding`}
        />
        <Card className="p-4">
          <p className="truncate text-xs font-medium text-slate-500">Overall execution</p>
          <div className="mt-2 flex items-end justify-between gap-2">
            <p className="text-2xl font-semibold tracking-tight text-slate-900">{stats.executionPct}%</p>
            <Badge className="bg-brand-50 text-brand-700 ring-brand-600/20">
              {stats.executed}/{stats.total}
            </Badge>
          </div>
          <ProgressBar value={stats.executionPct} className="mt-3" />
          <p className="mt-2 text-xs text-slate-500">{stats.passPct}% of executed cases passed</p>
        </Card>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 xl:grid-cols-3">
        <Card className="xl:col-span-2">
          <CardHeader
            title="Testing progress by project"
            subtitle="Pass, fail, blocked and not-run split per project"
            action={
              <Link to="/reports" className="text-xs font-medium text-brand-600 hover:text-brand-700">
                Full reports
              </Link>
            }
          />
          {perProject.length === 0 ? (
            <EmptyState
              icon={FolderKanban}
              title="No projects yet"
              description="Create your first project to import master test cases and start tracking execution."
              action={
                <Button variant="primary" icon={Plus} onClick={() => navigate('/projects/new')}>
                  Create Project
                </Button>
              }
            />
          ) : (
            <ul className="divide-y divide-slate-100">
              {perProject.map(({ project, stats: s }) => (
                <li key={project.id} className="px-5 py-4">
                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0">
                      <Link
                        to={`/projects/${project.id}`}
                        className="truncate text-sm font-medium text-slate-900 hover:text-brand-700"
                      >
                        {project.name}
                      </Link>
                      <p className="mt-0.5 truncate text-xs text-slate-500">
                        {project.categoryName} · {project.features.length} features · {s.total} test cases
                      </p>
                    </div>
                    <div className="shrink-0 text-right">
                      <p className="text-sm font-semibold tabular-nums text-slate-900">{s.executionPct}%</p>
                      <p className="text-2xs text-slate-500">executed</p>
                    </div>
                  </div>
                  <StackedBar
                    className="mt-3"
                    segments={[
                      { label: 'Pass', value: s.pass, className: 'bg-emerald-500' },
                      { label: 'Fail', value: s.fail, className: 'bg-rose-500' },
                      { label: 'Blocked', value: s.blocked, className: 'bg-amber-500' },
                      { label: 'Not Run', value: s.notRun, className: 'bg-slate-200' },
                    ]}
                  />
                  <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-2xs text-slate-500">
                    <span>
                      <span className="font-semibold text-emerald-600">{s.pass}</span> passed
                    </span>
                    <span>
                      <span className="font-semibold text-rose-600">{s.fail}</span> failed
                    </span>
                    <span>
                      <span className="font-semibold text-amber-600">{s.blocked}</span> blocked
                    </span>
                    <span>
                      <span className="font-semibold text-slate-600">{s.notRun}</span> not run
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </Card>

        <Card className="self-start">
          <CardHeader title="Execution breakdown" subtitle="All projects combined" />
          <div className="flex flex-col items-center gap-6 px-5 py-6 sm:flex-row lg:flex-col [&>ul]:w-full">
            <DonutChart
              segments={donut}
              centerValue={`${stats.executionPct}%`}
              centerLabel="Executed"
            />
            <DonutLegend segments={donut} total={stats.total} />
          </div>
          <div className="border-t border-slate-200 px-5 py-4">
            <Button
              variant="secondary"
              icon={BarChart3}
              className="w-full"
              onClick={() => navigate('/reports')}
            >
              Open reports
            </Button>
          </div>
        </Card>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 xl:grid-cols-3">
        <Card className="xl:col-span-2">
          <CardHeader
            title="Recent projects"
            subtitle="Most recently updated"
            action={
              <Link to="/projects" className="text-xs font-medium text-brand-600 hover:text-brand-700">
                View all
              </Link>
            }
          />
          {recent.length === 0 ? (
            <EmptyState icon={FolderKanban} title="Nothing here yet" description="Projects you create will appear here." />
          ) : (
            <div className="grid grid-cols-1 gap-3 p-4 sm:grid-cols-2">
              {recent.map((p) => {
                const s = computeStats(p.testCases)
                return (
                  <Link
                    key={p.id}
                    to={`/projects/${p.id}`}
                    className="card-interactive group rounded-xl border border-slate-200 bg-white p-4 hover:border-brand-300"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <p className="truncate text-sm font-medium text-slate-900">{p.name}</p>
                        <p className="mt-0.5 truncate text-xs text-slate-500">{p.categoryName}</p>
                      </div>
                      <ArrowRight className="mt-0.5 h-4 w-4 shrink-0 text-slate-300 transition group-hover:text-brand-500" />
                    </div>
                    <p className="mt-3 line-clamp-2 text-xs leading-relaxed text-slate-500">{p.description}</p>
                    <ProgressBar value={s.executionPct} className="mt-3" />
                    <div className="mt-2 flex items-center justify-between text-2xs text-slate-500">
                      <span>
                        {s.executed}/{s.total} executed
                      </span>
                      <span>updated {relativeDate(p.updatedAt)}</span>
                    </div>
                  </Link>
                )
              })}
            </div>
          )}
        </Card>

        <Card>
          <CardHeader
            title="Feature coverage"
            subtitle="Master features selected into projects"
            action={
              <Link to="/features" className="text-xs font-medium text-brand-600 hover:text-brand-700">
                Library
              </Link>
            }
          />
          <ul className="divide-y divide-slate-100">
            {coverage.map(({ category, total, selected, pct }) => (
              <li key={category.id} className="px-5 py-3">
                <div className="flex items-center justify-between gap-3 text-sm">
                  <span className="min-w-0 truncate text-slate-700">{category.name}</span>
                  <span className="shrink-0 text-xs tabular-nums text-slate-500">
                    {selected}/{total}
                  </span>
                </div>
                <ProgressBar
                  value={pct}
                  className="mt-2"
                  barClassName={selected === 0 ? 'bg-slate-300' : 'bg-brand-500'}
                />
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </>
  )
}
