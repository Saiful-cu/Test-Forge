import { useCallback, useEffect, useState } from 'react'
import { CheckCircle2, KeyRound, Pencil, Plug, Plus, Sparkles, Trash2 } from 'lucide-react'
import { Badge, Button, Card, EmptyState, Field, Modal, PageHeader, Select } from '../components/ui'
import { api } from '../lib/api'
import { formatDate } from '../lib/utils'

type ProviderKind = 'anthropic' | 'openai' | 'gemini' | 'openai_compatible'

interface ProviderRow {
  id: string
  label: string
  provider: ProviderKind
  model: string
  baseUrl: string | null
  keyHint: string
  isActive: boolean
  updatedAt: string
  updatedBy: string | null
}

const KINDS: Record<ProviderKind, { name: string; label: string; model: string; modelHint: string; baseUrl?: string }> = {
  anthropic: {
    name: 'Anthropic (Claude)',
    label: 'Claude',
    model: 'claude-opus-5-5',
    modelHint: 'e.g. claude-opus-5-5, claude-sonnet-5-5 or claude-haiku-5-5',
  },
  openai: { name: 'OpenAI', label: 'OpenAI', model: '', modelHint: 'The model ID from your OpenAI account' },
  gemini: { name: 'Google Gemini', label: 'Gemini', model: '', modelHint: 'The model ID from Google AI Studio' },
  openai_compatible: {
    name: 'OpenAI-compatible (Groq, Mistral, OpenRouter, DeepSeek, Ollama, Azure…)',
    label: 'Custom AI',
    model: '',
    modelHint: 'The model ID your provider expects',
    baseUrl: 'https://api.example.com/v1',
  },
}

const EMPTY = { id: '', label: '', provider: 'anthropic' as ProviderKind, model: KINDS.anthropic.model, baseUrl: '', apiKey: '' }

