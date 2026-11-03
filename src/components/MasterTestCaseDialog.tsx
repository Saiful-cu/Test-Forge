import { useEffect, useMemo, useState } from 'react'
import { Button, Field, Modal, Select } from './ui'
import { useMasterLibrary } from '../store/MasterLibraryContext'
import { PRIORITIES, TEST_TYPES, type MasterTestCase, type Priority, type TestType } from '../types'

export interface MasterTestCaseDraft {
  title: string
  description: string
  preconditions: string
  stepsText: string
  expectedResult: string
  testType: TestType
  priority: Priority
  isMandatory: boolean
}

const BLANK: MasterTestCaseDraft = {
  title: '',
  description: '',
  preconditions: '',
  stepsText: '',
  expectedResult: '',
  testType: 'Functional',
  priority: 'Medium',
  isMandatory: false,
}

const draftOf = (tc: MasterTestCase): MasterTestCaseDraft => ({
  title: tc.title,
  description: tc.description,
  preconditions: tc.preconditions,
  stepsText: tc.steps.join('\n'),
  expectedResult: tc.expectedResult,
  testType: tc.testType,
  priority: tc.priority,
  isMandatory: tc.isMandatory,
})

/**
 * Create or edit a master test case.
 * When `featureId` is given the feature is fixed; otherwise the user picks one.
 */
