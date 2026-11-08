import { useEffect, useMemo, useState } from 'react'
import { Loader2, Sparkles } from 'lucide-react'
import { Badge, Button, Field, MandatoryBadge, Modal, PriorityBadge, Select, TypeBadge } from './ui'
import { api } from '../lib/api'
import { normalizeTestCase } from '../lib/drafts'
import { useStore } from '../store/StoreContext'
import type { Project, ProjectFeature, TestCaseDraft } from '../types'

const NEW = '__new__'

interface AiStatus {
  configured: boolean
  canGenerate: boolean
  provider: { label: string; model: string } | null
  reason: string | null
}

/**
 * Captures what is known about a feature and asks the configured AI provider to turn it into
 * test cases — edge cases included. Mount it only while open, so its state starts fresh.
 */
export function AiGenerateDialog({
  project,
  moduleName,
  features,
  initialFeatureId,
  onClose,
}: {
  project: Project
  moduleName: string
  features: ProjectFeature[]
  initialFeatureId?: string
  onClose: () => void
}) {
  const { addTestCases, importFeatures, setFeatureKnowledge } = useStore()

  const startId = initialFeatureId ?? features[0]?.id ?? NEW
  const [featureId, setFeatureId] = useState(startId)
  const [newName, setNewName] = useState('')
  const [newDescription, setNewDescription] = useState('')
  const [knowledge, setKnowledge] = useState(features.find((f) => f.id === startId)?.knowledge ?? '')
  const [count, setCount] = useState('15')
  const [status, setStatus] = useState<AiStatus | null>(null)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [results, setResults] = useState<TestCaseDraft[] | null>(null)
  const [picked, setPicked] = useState<Set<number>>(new Set())
  const [savedNote, setSavedNote] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false
    api<AiStatus>('GET', '/ai/status')
      .then((s) => !cancelled && setStatus(s))
      .catch((err) =>
        !cancelled &&
        setStatus({ configured: false, canGenerate: false, provider: null, reason: err instanceof Error ? err.message : 'AI is unavailable.' }),
      )
    return () => {
      cancelled = true
    }
  }, [])

  const feature = features.find((f) => f.id === featureId)
  const isNew = featureId === NEW
  const name = isNew ? newName.trim() : (feature?.name ?? '')

  const existingTitles = useMemo(
    () => (feature ? project.testCases.filter((tc) => tc.projectFeatureId === feature.id).map((tc) => tc.title) : []),
    [feature, project.testCases],
  )

  const chooseFeature = (id: string) => {
    setFeatureId(id)
    setKnowledge(features.find((f) => f.id === id)?.knowledge ?? '')
    setResults(null)
    setSavedNote(null)
  }

  const generate = async () => {
    setBusy(true)
    setError(null)
    setSavedNote(null)
    try {
      const r = await api<{ testCases: unknown[] }>('POST', '/ai/generate', {
        featureName: name,
        featureDescription: isNew ? newDescription : (feature?.description ?? ''),
        moduleName,
        categoryName: project.categoryName,
        knowledge,
        existingTitles,
        count: Number(count),
      })
      const drafts = r.testCases.map(normalizeTestCase).filter((d): d is TestCaseDraft => Boolean(d))
      if (drafts.length === 0) throw new Error('The AI reply had no usable test cases. Try again.')
      setResults(drafts)
      setPicked(new Set(drafts.map((_, i) => i)))
      // Knowledge is worth keeping even if nothing gets added.
      if (feature && knowledge.trim() !== (feature.knowledge ?? '')) setFeatureKnowledge(project.id, feature.id, knowledge)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Generation failed.')
    } finally {
      setBusy(false)
    }
  }

  const addSelected = () => {
    if (!results) return
    const chosen = results.filter((_, i) => picked.has(i))
    if (chosen.length === 0) return
    if (isNew) {
      importFeatures(project.id, moduleName, [{ name, description: newDescription, knowledge, testCases: chosen }], 'ai')
    } else if (feature) {
      addTestCases(project.id, feature.id, chosen, 'ai')
      setFeatureKnowledge(project.id, feature.id, knowledge)
    }
    onClose()
  }

  const toggle = (i: number) =>
    setPicked((prev) => {
      const next = new Set(prev)
      if (next.has(i)) next.delete(i)
      else next.add(i)
      return next
    })

  const canGenerate = Boolean(status?.canGenerate) && Boolean(name) && !busy

  return (
    <Modal
      open
      onClose={onClose}
      width="max-w-3xl"
      title={`Generate test cases · ${moduleName}`}
      description="Describe how the feature really works — rules, roles, limits, integrations, known failures. The more specific the knowledge, the sharper the edge cases."
      footer={
        <>
          {!isNew && feature && !results ? (
            <Button
              className="mr-auto"
              variant="ghost"
              disabled={knowledge.trim() === (feature.knowledge ?? '')}
              onClick={() => {
                setFeatureKnowledge(project.id, feature.id, knowledge)
                setSavedNote('Knowledge saved to the feature.')
              }}
            >
              Save knowledge
            </Button>
          ) : null}
          <Button onClick={onClose}>Cancel</Button>
          {results ? (
            <>
              <Button onClick={generate} disabled={!canGenerate} icon={Sparkles}>
                Regenerate
              </Button>
              <Button variant="primary" disabled={picked.size === 0} onClick={addSelected}>
                Add {picked.size} {picked.size === 1 ? 'test case' : 'test cases'}
              </Button>
            </>
          ) : (
            <Button variant="primary" icon={busy ? Loader2 : Sparkles} disabled={!canGenerate} onClick={generate}>
              {busy ? 'Generating…' : 'Generate with AI'}
            </Button>
          )}
        </>
      }
    >
      <div className="space-y-4">
        {status && !status.canGenerate ? (
          <p role="alert" className="rounded-lg bg-amber-50 px-3 py-2 text-xs text-amber-800">
            {status.reason}
          </p>
        ) : status?.provider ? (
          <p className="text-xs text-slate-500">
            Using <span className="font-medium text-slate-700">{status.provider.label}</span>{' '}
            <span className="font-mono">({status.provider.model})</span>
          </p>
        ) : null}

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-[1fr_auto]">
          <Field label="Feature">
            <Select
              value={featureId}
              onChange={chooseFeature}
              options={[
                ...features.map((f) => ({ value: f.id, label: f.name })),
                { value: NEW, label: '+ New feature in this group' },
              ]}
            />
          </Field>
          <Field label="How many">
            <Select
              value={count}
              onChange={setCount}
              className="sm:w-28"
              options={['5', '10', '15', '20', '30'].map((n) => ({ value: n, label: n }))}
            />
          </Field>
        </div>

        {isNew ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Field label="Feature name" required>
              <input className="input-base" value={newName} onChange={(e) => setNewName(e.target.value)} />
            </Field>
            <Field label="Short description">
              <input className="input-base" value={newDescription} onChange={(e) => setNewDescription(e.target.value)} />
            </Field>
          </div>
        ) : feature?.description ? (
          <p className="text-xs text-slate-500">{feature.description}</p>
        ) : null}

        <Field
          label="Feature knowledge"
          hint={`${knowledge.length.toLocaleString()} characters · ${existingTitles.length} existing test cases will be avoided`}
        >
          <textarea
            className="input-base min-h-[160px] resize-y text-sm"
            value={knowledge}
            onChange={(e) => setKnowledge(e.target.value)}
            placeholder={
              'e.g. Only managers can approve refunds over $500.\nRefunds must be requested within 30 days.\nPartial refunds are allowed once per order.\nThe payment gateway may time out after 20 seconds.'
            }
          />
        </Field>

        {savedNote ? <p className="text-xs text-emerald-700">{savedNote}</p> : null}
        {error ? (
          <p role="alert" className="rounded-lg bg-rose-50 px-3 py-2 text-xs text-rose-700">
            {error}
          </p>
        ) : null}

        {results ? (
          <div>
            <div className="mb-2 flex items-center justify-between">
              <p className="text-sm font-medium text-slate-800">
                {results.length} suggested test cases
                <Badge size="sm" className="ml-2 bg-violet-50 text-violet-700 ring-violet-600/20">
                  AI
                </Badge>
              </p>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => setPicked(picked.size === results.length ? new Set() : new Set(results.map((_, i) => i)))}
              >
                {picked.size === results.length ? 'Select none' : 'Select all'}
              </Button>
            </div>
            <ul className="max-h-[40vh] divide-y divide-slate-100 overflow-y-auto rounded-lg border border-slate-200">
              {results.map((tc, i) => (
                <li key={i}>
                  <label className="flex cursor-pointer items-start gap-3 px-3 py-2.5 hover:bg-slate-50">
                    <input
                      type="checkbox"
                      checked={picked.has(i)}
                      onChange={() => toggle(i)}
                      className="mt-0.5 h-4 w-4 shrink-0 cursor-pointer rounded border-slate-300 text-brand-600 focus:ring-brand-500"
                    />
                    <span className="min-w-0 flex-1">
                      <span className="flex flex-wrap items-center gap-1.5">
                        <span className="text-sm font-medium text-slate-900">{tc.title}</span>
                        <TypeBadge type={tc.testType} size="sm" />
                        <PriorityBadge priority={tc.priority} size="sm" />
                        {tc.isMandatory ? <MandatoryBadge size="sm" /> : null}
                      </span>
                      {tc.description ? <span className="mt-0.5 block text-xs text-slate-500">{tc.description}</span> : null}
                      {tc.steps.length ? (
                        <span className="mt-0.5 block text-2xs text-slate-400">
                          {tc.steps.length} steps · expects: {tc.expectedResult || '—'}
                        </span>
                      ) : null}
                    </span>
                  </label>
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </div>
    </Modal>
  )
}
