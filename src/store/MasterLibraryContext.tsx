import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from 'react'
import { useAuth } from './AuthContext'
import { api } from '../lib/api'
import type { MasterCategory, MasterFeature, MasterModule, MasterTestCase } from '../types'
import {
  BUILT_IN_EXTRA_CASE_IDS,
  BUILT_IN_FEATURE_IDS,
  BUILT_IN_MODULE_IDS,
  MASTER_CATEGORIES,
  featureIdForTestCaseId,
  invalidateFeature,
  masterCaseCountFor,
  exampleFor,
  masterTestCasesFor,
  nextTestCaseId,
  registerFeature,
  slugify,
} from '../data/masterLibrary'
import { uid } from '../lib/utils'


export interface CustomModule {
  id: string
  categoryId: string
  name: string
}

export interface CustomFeature {
  id: string
  categoryId: string
  moduleId: string
  name: string
  description: string
}

/**
 * Only the differences from the generated baseline are persisted — storing the whole master
 * library would be both large and redundant.
 */
interface Overlay {
  added: MasterTestCase[]
  edits: Record<string, Partial<MasterTestCase>>
  deleted: string[]
  modulesAdded: CustomModule[]
  modulesEdited: Record<string, { name: string }>
  modulesDeleted: string[]
  featuresAdded: CustomFeature[]
  featuresEdited: Record<string, { name?: string; description?: string }>
  featuresDeleted: string[]
}

const EMPTY: Overlay = {
  added: [],
  edits: {},
  deleted: [],
  modulesAdded: [],
  modulesEdited: {},
  modulesDeleted: [],
  featuresAdded: [],
  featuresEdited: {},
  featuresDeleted: [],
}

export type NewMasterTestCase = Omit<MasterTestCase, 'id' | 'featureId'>

interface MasterLibraryValue {
  /** The library tree with the user's modules and features merged in. */
  categories: MasterCategory[]
  features: MasterFeature[]
  categoryById: Map<string, MasterCategory>
  featureById: Map<string, MasterFeature>

  casesFor: (featureId: string) => MasterTestCase[]
  countFor: (featureId: string) => number
  allCases: () => MasterTestCase[]
  casesForFeatures: (features: MasterFeature[]) => MasterTestCase[]
  totalCount: number
  stats: { categories: number; modules: number; features: number; testCases: number }

  isCustom: (id: string) => boolean
  isEdited: (id: string) => boolean
  isCustomModule: (id: string) => boolean
  isCustomFeature: (id: string) => boolean

  addTestCase: (featureId: string, input: NewMasterTestCase) => MasterTestCase
  updateTestCase: (id: string, patch: Partial<MasterTestCase>) => void
  deleteTestCase: (id: string) => void

  addModule: (categoryId: string, name: string) => MasterModule | null
  renameModule: (moduleId: string, name: string) => void
  deleteModule: (moduleId: string) => void

  addFeature: (input: { categoryId: string; moduleId: string; name: string; description: string }) => MasterFeature | null
  updateFeature: (featureId: string, patch: { name?: string; description?: string }) => void
  deleteFeature: (featureId: string) => void

  changeCount: number
  resetLibrary: () => void
  /** The saved version number of the master library (0 = the built-in library). */
  libraryVersion: number
  /** Set when the last write to the server failed or lost a version conflict. */
  syncError: string | null
  reloadLibrary: () => Promise<void>
}

const MasterLibraryContext = createContext<MasterLibraryValue | null>(null)

function normalizeOverlay(parsed: Partial<Overlay> | null): Overlay {
  if (!parsed) return EMPTY
  // Additions that have since been folded into the shipped library are dropped here, so a
  // saved overlay that still has them does not show every one of them twice.
  return {
    ...EMPTY,
    ...parsed,
    added: (Array.isArray(parsed.added) ? parsed.added : []).filter((tc) => !BUILT_IN_EXTRA_CASE_IDS.has(tc.id)),
    edits: parsed.edits && typeof parsed.edits === 'object' ? parsed.edits : {},
    deleted: Array.isArray(parsed.deleted) ? parsed.deleted : [],
    modulesAdded: (Array.isArray(parsed.modulesAdded) ? parsed.modulesAdded : []).filter(
      (m) => !BUILT_IN_MODULE_IDS.has(m.id),
    ),
    modulesEdited: parsed.modulesEdited ?? {},
    modulesDeleted: Array.isArray(parsed.modulesDeleted) ? parsed.modulesDeleted : [],
    featuresAdded: (Array.isArray(parsed.featuresAdded) ? parsed.featuresAdded : []).filter(
      (f) => !BUILT_IN_FEATURE_IDS.has(f.id),
    ),
    featuresEdited: parsed.featuresEdited ?? {},
    featuresDeleted: Array.isArray(parsed.featuresDeleted) ? parsed.featuresDeleted : [],
  }
}

