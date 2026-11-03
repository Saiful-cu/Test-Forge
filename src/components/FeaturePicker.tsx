import { useMemo, useState } from 'react'
import { ChevronDown, ChevronRight, FileCheck2, Search } from 'lucide-react'
import { Badge, DynamicIcon, SearchInput } from './ui'
import { useMasterLibrary } from '../store/MasterLibraryContext'
import type { MasterFeature, MasterModule } from '../types'
import { cn } from '../lib/utils'

/** Flat match lists are capped so a one-letter query cannot mount every feature at once. */
const MAX_RESULTS = 150

export interface FeatureGroup {
  module: MasterModule
  features: MasterFeature[]
}

function matches(feature: MasterFeature, q: string) {
  return (
    feature.name.toLowerCase().includes(q) ||
    feature.moduleName.toLowerCase().includes(q) ||
    feature.categoryName.toLowerCase().includes(q) ||
    feature.description.toLowerCase().includes(q)
  )
}

function FeatureRow({
  feature,
  checked,
  onToggle,
  caseCount,
  source,
}: {
  feature: MasterFeature
  checked: boolean
  onToggle: () => void
  caseCount: number
  /** Shown when the row is reached through search, where the grouping headers are absent. */
  source?: string
}) {
  return (
    <label
      className={cn(
        'flex cursor-pointer items-start gap-3 px-4 py-3 transition',
        checked ? 'bg-brand-50/40' : 'hover:bg-slate-50',
      )}
    >
      <input
        type="checkbox"
        checked={checked}
        onChange={onToggle}
        className="mt-0.5 h-4 w-4 shrink-0 cursor-pointer rounded border-slate-300 text-brand-600 focus:ring-brand-500"
      />
      <span className="min-w-0 flex-1">
        <span className="block text-sm font-medium text-slate-900">{feature.name}</span>
        {source ? <span className="mt-0.5 block truncate text-2xs text-slate-400">{source}</span> : null}
        <span className="mt-0.5 block line-clamp-2 text-xs leading-relaxed text-slate-500">
          {feature.description}
        </span>
      </span>
      <Badge size="sm" className="shrink-0 bg-slate-100 text-slate-600 ring-slate-500/20">
        <FileCheck2 className="h-3 w-3" />
        {caseCount}
      </Badge>
    </label>
  )
}

function ModuleGroup({
  module,
  features,
  selected,
  onToggle,
  onToggleMany,
  countFor,
  className,
}: FeatureGroup & {
  selected: Set<string>
  onToggle: (featureId: string) => void
  onToggleMany: (featureIds: string[], on: boolean) => void
  countFor: (featureId: string) => number
  className?: string
}) {
  const ids = features.map((f) => f.id)
  const allOn = ids.every((id) => selected.has(id))
  return (
    <div className={cn('overflow-hidden rounded-lg border border-slate-200', className)}>
      <div className="flex items-center justify-between gap-3 border-b border-slate-200 bg-slate-50/70 px-4 py-2.5">
        <h3 className="truncate text-xs font-semibold uppercase tracking-wider text-slate-500">{module.name}</h3>
        <button
          type="button"
          onClick={() => onToggleMany(ids, !allOn)}
          className="shrink-0 text-xs font-medium text-brand-600 hover:text-brand-700"
        >
          {allOn ? 'Deselect all' : 'Select all'}
        </button>
      </div>
      <div className="divide-y divide-slate-100">
        {features.map((f) => (
          <FeatureRow
            key={f.id}
            feature={f}
            checked={selected.has(f.id)}
            onToggle={() => onToggle(f.id)}
            caseCount={countFor(f.id)}
          />
        ))}
      </div>
    </div>
  )
}

/**
 * Feature selector used by project creation and by the add-features dialog.
 *
 * The first tab holds the features already in scope — the modules picked during creation, or
 * the project's own category when editing. The second reaches every other category, so a
 * project is never limited to the category it was filed under.
 */
