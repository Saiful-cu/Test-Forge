import type { ExecStatus, Project } from '../types'
import { hashString } from '../lib/utils'
import { CATEGORY_BY_ID, MASTER_FEATURES, masterTestCasesFor } from './masterLibrary'

/** Builds a project (features + independent copies of the master test cases). */
export function buildProject(input: {
  id: string
  name: string
  description: string
  categoryId: string
  masterFeatureIds: string[]
  createdAt: string
}): Project {
  const category = CATEGORY_BY_ID.get(input.categoryId)
  const features = input.masterFeatureIds
    .map((mid) => MASTER_FEATURES.find((f) => f.id === mid))
    .filter((f): f is NonNullable<typeof f> => Boolean(f))
    .map((f) => ({
      id: `pf_${input.id}_${f.id}`,
      masterFeatureId: f.id,
      name: f.name,
      description: f.description,
      moduleName: f.moduleName,
      isCustom: false,
    }))

  const testCases = features.flatMap((pf) =>
    masterTestCasesFor(pf.masterFeatureId as string).map((mtc) => ({
      id: `ptc_${input.id}_${mtc.id}`,
      masterTestCaseId: mtc.id,
      projectFeatureId: pf.id,
      title: mtc.title,
      description: mtc.description,
      preconditions: mtc.preconditions,
      steps: [...mtc.steps],
      expectedResult: mtc.expectedResult,
      testType: mtc.testType,
      priority: mtc.priority,
      isMandatory: mtc.isMandatory,
      status: 'Not Run' as ExecStatus,
      actualResult: '',
      notes: '',
      executedAt: null,
      isCustom: false,
    })),
  )

  return {
    id: input.id,
    name: input.name,
    description: input.description,
    categoryId: input.categoryId,
    categoryName: category?.name ?? input.categoryId,
    createdAt: input.createdAt,
    updatedAt: input.createdAt,
    features,
    testCases,
  }
}

const FAIL_NOTES = [
  'Reproduced twice on Chrome 131 and once on Edge. Defect raised.',
  'Validation message is missing — the request reaches the server and 500s.',
  'Totals are off by a rounding cent; raised with the billing team.',
  'Permission check is only applied in the UI, not on the endpoint.',
]

const BLOCKED_NOTES = [
  'Blocked — the staging gateway sandbox is unavailable.',
  'Blocked by the open defect on the parent screen.',
  'Blocked — test data for this scenario has not been provisioned.',
]

const PASS_NOTES = [
  'Verified on Chrome 131 / 1920x1080.',
  'Behaves as specified. Evidence attached in the run folder.',
  '',
  '',
]

/** Applies deterministic demo execution results so reports are not empty on first load. */
function applyDemoExecution(project: Project, executionRate: number, failRate: number, blockedRate: number): Project {
  const dayMs = 86_400_000
  const testCases = project.testCases.map((tc, index) => {
    const h = hashString(tc.id)
    if ((h % 100) / 100 >= executionRate) return tc

    const roll = ((h >> 7) % 100) / 100
    let status: ExecStatus = 'Pass'
    if (roll < failRate) status = 'Fail'
    else if (roll < failRate + blockedRate) status = 'Blocked'

    const executedAt = new Date(Date.now() - ((h >> 11) % 9) * dayMs - (index % 7) * 3_600_000).toISOString()

    if (status === 'Fail') {
      return {
        ...tc,
        status,
        executedAt,
        actualResult: 'Observed behaviour differs from the expected result — see notes.',
        notes: FAIL_NOTES[h % FAIL_NOTES.length],
      }
    }
    if (status === 'Blocked') {
      return {
        ...tc,
        status,
        executedAt,
        actualResult: '',
        notes: BLOCKED_NOTES[h % BLOCKED_NOTES.length],
      }
    }
    return {
      ...tc,
      status,
      executedAt,
      actualResult: 'Matches the expected result.',
      notes: PASS_NOTES[h % PASS_NOTES.length],
    }
  })

  return { ...project, testCases, updatedAt: new Date(Date.now() - dayMs).toISOString() }
}

const findFeature = (categoryId: string, name: string) =>
  MASTER_FEATURES.find((f) => f.categoryId === categoryId && f.name === name)?.id ?? ''

const daysAgo = (n: number) => new Date(Date.now() - n * 86_400_000).toISOString()

export function createSeedProjects(): Project[] {
  const roofPro = applyDemoExecution(
    buildProject({
      id: 'proj_roofpro',
      name: 'RoofPro',
      description:
        'Field-first roofing operations platform for a mid-size contractor: inspection through estimate, work order and invoice. Release 1.0 QA cycle.',
      categoryId: 'roofing-management',
      masterFeatureIds: [
        findFeature('roofing-management', 'Roof Inspection'),
        findFeature('roofing-management', 'Roof Estimation'),
        findFeature('roofing-management', 'Customer Management'),
        findFeature('roofing-management', 'Work Orders'),
        findFeature('roofing-management', 'Invoice Management'),
      ].filter(Boolean),
      createdAt: daysAgo(18),
    }),
    0.74,
    0.14,
    0.08,
  )

  const shopFlow = applyDemoExecution(
    buildProject({
      id: 'proj_shopflow',
      name: 'ShopFlow Commerce',
      description:
        'Direct-to-consumer storefront replatform. QA scope covers catalog, cart, checkout and order management for the first launch market.',
      categoryId: 'e-commerce',
      masterFeatureIds: [
        findFeature('e-commerce', 'Product Management'),
        findFeature('e-commerce', 'Shopping Cart'),
        findFeature('e-commerce', 'Checkout Flow'),
        findFeature('e-commerce', 'Order Placement'),
        findFeature('e-commerce', 'Payment Processing'),
      ].filter(Boolean),
      createdAt: daysAgo(9),
    }),
    0.42,
    0.1,
    0.06,
  )

  const nimbus = buildProject({
    id: 'proj_nimbushr',
    name: 'Nimbus HR',
    description:
      'HR suite for a 400-person services business. Test cycle has been imported and is awaiting the start of execution.',
    categoryId: 'hrm',
    masterFeatureIds: [
      findFeature('hrm', 'Employee Onboarding'),
      findFeature('hrm', 'Attendance Tracking'),
      findFeature('hrm', 'Leave Management'),
      findFeature('hrm', 'Payroll Processing'),
    ].filter(Boolean),
    createdAt: daysAgo(2),
  })

  return [roofPro, shopFlow, nimbus]
}
