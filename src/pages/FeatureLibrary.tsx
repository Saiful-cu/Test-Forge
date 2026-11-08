import { useMemo, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { ChevronDown, FileCheck2, FolderPlus, Layers, Pencil, Plus, SearchX, Trash2 } from 'lucide-react'
import {
  Badge,
  Button,
  Card,
  DynamicIcon,
  EmptyState,
  Field,
  Modal,
  PageHeader,
  SearchInput,
  Select,
} from '../components/ui'
import { MasterTestCaseDialog, stepsFrom, type MasterTestCaseDraft } from '../components/MasterTestCaseDialog'
import { useMasterLibrary } from '../store/MasterLibraryContext'
import type { MasterFeature } from '../types'
import { cn } from '../lib/utils'
import { useAuth } from '../store/AuthContext'

export function FeatureLibrary() {
  const [params] = useSearchParams()
  const {
    categories: MASTER_CATEGORIES,
    categoryById: CATEGORY_BY_ID,
    features: MASTER_FEATURES,
    countFor,
    addTestCase,
    isCustomModule,
    isCustomFeature,
    addModule,
    renameModule,
    deleteModule,
    addFeature,
  } = useMasterLibrary()
  const { isAdmin } = useAuth()

  const [query, setQuery] = useState(params.get('q') ?? '')
  const [categoryId, setCategoryId] = useState<string>(params.get('category') ?? MASTER_CATEGORIES[0].id)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [collapsedTiers, setCollapsedTiers] = useState<string[]>([])
  const [collapsedModules, setCollapsedModules] = useState<string[]>([])
  const [moduleDialog, setModuleDialog] = useState<{ mode: 'add' | 'rename'; id?: string; name: string } | null>(
    null,
  )
  const [featureDialog, setFeatureDialog] = useState<{
    moduleId: string
    name: string
    description: string
  } | null>(null)
  const [deleteModuleTarget, setDeleteModuleTarget] = useState<{
    id: string
    name: string
    features: number
  } | null>(null)

  const q = query.trim().toLowerCase()
  const searching = q.length > 0

  const matches = useMemo(() => {
    if (!searching) return []
    return MASTER_FEATURES.filter(
      (f) =>
        f.name.toLowerCase().includes(q) ||
        f.moduleName.toLowerCase().includes(q) ||
        f.categoryName.toLowerCase().includes(q) ||
        f.description.toLowerCase().includes(q),
    )
  }, [q, searching])

  const category = CATEGORY_BY_ID.get(categoryId) ?? MASTER_CATEGORIES[0]
  const categoryFeatureCount = (id: string) => {
    const c = CATEGORY_BY_ID.get(id)
    return c ? c.modules.reduce((n, m) => n + m.features.length, 0) : 0
  }

  const toggleModule = (id: string) =>
    setCollapsedModules((prev) => (prev.includes(id) ? prev.filter((m) => m !== id) : [...prev, id]))

  const submitDialog = (featureId: string, draft: MasterTestCaseDraft) => {
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
    addTestCase(featureId, payload)
    setDialogOpen(false)
  }

  const FeatureTile = ({ feature }: { feature: MasterFeature }) => (
    <Link
      to={`/features/${encodeURIComponent(feature.id)}`}
      className="card card-interactive group flex h-full flex-col p-4 hover:border-brand-300"
    >
      <div className="flex items-start justify-between gap-2">
        <p className="text-sm font-medium text-slate-900 group-hover:text-brand-700">{feature.name}</p>
        <span className="flex shrink-0 items-center gap-1">
          {isCustomFeature(feature.id) ? (
            <Badge size="sm" className="bg-violet-50 text-violet-700 ring-violet-600/20">
              Added
            </Badge>
          ) : null}
          <Badge size="sm" className="bg-slate-100 text-slate-600 ring-slate-500/20">
            <FileCheck2 className="h-3 w-3" />
            {countFor(feature.id)}
          </Badge>
        </span>
      </div>
      <p className="mt-2 line-clamp-3 flex-1 text-xs leading-relaxed text-slate-500">{feature.description}</p>
      {searching ? (
        <p className="mt-3 truncate text-2xs text-slate-400">
          {feature.categoryName} · {feature.moduleName}
        </p>
      ) : null}
    </Link>
  )

  return (
    <>
      <PageHeader
        title="Master Feature Library"
        subtitle={`${MASTER_FEATURES.length} features across ${MASTER_CATEGORIES.length} industries. Open a feature to browse and manage its master test cases.`}
        action={
          isAdmin ? (
          <>
            <Button icon={FolderPlus} onClick={() => setModuleDialog({ mode: 'add', name: '' })}>
              New feature group
            </Button>
            <Button
              variant="primary"
              icon={Plus}
              onClick={() =>
                setFeatureDialog({
                  moduleId: category.modules[0]?.id ?? '',
                  name: '',
                  description: '',
                })
              }
              disabled={category.modules.length === 0}
            >
              New feature
            </Button>
            <Button icon={FileCheck2} onClick={() => setDialogOpen(true)}>
              New test case
            </Button>
          </>
          ) : undefined
        }
      />

      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center">
        <SearchInput
          value={query}
          onChange={setQuery}
          placeholder="Search features across every category…"
          className="flex-1"
        />
        <Select
          aria-label="Category"
          value={categoryId}
          onChange={setCategoryId}
          className="sm:w-72"
          options={MASTER_CATEGORIES.map((c) => ({
            value: c.id,
            label: `${c.name} (${categoryFeatureCount(c.id)})`,
          }))}
        />
      </div>

      {searching ? (
        <Card>
          <div className="flex items-center justify-between gap-3 border-b border-slate-200 px-5 py-4">
            <h2 className="text-sm font-semibold text-slate-900">
              {matches.length} {matches.length === 1 ? 'feature' : 'features'} matching “{query.trim()}”
            </h2>
            <Button size="sm" onClick={() => setQuery('')}>
              Clear
            </Button>
          </div>
          {matches.length === 0 ? (
            <EmptyState
              icon={SearchX}
              title="No features matched"
              description="Try a shorter keyword, or browse by category instead."
            />
          ) : (
            <div className="grid grid-cols-1 gap-3 p-4 sm:grid-cols-2 xl:grid-cols-3">
              {matches.map((f) => (
                <FeatureTile key={f.id} feature={f} />
              ))}
            </div>
          )}
        </Card>
      ) : (
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-[16rem_minmax(0,1fr)]">
          <Card className="h-fit overflow-hidden">
            <p className="border-b border-slate-200 px-4 py-3 text-2xs font-semibold uppercase tracking-wider text-slate-400">
              Categories
            </p>
            <ul className="max-h-[70vh] overflow-y-auto p-2">
              {MASTER_CATEGORIES.map((c, i) => {
                // Categories arrive in priority order, so a label is shown when the tier changes.
                const startsTier = i === 0 || MASTER_CATEGORIES[i - 1].tier !== c.tier
                const tierCollapsed = collapsedTiers.includes(c.tier)
                const tierSize = MASTER_CATEGORIES.filter((x) => x.tier === c.tier).length
                return (
                  <li key={c.id}>
                    {startsTier ? (
                      <button
                        type="button"
                        onClick={() =>
                          setCollapsedTiers((prev) =>
                            prev.includes(c.tier) ? prev.filter((t) => t !== c.tier) : [...prev, c.tier],
                          )
                        }
                        aria-expanded={!tierCollapsed}
                        className={cn(
                          'flex w-full items-center gap-1.5 rounded px-2.5 pb-1 text-2xs font-semibold uppercase tracking-wider text-slate-400 transition hover:text-slate-600',
                          i === 0 ? 'pt-1' : 'pt-3',
                        )}
                      >
                        <ChevronDown
                          className={cn('h-3 w-3 shrink-0 transition', tierCollapsed ? '-rotate-90' : 'rotate-0')}
                        />
                        <span className="flex-1 text-left">{c.tier}</span>
                        <span className="tabular-nums">{tierSize}</span>
                      </button>
                    ) : null}
                    {tierCollapsed ? null : (
                    <button
                      type="button"
                      onClick={() => setCategoryId(c.id)}
                      className={cn(
                        'flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-left text-sm transition',
                        c.id === categoryId
                          ? 'bg-brand-50 font-medium text-brand-700'
                          : 'text-slate-600 hover:bg-slate-100',
                      )}
                    >
                      <DynamicIcon
                        name={c.icon}
                        className={cn(
                          'h-4 w-4 shrink-0',
                          c.id === categoryId ? 'text-brand-600' : 'text-slate-400',
                        )}
                      />
                      <span className="min-w-0 flex-1 truncate">{c.name}</span>
                      <span className="shrink-0 text-2xs tabular-nums text-slate-400">
                        {categoryFeatureCount(c.id)}
                      </span>
                    </button>
                    )}
                  </li>
                )
              })}
            </ul>
          </Card>

          <div className="min-w-0">
            <Card className="mb-4 p-5">
              <div className="flex items-start gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-brand-50 text-brand-600">
                  <DynamicIcon name={category.icon} className="h-5 w-5" />
                </span>
                <div className="min-w-0">
                  <h2 className="text-base font-semibold tracking-tight text-slate-900">{category.name}</h2>
                  <p className="mt-0.5 text-sm text-slate-500">{category.description}</p>
                  <div className="mt-2.5 flex flex-wrap gap-1.5">
                    <Badge className="bg-brand-50 text-brand-700 ring-brand-600/20">
                      #{category.priority} · {category.tier}
                    </Badge>
                    <Badge className="bg-slate-100 text-slate-600 ring-slate-500/20">
                      <Layers className="h-3 w-3" />
                      {category.modules.length} modules
                    </Badge>
                    <Badge className="bg-slate-100 text-slate-600 ring-slate-500/20">
                      {categoryFeatureCount(category.id)} features
                    </Badge>
                    <Badge className="bg-slate-100 text-slate-600 ring-slate-500/20">
                      <FileCheck2 className="h-3 w-3" />
                      {category.modules.reduce(
                        (n, m) => n + m.features.reduce((k, f) => k + countFor(f.id), 0),
                        0,
                      )}{' '}
                      test cases
                    </Badge>
                  </div>
                </div>
              </div>
            </Card>

            <div className="mb-3 flex items-center justify-between gap-3">
              <p className="text-xs text-slate-500">
                {category.modules.length} feature {category.modules.length === 1 ? 'group' : 'groups'}
              </p>
              <Button
                size="sm"
                onClick={() =>
                  setCollapsedModules((prev) =>
                    category.modules.every((mod) => prev.includes(mod.id))
                      ? prev.filter((id) => !category.modules.some((mod) => mod.id === id))
                      : Array.from(new Set([...prev, ...category.modules.map((mod) => mod.id)])),
                  )
                }
              >
                {category.modules.every((mod) => collapsedModules.includes(mod.id))
                  ? 'Expand all groups'
                  : 'Collapse all groups'}
              </Button>
            </div>

            <div className="space-y-4">
              {category.modules.map((mod) => (
                <Card key={mod.id}>
                  <div className="flex items-center justify-between gap-3 border-b border-slate-200 px-5 py-3">
                    <div className="flex min-w-0 items-center gap-2">
                      <button
                        type="button"
                        onClick={() => toggleModule(mod.id)}
                        aria-expanded={!collapsedModules.includes(mod.id)}
                        aria-label={`${collapsedModules.includes(mod.id) ? 'Expand' : 'Collapse'} ${mod.name}`}
                        className="-ml-1 rounded p-1 text-slate-400 transition hover:bg-slate-100 hover:text-slate-600"
                      >
                        <ChevronDown
                          className={cn(
                            'h-4 w-4 transition',
                            collapsedModules.includes(mod.id) ? '-rotate-90' : 'rotate-0',
                          )}
                        />
                      </button>
                      <button
                        type="button"
                        onClick={() => toggleModule(mod.id)}
                        className="truncate text-left text-sm font-semibold text-slate-900"
                      >
                        {mod.name}
                      </button>
                      {isCustomModule(mod.id) ? (
                        <Badge size="sm" className="bg-violet-50 text-violet-700 ring-violet-600/20">
                          Added
                        </Badge>
                      ) : null}
                      <span className="shrink-0 text-xs text-slate-500">
                        · {mod.features.length} {mod.features.length === 1 ? 'feature' : 'features'}
                      </span>
                    </div>
                    {isAdmin ? (
                    <div className="flex shrink-0 items-center gap-1">
                      <Button
                        size="sm"
                        icon={Plus}
                        onClick={() =>
                          setFeatureDialog({ moduleId: mod.id, name: '', description: '' })
                        }
                      >
                        Feature
                      </Button>
                      <button
                        type="button"
                        aria-label={`Rename ${mod.name}`}
                        title="Rename this feature group"
                        onClick={() => setModuleDialog({ mode: 'rename', id: mod.id, name: mod.name })}
                        className="rounded-md p-1.5 text-slate-400 transition hover:bg-slate-100 hover:text-slate-600"
                      >
                        <Pencil className="h-3.5 w-3.5" />
                      </button>
                      <button
                        type="button"
                        aria-label={`Delete ${mod.name}`}
                        title="Delete this feature group"
                        onClick={() =>
                          setDeleteModuleTarget({
                            id: mod.id,
                            name: mod.name,
                            features: mod.features.length,
                          })
                        }
                        className="rounded-md p-1.5 text-slate-400 transition hover:bg-rose-50 hover:text-rose-600"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                    ) : null}
                  </div>
                  {collapsedModules.includes(mod.id) ? null : mod.features.length === 0 ? (
                    <div className="px-5 py-6 text-center">
                      <p className="text-sm text-slate-500">This feature group has no features yet.</p>
                      {isAdmin ? <Button
                        className="mt-3"
                        size="sm"
                        icon={Plus}
                        onClick={() =>
                          setFeatureDialog({ moduleId: mod.id, name: '', description: '' })
                        }
                      >
                        Add a feature
                      </Button> : null}
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 gap-3 p-4 sm:grid-cols-2 xl:grid-cols-3">
                      {mod.features.map((f) => (
                        <FeatureTile key={f.id} feature={f} />
                      ))}
                    </div>
                  )}
                </Card>
              ))}

              {isAdmin ? <button
                type="button"
                onClick={() => setModuleDialog({ mode: 'add', name: '' })}
                className="flex w-full items-center justify-center gap-2 rounded-xl border border-dashed border-slate-300 bg-white/60 px-5 py-4 text-sm font-medium text-slate-500 transition hover:border-brand-400 hover:text-brand-700"
              >
                <Plus className="h-4 w-4" />
                New feature group in {category.name}
              </button> : null}
            </div>
          </div>
        </div>
      )}

      {/* feature group */}
      <Modal
        open={Boolean(moduleDialog)}
        onClose={() => setModuleDialog(null)}
        title={moduleDialog?.mode === 'add' ? 'New feature group' : 'Rename feature group'}
        description={
          moduleDialog?.mode === 'add'
            ? `Added to ${category.name}. Features you create inside it behave like any other library feature.`
            : undefined
        }
        footer={
          <>
            <Button onClick={() => setModuleDialog(null)}>Cancel</Button>
            <Button
              variant="primary"
              disabled={!moduleDialog?.name.trim()}
              onClick={() => {
                if (!moduleDialog) return
                if (moduleDialog.mode === 'add') addModule(categoryId, moduleDialog.name)
                else if (moduleDialog.id) renameModule(moduleDialog.id, moduleDialog.name)
                setModuleDialog(null)
              }}
            >
              {moduleDialog?.mode === 'add' ? 'Create group' : 'Save name'}
            </Button>
          </>
        }
      >
        <Field label="Group name" required hint="For example: Inspection & Measurement, Billing, Compliance.">
          <input
            className="input-base"
            value={moduleDialog?.name ?? ''}
            onChange={(e) => setModuleDialog((d) => (d ? { ...d, name: e.target.value } : d))}
            placeholder="Name of the feature group"
          />
        </Field>
      </Modal>

      {/* feature */}
      <Modal
        open={Boolean(featureDialog)}
        onClose={() => setFeatureDialog(null)}
        title="New feature"
        description="A new feature starts with the mandatory common checks already generated, ready to extend."
        footer={
          <>
            <Button onClick={() => setFeatureDialog(null)}>Cancel</Button>
            <Button
              variant="primary"
              disabled={!featureDialog?.name.trim() || !featureDialog?.moduleId}
              onClick={() => {
                if (!featureDialog) return
                addFeature({
                  categoryId,
                  moduleId: featureDialog.moduleId,
                  name: featureDialog.name,
                  description: featureDialog.description,
                })
                setFeatureDialog(null)
              }}
            >
              Create feature
            </Button>
          </>
        }
      >
        <div className="space-y-4">
          <Field label="Feature group" required>
            <Select
              value={featureDialog?.moduleId ?? ''}
              onChange={(v) => setFeatureDialog((d) => (d ? { ...d, moduleId: v } : d))}
              options={category.modules.map((mod) => ({ value: mod.id, label: mod.name }))}
            />
          </Field>
          <Field label="Feature name" required>
            <input
              className="input-base"
              value={featureDialog?.name ?? ''}
              onChange={(e) => setFeatureDialog((d) => (d ? { ...d, name: e.target.value } : d))}
              placeholder="For example: Drone Survey"
            />
          </Field>
          <Field label="Description" hint="Shown in the library and when selecting features for a project.">
            <textarea
              className="input-base min-h-[88px] resize-y"
              value={featureDialog?.description ?? ''}
              onChange={(e) => setFeatureDialog((d) => (d ? { ...d, description: e.target.value } : d))}
              placeholder="What this feature covers"
            />
          </Field>
        </div>
      </Modal>

      {/* delete a feature group */}
      <Modal
        open={Boolean(deleteModuleTarget)}
        onClose={() => setDeleteModuleTarget(null)}
        title="Delete this feature group?"
        footer={
          <>
            <Button onClick={() => setDeleteModuleTarget(null)}>Cancel</Button>
            <Button
              variant="danger"
              onClick={() => {
                if (deleteModuleTarget) deleteModule(deleteModuleTarget.id)
                setDeleteModuleTarget(null)
              }}
            >
              Delete group
            </Button>
          </>
        }
      >
        <p className="text-sm text-slate-600">
          <span className="font-medium text-slate-900">{deleteModuleTarget?.name}</span>
          {` and its ${deleteModuleTarget?.features ?? 0} ${
            (deleteModuleTarget?.features ?? 0) === 1 ? 'feature' : 'features'
          } will be removed from the master library.`}
        </p>
        <p className="mt-3 rounded-lg bg-slate-50 px-3 py-2 text-xs text-slate-500">
          Projects that already selected it keep their own copies — their test cases and execution results are
          not touched. Reset demo data restores the built-in library.
        </p>
      </Modal>

      <MasterTestCaseDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        onSubmit={submitDialog}
      />

    </>
  )
}
