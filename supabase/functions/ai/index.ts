// AI test case generation and provider management.
//
// API keys never reach the browser: admins send a key once, it is stored in `ai_providers`
// (readable only with the service role), and every model call is made from here.
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import Anthropic from 'npm:@anthropic-ai/sdk'

const cors = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}
const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { ...cors, 'Content-Type': 'application/json' } })

type ProviderKind = 'anthropic' | 'openai' | 'gemini' | 'openai_compatible'
const KINDS: ProviderKind[] = ['anthropic', 'openai', 'gemini', 'openai_compatible']

interface ProviderRow {
  id: string
  label: string
  provider: ProviderKind
  model: string
  base_url: string | null
  api_key: string
  is_active: boolean
  updated_at: string
  updated_by: string | null
}

const TEST_TYPES = ['Functional', 'Validation', 'Negative', 'Boundary', 'Permission', 'Security', 'Integration', 'Usability']
const PRIORITIES = ['Critical', 'High', 'Medium', 'Low']

// Models that accept Anthropic's server-side refusal fallback.
const FALLBACK_MODELS = ['claude-fable-5-1', 'claude-opus-5-5', 'claude-opus-5', 'claude-sonnet-5-5']

class HttpError extends Error {
  constructor(message: string, public status = 400) {
    super(message)
  }
}

const mask = (key: string) => (key ? `••••${key.slice(-4)}` : '')

const publicRow = (r: ProviderRow) => ({
  id: r.id,
  label: r.label,
  provider: r.provider,
  model: r.model,
  baseUrl: r.base_url,
  keyHint: mask(r.api_key),
  isActive: r.is_active,
  updatedAt: r.updated_at,
  updatedBy: r.updated_by,
})

/* ------------------------------ model calls ------------------------------ */

async function readError(res: Response): Promise<string> {
  const text = await res.text().catch(() => '')
  try {
    const body = JSON.parse(text)
    return body?.error?.message ?? body?.message ?? text.slice(0, 300)
  } catch {
    return text.slice(0, 300) || res.statusText
  }
}

async function callModel(p: ProviderRow, system: string, user: string, maxTokens: number): Promise<string> {
  if (p.provider === 'anthropic') {
    const client = new Anthropic({ apiKey: p.api_key })
    const useFallback = FALLBACK_MODELS.includes(p.model)
    try {
      // deno-lint-ignore no-explicit-any
      const params: any = {
        model: p.model,
        max_tokens: maxTokens,
        system,
        messages: [{ role: 'user', content: user }],
      }
      if (useFallback) {
        params.betas = ['server-side-fallback-2026-07-01']
        params.fallbacks = 'default'
      }
      const response = useFallback
        ? await client.beta.messages.create(params)
        : await client.messages.create(params)
      if (response.stop_reason === 'refusal') {
        throw new HttpError('The model declined this request. Try rewording the feature knowledge.', 422)
      }
      // deno-lint-ignore no-explicit-any
      return (response.content as any[])
        .filter((b) => b.type === 'text')
        .map((b) => b.text)
        .join('')
    } catch (err) {
      if (err instanceof HttpError) throw err
      if (err instanceof Anthropic.AuthenticationError) throw new HttpError('Anthropic rejected the API key.', 502)
      if (err instanceof Anthropic.NotFoundError) throw new HttpError(`Anthropic does not know the model "${p.model}".`, 502)
      if (err instanceof Anthropic.RateLimitError) throw new HttpError('Anthropic rate limit reached. Try again shortly.', 429)
      if (err instanceof Anthropic.APIError) throw new HttpError(`Anthropic error ${err.status}: ${err.message}`, 502)
      throw err
    }
  }

  if (p.provider === 'gemini') {
    const base = (p.base_url || 'https://generativelanguage.googleapis.com/v1beta').replace(/\/+$/, '')
    const res = await fetch(`${base}/models/${encodeURIComponent(p.model)}:generateContent`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-goog-api-key': p.api_key },
      body: JSON.stringify({
        systemInstruction: { parts: [{ text: system }] },
        contents: [{ role: 'user', parts: [{ text: user }] }],
        generationConfig: { responseMimeType: 'application/json', maxOutputTokens: maxTokens },
      }),
    })
    if (!res.ok) throw new HttpError(`Gemini error ${res.status}: ${await readError(res)}`, 502)
    const body = await res.json()
    // deno-lint-ignore no-explicit-any
    const parts: any[] = body?.candidates?.[0]?.content?.parts ?? []
    return parts.map((x) => x.text ?? '').join('')
  }

  // OpenAI and every OpenAI-compatible API (Groq, Mistral, OpenRouter, DeepSeek, Together, Ollama, …).
  const base = (p.base_url || 'https://api.openai.com/v1').replace(/\/+$/, '')
  const headers: Record<string, string> = { 'Content-Type': 'application/json' }
  if (p.api_key) headers.Authorization = `Bearer ${p.api_key}`
  const payload: Record<string, unknown> = {
    model: p.model,
    messages: [
      { role: 'system', content: system },
      { role: 'user', content: user },
    ],
  }
  if (p.provider === 'openai') payload.response_format = { type: 'json_object' }
  const res = await fetch(`${base}/chat/completions`, { method: 'POST', headers, body: JSON.stringify(payload) })
  if (!res.ok) throw new HttpError(`${p.label} error ${res.status}: ${await readError(res)}`, 502)
  const body = await res.json()
  return String(body?.choices?.[0]?.message?.content ?? '')
}

