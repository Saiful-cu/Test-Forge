import type { MasterFeature, MasterTestCase } from '../types'

/**
 * A flowchart of the feature: the main path across the top, and the branches that divert it
 * hanging below the step that causes them. Drawn as SVG so the arrows and branches are real
 * lines rather than boxes in a row.
 *
 * Branch counts come from the feature's own test cases, so the picture matches what is tested.
 * Shown from md upward; narrower screens get the vertical sequence instead, because this
 * would scale the labels down to nothing.
 */

const NODE_W = 172
const NODE_H = 52
const GAP = 34
const TOP = 26
const BRANCH_Y = 132
const BRANCH_H = 46

interface MainNode {
  label: string
  sub?: string
}

interface Branch {
  /** Index of the main node this hangs off. */
  from: number
  label: string
  sub: string
}

const clip = (s: string, n: number) => (s.length > n ? `${s.slice(0, n - 1)}…` : s)

function Node({
  x,
  y,
  w,
  h,
  label,
  sub,
  tone,
}: {
  x: number
  y: number
  w: number
  h: number
  label: string
  sub?: string
  tone: 'main' | 'start' | 'end' | 'branch' | 'external'
}) {
  const styles = {
    main: { fill: '#ffffff', stroke: '#cbd5e1', label: '#0f172a', sub: '#64748b', dash: undefined },
    start: { fill: '#eef2ff', stroke: '#a5b4fc', label: '#3730a3', sub: '#4f46e5', dash: undefined },
    end: { fill: '#ecfdf5', stroke: '#6ee7b7', label: '#065f46', sub: '#047857', dash: undefined },
    branch: { fill: '#fff1f2', stroke: '#fda4af', label: '#9f1239', sub: '#be123c', dash: '4 3' },
    external: { fill: '#f0fdfa', stroke: '#5eead4', label: '#115e59', sub: '#0f766e', dash: '4 3' },
  }[tone]

  return (
    <g>
      <rect
        x={x}
        y={y}
        width={w}
        height={h}
        rx={8}
        fill={styles.fill}
        stroke={styles.stroke}
        strokeWidth={1.5}
        strokeDasharray={styles.dash}
      />
      <text
        x={x + w / 2}
        y={sub ? y + h / 2 - 3 : y + h / 2 + 4}
        textAnchor="middle"
        fontSize={12.5}
        fontWeight={600}
        fill={styles.label}
      >
        {label}
      </text>
      {sub ? (
        <text x={x + w / 2} y={y + h / 2 + 13} textAnchor="middle" fontSize={10.5} fill={styles.sub}>
          {sub}
        </text>
      ) : null}
    </g>
  )
}

export function FeatureFlowchart({ feature, cases }: { feature: MasterFeature; cases: MasterTestCase[] }) {
  const count = (type: string) => cases.filter((tc) => tc.testType === type).length
  const traits = feature.traits ?? []

  const nodes: MainNode[] = [
    { label: 'Start', sub: clip(feature.moduleName, 22) },
    { label: 'Details entered', sub: 'by the person using it' },
    { label: 'Checks run', sub: `${count('Validation') + count('Boundary')} rules` },
    { label: traits.includes('money') ? 'Priced & saved' : 'Saved', sub: 'record written' },
    { label: 'Recorded', sub: 'audit trail' },
  ]

  const branches: Branch[] = []
  if (count('Security') > 0) {
    branches.push({ from: 1, label: 'Sanitised', sub: `${count('Security')} security checks` })
  }
  if (count('Validation') + count('Boundary') > 0) {
    branches.push({
      from: 2,
      label: 'Rejected',
      sub: `${count('Validation') + count('Boundary')} validation rules`,
    })
  }
  if (count('Permission') > 0) {
    branches.push({ from: 3, label: 'Refused', sub: `${count('Permission')} permission rules` })
  }

  const showsExternal = traits.includes('integration') || count('Integration') > 0
  const width = TOP + nodes.length * (NODE_W + GAP) + (showsExternal ? NODE_W + GAP : 0)
  const height = branches.length > 0 ? BRANCH_Y + BRANCH_H + 16 : TOP + NODE_H + 24
  const xOf = (i: number) => TOP + i * (NODE_W + GAP)

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      width="100%"
      role="img"
      aria-label={`Flowchart: the main path through ${feature.name}, with the branches that divert it`}
      className="h-auto"
    >
      <defs>
        <marker id="ff-arrow" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M0 1l6 3-6 3z" fill="#94a3b8" />
        </marker>
        <marker id="ff-arrow-red" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M0 1l6 3-6 3z" fill="#fb7185" />
        </marker>
        <marker id="ff-arrow-teal" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M0 1l6 3-6 3z" fill="#2dd4bf" />
        </marker>
      </defs>

      {/* the main path */}
      {nodes.map((n, i) => (
        <g key={i}>
          {i > 0 ? (
            <line
              x1={xOf(i - 1) + NODE_W}
              y1={TOP + NODE_H / 2}
              x2={xOf(i) - 6}
              y2={TOP + NODE_H / 2}
              stroke="#94a3b8"
              strokeWidth={1.5}
              markerEnd="url(#ff-arrow)"
            />
          ) : null}
          <Node
            x={xOf(i)}
            y={TOP}
            w={NODE_W}
            h={NODE_H}
            label={n.label}
            sub={n.sub}
            tone={i === 0 ? 'start' : i === nodes.length - 1 && !showsExternal ? 'end' : 'main'}
          />
        </g>
      ))}

      {/* downstream systems continue the path */}
      {showsExternal ? (
        <g>
          <line
            x1={xOf(nodes.length - 1) + NODE_W}
            y1={TOP + NODE_H / 2}
            x2={xOf(nodes.length) - 6}
            y2={TOP + NODE_H / 2}
            stroke="#2dd4bf"
            strokeWidth={1.5}
            strokeDasharray="4 3"
            markerEnd="url(#ff-arrow-teal)"
          />
          <Node
            x={xOf(nodes.length)}
            y={TOP}
            w={NODE_W}
            h={NODE_H}
            label="Other systems"
            sub={`${count('Integration')} integration checks`}
            tone="external"
          />
        </g>
      ) : null}

      {/* branches that divert the path */}
      {branches.map((b) => {
        const cx = xOf(b.from) + NODE_W / 2
        return (
          <g key={b.label}>
            <path
              d={`M${cx} ${TOP + NODE_H} V ${BRANCH_Y - 6}`}
              stroke="#fb7185"
              strokeWidth={1.5}
              strokeDasharray="4 3"
              fill="none"
              markerEnd="url(#ff-arrow-red)"
            />
            <Node
              x={xOf(b.from)}
              y={BRANCH_Y}
              w={NODE_W}
              h={BRANCH_H}
              label={b.label}
              sub={b.sub}
              tone="branch"
            />
          </g>
        )
      })}
    </svg>
  )
}
