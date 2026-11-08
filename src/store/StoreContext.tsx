import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react'
import type { FeatureDraft, Project, ProjectFeature, ProjectTestCase, TestCaseDraft, TestCaseSource } from '../types'
import { useMasterLibrary } from './MasterLibraryContext'
import { useAuth } from './AuthContext'
import { createSeedProjects } from '../data/seed'
import { api } from '../lib/api'
import { uid } from '../lib/utils'

interface StoreValue {
  projects: Project[]
  getProject: (id: string) => Project | undefined
  createProject: (input: {
    name: string
    description: string
    categoryId: string
    masterFeatureIds: string[]
  }) => Project
  updateProject: (id: string, patch: Partial<Pick<Project, 'name' | 'description'>>) => void
  deleteProject: (id: string) => void
  addFeaturesToProject: (projectId: string, masterFeatureIds: string[]) => void
  removeFeature: (projectId: string, projectFeatureId: string) => void
  addCustomFeature: (
    projectId: string,
    input: { name: string; description: string; moduleName: string },
  ) => void
  updateTestCase: (projectId: string, testCaseId: string, patch: Partial<ProjectTestCase>) => void
  bulkSetStatus: (projectId: string, testCaseIds: string[], status: ProjectTestCase['status']) => void
  addCustomTestCase: (
    projectId: string,
    projectFeatureId: string,
    input: Omit<
      ProjectTestCase,
      'id' | 'masterTestCaseId' | 'projectFeatureId' | 'status' | 'actualResult' | 'notes' | 'executedAt' | 'isCustom'
    >,
  ) => void
  deleteTestCase: (projectId: string, testCaseId: string) => void
  /** Adds several test cases to one feature in a single change. */
  addTestCases: (projectId: string, projectFeatureId: string, drafts: TestCaseDraft[], source: TestCaseSource) => void
  /**
   * Imports features into a module group. A feature whose name matches one already in that
   * module receives the test cases instead of being duplicated. Returns what was added.
   */
  importFeatures: (
    projectId: string,
    moduleName: string,
    drafts: FeatureDraft[],
    source: TestCaseSource,
  ) => { features: number; testCases: number; mergedInto: number }
  setFeatureKnowledge: (projectId: string, projectFeatureId: string, knowledge: string) => void
  resetDemoData: () => void
  /** Replaces a project with a version restored from the server (a snapshot). */
  replaceProject: (project: Project) => void
  /** False until the saved projects have been loaded from the server. */
  ready: boolean
  /** Set when a write failed, so the UI can tell the user their work is not being saved. */
  saveError: string | null
}

const StoreContext = createContext<StoreValue | null>(null)