export function MasterTestCaseDialog({
  open,
  onClose,
  onSubmit,
  testCase,
  featureId,
}: {
  open: boolean
  onClose: () => void
  onSubmit: (featureId: string, draft: MasterTestCaseDraft) => void
  /** Present when editing; omitted when creating. */
  testCase?: MasterTestCase | null
  /** Fixes the target feature. Required when creating from a feature's own screen. */
  featureId?: string
}) {
  const { categories: MASTER_CATEGORIES, categoryById: CATEGORY_BY_ID, featureById: FEATURE_BY_ID } =
    useMasterLibrary()
  const editing = Boolean(testCase)
  const fixedFeature = featureId ?? testCase?.featureId
  const fixed = Boolean(fixedFeature)

  const [draft, setDraft] = useState<MasterTestCaseDraft>(BLANK)
  const [categoryId, setCategoryId] = useState(MASTER_CATEGORIES[0].id)
  const [moduleId, setModuleId] = useState(MASTER_CATEGORIES[0].modules[0].id)
  const [pickedFeature, setPickedFeature] = useState(MASTER_CATEGORIES[0].modules[0].features[0].id)

  useEffect(() => {
    if (!open) return
    setDraft(testCase ? draftOf(testCase) : BLANK)
    if (!fixedFeature) {
      const first = MASTER_CATEGORIES[0]
      setCategoryId(first.id)
      setModuleId(first.modules[0].id)
      setPickedFeature(first.modules[0].features[0].id)
    }
  }, [open, testCase, fixedFeature])

  const category = CATEGORY_BY_ID.get(categoryId) ?? MASTER_CATEGORIES[0]
  const modules = category.modules
  const features = useMemo(
    () => modules.find((m) => m.id === moduleId)?.features ?? modules[0].features,
    [modules, moduleId],
  )

  const targetFeature = fixedFeature ?? pickedFeature
  const feature = FEATURE_BY_ID.get(targetFeature)
  const set = <K extends keyof MasterTestCaseDraft>(k: K, v: MasterTestCaseDraft[K]) =>
    setDraft((d) => ({ ...d, [k]: v }))

  const valid = draft.title.trim().length > 0 && Boolean(targetFeature)

  return (
    <Modal
      open={open}
      onClose={onClose}
      width="max-w-2xl"
      title={editing ? 'Edit master test case' : 'New master test case'}
      description={
        editing
          ? `${testCase?.id} · ${feature?.categoryName} · ${feature?.name}. Changes apply to the master library and to projects created from here on — existing projects keep their own copies.`
          : 'Added to the master library. It is imported into any project that selects this feature from now on.'
      }
      footer={
        <>
          <Button onClick={onClose}>Cancel</Button>
          <Button variant="primary" disabled={!valid} onClick={() => onSubmit(targetFeature, draft)}>
            {editing ? 'Save changes' : 'Add to master library'}
          </Button>
        </>
      }
    >
      <div className="space-y-4">
        {fixed ? (
          <p className="rounded-lg bg-slate-50 px-3 py-2 text-xs text-slate-600">
            Feature:{' '}
            <span className="font-medium text-slate-900">
              {feature?.name ?? 'Unknown'}
            </span>{' '}
            · {feature?.categoryName} › {feature?.moduleName}
          </p>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <Field label="Category" required>
              <Select
                value={categoryId}
                onChange={(v) => {
                  const next = CATEGORY_BY_ID.get(v)
                  setCategoryId(v)
                  if (next) {
                    setModuleId(next.modules[0].id)
                    setPickedFeature(next.modules[0].features[0].id)
                  }
                }}
                options={MASTER_CATEGORIES.map((c) => ({ value: c.id, label: c.name }))}
              />
            </Field>
            <Field label="Module" required>
              <Select
                value={moduleId}
                onChange={(v) => {
                  setModuleId(v)
                  const mod = modules.find((m) => m.id === v)
                  if (mod) setPickedFeature(mod.features[0].id)
                }}
                options={modules.map((m) => ({ value: m.id, label: m.name }))}
              />
            </Field>
            <Field label="Feature" required>
              <Select
                value={pickedFeature}
                onChange={setPickedFeature}
                options={features.map((f) => ({ value: f.id, label: f.name }))}
              />
            </Field>
          </div>
        )}

        <label className="flex cursor-pointer items-start gap-3 rounded-lg border border-slate-200 bg-slate-50/60 px-3 py-2.5">
          <input
            type="checkbox"
            checked={draft.isMandatory}
            onChange={(e) => set('isMandatory', e.target.checked)}
            className="mt-0.5 h-4 w-4 shrink-0 cursor-pointer rounded border-slate-300 text-brand-600 focus:ring-brand-500"
          />
          <span className="min-w-0">
            <span className="block text-sm font-medium text-slate-900">Mandatory test case</span>
            <span className="block text-xs text-slate-500">
              A common check every project using this feature must pass before release.
            </span>
          </span>
        </label>

        <Field label="Title" required>
          <input
            className="input-base"
            value={draft.title}
            onChange={(e) => set('title', e.target.value)}
            placeholder="What the test verifies"
          />
        </Field>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Field label="Test type">
            <Select
              value={draft.testType}
              onChange={(v) => set('testType', v as TestType)}
              options={TEST_TYPES.map((t) => ({ value: t, label: t }))}
            />
          </Field>
          <Field label="Priority">
            <Select
              value={draft.priority}
              onChange={(v) => set('priority', v as Priority)}
              options={PRIORITIES.map((p) => ({ value: p, label: p }))}
            />
          </Field>
        </div>

        <Field label="Description">
          <textarea
            className="input-base min-h-[64px] resize-y"
            value={draft.description}
            onChange={(e) => set('description', e.target.value)}
          />
        </Field>
        <Field label="Preconditions">
          <textarea
            className="input-base min-h-[64px] resize-y"
            value={draft.preconditions}
            onChange={(e) => set('preconditions', e.target.value)}
          />
        </Field>
        <Field label="Test steps" hint="One step per line.">
          <textarea
            className="input-base min-h-[112px] resize-y font-mono text-xs leading-relaxed"
            value={draft.stepsText}
            onChange={(e) => set('stepsText', e.target.value)}
            placeholder={'Open the screen.\nEnter the data.\nSubmit the form.'}
          />
        </Field>
        <Field label="Expected result">
          <textarea
            className="input-base min-h-[64px] resize-y"
            value={draft.expectedResult}
            onChange={(e) => set('expectedResult', e.target.value)}
          />
        </Field>
      </div>
    </Modal>
  )
}

export const stepsFrom = (stepsText: string) =>
  stepsText
    .split('\n')
    .map((s) => s.trim())
    .filter(Boolean)
