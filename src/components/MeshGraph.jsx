/* SVG decision-mesh graph.
   Renders typed nodes and typed edges with auto-routed cubic-bezier connectors.

   Node tones share the palette used for tile chrome elsewhere in the app
   (red / blue / green / amber / orange / gray / mesh).

   Edge kinds:
     flow             — neutral blue solid arrow
     flow-suppressed  — gray dashed (suppressed proposal still drawn for context)
     suppress         — red dashed with X marker on midpoint
     influence        — orange solid with circle marker (human override)
     cascade          — orange dashed (override propagating downstream)
     escalate         — red bold solid (escalated to human)
*/

// Tuned for the g100 dark theme — fills are translucent + tinted, strokes glow-bright.
const NODE_FILL = {
  red:    'rgba(250,77,86,0.18)',
  blue:   'rgba(69,137,255,0.18)',
  green:  'rgba(66,190,101,0.18)',
  amber:  'rgba(241,194,27,0.18)',
  orange: 'rgba(255,131,43,0.18)',
  gray:   'rgba(255,255,255,0.05)',
  mesh:   'rgba(120,169,255,0.22)'
}
const NODE_STROKE = {
  red:    '#fa4d56',
  blue:   '#4589ff',
  green:  '#42be65',
  amber:  '#f1c21b',
  orange: '#ff832b',
  gray:   '#8d8d8d',
  mesh:   '#78a9ff'
}
const NODE_LABEL = {
  red:    '#ff8389',
  blue:   '#a6c8ff',
  green:  '#6fdc8c',
  amber:  '#f1c21b',
  orange: '#ffa05c',
  gray:   '#c6c6c6',
  mesh:   '#a6c8ff'
}
const NODE_SUB = '#c6c6c6'

const EDGE_COLOR = {
  flow:               '#4589ff',
  'flow-suppressed':  '#6f6f6f',
  suppress:           '#fa4d56',
  influence:          '#ff832b',
  cascade:            '#ff832b',
  escalate:           '#fa4d56'
}

function nodeAnchor(src, dst) {
  // Returns the (x, y) point on src's perimeter pointing toward dst's center,
  // and the (x, y) point on dst's perimeter pointing toward src's center.
  const sCx = src.x + src.w / 2
  const sCy = src.y + src.h / 2
  const dCx = dst.x + dst.w / 2
  const dCy = dst.y + dst.h / 2
  const dx = dCx - sCx
  const dy = dCy - sCy
  // Pick anchor side based on which axis dominates
  let s = { x: sCx, y: sCy }
  let d = { x: dCx, y: dCy }
  if (Math.abs(dx) >= Math.abs(dy)) {
    if (dx >= 0) { s = { x: src.x + src.w, y: sCy }; d = { x: dst.x,         y: dCy } }
    else         { s = { x: src.x,         y: sCy }; d = { x: dst.x + dst.w, y: dCy } }
  } else {
    if (dy >= 0) { s = { x: sCx, y: src.y + src.h }; d = { x: dCx, y: dst.y } }
    else         { s = { x: sCx, y: src.y };         d = { x: dCx, y: dst.y + dst.h } }
  }
  return { s, d }
}

function bezier(s, d) {
  const dx = d.x - s.x
  const dy = d.y - s.y
  const horizontalDominant = Math.abs(dx) >= Math.abs(dy)
  // Control points pulled along the dominant axis
  const cx1 = horizontalDominant ? s.x + dx * 0.5 : s.x
  const cy1 = horizontalDominant ? s.y           : s.y + dy * 0.5
  const cx2 = horizontalDominant ? d.x - dx * 0.5 : d.x
  const cy2 = horizontalDominant ? d.y           : d.y - dy * 0.5
  return `M ${s.x} ${s.y} C ${cx1} ${cy1}, ${cx2} ${cy2}, ${d.x} ${d.y}`
}

function midpoint(s, d) {
  return { x: (s.x + d.x) / 2, y: (s.y + d.y) / 2 }
}

