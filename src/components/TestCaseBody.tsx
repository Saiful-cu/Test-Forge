import type { ReactNode } from 'react'

export function DetailBlock({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div>
      <p className="text-2xs font-semibold uppercase tracking-wider text-slate-400">{label}</p>
      <div className="mt-1 text-sm leading-relaxed text-slate-700">{children}</div>
    </div>
  )
}

/** Shared read-only rendering of a test case's specification. */
export function TestCaseBody({
  description,
  preconditions,
  steps,
  expectedResult,
}: {
  description: string
  preconditions: string
  steps: string[]
  expectedResult: string
}) {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
      <div className="space-y-4">
        <DetailBlock label="Description">{description}</DetailBlock>
        <DetailBlock label="Preconditions">{preconditions}</DetailBlock>
      </div>
      <div className="space-y-4">
        <DetailBlock label="Test steps">
          <ol className="list-decimal space-y-1.5 pl-4">
            {steps.map((s, i) => (
              <li key={i} className="pl-1">
                {s}
              </li>
            ))}
          </ol>
        </DetailBlock>
        <DetailBlock label="Expected result">
          <span className="block rounded-lg border border-emerald-200 bg-emerald-50/60 px-3 py-2 text-emerald-900">
            {expectedResult}
          </span>
        </DetailBlock>
      </div>
    </div>
  )
}