/** A short human summary of what changed between two overlays, used as the version message. */
function describeChange(before: Overlay, after: Overlay): string {
  const parts: string[] = []
  const diff = (label: string, a: number, b: number) => {
    if (b > a) parts.push(`+${b - a} ${label}`)
    else if (b < a) parts.push(`−${a - b} ${label}`)
  }
  diff('test cases added', before.added.length, after.added.length)
  diff('test cases deleted', before.deleted.length, after.deleted.length)
  diff('test cases edited', Object.keys(before.edits).length, Object.keys(after.edits).length)
  diff('groups added', before.modulesAdded.length, after.modulesAdded.length)
  diff('groups deleted', before.modulesDeleted.length, after.modulesDeleted.length)
  diff('groups renamed', Object.keys(before.modulesEdited).length, Object.keys(after.modulesEdited).length)
  diff('features added', before.featuresAdded.length, after.featuresAdded.length)
  diff('features deleted', before.featuresDeleted.length, after.featuresDeleted.length)
  diff('features edited', Object.keys(before.featuresEdited).length, Object.keys(after.featuresEdited).length)
  return parts.length ? parts.join(', ') : 'Library updated'
}

export function MasterLibraryProvider({ children }: { children: ReactNode }) {
  const { user, isAdmin, checked } = useAuth()
  const [overlay, setOverlay] = useState<Overlay>(EMPTY)
  const [libraryVersion, setLibraryVersion] = useState(0)
  const [syncError, setSyncError] = useState<string | null>(null)
  const [loaded, setLoaded] = useState(false)
  // What the server last confirmed; the overlay is only written back when it differs.
  const synced = useRef<{ json: string; overlay: Overlay; version: number }>({ json: JSON.stringify(EMPTY), overlay: EMPTY, version: 0 })

  const applyServer = useCallback((incoming: Partial<Overlay> | null, version: number) => {
    const next = normalizeOverlay(incoming)
    synced.current = { json: JSON.stringify(next), overlay: next, version }
    setOverlay(next)
    setLibraryVersion(version)
  }, [])

  const reloadLibrary = useCallback(async () => {
    const r = await api<{ version: number; overlay: Partial<Overlay> | null }>('GET', '/library')
    applyServer(r.overlay, r.version)
  }, [applyServer])

  useEffect(() => {
    if (!checked) return
    let cancelled = false
    reloadLibrary()
      .then(() => !cancelled && setLoaded(true))
      .catch((err) => {
        console.warn('Could not load the master library, using the built-in library.', err)
        if (!cancelled) setLoaded(true)
      })
    return () => {
      cancelled = true
    }
  }, [user, checked, reloadLibrary])

  // Admin edits are saved as a new version, a moment after the last change.
  useEffect(() => {
    if (!loaded || !isAdmin) return
    const json = JSON.stringify(overlay)
    if (json === synced.current.json) return
    const timer = setTimeout(() => {
      const base = synced.current
      api<{ version: number }>('PUT', '/library', {
        overlay,
        baseVersion: base.version,
        message: describeChange(base.overlay, overlay),
      })
        .then((r) => {
          synced.current = { json, overlay, version: r.version }
          setLibraryVersion(r.version)
          setSyncError(null)
        })
        .catch((err: unknown) => {
          const body = (err as { body?: { overlay?: Partial<Overlay> | null; version?: number } }).body
          if ((err as { status?: number }).status === 409 && body) applyServer(body.overlay ?? null, body.version ?? 0)
          setSyncError(err instanceof Error ? err.message : 'Library changes could not be saved.')
        })
    }, 600)
    return () => clearTimeout(timer)
  }, [overlay, loaded, isAdmin, applyServer])

  /* ----------------------------- the merged tree ---------------------------- */

  const tree = useMemo(() => {
    const deletedModules = new Set(overlay.modulesDeleted)
    const deletedFeatures = new Set(overlay.featuresDeleted)
    const addedModulesByCategory = new Map<string, CustomModule[]>()
    for (const mod of overlay.modulesAdded) {
      const list = addedModulesByCategory.get(mod.categoryId)
      if (list) list.push(mod)
      else addedModulesByCategory.set(mod.categoryId, [mod])
    }
    const addedFeaturesByModule = new Map<string, CustomFeature[]>()
    for (const f of overlay.featuresAdded) {
      const list = addedFeaturesByModule.get(f.moduleId)
      if (list) list.push(f)
      else addedFeaturesByModule.set(f.moduleId, [f])
    }

    const features: MasterFeature[] = []

    const decorate = (f: MasterFeature, moduleName: string): MasterFeature => {
      const patch = overlay.featuresEdited[f.id]
      return patch ? { ...f, ...patch, moduleName } : { ...f, moduleName }
    }

    const categories: MasterCategory[] = MASTER_CATEGORIES.map((category) => {
      const baseModules: MasterModule[] = category.modules
        .filter((mod) => !deletedModules.has(mod.id))
        .map((mod) => {
          const name = overlay.modulesEdited[mod.id]?.name ?? mod.name
          const own = mod.features.filter((f) => !deletedFeatures.has(f.id)).map((f) => decorate(f, name))
          for (const custom of addedFeaturesByModule.get(mod.id) ?? []) {
            if (deletedFeatures.has(custom.id)) continue
            own.push({
              id: custom.id,
              name: overlay.featuresEdited[custom.id]?.name ?? custom.name,
              description: overlay.featuresEdited[custom.id]?.description ?? custom.description,
              example: exampleFor(
                overlay.featuresEdited[custom.id]?.name ?? custom.name,
                name,
                category.name,
              ),
              moduleId: mod.id,
              moduleName: name,
              categoryId: category.id,
              categoryName: category.name,
            })
          }
          return { id: mod.id, name, categoryId: category.id, features: own }
        })

      for (const custom of addedModulesByCategory.get(category.id) ?? []) {
        if (deletedModules.has(custom.id)) continue
        const name = overlay.modulesEdited[custom.id]?.name ?? custom.name
        const own = (addedFeaturesByModule.get(custom.id) ?? [])
          .filter((f) => !deletedFeatures.has(f.id))
          .map((f) => ({
            id: f.id,
            name: overlay.featuresEdited[f.id]?.name ?? f.name,
            description: overlay.featuresEdited[f.id]?.description ?? f.description,
            example: exampleFor(overlay.featuresEdited[f.id]?.name ?? f.name, name, category.name),
            moduleId: custom.id,
            moduleName: name,
            categoryId: category.id,
            categoryName: category.name,
          }))
        baseModules.push({ id: custom.id, name, categoryId: category.id, features: own })
      }

      for (const mod of baseModules) features.push(...mod.features)
      return { ...category, modules: baseModules }
    })

    // Features created by the user need a plan before their test cases can be generated.
    // Registration is idempotent, so doing it here keeps the first render consistent.
    for (const f of features) {
      if (overlay.featuresAdded.some((c) => c.id === f.id)) registerFeature(f)
    }

    return {
      categories,
      features,
      categoryById: new Map(categories.map((c) => [c.id, c])),
      featureById: new Map(features.map((f) => [f.id, f])),
      customModuleIds: new Set(overlay.modulesAdded.map((m) => m.id)),
      customFeatureIds: new Set(overlay.featuresAdded.map((f) => f.id)),
    }
  }, [overlay])

  /* ------------------------------- test cases ------------------------------- */

  const derived = useMemo(() => {
    const deleted = new Set(overlay.deleted)
    const addedByFeature = new Map<string, MasterTestCase[]>()
    for (const tc of overlay.added) {
      const list = addedByFeature.get(tc.featureId)
      if (list) list.push(tc)
      else addedByFeature.set(tc.featureId, [tc])
    }
    const deletedByFeature = new Map<string, number>()
    for (const id of overlay.deleted) {
      const fid = featureIdForTestCaseId(id)
      if (!fid) continue
      deletedByFeature.set(fid, (deletedByFeature.get(fid) ?? 0) + 1)
    }
    return { deleted, addedByFeature, deletedByFeature, customIds: new Set(overlay.added.map((t) => t.id)) }
  }, [overlay])

  const cache = useMemo(() => new Map<string, MasterTestCase[]>(), [overlay])

  const casesFor = useCallback(
    (featureId: string): MasterTestCase[] => {
      const hit = cache.get(featureId)
      if (hit) return hit
      const { deleted, addedByFeature } = derived
      const out: MasterTestCase[] = []
      for (const tc of masterTestCasesFor(featureId)) {
        if (deleted.has(tc.id)) continue
        const patch = overlay.edits[tc.id]
        out.push(patch ? { ...tc, ...patch } : tc)
      }
      for (const tc of addedByFeature.get(featureId) ?? []) {
        if (deleted.has(tc.id)) continue
        const patch = overlay.edits[tc.id]
        out.push(patch ? { ...tc, ...patch } : tc)
      }
      cache.set(featureId, out)
      return out
    },
    [cache, derived, overlay.edits],
  )

  const countFor = useCallback(
    (featureId: string) =>
      masterCaseCountFor(featureId) +
      (derived.addedByFeature.get(featureId)?.length ?? 0) -
      (derived.deletedByFeature.get(featureId) ?? 0),
    [derived],
  )

  const addTestCase = useCallback<MasterLibraryValue['addTestCase']>(
    (featureId, input) => {
      const created: MasterTestCase = { ...input, id: nextTestCaseId(featureId, overlay.added), featureId }
      setOverlay((prev) => ({ ...prev, added: [...prev.added, created] }))
      return created
    },
    [overlay.added],
  )

  const value = useMemo<MasterLibraryValue>(() => {
    const totalCount = tree.features.reduce((n, f) => n + countFor(f.id), 0)
    const moduleCount = tree.categories.reduce((n, c) => n + c.modules.length, 0)

    return {
      categories: tree.categories,
      features: tree.features,
      categoryById: tree.categoryById,
      featureById: tree.featureById,

      casesFor,
      countFor,
      allCases: () => tree.features.flatMap((f) => casesFor(f.id)),
      casesForFeatures: (features) => features.flatMap((f) => casesFor(f.id)),
      totalCount,
      stats: {
        categories: tree.categories.length,
        modules: moduleCount,
        features: tree.features.length,
        testCases: totalCount,
      },

      isCustom: (id) => derived.customIds.has(id),
      isEdited: (id) => Boolean(overlay.edits[id]),
      isCustomModule: (id) => tree.customModuleIds.has(id),
      isCustomFeature: (id) => tree.customFeatureIds.has(id),

      addTestCase,
      updateTestCase: (id, patch) =>
        setOverlay((prev) => {
          const { id: _id, featureId: _featureId, ...fields } = patch
          if (prev.added.some((t) => t.id === id)) {
            return { ...prev, added: prev.added.map((t) => (t.id === id ? { ...t, ...fields } : t)) }
          }
          return { ...prev, edits: { ...prev.edits, [id]: { ...prev.edits[id], ...fields } } }
        }),
      deleteTestCase: (id) =>
        setOverlay((prev) => ({
          ...prev,
          added: prev.added.filter((t) => t.id !== id),
          deleted: prev.added.some((t) => t.id === id) ? prev.deleted : [...prev.deleted, id],
        })),

      /* --------------------------- feature groups --------------------------- */

      addModule: (categoryId, name) => {
        const trimmed = name.trim()
        const category = tree.categoryById.get(categoryId)
        if (!trimmed || !category) return null
        const mod: CustomModule = {
          id: `${categoryId}__${slugify(trimmed)}__${uid('m').slice(-5)}`,
          categoryId,
          name: trimmed,
        }
        setOverlay((prev) => ({ ...prev, modulesAdded: [...prev.modulesAdded, mod] }))
        return { id: mod.id, name: trimmed, categoryId, features: [] }
      },
      renameModule: (moduleId, name) => {
        const trimmed = name.trim()
        if (!trimmed) return
        setOverlay((prev) => ({
          ...prev,
          modulesAdded: prev.modulesAdded.map((m) => (m.id === moduleId ? { ...m, name: trimmed } : m)),
          modulesEdited: prev.modulesAdded.some((m) => m.id === moduleId)
            ? prev.modulesEdited
            : { ...prev.modulesEdited, [moduleId]: { name: trimmed } },
        }))
      },
      deleteModule: (moduleId) =>
        setOverlay((prev) => {
          const wasCustom = prev.modulesAdded.some((m) => m.id === moduleId)
          // Features inside the group go with it; their test cases follow from that.
          const customFeaturesInside = prev.featuresAdded.filter((f) => f.moduleId === moduleId).map((f) => f.id)
          return {
            ...prev,
            modulesAdded: prev.modulesAdded.filter((m) => m.id !== moduleId),
            modulesDeleted: wasCustom ? prev.modulesDeleted : [...prev.modulesDeleted, moduleId],
            featuresAdded: prev.featuresAdded.filter((f) => f.moduleId !== moduleId),
            featuresDeleted: prev.featuresDeleted.filter((id) => !customFeaturesInside.includes(id)),
          }
        }),

      /* ------------------------------ features ------------------------------ */

      addFeature: ({ categoryId, moduleId, name, description }) => {
        const trimmed = name.trim()
        const category = tree.categoryById.get(categoryId)
        const mod = category?.modules.find((m) => m.id === moduleId)
        if (!trimmed || !category || !mod) return null
        const feature: CustomFeature = {
          id: `${moduleId}__${slugify(trimmed)}__${uid('f').slice(-5)}`,
          categoryId,
          moduleId,
          name: trimmed,
          description:
            description.trim() ||
            `${trimmed} in the ${mod.name} module — added to the master library for this workspace.`,
        }
        // Register before the state update so its mandatory checks exist immediately.
        registerFeature({
          id: feature.id,
          name: feature.name,
          description: feature.description,
          moduleId,
          moduleName: mod.name,
          categoryId,
          categoryName: category.name,
        })
        setOverlay((prev) => ({ ...prev, featuresAdded: [...prev.featuresAdded, feature] }))
        return {
          id: feature.id,
          name: feature.name,
          description: feature.description,
          moduleId,
          moduleName: mod.name,
          categoryId,
          categoryName: category.name,
        }
      },
      updateFeature: (featureId, patch) => {
        const next = {
          ...(patch.name !== undefined ? { name: patch.name.trim() } : {}),
          ...(patch.description !== undefined ? { description: patch.description.trim() } : {}),
        }
        if (Object.keys(next).length === 0) return
        // The generated cases quote the feature name, so they are rebuilt after a rename.
        if (next.name) invalidateFeature(featureId)
        setOverlay((prev) => ({
          ...prev,
          featuresAdded: prev.featuresAdded.map((f) => (f.id === featureId ? { ...f, ...next } : f)),
          featuresEdited: prev.featuresAdded.some((f) => f.id === featureId)
            ? prev.featuresEdited
            : { ...prev.featuresEdited, [featureId]: { ...prev.featuresEdited[featureId], ...next } },
        }))
      },
      deleteFeature: (featureId) =>
        setOverlay((prev) => ({
          ...prev,
          featuresAdded: prev.featuresAdded.filter((f) => f.id !== featureId),
          featuresDeleted: prev.featuresAdded.some((f) => f.id === featureId)
            ? prev.featuresDeleted
            : [...prev.featuresDeleted, featureId],
        })),

      changeCount:
        overlay.added.length +
        overlay.deleted.length +
        Object.keys(overlay.edits).length +
        overlay.modulesAdded.length +
        overlay.modulesDeleted.length +
        Object.keys(overlay.modulesEdited).length +
        overlay.featuresAdded.length +
        overlay.featuresDeleted.length +
        Object.keys(overlay.featuresEdited).length,
      resetLibrary: () => setOverlay(EMPTY),
      libraryVersion,
      syncError,
      reloadLibrary,
    }
  }, [tree, casesFor, countFor, derived, overlay, addTestCase, libraryVersion, syncError, reloadLibrary])

  // Only an admin may change the master library; for everyone else every mutator is a no-op,
  // so a hidden button or a stale dialog still cannot write.
  const guarded = useMemo<MasterLibraryValue>(
    () =>
      isAdmin
        ? value
        : {
            ...value,
            addTestCase: () => {
              throw new Error('Only an admin can edit the master library.')
            },
            updateTestCase: () => {},
            deleteTestCase: () => {},
            addModule: () => null,
            renameModule: () => {},
            deleteModule: () => {},
            addFeature: () => null,
            updateFeature: () => {},
            deleteFeature: () => {},
            resetLibrary: () => {},
          },
    [value, isAdmin],
  )

  return <MasterLibraryContext.Provider value={guarded}>{children}</MasterLibraryContext.Provider>
}

export function useMasterLibrary(): MasterLibraryValue {
  const ctx = useContext(MasterLibraryContext)
  if (!ctx) throw new Error('useMasterLibrary must be used inside a MasterLibraryProvider')
  return ctx
}