export default function MeshGraph({ graph }) {
  const byId = Object.fromEntries(graph.nodes.map(n => [n.id, n]))
  const minX = 0
  const minY = 0
  const maxX = Math.max(...graph.nodes.map(n => n.x + n.w)) + 30
  const maxY = Math.max(...graph.nodes.map(n => n.y + n.h)) + 30

  return (
    <svg
      viewBox={`${minX} ${minY} ${maxX} ${maxY}`}
      className="gn-mesh-graph"
      role="img"
      aria-label="Decision mesh graph"
    >
      <defs>
        {Object.entries(EDGE_COLOR).map(([k, c]) => (
          <marker
            key={k}
            id={`arr-${k}`}
            viewBox="0 0 12 12"
            refX="11" refY="6"
            markerWidth="8" markerHeight="8"
            orient="auto"
          >
            <path d="M 0 0 L 12 6 L 0 12 z" fill={c} />
          </marker>
        ))}
        <pattern id="mesh-fill" width="6" height="6" patternUnits="userSpaceOnUse">
          <rect width="6" height="6" fill="rgba(120,169,255,0.22)" />
          <line x1="0" y1="6" x2="6" y2="0" stroke="rgba(120,169,255,0.45)" strokeWidth="0.6" />
        </pattern>
        <filter id="node-glow">
          <feGaussianBlur stdDeviation="2.4" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* edges first so nodes render on top */}
      {graph.edges.map((e, i) => {
        const src = byId[e.from]
        const dst = byId[e.to]
        if (!src || !dst) return null
        const { s, d } = nodeAnchor(src, dst)
        const path = bezier(s, d)
        const color = EDGE_COLOR[e.kind] || '#0f62fe'
        const isDashed = e.kind === 'flow-suppressed' || e.kind === 'suppress' || e.kind === 'cascade'
        const dashArray = e.kind === 'suppress' ? '6 4' : e.kind === 'cascade' ? '4 4' : e.kind === 'flow-suppressed' ? '3 3' : null
        const strokeWidth = e.kind === 'escalate' ? 2.5 : e.kind === 'flow-suppressed' ? 1 : 1.5
        const m = midpoint(s, d)

        return (
          <g key={i}>
            <path
              d={path}
              fill="none"
              stroke={color}
              strokeWidth={strokeWidth}
              strokeDasharray={dashArray || undefined}
              opacity={e.kind === 'flow-suppressed' ? 0.5 : 0.9}
              markerEnd={`url(#arr-${e.kind})`}
            />
            {/* edge marker for suppressed / influence */}
            {e.kind === 'suppress' && (
              <g transform={`translate(${m.x} ${m.y})`}>
                <circle r="10" fill="#161616" stroke={color} strokeWidth="1.5" />
                <text textAnchor="middle" y="3.5" fontFamily="IBM Plex Mono, monospace" fontSize="11" fontWeight="700" fill={color}>×</text>
              </g>
            )}
            {e.kind === 'influence' && (
              <g transform={`translate(${m.x} ${m.y})`}>
                <circle r="10" fill="#161616" stroke={color} strokeWidth="1.5" />
                <text textAnchor="middle" y="3.5" fontFamily="IBM Plex Mono, monospace" fontSize="9" fontWeight="700" fill={color}>H</text>
              </g>
            )}
            {e.kind === 'escalate' && (
              <g transform={`translate(${m.x} ${m.y})`}>
                <circle r="10" fill="#161616" stroke={color} strokeWidth="2" />
                <text textAnchor="middle" y="3.5" fontFamily="IBM Plex Mono, monospace" fontSize="10" fontWeight="700" fill={color}>!</text>
              </g>
            )}
            {e.label && (
              <g transform={`translate(${m.x} ${m.y - 14})`}>
                <rect x="-50" y="-9" width="100" height="16" fill="#262626" stroke={color} strokeOpacity="0.55" />
                <text
                  textAnchor="middle" y="3"
                  fontFamily="IBM Plex Mono, monospace" fontSize="9.5"
                  fill={color}
                  letterSpacing="0.06em"
                >
                  {e.label.toUpperCase()}
                </text>
              </g>
            )}
          </g>
        )
      })}

      {/* nodes */}
      {graph.nodes.map(n => {
        const fill = n.kind === 'mesh' ? 'url(#mesh-fill)' : (NODE_FILL[n.tone] || '#fff')
        const stroke = NODE_STROKE[n.tone] || '#0f62fe'
        const labelColor = NODE_LABEL[n.tone] || '#161616'
        return (
          <g key={n.id} transform={`translate(${n.x} ${n.y})`}>
            <rect
              width={n.w} height={n.h}
              fill={fill}
              stroke={stroke}
              strokeWidth={n.kind === 'mesh' ? 2 : 1.5}
              opacity={n.suppressed ? 0.7 : 1}
            />
            {/* label */}
            <text
              x={12} y={22}
              fontFamily="IBM Plex Mono, monospace"
              fontSize="11.5"
              fontWeight="600"
              letterSpacing="0.04em"
              fill={labelColor}
              textDecoration={n.suppressed ? 'line-through' : 'none'}
            >
              {n.label.toUpperCase()}
            </text>
            {/* sub */}
            {n.sub && (
              <text
                x={12} y={42}
                fontFamily="IBM Plex Sans, sans-serif"
                fontSize="11.5"
                fill={NODE_SUB}
                textDecoration={n.suppressed ? 'line-through' : 'none'}
              >
                {n.sub.length > 30 ? n.sub.slice(0, 28) + '…' : n.sub}
              </text>
            )}
            {/* confidence */}
            {typeof n.conf === 'number' && (
              <text
                x={n.w - 12} y={22}
                textAnchor="end"
                fontFamily="IBM Plex Mono, monospace"
                fontSize="12.5"
                fontWeight="700"
                fill={labelColor}
              >
                {n.conf.toFixed(2)}
              </text>
            )}
            {/* kind chip bottom-right */}
            <text
              x={n.w - 12} y={n.h - 8}
              textAnchor="end"
              fontFamily="IBM Plex Mono, monospace"
              fontSize="9"
              letterSpacing="0.14em"
              fill="#a8a8a8"
            >
              {n.kind.toUpperCase()}
            </text>
            {/* critical-point badge */}
            {n.cpRef && (
              <g transform={`translate(${n.w - 12} ${-12})`}>
                <circle r="13" fill="#ff832b" stroke="#fff" strokeWidth="2" />
                <text
                  textAnchor="middle" y="4"
                  fontFamily="IBM Plex Mono, monospace"
                  fontSize="11" fontWeight="700"
                  fill="#fff"
                >
                  {n.cpRef}
                </text>
              </g>
            )}
            {/* suppressed strikethrough overlay */}
            {n.suppressed && (
              <line
                x1="6" y1={n.h / 2} x2={n.w - 6} y2={n.h / 2}
                stroke="#da1e28" strokeWidth="1.5" opacity="0.7"
              />
            )}
          </g>
        )
      })}
    </svg>
  )
}
