import { useEffect, useMemo, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { ArrowLeft, ArrowRight, Check, CheckCircle2, FileCheck2, Layers, Rocket, X } from 'lucide-react'
import { Badge, Button, Card, DynamicIcon, Field, PageHeader } from '../components/ui'
import { FeaturePicker } from '../components/FeaturePicker'
import { useMasterLibrary } from '../store/MasterLibraryContext'
import { useStore } from '../store/StoreContext'
import type { MasterFeature } from '../types'
import { cn } from '../lib/utils'

const STEPS = [
  { n: 1, label: 'Project details' },
  { n: 2, label: 'Software category' },
  { n: 3, label: 'Modules in scope' },
  { n: 4, label: 'Select features' },
  { n: 5, label: 'Confirm & create' },
]

function Stepper({ step, onJump }: { step: number; onJump: (n: number) => void }) {
  return (
    <ol className="flex flex-wrap items-center gap-x-2 gap-y-3">
      {STEPS.map((s, i) => {
        const state = s.n === step ? 'current' : s.n < step ? 'done' : 'todo'
        return (
          <li key={s.n} className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => s.n < step && onJump(s.n)}
              disabled={s.n > step}
              className={cn(
                'flex items-center gap-2 rounded-lg px-2 py-1 text-sm transition',
                state === 'done' && 'cursor-pointer text-slate-600 hover:bg-slate-100',
                state === 'current' && 'font-medium text-brand-700',
                state === 'todo' && 'cursor-default text-slate-400',
              )}
            >
              <span
                className={cn(
                  'flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-2xs font-semibold',
                  state === 'done' && 'bg-brand-600 text-white',
                  state === 'current' && 'bg-brand-100 text-brand-700 ring-2 ring-brand-500/30',
                  state === 'todo' && 'bg-slate-100 text-slate-400',
                )}
              >
                {state === 'done' ? <Check className="h-3 w-3" /> : s.n}
              </span>
              <span className="hidden sm:inline">{s.label}</span>
            </button>
            {i < STEPS.length - 1 ? <span className="h-px w-4 bg-slate-200 sm:w-8" /> : null}
          </li>
        )
      })}
    </ol>
  )
}