export function AiSettingsPage() {
  const [providers, setProviders] = useState<ProviderRow[]>([])
  const [allowGuests, setAllowGuests] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [notice, setNotice] = useState<string | null>(null)
  const [form, setForm] = useState<typeof EMPTY | null>(null)
  const [formError, setFormError] = useState<string | null>(null)
  const [saving, setSaving] = useState(false)
  const [testing, setTesting] = useState<string | null>(null)
  const [deleteTarget, setDeleteTarget] = useState<ProviderRow | null>(null)

  const load = useCallback(async () => {
    try {
      const r = await api<{ providers: ProviderRow[]; allowGuests: boolean }>('GET', '/ai/providers')
      setProviders(r.providers)
      setAllowGuests(r.allowGuests)
      setError(null)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not load AI providers.')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    void load()
  }, [load])

  const run = async (fn: () => Promise<unknown>, ok?: string) => {
    setError(null)
    setNotice(null)
    try {
      await fn()
      if (ok) setNotice(ok)
      await load()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Request failed.')
    }
  }

  const save = async () => {
    if (!form) return
    setSaving(true)
    setFormError(null)
    try {
      const body = { label: form.label, provider: form.provider, model: form.model, baseUrl: form.baseUrl, apiKey: form.apiKey }
      if (form.id) await api('PATCH', `/ai/providers/${form.id}`, body)
      else await api('POST', '/ai/providers', body)
      setForm(null)
      await load()
    } catch (err) {
      setFormError(err instanceof Error ? err.message : 'Could not save the provider.')
    } finally {
      setSaving(false)
    }
  }

  const test = async (p: ProviderRow) => {
    setTesting(p.id)
    setError(null)
    setNotice(null)
    try {
      const r = await api<{ ms: number }>('POST', `/ai/providers/${p.id}/test`)
      setNotice(`${p.label} answered in ${(r.ms / 1000).toFixed(1)}s — the key and model work.`)
    } catch (err) {
      setError(`${p.label}: ${err instanceof Error ? err.message : 'test failed.'}`)
    } finally {
      setTesting(null)
    }
  }

  const kind = form ? KINDS[form.provider] : null

  return (
    <>
      <PageHeader
        title="AI settings"
        subtitle="Connect an AI provider with its API key. Projects use the active provider to generate test cases from each feature's knowledge."
        action={
          <Button
            variant="primary"
            icon={Plus}
            onClick={() => {
              setFormError(null)
              setForm({ ...EMPTY, label: KINDS.anthropic.label })
            }}
          >
            Add AI provider
          </Button>
        }
      />

      {error ? (
        <p role="alert" className="mb-3 rounded-lg bg-rose-50 px-3 py-2 text-sm text-rose-700">
          {error}
        </p>
      ) : null}
      {notice ? (
        <p role="status" className="mb-3 rounded-lg bg-emerald-50 px-3 py-2 text-sm text-emerald-700">
          {notice}
        </p>
      ) : null}

      <Card className="mb-4 p-4">
        <label className="flex cursor-pointer items-start gap-3">
          <input
            type="checkbox"
            checked={allowGuests}
            onChange={(e) => run(() => api('PUT', '/ai/settings', { allowGuests: e.target.checked }))}
            className="mt-0.5 h-4 w-4 shrink-0 cursor-pointer rounded border-slate-300 text-brand-600 focus:ring-brand-500"
          />
          <span>
            <span className="block text-sm font-medium text-slate-900">Let signed-out visitors generate test cases</span>
            <span className="block text-xs text-slate-500">
              Off by default. Each generation spends credit on your API key, so only allow this if the app is not public.
            </span>
          </span>
        </label>
      </Card>

      {loading ? null : providers.length === 0 ? (
        <Card>
          <EmptyState
            icon={Sparkles}
            title="No AI provider yet"
            description="Add Claude, OpenAI, Gemini or any OpenAI-compatible service with its API key."
            action={
              <Button variant="primary" icon={Plus} onClick={() => setForm({ ...EMPTY, label: KINDS.anthropic.label })}>
                Add AI provider
              </Button>
            }
          />
        </Card>
      ) : (
        <div className="space-y-3">
          {providers.map((p) => (
            <Card key={p.id} className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center">
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-sm font-semibold text-slate-900">{p.label}</span>
                  {p.isActive ? (
                    <Badge size="sm" className="bg-emerald-50 text-emerald-700 ring-emerald-600/20">
                      <CheckCircle2 className="h-3 w-3" />
                      In use
                    </Badge>
                  ) : null}
                  <Badge size="sm" className="bg-slate-100 text-slate-600 ring-slate-500/20">
                    {KINDS[p.provider].name.split(' (')[0]}
                  </Badge>
                </div>
                <p className="mt-1 text-xs text-slate-500">
                  <span className="font-mono">{p.model}</span>
                  {p.baseUrl ? <> · {p.baseUrl}</> : null}
                  {p.keyHint ? (
                    <>
                      {' '}
                      · <KeyRound className="inline h-3 w-3" /> {p.keyHint}
                    </>
                  ) : null}
                  {' '}· updated {formatDate(p.updatedAt)}
                  {p.updatedBy ? ` by ${p.updatedBy}` : ''}
                </p>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {!p.isActive ? (
                  <Button size="sm" variant="primary" onClick={() => run(() => api('POST', `/ai/providers/${p.id}/activate`), `${p.label} is now used for generation.`)}>
                    Use this one
                  </Button>
                ) : null}
                <Button size="sm" icon={Plug} disabled={testing === p.id} onClick={() => test(p)}>
                  {testing === p.id ? 'Testing…' : 'Test'}
                </Button>
                <Button
                  size="sm"
                  icon={Pencil}
                  onClick={() => {
                    setFormError(null)
                    setForm({ id: p.id, label: p.label, provider: p.provider, model: p.model, baseUrl: p.baseUrl ?? '', apiKey: '' })
                  }}
                >
                  Edit
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  icon={Trash2}
                  aria-label={`Remove ${p.label}`}
                  className="text-slate-400 hover:bg-rose-50 hover:text-rose-600"
                  onClick={() => setDeleteTarget(p)}
                />
              </div>
            </Card>
          ))}
        </div>
      )}

      <p className="mt-4 text-xs text-slate-500">
        Keys are stored on the server and are never sent back to the browser — only their last four characters are shown.
      </p>

      <Modal
        open={Boolean(form)}
        onClose={() => setForm(null)}
        width="max-w-xl"
        title={form?.id ? 'Edit AI provider' : 'Add AI provider'}
        footer={
          <>
            <Button onClick={() => setForm(null)}>Cancel</Button>
            <Button variant="primary" disabled={saving || !form?.label.trim() || !form?.model.trim()} onClick={save}>
              {saving ? 'Saving…' : 'Save provider'}
            </Button>
          </>
        }
      >
        {form && kind ? (
          <div className="space-y-4">
            <Field label="Provider type" required>
              <Select
                value={form.provider}
                onChange={(v) =>
                  setForm({
                    ...form,
                    provider: v,
                    // Only replace defaults the admin has not changed themselves.
                    label: !form.label || form.label === kind.label ? KINDS[v].label : form.label,
                    model: !form.model || form.model === kind.model ? KINDS[v].model : form.model,
                  })
                }
                options={(Object.keys(KINDS) as ProviderKind[]).map((k) => ({ value: k, label: KINDS[k].name }))}
              />
            </Field>
            <Field label="Name" required hint="Shown to people when they generate test cases.">
              <input className="input-base" value={form.label} onChange={(e) => setForm({ ...form, label: e.target.value })} />
            </Field>
            <Field label="Model ID" required hint={kind.modelHint}>
              <input className="input-base font-mono text-xs" value={form.model} onChange={(e) => setForm({ ...form, model: e.target.value })} />
            </Field>
            {form.provider !== 'anthropic' ? (
              <Field
                label="Base URL"
                required={form.provider === 'openai_compatible'}
                hint={
                  form.provider === 'openai_compatible'
                    ? 'The endpoint that serves /chat/completions, e.g. https://api.groq.com/openai/v1'
                    : 'Leave blank for the provider default.'
                }
              >
                <input
                  className="input-base font-mono text-xs"
                  value={form.baseUrl}
                  placeholder={kind.baseUrl ?? ''}
                  onChange={(e) => setForm({ ...form, baseUrl: e.target.value })}
                />
              </Field>
            ) : null}
            <Field
              label="API key"
              required={!form.id && form.provider !== 'openai_compatible'}
              hint={form.id ? 'Leave blank to keep the current key.' : 'Stored on the server only.'}
            >
              <input
                className="input-base font-mono text-xs"
                type="password"
                autoComplete="off"
                value={form.apiKey}
                onChange={(e) => setForm({ ...form, apiKey: e.target.value })}
              />
            </Field>
            {formError ? (
              <p role="alert" className="text-xs text-rose-600">
                {formError}
              </p>
            ) : null}
          </div>
        ) : null}
      </Modal>

      <Modal
        open={Boolean(deleteTarget)}
        onClose={() => setDeleteTarget(null)}
        title="Remove this AI provider?"
        footer={
          <>
            <Button onClick={() => setDeleteTarget(null)}>Cancel</Button>
            <Button
              variant="danger"
              onClick={() => {
                const t = deleteTarget
                setDeleteTarget(null)
                if (t) void run(() => api('DELETE', `/ai/providers/${t.id}`), `${t.label} was removed.`)
              }}
            >
              Remove provider
            </Button>
          </>
        }
      >
        <p className="text-sm text-slate-600">
          <span className="font-medium text-slate-900">{deleteTarget?.label}</span> and its stored API key will be deleted.
          {deleteTarget?.isActive ? ' AI generation stops until another provider is put in use.' : ''}
        </p>
      </Modal>
    </>
  )
}
