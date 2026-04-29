const NODES = [
  { x: 60,  y: 50,  r: 6, fill: '#fff', stroke: '#8d8d8d', label: 'TMS' },
  { x: 60,  y: 100, r: 6, fill: '#fff', stroke: '#8d8d8d', label: 'WMS' },
  { x: 60,  y: 150, r: 6, fill: '#fff', stroke: '#8d8d8d', label: 'ERP' },
  { x: 60,  y: 200, r: 6, fill: '#fff', stroke: '#8d8d8d', label: 'Carrier' },
  { x: 60,  y: 250, r: 6, fill: '#fff', stroke: '#8d8d8d', label: 'NOAA' },
  { x: 220, y: 60,  r: 7, fill: '#f6f2ff', stroke: '#8a3ffc', label: 'scan_event' },
  { x: 220, y: 110, r: 7, fill: '#f6f2ff', stroke: '#8a3ffc', label: 'stock_level' },
  { x: 220, y: 170, r: 7, fill: '#f6f2ff', stroke: '#8a3ffc', label: 'carrier_eta' },
  { x: 220, y: 230, r: 7, fill: '#f6f2ff', stroke: '#8a3ffc', label: 'temp_excursion' },
  { x: 400, y: 70,  r: 11, fill: '#defbe6', stroke: '#24a148', label: 'OTIF %' },
  { x: 400, y: 140, r: 11, fill: '#defbe6', stroke: '#24a148', label: 'Recovery T' },
  { x: 400, y: 210, r: 11, fill: '#defbe6', stroke: '#24a148', label: 'Carrier SLA' },
  { x: 510, y: 110, r: 8, fill: '#fff0f7', stroke: '#d12771', label: 'KB · MEM' },
  { x: 620, y: 100, r: 14, fill: '#edf5ff', stroke: '#0f62fe', label: 'Lift OTIF Q4', glow: true },
  { x: 620, y: 200, r: 12, fill: '#edf5ff', stroke: '#0f62fe', label: 'Hold Cost' }
]
const EDGES = [
  { d: 'M 66 50 L 213 60', color: '#0f62fe', w: 1, o: 0.4 },
  { d: 'M 66 100 L 213 110', color: '#0f62fe', w: 1, o: 0.4 },
  { d: 'M 66 150 L 213 170', color: '#0f62fe', w: 1, o: 0.4 },
  { d: 'M 66 200 L 213 170', color: '#0f62fe', w: 1, o: 0.4 },
  { d: 'M 66 250 L 213 230', color: '#0f62fe', w: 1, o: 0.4 },
  { d: 'M 227 60  C 300 60, 320 70, 389 70',   color: '#0f62fe', w: 1, o: 0.55 },
  { d: 'M 227 110 C 300 110, 320 130, 389 140', color: '#0f62fe', w: 1, o: 0.55 },
  { d: 'M 227 170 C 300 170, 320 190, 389 210', color: '#0f62fe', w: 1, o: 0.55 },
  { d: 'M 502 110 L 411 70',  color: '#d12771', w: 1.4, o: 0.85, dash: '4 3' },
  { d: 'M 411 70  C 510 70, 540 100, 606 100', color: '#0f62fe', w: 2, o: 0.95, flow: true },
  { d: 'M 411 140 C 540 140, 540 100, 606 100', color: '#0f62fe', w: 1.6, o: 0.7, flow: true },
  { d: 'M 411 210 C 540 210, 540 200, 608 200', color: '#0f62fe', w: 1.4, o: 0.6 },
  { d: 'M 227 170 C 350 150, 430 110, 502 110', color: '#d12771', w: 1, o: 0.5 }
]

export default function CausalDAG({ compact = false }) {
  return (
    <div className="gn-dag">
      <div className="head">
        <div className="title">LIVE CAUSAL DAG</div>
        <div className="meta">
          <span style={{ width: 7, height: 7, borderRadius: 999, background: '#0f62fe', display: 'inline-block', boxShadow: '0 0 0 4px rgba(15,98,254,0.18)' }} />
          <span>compiling on edit</span>
          <span style={{ marginLeft: 12, color: 'var(--cds-text-helper)' }}>47 nodes · 96 edges · acyclic ✓</span>
        </div>
      </div>
      <svg viewBox="0 0 720 320">
        <defs>
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#f4f4f4" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="720" height="320" fill="url(#grid)" />

        {EDGES.map((e, i) => (
          <path key={i} d={e.d} fill="none" stroke={e.color} strokeWidth={e.w} opacity={e.o}
            strokeDasharray={e.dash} className={e.flow ? 'flow' : ''} />
        ))}
        {NODES.map((n, i) => (
          <g key={i}>
            <circle cx={n.x} cy={n.y} r={n.r} fill={n.fill} stroke={n.stroke} strokeWidth="1.5"
              style={n.glow ? { filter: 'drop-shadow(0 0 8px rgba(15,98,254,0.5))' } : undefined} />
            <text x={n.x} y={n.y - n.r - 6} textAnchor="middle"
              fontFamily="IBM Plex Mono, monospace" fontSize="9"
              fill={n.label === 'Lift OTIF Q4' ? '#0f62fe' : '#525252'}>
              {n.label}
            </text>
          </g>
        ))}
        <g fontFamily="IBM Plex Mono, monospace" fontSize="9" fill="#a8a8a8" letterSpacing="2">
          <text x="60"  y="306">DATA</text>
          <text x="220" y="306">SIGNALS</text>
          <text x="380" y="306">KPIs</text>
          <text x="600" y="306">GOALS</text>
        </g>
      </svg>
      <div className="footer">
        <span className="ok">DAG VALID ✓</span>
        <span>last compile 2s ago</span>
        <span style={{ marginLeft: 'auto' }}>23 active flows · 47 agents notified</span>
      </div>
    </div>
  )
}
