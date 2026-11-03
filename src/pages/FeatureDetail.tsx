import { useMemo, useState, type ReactNode } from 'react'
import { Link, useNavigate, useParams, useSearchParams } from 'react-router-dom'
import {
  ArrowLeft,
  ChevronDown,
  FileCheck2,
  Layers,
  Pencil,
  Plus,
  RotateCcw,
  SearchX,
  ShieldCheck,
  Trash2,
  Waypoints,
} from 'lucide-react'
import {
  Badge,
  Button,
  Card,
  EmptyState,
  Field,
  MandatoryBadge,
  Modal,
  PageHeader,
  PriorityBadge,
  ProgressBar,
  SearchInput,
  Select,
  TypeBadge,
} from '../components/ui'
import { TestCaseBody } from '../components/TestCaseBody'
import { FeatureDiagram } from '../components/FeatureDiagram'
import { MasterTestCaseDialog, stepsFrom, type MasterTestCaseDraft } from '../components/MasterTestCaseDialog'
import { useMasterLibrary } from '../store/MasterLibraryContext'
import { PRIORITIES, TEST_TYPES, type MasterTestCase } from '../types'
import { cn } from '../lib/utils'
import { useAuth } from '../store/AuthContext'

const ALL = 'all'

function DetailSection({ title, hint, children }: { title: string; hint: string; children: ReactNode }) {
  return (
    <section>
      <h3 className="text-sm font-semibold text-slate-900">{title}</h3>
      <p className="mb-2.5 mt-0.5 text-xs text-slate-500">{hint}</p>
      {children}
    </section>
  )
}

