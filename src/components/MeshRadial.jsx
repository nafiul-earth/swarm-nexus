const SATELLITES = [
  { name: 'RECOVERY', x: 120, y: 120, color: '#0f62fe', bg: '#edf5ff', score: '0.87', proposal: 'Re-route via Atlanta + partial Newark' },
  { name: 'COST',     x: 400, y: 120, color: '#b28600', bg: '#fcf4d6', score: '0.74', proposal: 'Insurance claim + customer credit' },
  { name: 'CX',       x: 260, y: 320, color: '#d12771', bg: '#fff0f7', score: '0.81', proposal: 'Same-hour partial ship + AM outreach' }
]

export default function MeshRadial() {
  return (
    <div className="gn-mesh">
      <div className="head">
        <div className="title">DECISION MESH · ARBITRATION</div>
        <div className="meta">3 proposals · 2 conflicts · resolving</div>
      </div>
      <svg viewBox="0 0 520 380">
        <defs>
          <radialGradient id="mesh-ring" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#0f62fe" stopOpacity="0.1" />
            <stop offset="100%" stopColor="#0f62fe" stopOpacity="0" />
          </radialGradient>
          <marker id="arrow-green" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="8" markerHeight="8" orient="auto">
            <path d="M 0 0 L 10 5 L 0 10 z" fill="#24a148" />
          </marker>
        </defs>
        <circle cx="260" cy="180" r="160" fill="url(#mesh-ring)" />

        {SATELLITES.map((s, i) => (
          <line key={'e'+i} x1={s.x} y1={s.y} x2="260" y2="180"
            stroke={s.color} strokeWidth="1.5" strokeDasharray="5 5" className="flow" />
        ))}

        {/* conflicts */}
        <line x1="120" y1="120" x2="400" y2="120" stroke="#da1e28" strokeWidth="1" strokeDasharray="3 3" opacity="0.6" />
        <text x="260" y="115" textAnchor="middle" fontFamily="IBM Plex Mono, monospace" fontSize="10" fill="#da1e28">⚠ conflict</text>
        <line x1="400" y1="120" x2="260" y2="320" stroke="#da1e28" strokeWidth="1" strokeDasharray="3 3" opacity="0.5" />
        <line x1="120" y1="120" x2="260" y2="320" stroke="#24a148" strokeWidth="1" strokeDasharray="3 3" opacity="0.55" />
        <text x="170" y="240" textAnchor="middle" fontFamily="IBM Plex Mono, monospace" fontSize="10" fill="#24a148">✓ compatible</text>

        {/* mesh hex */}
        <g transform="translate(260 180)">
          <polygon points="0,-44 38,-22 38,22 0,44 -38,22 -38,-22"
            fill="#edf5ff" stroke="#0f62fe" strokeWidth="2"
            style={{ filter: 'drop-shadow(0 0 12px rgba(15,98,254,0.25))' }} />
          <text x="0" y="-4" textAnchor="middle" fontFamily="IBM Plex Mono, monospace" fontSize="10" fill="#0f62fe" letterSpacing="2">MESH v4.1</text>
          <text x="0" y="14" textAnchor="middle" fontFamily="IBM Plex Mono, monospace" fontSize="10" fill="#525252">SH-48201</text>
        </g>

        {/* winning arrow */}
        <path d="M 305 180 L 470 180" stroke="#24a148" strokeWidth="2.5" fill="none" markerEnd="url(#arrow-green)" />
        <text x="385" y="170" textAnchor="middle" fontFamily="IBM Plex Mono, monospace" fontSize="10" fill="#24a148">→ AUTO-EXECUTE 0.91</text>

        {/* satellites */}
        {SATELLITES.map((s, i) => (
          <g key={'s'+i}>
            <circle cx={s.x} cy={s.y} r="32" fill={s.bg} stroke={s.color} strokeWidth="1.5" />
            <text x={s.x} y={s.y - 4} textAnchor="middle" fontFamily="IBM Plex Mono, monospace" fontSize="10" fill={s.color} letterSpacing="1.5">{s.name}</text>
            <text x={s.x} y={s.y + 12} textAnchor="middle" fontFamily="IBM Plex Mono, monospace" fontSize="11" fill="#161616" fontWeight="600">{s.score}</text>
          </g>
        ))}
      </svg>

      <div className="legend">
        {SATELLITES.map(s => (
          <div className="row" key={s.name}>
            <span className="bar" style={{ background: s.color }} />
            <span style={{ fontFamily: 'var(--gn-font-mono)', fontSize: 12, color: '#161616', letterSpacing: '0.04em' }}>{s.name}</span>
            <span style={{ color: 'var(--cds-text-secondary)', fontSize: 13 }}>{s.proposal}</span>
            <span style={{ fontFamily: 'var(--gn-font-mono)', textAlign: 'right', fontWeight: 600 }}>{s.score}</span>
          </div>
        ))}
        <div className="row winner">
          <span className="bar" style={{ background: '#24a148' }} />
          <span style={{ fontFamily: 'var(--gn-font-mono)', fontSize: 12, color: '#24a148', letterSpacing: '0.04em' }}>ARBITRATED</span>
          <span style={{ color: 'var(--cds-text-secondary)', fontSize: 13 }}>Recovery (primary) + CX (outreach) — Cost suppressed by SLA policy</span>
          <span style={{ fontFamily: 'var(--gn-font-mono)', textAlign: 'right', fontWeight: 600, color: '#24a148' }}>0.91</span>
        </div>
      </div>
    </div>
  )
}