/** Pulls the JSON object out of a reply that may be wrapped in prose or code fences. */
function extractJson(text: string): unknown {
  const cleaned = text.replace(/```(?:json)?/gi, '').trim()
  try {
    return JSON.parse(cleaned)
  } catch {
    const start = cleaned.search(/[[{]/)
    const end = Math.max(cleaned.lastIndexOf('}'), cleaned.lastIndexOf(']'))
    if (start >= 0 && end > start) {
      try {
        return JSON.parse(cleaned.slice(start, end + 1))
      } catch {
        /* fall through */
      }
    }
  }
  throw new HttpError('The model did not return valid JSON. Try again, or try a different model.', 502)
}

const SYSTEM_PROMPT = `You are a senior QA engineer who designs thorough, executable manual test cases.
You read a feature description and the knowledge supplied about it, then design test cases that a tester can run step by step.
Cover the happy path, and then go looking for what breaks: input validation, negative paths, boundary values (min, max, just inside, just outside, empty, very long, special characters, unicode), role and permission differences, security (injection, unauthorised access, data exposure), state and lifecycle transitions, concurrency and duplicate submissions, integrations and their failures, timeouts and network loss, and usability and accessibility.
Every edge case must be grounded in the supplied knowledge or in common behaviour of this kind of feature — do not invent business rules that contradict the knowledge.
Reply with JSON only, no prose.`

function buildPrompt(input: {
  featureName: string
  featureDescription: string
  moduleName: string
  categoryName: string
  knowledge: string
  existingTitles: string[]
  count: number
}) {
  return `Feature: ${input.featureName}
Module: ${input.moduleName || 'n/a'}
Product category: ${input.categoryName || 'n/a'}
Description: ${input.featureDescription || 'n/a'}

Feature knowledge:
"""
${input.knowledge || 'No extra knowledge was supplied; rely on the description and common behaviour.'}
"""

Test cases that already exist (do not repeat them):
${input.existingTitles.length ? input.existingTitles.map((t) => `- ${t}`).join('\n') : '- none'}

Design ${input.count} new test cases. Return exactly this JSON shape:
{"testCases":[{"title":"short imperative title","description":"what is being verified and why it matters","preconditions":"state needed before starting","steps":["step 1","step 2"],"expectedResult":"observable outcome","testType":"one of ${TEST_TYPES.join(', ')}","priority":"one of ${PRIORITIES.join(', ')}","isMandatory":false}]}
Set isMandatory to true only for core acceptance checks that must pass before release.`
}

/* -------------------------------- handler -------------------------------- */

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: cors })

  try {
    const url = Deno.env.get('SUPABASE_URL')!
    const admin = createClient(url, Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!)
    const caller = createClient(url, Deno.env.get('SUPABASE_ANON_KEY')!, {
      global: { headers: { Authorization: req.headers.get('Authorization') ?? '' } },
    })

    // Signed-out visitors call with the anon key, which has no user behind it.
    const { data: auth } = await caller.auth.getUser()
    const { data: me } = auth.user
      ? await admin.from('profiles').select('id, username, role, active').eq('id', auth.user.id).maybeSingle()
      : { data: null }
    const signedIn = Boolean(me?.active)
    const isAdmin = signedIn && me?.role === 'admin'
    const actor = signedIn ? (me!.username as string) : 'guest'

    const log = (action: string, detail: string) => admin.from('audit_log').insert({ actor, action, detail })
    const requireAdmin = () => {
      if (!isAdmin) throw new HttpError('Admin access required.', 403)
    }
    const allowGuests = async () =>
      (await admin.from('app_settings').select('value').eq('key', 'ai_allow_guests').maybeSingle()).data?.value === '1'
    const activeProvider = async () =>
      (await admin.from('ai_providers').select('*').eq('is_active', true).maybeSingle()).data as ProviderRow | null

    const body = await req.json().catch(() => ({}))

    switch (body.action) {
      /* -------- anyone: is AI available to me? -------- */
      case 'status': {
        const p = await activeProvider()
        const guests = await allowGuests()
        return json({
          configured: Boolean(p),
          provider: p ? { label: p.label, model: p.model } : null,
          canGenerate: Boolean(p) && (signedIn || guests),
          reason: !p
            ? 'No AI provider is set up yet. An admin can add one under Settings → AI settings.'
            : !signedIn && !guests
              ? 'Sign in to generate test cases with AI.'
              : null,
        })
      }

      /* -------- admin: manage providers -------- */
      case 'list': {
        requireAdmin()
        const { data, error } = await admin.from('ai_providers').select('*').order('created_at')
        if (error) throw new HttpError(error.message, 500)
        return json({ providers: (data as ProviderRow[]).map(publicRow), allowGuests: await allowGuests() })
      }

      case 'save': {
        requireAdmin()
        const provider = String(body.provider ?? '') as ProviderKind
        const label = String(body.label ?? '').trim()
        const model = String(body.model ?? '').trim()
        const baseUrl = String(body.baseUrl ?? '').trim()
        const apiKey = typeof body.apiKey === 'string' ? body.apiKey.trim() : ''
        if (!KINDS.includes(provider)) throw new HttpError('Choose a provider type.')
        if (!label) throw new HttpError('Give the provider a name.')
        if (!model) throw new HttpError('Enter a model ID.')
        if (provider === 'openai_compatible' && !/^https?:\/\//.test(baseUrl)) {
          throw new HttpError('An OpenAI-compatible provider needs a base URL starting with http(s)://')
        }
        const now = new Date().toISOString()
        const fields = { label, provider, model, base_url: baseUrl || null, updated_at: now, updated_by: actor }

        if (body.id) {
          // A blank key on edit keeps the stored one.
          const patch = apiKey ? { ...fields, api_key: apiKey } : fields
          const { error } = await admin.from('ai_providers').update(patch).eq('id', body.id)
          if (error) throw new HttpError(error.message, 500)
          await log('ai.provider.update', `Updated AI provider "${label}" (${provider}, ${model})${apiKey ? ', new key' : ''}`)
          return json({ ok: true })
        }

        if (!apiKey && provider !== 'openai_compatible') throw new HttpError('Enter the API key.')
        const hasActive = Boolean(await activeProvider())
        const { error } = await admin.from('ai_providers').insert({ ...fields, api_key: apiKey, is_active: !hasActive })
        if (error) throw new HttpError(error.message, 500)
        await log('ai.provider.create', `Added AI provider "${label}" (${provider}, ${model})`)
        return json({ ok: true }, 201)
      }

      case 'activate': {
        requireAdmin()
        const { data: target } = await admin.from('ai_providers').select('label').eq('id', body.id).maybeSingle()
        if (!target) throw new HttpError('Provider not found.', 404)
        await admin.from('ai_providers').update({ is_active: false }).eq('is_active', true)
        const { error } = await admin.from('ai_providers').update({ is_active: true }).eq('id', body.id)
        if (error) throw new HttpError(error.message, 500)
        await log('ai.provider.activate', `Switched AI generation to "${target.label}"`)
        return json({ ok: true })
      }

      case 'delete': {
        requireAdmin()
        const { data, error } = await admin.from('ai_providers').delete().eq('id', body.id).select('label')
        if (error) throw new HttpError(error.message, 500)
        if (data?.[0]) await log('ai.provider.delete', `Removed AI provider "${data[0].label}"`)
        return json({ ok: true })
      }

      case 'test': {
        requireAdmin()
        const { data } = await admin.from('ai_providers').select('*').eq('id', body.id).maybeSingle()
        if (!data) throw new HttpError('Provider not found.', 404)
        const started = Date.now()
        const reply = await callModel(data as ProviderRow, 'Reply with JSON only.', 'Return {"ok":true}', 1024)
        return json({ ok: true, ms: Date.now() - started, sample: reply.slice(0, 200) })
      }

      case 'settings': {
        requireAdmin()
        const value = body.allowGuests ? '1' : '0'
        await admin.from('app_settings').upsert({ key: 'ai_allow_guests', value })
        await log('ai.settings', value === '1' ? 'Allowed signed-out visitors to use AI generation' : 'Limited AI generation to signed-in users')
        return json({ ok: true })
      }

      /* -------- generate test cases -------- */
      case 'generate': {
        const p = await activeProvider()
        if (!p) throw new HttpError('No AI provider is set up yet. An admin can add one under Settings → AI settings.', 409)
        if (!signedIn && !(await allowGuests())) throw new HttpError('Sign in to generate test cases with AI.', 401)

        const featureName = String(body.featureName ?? '').trim().slice(0, 200)
        if (!featureName) throw new HttpError('Name the feature first.')
        const knowledge = String(body.knowledge ?? '').trim()
        if (knowledge.length > 60000) throw new HttpError('The feature knowledge is too long (60,000 characters max).')
        const count = Math.min(40, Math.max(1, Number(body.count) || 15))
        const existingTitles = (Array.isArray(body.existingTitles) ? body.existingTitles : [])
          .map((t: unknown) => String(t).slice(0, 200))
          .slice(0, 300)

        const reply = await callModel(
          p,
          SYSTEM_PROMPT,
          buildPrompt({
            featureName,
            featureDescription: String(body.featureDescription ?? '').slice(0, 4000),
            moduleName: String(body.moduleName ?? '').slice(0, 200),
            categoryName: String(body.categoryName ?? '').slice(0, 200),
            knowledge,
            existingTitles,
            count,
          }),
          16000,
        )
        const parsed = extractJson(reply) as { testCases?: unknown } | unknown[]
        const testCases = Array.isArray(parsed) ? parsed : Array.isArray(parsed?.testCases) ? parsed.testCases : []
        if (testCases.length === 0) throw new HttpError('The model returned no test cases. Try adding more knowledge.', 502)

        await log('ai.generate', `Generated ${testCases.length} test cases for "${featureName}" with ${p.label} (${p.model})`)
        return json({ testCases, provider: { label: p.label, model: p.model } })
      }

      default:
        throw new HttpError('Unknown action.')
    }
  } catch (err) {
    if (err instanceof HttpError) return json({ error: err.message }, err.status)
    console.error(err)
    return json({ error: err instanceof Error ? err.message : 'Unexpected error.' }, 500)
  }
})