export function FeatureDetail() {
  const { featureId = '' } = useParams()
  const [params] = useSearchParams()
  const navigate = useNavigate()
  const {
    casesFor,
    featureById,
    isCustom,
    isEdited,
    isCustomFeature,
    addTestCase,
    updateTestCase,
    deleteTestCase,
    updateFeature,
    deleteFeature,
  } = useMasterLibrary()
  const { isAdmin } = useAuth()
  const feature = featureById.get(decodeURIComponent(featureId))

  const [query, setQuery] = useState(params.get('q') ?? '')
  const [testType, setTestType] = useState<string>(ALL)
  const [priority, setPriority] = useState<string>(ALL)
  const [scope, setScope] = useState<string>(ALL)
  const [expanded, setExpanded] = useState<string | null>(params.get('q') ?? null)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editingCase, setEditingCase] = useState<MasterTestCase | null>(null)
  const [deletingCase, setDeletingCase] = useState<MasterTestCase | null>(null)
  const [editFeature, setEditFeature] = useState<{ name: string; description: string } | null>(null)
  const [deletingFeature, setDeletingFeature] = useState(false)
  const [showDetail, setShowDetail] = useState(false)

  const cases = feature ? casesFor(feature.id) : []

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return cases.filter((tc) => {
      if (testType !== ALL && tc.testType !== testType) return false
      if (priority !== ALL && tc.priority !== priority) return false
      if (scope === 'mandatory' && !tc.isMandatory) return false
      if (scope === 'optional' && tc.isMandatory) return false
      if (q && !`${tc.id} ${tc.title} ${tc.description}`.toLowerCase().includes(q)) return false
      return true
    })
  }, [cases, query, testType, priority, scope])

  if (!feature) {
    return (
      <Card>
        <EmptyState
          icon={Layers}
          title="Feature not found"
          description="That feature is not part of the master library."
          action={
            <Button icon={ArrowLeft} onClick={() => navigate('/features')}>
              Back to the library
            </Button>
          }
        />
      </Card>
    )
  }

  const mandatoryCount = cases.filter((tc) => tc.isMandatory).length
  // The detail view is built from the feature's own test cases, so it cannot drift from them.
  const rules = cases
    .filter((tc) => tc.isMandatory && ['Validation', 'Permission', 'Security'].includes(tc.testType))
    .slice(0, 6)
  const breaks = cases.filter((tc) => tc.testType === 'Negative' || tc.testType === 'Boundary').slice(0, 8)
  const connects = cases.filter((tc) => tc.testType === 'Integration').slice(0, 5)
  const filtersActive = Boolean(query.trim()) || testType !== ALL || priority !== ALL || scope !== ALL

  const submitDialog = (targetFeatureId: string, draft: MasterTestCaseDraft) => {
    const payload = {
      title: draft.title.trim(),
      description: draft.description.trim(),
      preconditions: draft.preconditions.trim(),
      steps: stepsFrom(draft.stepsText),
      expectedResult: draft.expectedResult.trim(),
      testType: draft.testType,
      priority: draft.priority,
      isMandatory: draft.isMandatory,
    }
    if (editingCase) updateTestCase(editingCase.id, payload)
    else addTestCase(targetFeatureId, payload)
    setDialogOpen(false)
    setEditingCase(null)
  }

  const byType = TEST_TYPES.map((t) => ({ type: t, count: cases.filter((c) => c.testType === t).length })).filter(
    (r) => r.count > 0,
  )

  return (
    <>
      <div className="mb-4">
        <Link
          to={`/features?category=${feature.categoryId}`}
          className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-500 transition hover:text-slate-900"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          {feature.categoryName} library
        </Link>
      </div>

      <PageHeader
        title={feature.name}
        subtitle={feature.description}
        action={
          <>
            {isAdmin ? (
              <>
            <Button
              icon={Pencil}
              onClick={() => setEditFeature({ name: feature.name, description: feature.description })}
            >
              Edit feature
            </Button>
            <Button
              icon={Trash2}
              className="text-slate-500 hover:bg-rose-50 hover:text-rose-600"
              onClick={() => setDeletingFeature(true)}
            >
              Delete
            </Button>
            <Button
              icon={Plus}
              onClick={() => {
                setEditingCase(null)
                setDialogOpen(true)
              }}
            >
              New test case
            </Button>
              </>
            ) : null}
            <Button
              variant="primary"
              onClick={() => navigate(`/projects/new?category=${feature.categoryId}&feature=${feature.id}`)}
            >
              Use in a new project
            </Button>
          </>
        }
      />

      <div className="mb-4 flex flex-wrap items-center gap-1.5">
        <Badge className="bg-brand-50 text-brand-700 ring-brand-600/20">{feature.categoryName}</Badge>
        <Badge className="bg-slate-100 text-slate-600 ring-slate-500/20">
          <Layers className="h-3 w-3" />
          {feature.moduleName}
        </Badge>
        <Badge className="bg-slate-100 text-slate-600 ring-slate-500/20">
          <FileCheck2 className="h-3 w-3" />
          {cases.length} test cases
        </Badge>
        <Badge className="bg-indigo-50 text-indigo-700 ring-indigo-600/20">
          <ShieldCheck className="h-3 w-3" />
          {mandatoryCount} mandatory
        </Badge>
        {isCustomFeature(feature.id) ? (
          <Badge className="bg-violet-50 text-violet-700 ring-violet-600/20">Added to the library</Badge>
        ) : null}
      </div>

      {/* Overview first; the full explanation is one click away rather than up front. */}
      <Card className="mb-4 overflow-hidden border-l-4 border-l-brand-500">
        <div className="p-4">
          {feature.example ? (
            <>
              <p className="text-2xs font-semibold uppercase tracking-wider text-brand-700">
                How this works in practice
              </p>
              <p className="mt-1.5 text-sm leading-relaxed text-slate-700">{feature.example}</p>
            </>
          ) : null}
          <button
            type="button"
            onClick={() => setShowDetail((v) => !v)}
            aria-expanded={showDetail}
            className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-brand-700 transition hover:text-brand-800"
          >
            <ChevronDown className={cn('h-3.5 w-3.5 transition', showDetail ? 'rotate-0' : '-rotate-90')} />
            {showDetail ? 'Hide the detail' : 'View in detail — how this feature works'}
          </button>
        </div>

        {showDetail ? (
          <div className="space-y-6 border-t border-slate-200 bg-slate-50/60 px-5 py-5">
            <DetailSection
              title="How this feature runs"
              hint="The main path runs left to right; the dashed branches below it are what can divert it."
            >
              <FeatureDiagram feature={feature} cases={cases} />
            </DetailSection>

            {rules.length > 0 ? (
              <DetailSection
                title="Rules it has to enforce"
                hint="Drawn from the mandatory validation, permission and security checks on this feature."
              >
                <ul className="space-y-1.5">
                  {rules.map((tc) => (
                    <li key={tc.id} className="flex gap-2 text-sm leading-relaxed text-slate-700">
                      <ShieldCheck className="mt-0.5 h-3.5 w-3.5 shrink-0 text-indigo-500" />
                      <span>{tc.expectedResult}</span>
                    </li>
                  ))}
                </ul>
              </DetailSection>
            ) : null}

            {breaks.length > 0 ? (
              <DetailSection
                title="Where it usually breaks"
                hint="The negative and boundary scenarios this feature is tested against."
              >
                <ul className="grid gap-1.5 sm:grid-cols-2">
                  {breaks.map((tc) => (
                    <li key={tc.id} className="flex gap-2 text-sm leading-relaxed text-slate-700">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-rose-400" />
                      <span>{tc.title}</span>
                    </li>
                  ))}
                </ul>
              </DetailSection>
            ) : null}

            {connects.length > 0 ? (
              <DetailSection
                title="What it connects to"
                hint="Where this feature has to stay in step with the rest of the system."
              >
                <ul className="space-y-1.5">
                  {connects.map((tc) => (
                    <li key={tc.id} className="flex gap-2 text-sm leading-relaxed text-slate-700">
                      <Waypoints className="mt-0.5 h-3.5 w-3.5 shrink-0 text-sky-500" />
                      <span>{tc.title}</span>
                    </li>
                  ))}
                </ul>
              </DetailSection>
            ) : null}

            <p className="text-2xs text-slate-500">
              The guards, rules, breakages and connections above are read from this feature&rsquo;s own{' '}
              {cases.length} test cases, so they stay true as the test cases change.
            </p>
          </div>
        ) : null}
      </Card>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-[minmax(0,1fr)_18rem]">
        <div className="min-w-0">
          <Card className="mb-4 p-4">
            <SearchInput
              value={query}
              onChange={setQuery}
              placeholder="Search this feature's test cases…"
            />
            <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-3">
              <Select
                aria-label="Test case scope"
                value={scope}
                onChange={setScope}
                options={[
                  { value: ALL, label: 'All test cases' },
                  { value: 'mandatory', label: 'Mandatory only' },
                  { value: 'optional', label: 'Optional only' },
                ]}
              />
              <Select
                aria-label="Test type"
                value={testType}
                onChange={setTestType}
                options={[
                  { value: ALL, label: 'All test types' },
                  ...TEST_TYPES.map((t) => ({ value: t as string, label: t })),
                ]}
              />
              <Select
                aria-label="Priority"
                value={priority}
                onChange={setPriority}
                options={[
                  { value: ALL, label: 'All priorities' },
                  ...PRIORITIES.map((pr) => ({ value: pr as string, label: pr })),
                ]}
              />
            </div>
            <div className="mt-3 flex items-center justify-between gap-3">
              <p className="text-xs text-slate-500">
                <span className="font-medium text-slate-700">{filtered.length}</span> of {cases.length} shown
              </p>
              {filtersActive ? (
                <Button
                  size="sm"
                  variant="ghost"
                  icon={RotateCcw}
                  onClick={() => {
                    setQuery('')
                    setTestType(ALL)
                    setPriority(ALL)
                    setScope(ALL)
                  }}
                >
                  Reset filters
                </Button>
              ) : null}
            </div>
          </Card>

          <Card className="overflow-hidden">
            {filtered.length === 0 ? (
              <EmptyState
                icon={SearchX}
                title={cases.length === 0 ? 'No test cases yet' : 'Nothing matches these filters'}
                description={
                  cases.length === 0
                    ? 'Add the first master test case for this feature.'
                    : 'Loosen a filter or clear the search.'
                }
                action={
                  cases.length === 0 && isAdmin ? (
                    <Button
                      variant="primary"
                      icon={Plus}
                      onClick={() => {
                        setEditingCase(null)
                        setDialogOpen(true)
                      }}
                    >
                      Add a test case
                    </Button>
                  ) : undefined
                }
              />
            ) : (
              <ul className="divide-y divide-slate-100">
                {filtered.map((tc) => {
                  const open = expanded === tc.id
                  return (
                    <li key={tc.id} className={cn(open && 'bg-slate-50/70')}>
                      <div className="flex items-start gap-3 px-4 py-3">
                        <button
                          type="button"
                          onClick={() => setExpanded(open ? null : tc.id)}
                          aria-label={open ? 'Collapse test case' : 'Expand test case'}
                          className="mt-0.5 rounded p-0.5 text-slate-400 transition hover:bg-slate-200 hover:text-slate-600"
                        >
                          <ChevronDown className={cn('h-4 w-4 transition', open ? 'rotate-0' : '-rotate-90')} />
                        </button>
                        <button
                          type="button"
                          onClick={() => setExpanded(open ? null : tc.id)}
                          className="min-w-0 flex-1 text-left"
                        >
                          <span className="block text-sm font-medium text-slate-900">{tc.title}</span>
                          <span className="mt-1.5 flex flex-wrap items-center gap-1.5">
                            <Badge size="sm" className="bg-slate-100 font-mono text-slate-500 ring-slate-500/20">
                              {tc.id}
                            </Badge>
                            <TypeBadge type={tc.testType} size="sm" />
                            <PriorityBadge priority={tc.priority} size="sm" />
                            {tc.isMandatory ? <MandatoryBadge size="sm" /> : null}
                            {isCustom(tc.id) ? (
                              <Badge size="sm" className="bg-violet-50 text-violet-700 ring-violet-600/20">
                                Added
                              </Badge>
                            ) : null}
                            {isEdited(tc.id) ? (
                              <Badge size="sm" className="bg-sky-50 text-sky-700 ring-sky-600/20">
                                Edited
                              </Badge>
                            ) : null}
                          </span>
                        </button>
                        {isAdmin ? <div className="flex shrink-0 items-center gap-1">
                          <button
                            type="button"
                            onClick={() => {
                              setEditingCase(tc)
                              setDialogOpen(true)
                            }}
                            aria-label={`Edit ${tc.id}`}
                            title="Edit this master test case"
                            className="rounded-md p-1.5 text-slate-400 transition hover:bg-slate-100 hover:text-slate-600"
                          >
                            <Pencil className="h-3.5 w-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => setDeletingCase(tc)}
                            aria-label={`Delete ${tc.id}`}
                            title="Delete this master test case"
                            className="rounded-md p-1.5 text-slate-400 transition hover:bg-rose-50 hover:text-rose-600"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </div> : null}
                      </div>
                      {open ? (
                        <div className="border-t border-slate-200 px-4 py-4 pl-11">
                          <TestCaseBody
                            description={tc.description}
                            preconditions={tc.preconditions}
                            steps={tc.steps}
                            expectedResult={tc.expectedResult}
                          />
                        </div>
                      ) : null}
                    </li>
                  )
                })}
              </ul>
            )}
          </Card>
        </div>

        <div className="space-y-4">
          <Card className="p-4">
            <h2 className="text-sm font-semibold text-slate-900">Coverage</h2>
            <div className="mt-3 flex items-center justify-between text-xs">
              <span className="text-slate-500">Mandatory checks</span>
              <span className="font-medium tabular-nums text-slate-900">
                {mandatoryCount}/{cases.length}
              </span>
            </div>
            <ProgressBar
              value={cases.length === 0 ? 0 : Math.round((mandatoryCount / cases.length) * 100)}
              className="mt-2"
              barClassName="bg-indigo-500"
            />
            <p className="mt-3 text-xs leading-relaxed text-slate-500">
              Every feature carries the same common checks, which must pass before release. The rest of the depth
              is specific to what this feature does, so test case counts differ from feature to feature.
            </p>
          </Card>

          <Card className="overflow-hidden">
            <p className="border-b border-slate-200 px-4 py-3 text-2xs font-semibold uppercase tracking-wider text-slate-400">
              By test type
            </p>
            <ul className="divide-y divide-slate-100">
              {byType.map(({ type, count }) => (
                <li key={type} className="flex items-center justify-between gap-3 px-4 py-2.5">
                  <button
                    type="button"
                    onClick={() => setTestType(type)}
                    className="min-w-0 truncate text-left text-sm text-slate-700 hover:text-brand-700"
                  >
                    {type}
                  </button>
                  <span className="shrink-0 text-xs tabular-nums text-slate-500">{count}</span>
                </li>
              ))}
            </ul>
          </Card>
        </div>
      </div>

      <Modal
        open={Boolean(editFeature)}
        onClose={() => setEditFeature(null)}
        title="Edit feature"
        description="Renaming regenerates the common checks that quote the feature name. Projects that already selected it keep their own copies."
        footer={
          <>
            <Button onClick={() => setEditFeature(null)}>Cancel</Button>
            <Button
              variant="primary"
              disabled={!editFeature?.name.trim()}
              onClick={() => {
                if (editFeature) updateFeature(feature.id, editFeature)
                setEditFeature(null)
              }}
            >
              Save changes
            </Button>
          </>
        }
      >
        <div className="space-y-4">
          <Field label="Feature name" required>
            <input
              className="input-base"
              value={editFeature?.name ?? ''}
              onChange={(e) => setEditFeature((d) => (d ? { ...d, name: e.target.value } : d))}
            />
          </Field>
          <Field label="Description">
            <textarea
              className="input-base min-h-[88px] resize-y"
              value={editFeature?.description ?? ''}
              onChange={(e) => setEditFeature((d) => (d ? { ...d, description: e.target.value } : d))}
            />
          </Field>
        </div>
      </Modal>

      <Modal
        open={deletingFeature}
        onClose={() => setDeletingFeature(false)}
        title="Delete this feature?"
        footer={
          <>
            <Button onClick={() => setDeletingFeature(false)}>Cancel</Button>
            <Button
              variant="danger"
              onClick={() => {
                deleteFeature(feature.id)
                setDeletingFeature(false)
                navigate(`/features?category=${feature.categoryId}`)
              }}
            >
              Delete feature
            </Button>
          </>
        }
      >
        <p className="text-sm text-slate-600">
          <span className="font-medium text-slate-900">{feature.name}</span> and its {cases.length} master test
          cases will be removed from the library, so projects created from now on will not see it.
        </p>
        <p className="mt-3 rounded-lg bg-slate-50 px-3 py-2 text-xs text-slate-500">
          Projects that already selected it keep their own copies. Reset demo data restores the built-in library.
        </p>
      </Modal>

      <MasterTestCaseDialog
        open={dialogOpen}
        onClose={() => {
          setDialogOpen(false)
          setEditingCase(null)
        }}
        onSubmit={submitDialog}
        testCase={editingCase}
        featureId={editingCase ? undefined : feature.id}
      />

      <Modal
        open={Boolean(deletingCase)}
        onClose={() => setDeletingCase(null)}
        title="Delete this master test case?"
        footer={
          <>
            <Button onClick={() => setDeletingCase(null)}>Cancel</Button>
            <Button
              variant="danger"
              onClick={() => {
                if (deletingCase) deleteTestCase(deletingCase.id)
                setDeletingCase(null)
              }}
            >
              Delete test case
            </Button>
          </>
        }
      >
        <p className="text-sm text-slate-600">
          <span className="font-medium text-slate-900">{deletingCase?.title}</span> ({deletingCase?.id}) will be
          removed from the master library, so projects created from now on will not import it.
        </p>
        <p className="mt-3 rounded-lg bg-slate-50 px-3 py-2 text-xs text-slate-500">
          Existing projects keep their own copies — their test cases and execution results are not touched.
        </p>
      </Modal>
    </>
  )
}
