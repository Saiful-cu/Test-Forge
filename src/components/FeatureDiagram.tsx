import { ArrowRight, Building2, Cpu, ShieldCheck, User } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import type { MasterFeature, MasterTestCase } from '../types'
import { FeatureFlowchart } from './FeatureFlowchart'
import { cn } from '../lib/utils'

/**
 * A picture of how the feature runs.
 *
 * Laid out as a vertical sequence rather than a row of boxes: each step gets the full width,
 * so the text is readable, and the actor column shows at a glance who is doing what. Nothing
 * is encoded by hue alone — every actor carries an icon and a label too.
 */

type Actor = 'person' | 'system' | 'external'

interface Step {
  actor: Actor
  text: string
}

const ACTORS: Record<Actor, { label: string; icon: LucideIcon; dot: string; chip: string }> = {
  person: {
    label: 'Person',
    icon: User,
    dot: 'bg-sky-500',
    chip: 'bg-sky-50 text-sky-700 ring-sky-200',
  },
  system: {
    label: 'System',
    icon: Cpu,
    dot: 'bg-brand-500',
    chip: 'bg-brand-50 text-brand-700 ring-brand-200',
  },
  external: {
    label: 'Other system',
    icon: Building2,
    dot: 'bg-teal-500',
    chip: 'bg-teal-50 text-teal-700 ring-teal-200',
  },
}

/** Only strong, unambiguous signals — a wrong actor label would mislead. */
const EXTERNAL = /webhook|gateway|carrier|sip|crm|calendar|provider|receiver|connected system|downstream|identity provider|third[- ]party|api|mailbox|email is sent|sms/i
const PERSON = /^(the )?(caller|user|person|customer|administrator|admin|reviewer|approver|they|an administrator|a caller|a user|the caller|the person|someone)\b/i

function actorOf(text: string): Actor {
  if (PERSON.test(text.trim())) return 'person'
  if (EXTERNAL.test(text)) return 'external'
  return 'system'
}

function Sequence({ steps, showActors }: { steps: Step[]; showActors: boolean }) {
  return (
    <ol className="relative">
      {steps.map((step, i) => {
        const actor = ACTORS[step.actor]
        const Icon = actor.icon
        const last = i === steps.length - 1
        return (
          <li key={i} className="relative flex gap-3 pb-3 last:pb-0">
            {/* the connector running through the whole sequence */}
            {!last ? <span className="absolute left-[11px] top-7 bottom-0 w-px bg-slate-200" aria-hidden /> : null}
            <span
              className={cn(
                'relative z-10 mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-2xs font-semibold text-white',
                actor.dot,
              )}
            >
              {i + 1}
            </span>
            <div className="min-w-0 flex-1 rounded-lg border border-slate-200 bg-white px-3 py-2.5">
              {showActors ? (
                <span
                  className={cn(
                    'mb-1 inline-flex items-center gap-1 rounded-md px-1.5 py-0.5 text-2xs font-medium ring-1 ring-inset',
                    actor.chip,
                  )}
                >
                  <Icon className="h-3 w-3" />
                  {actor.label}
                </span>
              ) : null}
              <p className="text-sm leading-relaxed text-slate-700">{step.text}</p>
            </div>
          </li>
        )
      })}
    </ol>
  )
}

function Legend({ used }: { used: Actor[] }) {
  return (
    <div className="flex flex-wrap items-center gap-3">
      {used.map((a) => {
        const actor = ACTORS[a]
        const Icon = actor.icon
        return (
          <span key={a} className="flex items-center gap-1.5 text-2xs text-slate-500">
            <span className={cn('h-2.5 w-2.5 rounded-full', actor.dot)} />
            <Icon className="h-3 w-3" />
            {actor.label}
          </span>
        )
      })}
    </div>
  )
}

function Lifecycle({ entityLabel }: { entityLabel: string }) {
  const states = ['Draft', 'Submitted', 'Approved', 'In progress', 'Completed']
  return (
    <div className="rounded-lg border border-slate-200 bg-white p-3">
      <div className="flex flex-wrap items-center gap-x-1.5 gap-y-2">
        {states.map((state, i) => (
          <span key={state} className="flex items-center gap-1.5">
            <span
              className={cn(
                'rounded-full px-2.5 py-1 text-xs font-medium ring-1 ring-inset',
                i === 0
                  ? 'bg-slate-100 text-slate-700 ring-slate-300'
                  : i === states.length - 1
                    ? 'bg-emerald-50 text-emerald-800 ring-emerald-300'
                    : 'bg-brand-50 text-brand-800 ring-brand-200',
              )}
            >
              {state}
            </span>
            {i < states.length - 1 ? <ArrowRight className="h-3 w-3 text-slate-400" /> : null}
          </span>
        ))}
      </div>
      <div className="mt-2.5 flex flex-wrap items-center gap-1.5 border-t border-dashed border-slate-200 pt-2.5">
        <span className="text-2xs text-slate-500">From any state</span>
        <ArrowRight className="h-3 w-3 text-rose-400" />
        <span className="rounded-full bg-rose-50 px-2.5 py-1 text-xs font-medium text-rose-700 ring-1 ring-inset ring-rose-200">
          Cancelled
        </span>
        <span className="text-2xs text-slate-500">— releases whatever the {entityLabel} was holding</span>
      </div>
    </div>
  )
}

