import { PRIORITIES, TEST_TYPES, type FeatureDraft, type Priority, type TestCaseDraft, type TestType } from '../types'

/**
 * Turns loosely shaped JSON (pasted by a person, or returned by an AI model) into clean drafts.
 * Unknown fields are ignored, enum values are matched case-insensitively, and anything that
 * cannot be used is reported instead of being silently dropped.
 */

const str = (v: unknown) => (typeof v === 'string' ? v.trim() : typeof v === 'number' ? String(v) : '')

function pickEnum<T extends string>(value: unknown, allowed: T[], fallback: T): T {
  const s = str(value).toLowerCase()
  return allowed.find((a) => a.toLowerCase() === s) ?? fallback
}

function toSteps(value: unknown): string[] {
  if (Array.isArray(value)) return value.map(str).filter(Boolean)
  return str(value)
    .split('\n')
    .map((s) => s.replace(/^\s*(\d+[.)]|[-*•])\s*/, '').trim())
    .filter(Boolean)
}

function toBool(value: unknown): boolean {
  if (typeof value === 'boolean') return value
  return ['true', 'yes', '1', 'mandatory'].includes(str(value).toLowerCase())
}

export function normalizeTestCase(raw: unknown): TestCaseDraft | null {
  if (!raw || typeof raw !== 'object') return null
  const r = raw as Record<string, unknown>
  const title = str(r.title ?? r.name)
  if (!title) return null
  return {
    title,
    description: str(r.description),
    preconditions: str(r.preconditions ?? r.precondition),
    steps: toSteps(r.steps),
    expectedResult: str(r.expectedResult ?? r.expected_result ?? r.expected),
    testType: pickEnum<TestType>(r.testType ?? r.test_type ?? r.type, TEST_TYPES, 'Functional'),
    priority: pickEnum<Priority>(r.priority, PRIORITIES, 'Medium'),
    isMandatory: toBool(r.isMandatory ?? r.is_mandatory ?? r.mandatory),
  }
}

export interface ParsedImport {
  features: FeatureDraft[]
  errors: string[]
  testCaseCount: number
}

/**
 * Accepts `{ "features": [...] }`, a bare array of features, or a single feature object.
 * Each feature may carry `testCases` (or `test_cases`).
 */
export function parseFeatureImport(text: string): ParsedImport {
  const errors: string[] = []
  let data: unknown
  try {
    data = JSON.parse(text)
  } catch (err) {
    return { features: [], errors: [`Not valid JSON: ${err instanceof Error ? err.message : String(err)}`], testCaseCount: 0 }
  }

  const list: unknown[] = Array.isArray(data)
    ? data
    : data && typeof data === 'object' && Array.isArray((data as { features?: unknown }).features)
      ? (data as { features: unknown[] }).features
      : data && typeof data === 'object'
        ? [data]
        : []

  if (list.length === 0) errors.push('No features found. Use { "features": [ ... ] }.')

  const features: FeatureDraft[] = []
  let testCaseCount = 0
  list.forEach((item, i) => {
    if (!item || typeof item !== 'object') {
      errors.push(`Feature ${i + 1} is not an object.`)
      return
    }
    const r = item as Record<string, unknown>
    const name = str(r.name ?? r.feature ?? r.title)
    if (!name) {
      errors.push(`Feature ${i + 1} has no "name".`)
      return
    }
    const rawCases = r.testCases ?? r.test_cases ?? []
    const testCases: TestCaseDraft[] = []
    if (Array.isArray(rawCases)) {
      rawCases.forEach((tc, j) => {
        const n = normalizeTestCase(tc)
        if (n) testCases.push(n)
        else errors.push(`"${name}" test case ${j + 1} has no "title" and was skipped.`)
      })
    } else {
      errors.push(`"${name}": "testCases" must be an array.`)
    }
    testCaseCount += testCases.length
    features.push({ name, description: str(r.description), knowledge: str(r.knowledge), testCases })
  })

  return { features, errors, testCaseCount }
}

export const IMPORT_EXAMPLE = JSON.stringify(
  {
    features: [
      {
        name: 'Password reset',
        description: 'Users reset a forgotten password through an emailed link.',
        knowledge: 'Links expire after 30 minutes and can be used once. Passwords need 8+ characters.',
        testCases: [
          {
            title: 'Reset link expires after 30 minutes',
            description: 'An old link must be refused.',
            preconditions: 'A reset email was requested more than 30 minutes ago.',
            steps: ['Open the reset link from the email', 'Enter a new valid password', 'Submit'],
            expectedResult: 'The link is rejected and the user is asked to request a new one.',
            testType: 'Boundary',
            priority: 'High',
            isMandatory: false,
          },
        ],
      },
    ],
  },
  null,
  2,
)
