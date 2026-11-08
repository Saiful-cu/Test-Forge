import { useMemo, useState, type ChangeEvent } from 'react'
import { FileJson, Upload } from 'lucide-react'
import { Button, Field, Modal } from './ui'
import { IMPORT_EXAMPLE, parseFeatureImport } from '../lib/drafts'
import type { FeatureDraft } from '../types'

/**
 * Imports features and their test cases from JSON into one module group. With no fixed
 * module (`moduleName` null) the person names the group the features land in.
 */
export function ImportJsonDialog({
  open,
  onClose,
  moduleName,
  existingFeatureNames,
  onImport,
}: {
  open: boolean
  onClose: () => void
  moduleName: string | null
  existingFeatureNames: string[]
  onImport: (moduleName: string, features: FeatureDraft[]) => void
}) {
  const [text, setText] = useState('')
  const [newModule, setNewModule] = useState('')
  const [fileError, setFileError] = useState<string | null>(null)

  const parsed = useMemo(() => (text.trim() ? parseFeatureImport(text) : null), [text])
  const targetModule = moduleName ?? newModule.trim()
  const existing = useMemo(() => new Set(existingFeatureNames.map((n) => n.trim().toLowerCase())), [existingFeatureNames])
  const merging = parsed?.features.filter((f) => existing.has(f.name.trim().toLowerCase())).length ?? 0

  const close = () => {
    setText('')
    setNewModule('')
    setFileError(null)
    onClose()
  }

  const readFile = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    e.target.value = ''
    if (!file) return
    if (file.size > 5 * 1024 * 1024) {
      setFileError('That file is larger than 5 MB.')
      return
    }
    setFileError(null)
    setText(await file.text())
  }

  const canImport = Boolean(parsed && parsed.features.length > 0 && targetModule)

  return (
    <Modal
      open={open}
      onClose={close}
      width="max-w-3xl"
      title={moduleName ? `Import into ${moduleName}` : 'Import features from JSON'}
      description="Features whose name already exists in this group receive the imported test cases instead of being duplicated."
      footer={
        <>
          <Button onClick={close}>Cancel</Button>
          <Button
            variant="primary"
            disabled={!canImport}
            onClick={() => {
              if (!parsed || !canImport) return
              onImport(targetModule, parsed.features)
              close()
            }}
          >
            Import {parsed?.features.length ?? 0} {parsed?.features.length === 1 ? 'feature' : 'features'} ·{' '}
            {parsed?.testCaseCount ?? 0} test cases
          </Button>
        </>
      }
    >
      <div className="space-y-4">
        {moduleName === null ? (
          <Field label="Group (module) name" required hint="A new group is created if this name is not in the project yet.">
            <input className="input-base" value={newModule} onChange={(e) => setNewModule(e.target.value)} placeholder="e.g. Authentication" />
          </Field>
        ) : null}

        <div className="flex flex-wrap items-center gap-2">
          <label className="inline-flex h-8 cursor-pointer items-center gap-1.5 rounded-lg border border-slate-300 bg-white px-2.5 text-xs font-medium text-slate-700 transition hover:bg-slate-50">
            <Upload className="h-3.5 w-3.5" />
            Choose .json file
            <input type="file" accept=".json,application/json" className="sr-only" onChange={readFile} />
          </label>
          <Button size="sm" variant="ghost" icon={FileJson} onClick={() => setText(IMPORT_EXAMPLE)}>
            Insert example
          </Button>
          {fileError ? <span className="text-xs text-rose-600">{fileError}</span> : null}
        </div>

        <Field label="JSON" hint='Shape: { "features": [ { "name", "description", "knowledge", "testCases": [ { "title", "steps", "expectedResult", "testType", "priority", "isMandatory" } ] } ] }'>
          <textarea
            className="input-base min-h-[260px] resize-y font-mono text-xs"
            value={text}
            spellCheck={false}
            onChange={(e) => setText(e.target.value)}
            placeholder="Paste JSON here, or choose a file above."
          />
        </Field>

        {parsed ? (
          <div className="rounded-lg border border-slate-200 bg-slate-50/60 px-3 py-2.5 text-xs">
            <p className="font-medium text-slate-700">
              {parsed.features.length} {parsed.features.length === 1 ? 'feature' : 'features'}, {parsed.testCaseCount} test
              cases ready
              {merging ? ` · ${merging} will be added to existing features` : ''}
            </p>
            {parsed.errors.length ? (
              <ul className="mt-1.5 list-disc space-y-0.5 pl-4 text-amber-700">
                {parsed.errors.slice(0, 8).map((e) => (
                  <li key={e}>{e}</li>
                ))}
                {parsed.errors.length > 8 ? <li>…and {parsed.errors.length - 8} more</li> : null}
              </ul>
            ) : null}
          </div>
        ) : null}
      </div>
    </Modal>
  )
}