function Guards({ cases }: { cases: MasterTestCase[] }) {
  const n = (type: string) => cases.filter((tc) => tc.testType === type).length
  const guards = [
    { label: 'validation', n: n('Validation'), tone: 'bg-sky-50 text-sky-800 ring-sky-200' },
    { label: 'permission', n: n('Permission'), tone: 'bg-violet-50 text-violet-800 ring-violet-200' },
    { label: 'security', n: n('Security'), tone: 'bg-rose-50 text-rose-800 ring-rose-200' },
    { label: 'boundary', n: n('Boundary'), tone: 'bg-amber-50 text-amber-800 ring-amber-200' },
    { label: 'negative', n: n('Negative'), tone: 'bg-orange-50 text-orange-800 ring-orange-200' },
  ].filter((g) => g.n > 0)
  if (guards.length === 0) return null

  return (
    <div className="rounded-lg border border-dashed border-slate-300 bg-white px-3 py-2.5">
      <p className="flex items-center gap-1.5 text-2xs font-semibold uppercase tracking-wider text-slate-500">
        <ShieldCheck className="h-3.5 w-3.5" />
        Checks guarding this path
      </p>
      <div className="mt-2 flex flex-wrap gap-1.5">
        {guards.map((g) => (
          <span
            key={g.label}
            className={cn('rounded-md px-2 py-0.5 text-2xs font-medium ring-1 ring-inset', g.tone)}
          >
            {g.n} {g.label}
          </span>
        ))}
      </div>
    </div>
  )
}

/** Built from the feature's own test cases when no sequence has been written for it. */
function derivedSteps(feature: MasterFeature, cases: MasterTestCase[]): Step[] {
  const pick = (type: string) => cases.find((tc) => tc.testType === type)
  const traits = feature.traits ?? []
  const steps: Step[] = [
    { actor: 'person', text: `Someone opens ${feature.name} from the ${feature.moduleName} area.` },
    {
      actor: 'person',
      text: 'They enter the details the record needs and submit them.',
    },
    {
      actor: 'system',
      text: 'Required fields, formats and limits are checked before anything is written.',
    },
    {
      actor: 'system',
      text: 'The record is saved and the result is confirmed back to the person.',
    },
  ]
  if (traits.includes('money')) {
    steps.push({ actor: 'system', text: 'Pricing, discounts, tax and totals are calculated in the documented order.' })
  }
  if (traits.includes('integration')) {
    steps.push({
      actor: 'external',
      text: pick('Integration')?.title ?? 'Connected modules and reports pick the change up.',
    })
  }
  steps.push({
    actor: 'system',
    text: 'The change is written to the audit trail with the actor, the time and the values before and after.',
  })
  return steps
}

export function FeatureDiagram({ feature, cases }: { feature: MasterFeature; cases: MasterTestCase[] }) {
  const authored = feature.workflow?.length ? feature.workflow : null
  const steps: Step[] = authored
    ? authored.map((text) => ({ actor: actorOf(text), text }))
    : derivedSteps(feature, cases)
  const used = (['person', 'system', 'external'] as Actor[]).filter((a) => steps.some((s) => s.actor === a))
  const hasLifecycle = (feature.traits ?? []).includes('lifecycle')

  return (
    <div className="space-y-4">
      {/* The flowchart carries the shape; the sequence below carries the wording. */}
      <div className="hidden overflow-hidden rounded-lg border border-slate-200 bg-white p-3 md:block">
        <FeatureFlowchart feature={feature} cases={cases} />
      </div>

      <div>
        <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
          <p className="text-2xs font-semibold uppercase tracking-wider text-slate-500">Step by step</p>
          <span className="text-2xs text-slate-500">
            {authored ? 'Written for this feature' : 'Built from this feature’s own test cases'}
          </span>
        </div>
        <Sequence steps={steps} showActors={used.length > 1} />
        {used.length > 1 ? (
          <div className="mt-2">
            <Legend used={used} />
          </div>
        ) : null}
      </div>

      <div className="md:hidden">
        <Guards cases={cases} />
      </div>

      {hasLifecycle ? (
        <div>
          <p className="mb-2 text-2xs font-semibold uppercase tracking-wider text-slate-500">
            The states the record moves through
          </p>
          <Lifecycle entityLabel={feature.name.toLowerCase()} />
        </div>
      ) : null}
    </div>
  )
}