export function CreateProject() {
  const navigate = useNavigate()
  const { createProject } = useStore()
  const {
    countFor,
    categories: MASTER_CATEGORIES,
    categoryById: CATEGORY_BY_ID,
    featureById: FEATURE_BY_ID,
  } = useMasterLibrary()
  const [params] = useSearchParams()

  const [step, setStep] = useState(1)
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [categoryId, setCategoryId] = useState<string>('')
  const [moduleIds, setModuleIds] = useState<string[]>([])
  const [featureIds, setFeatureIds] = useState<string[]>([])
  const [touchedName, setTouchedName] = useState(false)

  // Deep link from the feature library: preselect the category, module and feature.
  useEffect(() => {
    const cat = params.get('category')
    const feat = params.get('feature')
    if (cat && CATEGORY_BY_ID.has(cat)) {
      setCategoryId(cat)
      if (feat) {
        const mod = CATEGORY_BY_ID.get(cat)?.modules.find((m) => m.features.some((f) => f.id === feat))
        if (mod) {
          setModuleIds([mod.id])
          setFeatureIds([feat])
        }
      }
    }
  }, [params])

  const category = categoryId ? CATEGORY_BY_ID.get(categoryId) : undefined
  const modules = category?.modules ?? []
  const selectedModules = useMemo(() => modules.filter((m) => moduleIds.includes(m.id)), [modules, moduleIds])

  const scopeGroups = useMemo(
    () => selectedModules.map((m) => ({ module: m, features: m.features })),
    [selectedModules],
  )

  // Resolved against the whole library rather than the modules in scope, so features picked
  // from another category survive into the summary and into the created project.
  const selectedFeatures = useMemo(
    () => featureIds.map((id) => FEATURE_BY_ID.get(id)).filter((f): f is MasterFeature => Boolean(f)),
    [featureIds, FEATURE_BY_ID],
  )

  const outsideFeatures = useMemo(
    () => selectedFeatures.filter((f) => f.categoryId !== categoryId),
    [selectedFeatures, categoryId],
  )

  const importedCaseCount = useMemo(
    () => selectedFeatures.reduce((n, f) => n + countFor(f.id), 0),
    [selectedFeatures, countFor],
  )

  const toggleModule = (id: string) => {
    setModuleIds((prev) => {
      if (prev.includes(id)) {
        const mod = modules.find((m) => m.id === id)
        const dropped = new Set(mod?.features.map((f) => f.id) ?? [])
        setFeatureIds((fs) => fs.filter((f) => !dropped.has(f)))
        return prev.filter((m) => m !== id)
      }
      return [...prev, id]
    })
  }

  const toggleFeature = (id: string) =>
    setFeatureIds((prev) => (prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]))

  const toggleFeatures = (ids: string[], on: boolean) =>
    setFeatureIds((prev) => {
      if (on) return Array.from(new Set([...prev, ...ids]))
      const drop = new Set(ids)
      return prev.filter((id) => !drop.has(id))
    })

  const nameError = touchedName && !name.trim() ? 'A project name is required.' : undefined

  const canContinue =
    (step === 1 && Boolean(name.trim())) ||
    (step === 2 && Boolean(categoryId)) ||
    (step === 3 && moduleIds.length > 0) ||
    (step === 4 && featureIds.length > 0) ||
    step === 5

  const next = () => {
    if (step === 1 && !name.trim()) {
      setTouchedName(true)
      return
    }
    if (!canContinue) return
    setStep((s) => Math.min(5, s + 1))
  }

  const submit = () => {
    const project = createProject({
      name,
      description,
      categoryId,
      masterFeatureIds: selectedFeatures.map((f) => f.id),
    })
    navigate(`/projects/${project.id}`)
  }

  return (
    <>
      <PageHeader
        title="Create Project"
        subtitle="Pick the features this project will implement — their master test cases are imported automatically."
        action={
          <Button icon={X} onClick={() => navigate('/projects')}>
            Cancel
          </Button>
        }
      />

      <Card className="mb-4 px-5 py-4">
        <Stepper step={step} onJump={setStep} />
      </Card>

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-[minmax(0,1fr)_20rem]">
        <Card className="min-w-0">
          {step === 1 ? (
            <div className="space-y-5 p-5">
              <h2 className="text-sm font-semibold text-slate-900">Step 1 — Project details</h2>
              <Field label="Project name" required error={nameError} hint="For example: RoofPro, ShopFlow Commerce">
                <input
                  autoFocus
                  className="input-base"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  onBlur={() => setTouchedName(true)}
                  placeholder="Enter a project name"
                  maxLength={120}
                />
              </Field>
              <Field
                label="Description"
                hint="What this build covers and what the QA cycle is for. Shown on the dashboard and reports."
              >
                <textarea
                  className="input-base min-h-[120px] resize-y"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Short summary of the project scope"
                  maxLength={600}
                />
              </Field>
            </div>
          ) : null}

          {step === 2 ? (
            <div className="p-5">
              <h2 className="text-sm font-semibold text-slate-900">Step 2 — Select the software category</h2>
              <p className="mt-1 text-xs text-slate-500">
                The category determines which modules, features and master test cases are available.
              </p>
              <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 2xl:grid-cols-3">
                {MASTER_CATEGORIES.map((c) => {
                  const active = c.id === categoryId
                  const featureCount = c.modules.reduce((n, m) => n + m.features.length, 0)
                  return (
                    <button
                      key={c.id}
                      type="button"
                      onClick={() => {
                        setCategoryId(c.id)
                        setModuleIds([])
                        setFeatureIds([])
                      }}
                      className={cn(
                        'flex h-full flex-col rounded-lg border p-4 text-left transition',
                        active
                          ? 'border-brand-500 bg-brand-50/50 ring-1 ring-brand-500/30'
                          : 'border-slate-200 bg-white hover:border-brand-300',
                      )}
                    >
                      <div className="flex items-start gap-2.5">
                        <span
                          className={cn(
                            'flex h-8 w-8 shrink-0 items-center justify-center rounded-lg',
                            active ? 'bg-brand-600 text-white' : 'bg-slate-100 text-slate-500',
                          )}
                        >
                          <DynamicIcon name={c.icon} className="h-4 w-4" />
                        </span>
                        <div className="min-w-0">
                          <p className="text-sm font-medium text-slate-900">{c.name}</p>
                          <p className="mt-0.5 text-2xs text-slate-500">
                            {c.modules.length} modules · {featureCount} features
                          </p>
                        </div>
                        {active ? <CheckCircle2 className="ml-auto h-4 w-4 shrink-0 text-brand-600" /> : null}
                      </div>
                      <p className="mt-2.5 line-clamp-2 text-xs leading-relaxed text-slate-500">{c.description}</p>
                    </button>
                  )
                })}
              </div>
            </div>
          ) : null}

          {step === 3 ? (
            <div className="p-5">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div>
                  <h2 className="text-sm font-semibold text-slate-900">Step 3 — Modules in scope</h2>
                  <p className="mt-1 text-xs text-slate-500">
                    Browse the modules available in {category?.name} and choose which ones this project covers.
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" onClick={() => setModuleIds(modules.map((m) => m.id))}>
                    Select all
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => {
                      setModuleIds([])
                      setFeatureIds([])
                    }}
                  >
                    Clear
                  </Button>
                </div>
              </div>
              <div className="mt-4 space-y-2">
                {modules.map((mod) => {
                  const active = moduleIds.includes(mod.id)
                  const caseCount = mod.features.reduce((n, f) => n + countFor(f.id), 0)
                  return (
                    <label
                      key={mod.id}
                      className={cn(
                        'flex cursor-pointer items-start gap-3 rounded-lg border p-4 transition',
                        active ? 'border-brand-500 bg-brand-50/40' : 'border-slate-200 hover:border-brand-300',
                      )}
                    >
                      <input
                        type="checkbox"
                        checked={active}
                        onChange={() => toggleModule(mod.id)}
                        className="mt-0.5 h-4 w-4 shrink-0 cursor-pointer rounded border-slate-300 text-brand-600 focus:ring-brand-500"
                      />
                      <span className="min-w-0 flex-1">
                        <span className="block text-sm font-medium text-slate-900">{mod.name}</span>
                        <span className="mt-1 block truncate text-xs text-slate-500">
                          {mod.features.map((f) => f.name).join(' · ')}
                        </span>
                      </span>
                      <span className="shrink-0 text-right">
                        <Badge size="sm" className="bg-slate-100 text-slate-600 ring-slate-500/20">
                          {mod.features.length} features
                        </Badge>
                        <span className="mt-1 block text-2xs text-slate-400">{caseCount} test cases</span>
                      </span>
                    </label>
                  )
                })}
              </div>
            </div>
          ) : null}

          {step === 4 ? (
            <div className="p-5">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h2 className="text-sm font-semibold text-slate-900">Step 4 — Select features</h2>
                  <p className="mt-1 text-xs text-slate-500">
                    Tick every feature this project will implement. Each one imports its own master test
                    cases, and the All categories tab reaches features outside {category?.name}.
                  </p>
                </div>
                <Badge className="bg-brand-50 text-brand-700 ring-brand-600/20">
                  {featureIds.length} selected
                </Badge>
              </div>

              <FeaturePicker
                scopeGroups={scopeGroups}
                scopeCategoryId={categoryId}
                scopeLabel={category?.name ?? 'This category'}
                selectedIds={featureIds}
                onToggle={toggleFeature}
                onToggleMany={toggleFeatures}
              />
            </div>
          ) : null}

          {step === 5 ? (
            <div className="p-5">
              <h2 className="text-sm font-semibold text-slate-900">Step 5 — Confirm and create</h2>
              <p className="mt-1 text-xs text-slate-500">
                Creating the project copies {importedCaseCount} master test cases into it. Those copies are
                independent — editing them never changes the master library.
              </p>

              <dl className="mt-4 divide-y divide-slate-100 overflow-hidden rounded-lg border border-slate-200">
                {(
                  [
                    ['Project name', name],
                    ['Description', description || '—'],
                    ['Software category', category?.name ?? '—'],
                    ['Modules in scope', selectedModules.map((m) => m.name).join(', ') || '—'],
                    ...(outsideFeatures.length > 0
                      ? [
                          [
                            'Added from other categories',
                            Array.from(new Set(outsideFeatures.map((f) => f.categoryName))).join(', '),
                          ],
                        ]
                      : []),
                  ] as Array<[string, string]>
                ).map(([label, value]) => (
                  <div key={label} className="grid grid-cols-1 gap-1 px-4 py-3 sm:grid-cols-[10rem_minmax(0,1fr)]">
                    <dt className="text-xs font-medium uppercase tracking-wide text-slate-500">{label}</dt>
                    <dd className="text-sm text-slate-800">{value}</dd>
                  </div>
                ))}
              </dl>

              <div className="mt-4 overflow-hidden rounded-lg border border-slate-200">
                <div className="flex items-center justify-between gap-3 border-b border-slate-200 bg-slate-50/70 px-4 py-2.5">
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Selected features ({selectedFeatures.length})
                  </h3>
                  <span className="text-xs text-slate-500">{importedCaseCount} test cases to import</span>
                </div>
                <ul className="divide-y divide-slate-100">
                  {selectedFeatures.map((f) => (
                    <li key={f.id} className="flex items-center justify-between gap-3 px-4 py-2.5">
                      <span className="min-w-0">
                        <span className="block truncate text-sm text-slate-800">{f.name}</span>
                        <span className="block truncate text-2xs text-slate-500">
                          {f.categoryId === categoryId ? f.moduleName : `${f.categoryName} · ${f.moduleName}`}
                        </span>
                      </span>
                      <Badge size="sm" className="shrink-0 bg-slate-100 text-slate-600 ring-slate-500/20">
                        {countFor(f.id)} cases
                      </Badge>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ) : null}

          <div className="flex items-center justify-between gap-3 border-t border-slate-200 bg-slate-50/60 px-5 py-3">
            <Button icon={ArrowLeft} disabled={step === 1} onClick={() => setStep((s) => Math.max(1, s - 1))}>
              Back
            </Button>
            {step < 5 ? (
              <Button variant="primary" disabled={!canContinue} onClick={next}>
                Continue
                <ArrowRight className="h-4 w-4" />
              </Button>
            ) : (
              <Button variant="primary" icon={Rocket} onClick={submit} disabled={selectedFeatures.length === 0}>
                Create project &amp; import {importedCaseCount} test cases
              </Button>
            )}
          </div>
        </Card>

        <Card className="h-fit xl:sticky xl:top-20">
          <div className="border-b border-slate-200 px-5 py-4">
            <h2 className="text-sm font-semibold text-slate-900">Summary</h2>
          </div>
          <dl className="space-y-3 px-5 py-4 text-sm">
            <div>
              <dt className="text-xs uppercase tracking-wide text-slate-500">Project</dt>
              <dd className="mt-0.5 truncate font-medium text-slate-900">{name.trim() || 'Untitled project'}</dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-wide text-slate-500">Category</dt>
              <dd className="mt-0.5 flex items-center gap-2 text-slate-800">
                {category ? (
                  <>
                    <DynamicIcon name={category.icon} className="h-4 w-4 text-slate-400" />
                    {category.name}
                  </>
                ) : (
                  <span className="text-slate-400">Not selected</span>
                )}
              </dd>
            </div>
          </dl>
          <div className="grid grid-cols-3 gap-2 border-t border-slate-200 px-5 py-4 text-center">
            {[
              ['Modules', moduleIds.length, Layers],
              ['Features', featureIds.length, CheckCircle2],
              ['Test cases', importedCaseCount, FileCheck2],
            ].map(([label, value, Icon]) => {
              const Cmp = Icon as typeof Layers
              return (
                <div key={label as string} className="rounded-lg bg-slate-50 px-2 py-3">
                  <Cmp className="mx-auto h-4 w-4 text-slate-400" />
                  <p className="mt-1.5 text-base font-semibold tabular-nums text-slate-900">{value as number}</p>
                  <p className="text-2xs uppercase tracking-wide text-slate-500">{label as string}</p>
                </div>
              )
            })}
          </div>
          {selectedFeatures.length > 0 ? (
            <div className="border-t border-slate-200 px-5 py-4">
              <p className="mb-2 text-xs uppercase tracking-wide text-slate-500">Selected features</p>
              <ul className="flex flex-wrap gap-1.5">
                {selectedFeatures.slice(0, 12).map((f) => (
                  <li key={f.id} title={`${f.categoryName} · ${f.moduleName}`}>
                    <Badge
                      className={cn(
                        f.categoryId === categoryId
                          ? 'bg-brand-50 text-brand-700 ring-brand-600/20'
                          : 'bg-violet-50 text-violet-700 ring-violet-600/20',
                      )}
                    >
                      {f.name}
                    </Badge>
                  </li>
                ))}
                {selectedFeatures.length > 12 ? (
                  <li>
                    <Badge className="bg-slate-100 text-slate-600 ring-slate-500/20">
                      +{selectedFeatures.length - 12} more
                    </Badge>
                  </li>
                ) : null}
              </ul>
            </div>
          ) : null}
        </Card>
      </div>
    </>
  )
}