export function FeaturePicker({
  scopeGroups,
  scopeCategoryId,
  scopeLabel,
  selectedIds,
  onToggle,
  onToggleMany,
  excludeIds,
  listClassName,
}: {
  /** Features offered on the first tab, grouped by module. */
  scopeGroups: FeatureGroup[]
  /** Category the first tab covers; its features are left out of the second tab. */
  scopeCategoryId: string
  /** Name of that category, used in the tab label and empty states. */
  scopeLabel: string
  selectedIds: string[]
  onToggle: (featureId: string) => void
  onToggleMany: (featureIds: string[], on: boolean) => void
  /** Features that cannot be offered at all — already part of the project. */
  excludeIds?: string[]
  /** Height constraints differ between the wizard page and the dialog. */
  listClassName?: string
}) {
  const { categories, features, countFor } = useMasterLibrary()
  // Opens on the other categories when the first tab has nothing left to offer, which is how
  // the add-features dialog looks once a project already holds its whole category.
  const [tab, setTab] = useState<'scope' | 'all'>(() => {
    const taken = new Set(excludeIds ?? [])
    return scopeGroups.some((g) => g.features.some((f) => !taken.has(f.id))) ? 'scope' : 'all'
  })
  const [query, setQuery] = useState('')
  const [openCategories, setOpenCategories] = useState<string[]>([])

  const q = query.trim().toLowerCase()
  const excluded = useMemo(() => new Set(excludeIds ?? []), [excludeIds])
  const selected = useMemo(() => new Set(selectedIds), [selectedIds])

  const scopeAvailable = useMemo(
    () =>
      scopeGroups
        .map((g) => ({ module: g.module, features: g.features.filter((f) => !excluded.has(f.id)) }))
        .filter((g) => g.features.length > 0),
    [scopeGroups, excluded],
  )

  const scopeIds = useMemo(
    () => new Set(scopeAvailable.flatMap((g) => g.features.map((f) => f.id))),
    [scopeAvailable],
  )

  const scopeVisible = useMemo(
    () =>
      scopeAvailable
        .map((g) => ({ module: g.module, features: q ? g.features.filter((f) => matches(f, q)) : g.features }))
        .filter((g) => g.features.length > 0),
    [scopeAvailable, q],
  )

  // Every category other than the one the first tab covers, with the already-taken features
  // stripped out so an empty category never shows up as an expandable row.
  const otherCategories = useMemo(
    () =>
      categories
        .filter((c) => c.id !== scopeCategoryId)
        .map((c) => {
          const modules = c.modules
            .map((m) => ({ module: m, features: m.features.filter((f) => !excluded.has(f.id)) }))
            .filter((g) => g.features.length > 0)
          return { category: c, modules, count: modules.reduce((n, g) => n + g.features.length, 0) }
        })
        .filter((c) => c.count > 0),
    [categories, scopeCategoryId, excluded],
  )

  const allMatches = useMemo(() => {
    if (!q) return []
    return features.filter((f) => f.categoryId !== scopeCategoryId && !excluded.has(f.id) && matches(f, q))
  }, [features, q, scopeCategoryId, excluded])

  const scopeSelected = selectedIds.filter((id) => scopeIds.has(id)).length
  const outsideSelected = selectedIds.length - scopeSelected

  const toggleCategory = (id: string) =>
    setOpenCategories((prev) => (prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]))

  const groupProps = { selected, onToggle, onToggleMany, countFor }

  return (
    <div>
      <div role="tablist" aria-label="Feature source" className="flex gap-1 border-b border-slate-200">
        {(
          [
            ['scope', `${scopeLabel} (${scopeSelected}/${scopeIds.size})`],
            ['all', 'All categories'],
          ] as const
        ).map(([id, label]) => (
          <button
            key={id}
            type="button"
            role="tab"
            aria-selected={tab === id}
            onClick={() => setTab(id)}
            className={cn(
              '-mb-px flex items-center gap-1.5 border-b-2 px-3 py-2 text-sm font-medium transition',
              tab === id
                ? 'border-brand-600 text-brand-700'
                : 'border-transparent text-slate-500 hover:text-slate-700',
            )}
          >
            <span className="max-w-[16rem] truncate">{label}</span>
            {id === 'all' && outsideSelected > 0 ? (
              <Badge size="sm" className="bg-brand-50 text-brand-700 ring-brand-600/20">
                {outsideSelected}
              </Badge>
            ) : null}
          </button>
        ))}
      </div>

      <SearchInput
        value={query}
        onChange={setQuery}
        placeholder={tab === 'scope' ? 'Filter these features…' : 'Search every category…'}
        className="mt-4"
      />

      <div role="tabpanel" className={cn('mt-4 space-y-3', listClassName)}>
        {tab === 'scope' ? (
          <>
            {scopeVisible.map((g) => (
              <ModuleGroup key={g.module.id} module={g.module} features={g.features} {...groupProps} />
            ))}
            {scopeVisible.length === 0 ? (
              <p className="flex items-center gap-2 rounded-lg bg-slate-50 px-4 py-6 text-sm text-slate-500">
                <Search className="h-4 w-4 shrink-0" />
                {q
                  ? `No ${scopeLabel} features match “${query.trim()}”. Try the All categories tab.`
                  : `Nothing left to add from ${scopeLabel}. Try the All categories tab.`}
              </p>
            ) : null}
          </>
        ) : null}

        {tab === 'all' && q ? (
          allMatches.length > 0 ? (
            <div className="overflow-hidden rounded-lg border border-slate-200">
              <div className="border-b border-slate-200 bg-slate-50/70 px-4 py-2.5">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                  {allMatches.length} {allMatches.length === 1 ? 'match' : 'matches'} outside {scopeLabel}
                </h3>
              </div>
              <div className="divide-y divide-slate-100">
                {allMatches.slice(0, MAX_RESULTS).map((f) => (
                  <FeatureRow
                    key={f.id}
                    feature={f}
                    checked={selected.has(f.id)}
                    onToggle={() => onToggle(f.id)}
                    caseCount={countFor(f.id)}
                    source={`${f.categoryName} · ${f.moduleName}`}
                  />
                ))}
              </div>
              {allMatches.length > MAX_RESULTS ? (
                <p className="border-t border-slate-200 bg-slate-50/70 px-4 py-2.5 text-xs text-slate-500">
                  Showing the first {MAX_RESULTS}. Narrow your search to see the rest.
                </p>
              ) : null}
            </div>
          ) : (
            <p className="flex items-center gap-2 rounded-lg bg-slate-50 px-4 py-6 text-sm text-slate-500">
              <Search className="h-4 w-4 shrink-0" />
              No features outside {scopeLabel} match “{query.trim()}”.
            </p>
          )
        ) : null}

        {tab === 'all' && !q ? (
          <>
            {otherCategories.map(({ category, modules, count }) => {
              const open = openCategories.includes(category.id)
              const chosen = modules.reduce((n, g) => n + g.features.filter((f) => selected.has(f.id)).length, 0)
              return (
                <div key={category.id} className="overflow-hidden rounded-lg border border-slate-200">
                  <button
                    type="button"
                    onClick={() => toggleCategory(category.id)}
                    aria-expanded={open}
                    className="flex w-full items-center gap-3 px-4 py-3 text-left transition hover:bg-slate-50"
                  >
                    {open ? (
                      <ChevronDown className="h-4 w-4 shrink-0 text-slate-400" />
                    ) : (
                      <ChevronRight className="h-4 w-4 shrink-0 text-slate-400" />
                    )}
                    <DynamicIcon name={category.icon} className="h-4 w-4 shrink-0 text-slate-400" />
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-sm font-medium text-slate-900">{category.name}</span>
                      <span className="block text-2xs text-slate-500">
                        {modules.length} modules · {count} features
                      </span>
                    </span>
                    {chosen > 0 ? (
                      <Badge size="sm" className="shrink-0 bg-brand-50 text-brand-700 ring-brand-600/20">
                        {chosen} selected
                      </Badge>
                    ) : null}
                  </button>
                  {open ? (
                    <div className="space-y-3 border-t border-slate-200 bg-slate-50/40 p-3">
                      {modules.map((g) => (
                        <ModuleGroup
                          key={g.module.id}
                          module={g.module}
                          features={g.features}
                          className="bg-white"
                          {...groupProps}
                        />
                      ))}
                    </div>
                  ) : null}
                </div>
              )
            })}
            {otherCategories.length === 0 ? (
              <p className="py-6 text-center text-sm text-slate-500">
                Every feature outside {scopeLabel} is already part of this project.
              </p>
            ) : null}
          </>
        ) : null}
      </div>
    </div>
  )
}