export function StoreProvider({ children }: { children: ReactNode }) {
  const [projects, setProjects] = useState<Project[]>([])
  const [ready, setReady] = useState(false)
  const [saveError, setSaveError] = useState<string | null>(null)
  const { casesFor, featureById, categoryById } = useMasterLibrary()
  const { user, isAdmin, checked } = useAuth()

  // Reading is async, so writes are held back until the first read has completed —
  // otherwise the empty initial state would overwrite the saved projects.
  const loaded = useRef(false)
  // The JSON last confirmed by the server for each project, so only real changes are sent.
  const savedJson = useRef(new Map<string, string>())

  useEffect(() => {
    if (!checked) return
    loaded.current = false
    setReady(false)
    let cancelled = false
    api<{ projects: Project[]; seeded: boolean }>('GET', '/projects')
      .then((r) => {
        if (cancelled) return
        // First ever run: the server has no projects and was never seeded, so start from the samples.
        const list = !r.seeded && r.projects.length === 0 ? createSeedProjects() : r.projects
        if (list === r.projects) savedJson.current = new Map(list.map((p) => [p.id, JSON.stringify(p)]))
        setProjects(list)
        loaded.current = true
        setReady(true)
      })
      .catch((err) => {
        if (cancelled) return
        console.error('Could not load projects.', err)
        setSaveError(err instanceof Error ? err.message : 'Projects could not be loaded.')
        // Show the page with the error banner rather than a loading skeleton that never ends.
        // Writes stay off (loaded is false), so nothing can overwrite saved projects.
        setReady(true)
      })
    return () => {
      cancelled = true
    }
  }, [user, checked])

  useEffect(() => {
    if (!loaded.current) return
    const timer = setTimeout(async () => {
      try {
        const current = new Map(projects.map((p) => [p.id, JSON.stringify(p)]))
        for (const [id, json] of current) {
          if (savedJson.current.get(id) === json) continue
          await api('PUT', `/projects/${id}`, JSON.parse(json))
          savedJson.current.set(id, json)
        }
        for (const id of [...savedJson.current.keys()]) {
          if (current.has(id)) continue
          await api('DELETE', `/projects/${id}`)
          savedJson.current.delete(id)
        }
        setSaveError(null)
      } catch (err) {
        console.error('Could not persist projects.', err)
        setSaveError(err instanceof Error ? err.message : 'Your changes could not be saved.')
      }
    }, 500)
    return () => clearTimeout(timer)
  }, [projects])

  const touch = (p: Project): Project => ({ ...p, updatedAt: new Date().toISOString() })

  const mutate = useCallback((projectId: string, fn: (p: Project) => Project) => {
    setProjects((prev) => prev.map((p) => (p.id === projectId ? touch(fn(p)) : p)))
  }, [])

  const buildFeatureAndCases = useCallback((masterFeatureId: string) => {
    const master = featureById.get(masterFeatureId)
    if (!master) return null
    const feature: ProjectFeature = {
      id: uid('pf'),
      masterFeatureId: master.id,
      name: master.name,
      description: master.description,
      moduleName: master.moduleName,
      isCustom: false,
    }
    // Independent copies — editing these never touches the master library.
    const cases: ProjectTestCase[] = casesFor(master.id).map((mtc) => ({
      id: uid('ptc'),
      masterTestCaseId: mtc.id,
      projectFeatureId: feature.id,
      title: mtc.title,
      description: mtc.description,
      preconditions: mtc.preconditions,
      steps: [...mtc.steps],
      expectedResult: mtc.expectedResult,
      testType: mtc.testType,
      priority: mtc.priority,
      isMandatory: mtc.isMandatory,
      status: 'Not Run',
      actualResult: '',
      notes: '',
      executedAt: null,
      isCustom: false,
    }))
    return { feature, cases }
  }, [casesFor, featureById])

  const createProject: StoreValue['createProject'] = useCallback((input) => {
    const id = uid('proj')
    const features: ProjectFeature[] = []
    const testCases: ProjectTestCase[] = []
    for (const mid of input.masterFeatureIds) {
      const built = buildFeatureAndCases(mid)
      if (!built) continue
      features.push(built.feature)
      testCases.push(...built.cases)
    }
    const now = new Date().toISOString()
    const project: Project = {
      id,
      name: input.name.trim(),
      description: input.description.trim(),
      categoryId: input.categoryId,
      categoryName: categoryById.get(input.categoryId)?.name ?? input.categoryId,
      createdAt: now,
      updatedAt: now,
      features,
      testCases,
    }
    setProjects((prev) => [project, ...prev])
    return project
  }, [buildFeatureAndCases, categoryById])

  const draftToCase = (draft: TestCaseDraft, projectFeatureId: string, source: TestCaseSource): ProjectTestCase => ({
    ...draft,
    steps: [...draft.steps],
    id: uid('ptc'),
    masterTestCaseId: null,
    projectFeatureId,
    status: 'Not Run',
    actualResult: '',
    notes: '',
    executedAt: null,
    isCustom: true,
    source,
  })

  const importFeatures: StoreValue['importFeatures'] = (projectId, moduleName, drafts, source) => {
    const counts = { features: 0, testCases: 0, mergedInto: 0 }
    const project = projects.find((p) => p.id === projectId)
    if (!project) return counts
    const mod = moduleName.trim() || 'Imported'
    const features = [...project.features]
    const testCases = [...project.testCases]
    const byName = new Map(
      features.filter((f) => f.moduleName === mod).map((f) => [f.name.trim().toLowerCase(), f]),
    )
    for (const draft of drafts) {
      let feature = byName.get(draft.name.trim().toLowerCase())
      if (feature) {
        counts.mergedInto += 1
        if (draft.knowledge && !feature.knowledge) {
          const updated = { ...feature, knowledge: draft.knowledge }
          features[features.indexOf(feature)] = updated
          feature = updated
          byName.set(draft.name.trim().toLowerCase(), updated)
        }
      } else {
        feature = {
          id: uid('pf'),
          masterFeatureId: null,
          name: draft.name.trim(),
          description: draft.description.trim(),
          moduleName: mod,
          isCustom: true,
          knowledge: draft.knowledge.trim() || undefined,
        }
        features.push(feature)
        byName.set(feature.name.toLowerCase(), feature)
        counts.features += 1
      }
      for (const tc of draft.testCases) testCases.push(draftToCase(tc, feature.id, source))
      counts.testCases += draft.testCases.length
    }
    mutate(projectId, (p) => ({ ...p, features, testCases }))
    return counts
  }

  const value = useMemo<StoreValue>(
    () => ({
      projects,
      getProject: (id) => projects.find((p) => p.id === id),
      createProject,
      updateProject: (id, patch) =>
        mutate(id, (p) => ({
          ...p,
          name: patch.name !== undefined ? patch.name.trim() : p.name,
          description: patch.description !== undefined ? patch.description.trim() : p.description,
        })),
      // Deleting a whole project is admin-only; everything inside a project is open to all users.
      deleteProject: (id) => {
        if (isAdmin) setProjects((prev) => prev.filter((p) => p.id !== id))
      },
      addFeaturesToProject: (projectId, masterFeatureIds) =>
        mutate(projectId, (p) => {
          const existing = new Set(p.features.map((f) => f.masterFeatureId))
          const features = [...p.features]
          const testCases = [...p.testCases]
          for (const mid of masterFeatureIds) {
            if (existing.has(mid)) continue
            const built = buildFeatureAndCases(mid)
            if (!built) continue
            features.push(built.feature)
            testCases.push(...built.cases)
          }
          return { ...p, features, testCases }
        }),
      removeFeature: (projectId, projectFeatureId) =>
        mutate(projectId, (p) => ({
          ...p,
          features: p.features.filter((f) => f.id !== projectFeatureId),
          testCases: p.testCases.filter((tc) => tc.projectFeatureId !== projectFeatureId),
        })),
      addCustomFeature: (projectId, input) =>
        mutate(projectId, (p) => ({
          ...p,
          features: [
            ...p.features,
            {
              id: uid('pf'),
              masterFeatureId: null,
              name: input.name.trim(),
              description: input.description.trim(),
              moduleName: input.moduleName.trim() || 'Custom',
              isCustom: true,
            },
          ],
        })),
      updateTestCase: (projectId, testCaseId, patch) =>
        mutate(projectId, (p) => ({
          ...p,
          testCases: p.testCases.map((tc) => {
            if (tc.id !== testCaseId) return tc
            const next = { ...tc, ...patch }
            if (patch.status && patch.status !== tc.status) {
              next.executedAt = patch.status === 'Not Run' ? null : new Date().toISOString()
            }
            return next
          }),
        })),
      bulkSetStatus: (projectId, testCaseIds, status) =>
        mutate(projectId, (p) => {
          const ids = new Set(testCaseIds)
          const now = new Date().toISOString()
          return {
            ...p,
            testCases: p.testCases.map((tc) =>
              ids.has(tc.id) ? { ...tc, status, executedAt: status === 'Not Run' ? null : now } : tc,
            ),
          }
        }),
      addCustomTestCase: (projectId, projectFeatureId, input) =>
        mutate(projectId, (p) => ({
          ...p,
          testCases: [
            ...p.testCases,
            {
              ...input,
              id: uid('ptc'),
              masterTestCaseId: null,
              projectFeatureId,
              status: 'Not Run',
              actualResult: '',
              notes: '',
              executedAt: null,
              isCustom: true,
            },
          ],
        })),
      deleteTestCase: (projectId, testCaseId) =>
        mutate(projectId, (p) => ({ ...p, testCases: p.testCases.filter((tc) => tc.id !== testCaseId) })),
      addTestCases: (projectId, projectFeatureId, drafts, source) =>
        mutate(projectId, (p) => ({
          ...p,
          testCases: [...p.testCases, ...drafts.map((d) => draftToCase(d, projectFeatureId, source))],
        })),
      importFeatures,
      setFeatureKnowledge: (projectId, projectFeatureId, knowledge) =>
        mutate(projectId, (p) => ({
          ...p,
          features: p.features.map((f) =>
            f.id === projectFeatureId ? { ...f, knowledge: knowledge.trim() || undefined } : f,
          ),
        })),
      resetDemoData: () => {
        if (!isAdmin) return
        const seed = createSeedProjects()
        api('POST', '/projects/replace', { projects: seed })
          .then(() => {
            savedJson.current = new Map(seed.map((p) => [p.id, JSON.stringify(p)]))
            setProjects(seed)
          })
          .catch((err) => setSaveError(err instanceof Error ? err.message : 'Could not reset the demo data.'))
      },
      replaceProject: (project) => {
        savedJson.current.set(project.id, JSON.stringify(project))
        setProjects((prev) => (prev.some((p) => p.id === project.id) ? prev.map((p) => (p.id === project.id ? project : p)) : [project, ...prev]))
      },
      ready,
      saveError,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps -- importFeatures/draftToCase only read `projects` and `mutate`
    [projects, createProject, mutate, buildFeatureAndCases, ready, saveError, isAdmin],
  )

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
}

export function useStore(): StoreValue {
  const ctx = useContext(StoreContext)
  if (!ctx) throw new Error('useStore must be used inside a StoreProvider')
  return ctx
}
