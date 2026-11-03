import { cn } from '../lib/utils'

export interface DonutSegment {
  label: string
  value: number
  /** Any CSS color — kept as a literal so SVG strokes stay predictable. */
  color: string
}

/**
 * Accessible donut built from stroke-dashoffset arcs.
 * No chart library, so the bundle stays small and the colors match the badges.
 */
export function DonutChart({
  segments,
  size = 168,
  thickness = 18,
  centerValue,
  centerLabel,
  className,
}: {
  segments: DonutSegment[]
  size?: number
  thickness?: number
  centerValue?: string
  centerLabel?: string
  className?: string
}) {
  const total = segments.reduce((n, s) => n + s.value, 0)
  const radius = (size - thickness) / 2
  const circumference = 2 * Math.PI * radius
  let offset = 0

  return (
    <div className={cn('relative shrink-0', className)} style={{ width: size, height: size }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} role="img" aria-label="Execution breakdown">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#e2e8f0"
          strokeWidth={thickness}
        />
        {total > 0 &&
          segments
            .filter((s) => s.value > 0)
            .map((s) => {
              const fraction = s.value / total
              const dash = fraction * circumference
              const el = (
                <circle
                  key={s.label}
                  cx={size / 2}
                  cy={size / 2}
                  r={radius}
                  fill="none"
                  stroke={s.color}
                  strokeWidth={thickness}
                  strokeDasharray={`${dash} ${circumference - dash}`}
                  strokeDashoffset={-offset}
                  strokeLinecap="butt"
                  transform={`rotate(-90 ${size / 2} ${size / 2})`}
                >
                  <title>{`${s.label}: ${s.value} (${Math.round(fraction * 100)}%)`}</title>
                </circle>
              )
              offset += dash
              return el
            })}
      </svg>
      <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
        {centerValue ? (
          <span className="text-2xl font-semibold tracking-tight text-slate-900">{centerValue}</span>
        ) : null}
        {centerLabel ? (
          <span className="mt-0.5 text-2xs font-medium uppercase tracking-wider text-slate-500">{centerLabel}</span>
        ) : null}
      </div>
    </div>
  )
}

export function DonutLegend({ segments, total }: { segments: DonutSegment[]; total: number }) {
  return (
    <ul className="min-w-0 flex-1 space-y-2.5">
      {segments.map((s) => (
        <li key={s.label} className="flex items-center gap-2.5 text-sm">
          <span className="h-2.5 w-2.5 shrink-0 rounded-sm" style={{ backgroundColor: s.color }} />
          <span className="min-w-0 flex-1 truncate text-slate-600">{s.label}</span>
          <span className="font-medium tabular-nums text-slate-900">{s.value}</span>
          <span className="w-10 text-right text-xs tabular-nums text-slate-500">
            {total === 0 ? '0%' : `${Math.round((s.value / total) * 100)}%`}
          </span>
        </li>
      ))}
    </ul>
  )
}

export const CHART_COLORS = {
  pass: '#10b981',
  fail: '#f43f5e',
  blocked: '#f59e0b',
  notRun: '#cbd5e1',
  brand: '#4f46e5',
}
