import { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { ChevronDown, ChevronLeft, ChevronRight, Pencil, Plus, RotateCcw, SearchX, Trash2 } from 'lucide-react'
import {
  Badge,
  Button,
  Card,
  EmptyState,
  MandatoryBadge,
  PageHeader,
  PriorityBadge,
  SearchInput,
  Select,
  TypeBadge,
} from '../components/ui'
import { TestCaseBody } from '../components/TestCaseBody'
import { MasterTestCaseDialog, stepsFrom, type MasterTestCaseDraft } from '../components/MasterTestCaseDialog'
import { Modal } from '../components/ui'
import { useMasterLibrary } from '../store/MasterLibraryContext'
import { PRIORITIES, TEST_TYPES, type MasterTestCase, type Priority, type TestType } from '../types'
import { cn } from '../lib/utils'
import { useAuth } from '../store/AuthContext'

const PAGE_SIZE = 25
const ALL = 'all'

export function TestCaseLibrary() {
  const [params, setParams] = useSearchParams()
  const [query, setQuery] = useState(params.get('q') ?? '')
  const [categoryId, setCategoryId] = useState<string>(ALL)
  const [moduleId, setModuleId] = useState<string>(ALL)
  const [featureId, setFeatureId] = useState<string>(ALL)
  const [testType, setTestType] = useState<string>(ALL)
  const [priority, setPriority] = useState<string>(ALL)
  const [scope, setScope] = useState<string>(ALL)
  const [page, setPage] = useState(1)
  const [expanded, setExpanded] = useState<string | null>(null)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editingCase, setEditingCase] = useState<MasterTestCase | null>(null)
  const [deletingCase, setDeletingCase] = useState<MasterTestCase | null>(null)

  const {
    categories: MASTER_CATEGORIES,
    categoryById: CATEGORY_BY_ID,
    featureById: FEATURE_BY_ID,
    allCases,
    casesForFeatures,
    totalCount,
    isCustom,
    isEdited,
    addTestCase,
    updateTestCase,
    deleteTestCase,
  } = useMasterLibrary()
  const { isAdmin } = useAuth()

  useEffect(() => {
    if (params.get('q')) {
      params.delete('q')
      setParams(params, { replace: true })
    }
  }, [params, setParams])

  const category = categoryId === ALL ? null : CATEGORY_BY_ID.get(categoryId)
  const modules = category?.modules ?? []
  const features = useMemo(() => {
    if (moduleId !== ALL) return modules.find((m) => m.id === moduleId)?.features ?? []
    return modules.flatMap((m) => m.features)
  }, [modules, moduleId])

  // Only the features in scope are generated, so narrowing by category stays instant.
  const scopedCases = useMemo(() => {
    if (categoryId === ALL) return allCases()
    const cat = CATEGORY_BY_ID.get(categoryId)
    if (!cat) return allCases()
    const feats =
      featureId !== ALL
        ? cat.modules.flatMap((mod) => mod.features).filter((f) => f.id === featureId)
        : moduleId !== ALL
          ? (cat.modules.find((mod) => mod.id === moduleId)?.features ?? [])
          : cat.modules.flatMap((mod) => mod.features)
    return casesForFeatures(feats)
  }, [categoryId, moduleId, featureId, allCases, casesForFeatures, CATEGORY_BY_ID])

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return scopedCases.filter((tc) => {
      const feature = FEATURE_BY_ID.get(tc.featureId)
      if (!feature) return false
      if (categoryId !== ALL && feature.categoryId !== categoryId) return false
      if (moduleId !== ALL && feature.moduleId !== moduleId) return false
      if (featureId !== ALL && feature.id !== featureId) return false
      if (testType !== ALL && tc.testType !== testType) return false
      if (priority !== ALL && tc.priority !== priority) return false
      if (scope === 'mandatory' && !tc.isMandatory) return false
      if (scope === 'optional' && tc.isMandatory) return false
      if (q) {
        const haystack = `${tc.id} ${tc.title} ${tc.description} ${feature.name} ${feature.moduleName} ${feature.categoryName}`
        if (!haystack.toLowerCase().includes(q)) return false
      }
      return true
    })
  }, [scopedCases, query, categoryId, moduleId, featureId, testType, priority, scope, FEATURE_BY_ID])

  // Any filter change returns to the first page.
  useEffect(() => {
    setPage(1)
  }, [query, categoryId, moduleId, featureId, testType, priority, scope])

  const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  const current = Math.min(page, pageCount)
  const rows = filtered.slice((current - 1) * PAGE_SIZE, current * PAGE_SIZE)

  const resetFilters = () => {
    setQuery('')
    setCategoryId(ALL)
    setModuleId(ALL)
    setFeatureId(ALL)
    setTestType(ALL)
    setPriority(ALL)
    setScope(ALL)
  }

  const filtersActive =
    Boolean(query.trim()) ||
    categoryId !== ALL ||
    moduleId !== ALL ||
    featureId !== ALL ||
    testType !== ALL ||
    priority !== ALL ||
    scope !== ALL

  return (
    <>
      <PageHeader
        title="Master Test Case Library"
        subtitle={`${totalCount.toLocaleString()} master test cases across ${MASTER_CATEGORIES.length} industries. Each feature carries its own depth, so counts differ feature by feature.`}
        action={
          isAdmin ? <Button
            variant="primary"
            icon={Plus}
            onClick={() => {
              setEditingCase(null)
              setDialogOpen(true)
            }}
          >
            New test case
          </Button> : undefined
        }
      />

      <Card className="mb-4 p-4">
        <SearchInput
          value={query}
          onChange={setQuery}
          placeholder="Search by test case ID, title or description…"
        />
        <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-6">
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
            aria-label="Software category"
            value={categoryId}
            onChange={(v) => {
              setCategoryId(v)
              setModuleId(ALL)
              setFeatureId(ALL)
            }}
            options={[
              { value: ALL, label: 'All categories' },
              ...MASTER_CATEGORIES.map((c) => ({ value: c.id, label: c.name })),
            ]}
          />
          <Select
            aria-label="Module"
            value={moduleId}
            onChange={(v) => {
              setModuleId(v)
              setFeatureId(ALL)
            }}
            options={[
              { value: ALL, label: category ? 'All modules' : 'All modules (pick a category)' },
              ...modules.map((m) => ({ value: m.id, label: m.name })),
            ]}
          />
          <Select
            aria-label="Feature"
            value={featureId}
            onChange={setFeatureId}
            options={[
              { value: ALL, label: category ? 'All features' : 'All features (pick a category)' },
              ...features.map((f) => ({ value: f.id, label: f.name })),
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
              ...PRIORITIES.map((p) => ({ value: p as string, label: p })),
            ]}
          />
        </div>
        <div className="mt-3 flex items-center justify-between gap-3">
          <p className="text-xs text-slate-500">
            Showing{' '}
            <span className="font-medium text-slate-700">
              {filtered.length === 0 ? 0 : (current - 1) * PAGE_SIZE + 1}–
              {Math.min(current * PAGE_SIZE, filtered.length)}
            </span>{' '}
            of <span className="font-medium text-slate-700">{filtered.length}</span> test cases
          </p>
          {filtersActive ? (
            <Button size="sm" variant="ghost" icon={RotateCcw} onClick={resetFilters}>
              Reset filters
            </Button>
          ) : null}
        </div>
      </Card>

      <Card className="overflow-hidden">
        {rows.length === 0 ? (
          <EmptyState
            icon={SearchX}
            title="No test cases match these filters"
            description="Loosen a filter or clear the search to see more results."
            action={
              filtersActive ? (
                <Button icon={RotateCcw} onClick={resetFilters}>
                  Reset filters
                </Button>
              ) : undefined
            }
          />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[56rem] border-collapse">
              <thead>
                <tr className="table-head">
                  <th className="w-10 px-3 py-2.5" />
                  <th className="px-3 py-2.5">Test case ID</th>
                  <th className="px-3 py-2.5">Title</th>
                  <th className="px-3 py-2.5">Category / Module / Feature</th>
                  <th className="px-3 py-2.5">Type</th>
                  <th className="px-3 py-2.5">Priority</th>
                  <th className="w-24 px-3 py-2.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {rows.map((tc) => {
                  const feature = FEATURE_BY_ID.get(tc.featureId)
                  const open = expanded === tc.id
                  return [
                    <tr
                      key={tc.id}
                      className={cn('cursor-pointer align-top transition hover:bg-slate-50', open && 'bg-slate-50')}
                      onClick={() => setExpanded(open ? null : tc.id)}
                    >
                      <td className="px-3 py-3">
                        <ChevronDown
                          className={cn('h-4 w-4 text-slate-400 transition', open ? 'rotate-0' : '-rotate-90')}
                        />
                      </td>
                      <td className="whitespace-nowrap px-3 py-3 font-mono text-xs text-slate-500">
                        {tc.id}
                        {isCustom(tc.id) ? (
                          <Badge size="sm" className="ml-1.5 bg-violet-50 text-violet-700 ring-violet-600/20">
                            Added
                          </Badge>
                        ) : null}
                        {isEdited(tc.id) ? (
                          <Badge size="sm" className="ml-1.5 bg-sky-50 text-sky-700 ring-sky-600/20">
                            Edited
                          </Badge>
                        ) : null}
                      </td>
                      <td className="max-w-md px-3 py-3 text-sm font-medium text-slate-900">{tc.title}</td>
                      <td className="px-3 py-3 text-xs text-slate-500">
                        <span className="block text-slate-700">{feature?.name}</span>
                        <span className="block">
                          {feature?.categoryName} · {feature?.moduleName}
                        </span>
                      </td>
                      <td className="px-3 py-3">
                        <TypeBadge type={tc.testType as TestType} size="sm" />
                      </td>
                      <td className="px-3 py-3">
                        <div className="flex flex-wrap items-center gap-1">
                          <PriorityBadge priority={tc.priority as Priority} size="sm" />
                          {tc.isMandatory ? <MandatoryBadge size="sm" /> : null}
                        </div>
                      </td>
                      <td className="px-3 py-3 text-right">
                        {isAdmin ? <div className="flex items-center justify-end gap-1">
                          <button
                            type="button"
                            aria-label={`Edit ${tc.id}`}
                            title="Edit this master test case"
                            onClick={(e) => {
                              e.stopPropagation()
                              setEditingCase(tc)
                              setDialogOpen(true)
                            }}
                            className="rounded-md p-1.5 text-slate-400 transition hover:bg-slate-100 hover:text-slate-600"
                          >
                            <Pencil className="h-3.5 w-3.5" />
                          </button>
                          <button
                            type="button"
                            aria-label={`Delete ${tc.id}`}
                            title="Delete this master test case"
                            onClick={(e) => {
                              e.stopPropagation()
                              setDeletingCase(tc)
                            }}
                            className="rounded-md p-1.5 text-slate-400 transition hover:bg-rose-50 hover:text-rose-600"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </div> : null}
                      </td>
                    </tr>,
                    open ? (
                      <tr key={`${tc.id}-detail`} className="bg-slate-50/80">
                        <td colSpan={7} className="px-6 py-5">
                          <TestCaseBody
                            description={tc.description}
                            preconditions={tc.preconditions}
                            steps={tc.steps}
                            expectedResult={tc.expectedResult}
                          />
                          <p className="mt-4 flex flex-wrap items-center gap-1.5">
                            <Badge size="sm" className="bg-white font-mono text-slate-500 ring-slate-300">
                              {tc.id}
                            </Badge>
                            <Badge size="sm" className="bg-white text-slate-600 ring-slate-300">
                              Master test case — copied into a project when its feature is selected
                            </Badge>
                          </p>
                        </td>
                      </tr>
                    ) : null,
                  ]
                })}
              </tbody>
            </table>
          </div>
        )}

        {pageCount > 1 ? (
          <div className="flex items-center justify-between gap-3 border-t border-slate-200 px-4 py-3">
            <p className="text-xs text-slate-500">
              Page {current} of {pageCount}
            </p>
            <div className="flex items-center gap-2">
              <Button
                size="sm"
                icon={ChevronLeft}
                disabled={current <= 1}
                onClick={() => setPage(current - 1)}
              >
                Previous
              </Button>
              <Button size="sm" disabled={current >= pageCount} onClick={() => setPage(current + 1)}>
                Next
                <ChevronRight className="h-3.5 w-3.5" />
              </Button>
            </div>
          </div>
        ) : null}
      </Card>

      <MasterTestCaseDialog
        open={dialogOpen}
        onClose={() => {
          setDialogOpen(false)
          setEditingCase(null)
        }}
        testCase={editingCase}
        featureId={editingCase ? undefined : featureId !== ALL ? featureId : undefined}
        onSubmit={(targetFeatureId, draft: MasterTestCaseDraft) => {
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
        }}
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
                if (deletingCase) {
                  deleteTestCase(deletingCase.id)
                  if (expanded === deletingCase.id) setExpanded(null)
                }
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
