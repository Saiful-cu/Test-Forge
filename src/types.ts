export type TestType =
  | 'Functional'
  | 'Validation'
  | 'Negative'
  | 'Boundary'
  | 'Permission'
  | 'Security'
  | 'Integration'
  | 'Usability'

export type Priority = 'Critical' | 'High' | 'Medium' | 'Low'

export type ExecStatus = 'Not Run' | 'Pass' | 'Fail' | 'Blocked'

export const TEST_TYPES: TestType[] = [
  'Functional',
  'Validation',
  'Negative',
  'Boundary',
  'Permission',
  'Security',
  'Integration',
  'Usability',
]

export const PRIORITIES: Priority[] = ['Critical', 'High', 'Medium', 'Low']

export const EXEC_STATUSES: ExecStatus[] = ['Not Run', 'Pass', 'Fail', 'Blocked']

/* ------------------------------- master library ------------------------------ */

export interface MasterTestCase {
  id: string
  featureId: string
  title: string
  description: string
  preconditions: string
  steps: string[]
  expectedResult: string
  testType: TestType
  priority: Priority
  /**
   * Common acceptance check that every feature must satisfy. A project is not release-ready
   * until all of its mandatory test cases have passed.
   */
  isMandatory: boolean
}

export interface MasterFeature {
  id: string
  name: string
  description: string
  /** How the feature plays out in practice — the one-line overview. */
  example?: string
  /** Step by step of how it runs, shown in the detailed view. */
  workflow?: string[]
  /** Scenario families this feature matched, e.g. lifecycle, money, scheduling. */
  traits?: string[]
  moduleId: string
  moduleName: string
  categoryId: string
  categoryName: string
}

export interface MasterModule {
  id: string
  name: string
  categoryId: string
  features: MasterFeature[]
}

export interface MasterCategory {
  id: string
  name: string
  description: string
  icon: string
  /** 1-based presentation rank; see `categoryPriority.ts`. */
  priority: number
  /** Grouping label for the rank, e.g. "AI" or "Industry verticals". */
  tier: string
  modules: MasterModule[]
}

/* --------------------------------- projects --------------------------------- */

export interface ProjectFeature {
  /** project-local id */
  id: string
  /** null for custom features added directly to the project */
  masterFeatureId: string | null
  name: string
  description: string
  moduleName: string
  isCustom: boolean
}

export interface ProjectTestCase {
  /** project-local id */
  id: string
  /** master test case this copy originated from (null for custom cases) */
  masterTestCaseId: string | null
  projectFeatureId: string
  title: string
  description: string
  preconditions: string
  steps: string[]
  expectedResult: string
  testType: TestType
  priority: Priority
  isMandatory: boolean
  status: ExecStatus
  actualResult: string
  notes: string
  executedAt: string | null
  isCustom: boolean
}

export interface Project {
  id: string
  name: string
  description: string
  categoryId: string
  categoryName: string
  createdAt: string
  updatedAt: string
  features: ProjectFeature[]
  testCases: ProjectTestCase[]
}

export interface ExecStats {
  total: number
  pass: number
  fail: number
  blocked: number
  notRun: number
  executed: number
  executionPct: number
  passPct: number
}
