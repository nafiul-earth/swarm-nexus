import { useEffect, useState, useMemo } from 'react'

export default function ThrottleGauge({ value = 0.91, animated = true }) {
  const [v, setV] = useState(value)

  useEffect(() => {
    if (!animated) { setV(value); return }
    const cycle = [0.91, 0.74, 0.61, 0.91]
    let i = 0
    const t = setInterval(() => {
      i = (i + 1) % cycle.length
      setV(cycle[i])
    }, 4500)
    return () => clearInterval(t)
  }, [animated, value])

  const angle = useMemo(() => -90 + Math.max(0, Math.min(1, v)) * 180, [v])
  const state = v >= 0.85 ? 'green' : v >= 0.65 ? 'amber' : 'red'
  const label = state === 'green' ? 'AUTO-EXECUTE' : state === 'amber' ? 'HOLD FOR REVIEW' : 'ESCALATE TO HUMAN'

  return (
    <div className="gn-gauge-wrap">
      <svg viewBox="0 0 320 200" className="gn-gauge">
        <defs>
          <linearGradient id="g-green" x1="0" x2="1">
            <stop offset="0%" stopColor="#24a148" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#24a148" stopOpacity="0.5" />
          </linearGradient>
          <linearGradient id="g-amber" x1="0" x2="1">
            <stop offset="0%" stopColor="#f1c21b" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#f1c21b" stopOpacity="0.7" />
          </linearGradient>
          <linearGradient id="g-red" x1="0" x2="1">
            <stop offset="0%" stopColor="#da1e28" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#da1e28" stopOpacity="0.85" />
          </linearGradient>
        </defs>
        <path d="M30,160 A130,130 0 0,1 95,47" fill="none" stroke="url(#g-green)" strokeWidth="22" strokeLinecap="round" />
        <path d="M105,42 A130,130 0 0,1 215,42" fill="none" stroke="url(#g-amber)" strokeWidth="22" strokeLinecap="round" />
        <path d="M225,47 A130,130 0 0,1 290,160" fill="none" stroke="url(#g-red)" strokeWidth="22" strokeLinecap="round" />

        <g transform={`rotate(${angle} 160 160)`} style={{ transition: 'transform 1.4s cubic-bezier(.6,.05,.18,1)' }}>
          <line x1="160" y1="160" x2="160" y2="50" stroke="#0f62fe" strokeWidth="2.5" strokeLinecap="round" />
          <circle cx="160" cy="160" r="9" fill="#fff" stroke="#0f62fe" strokeWidth="2" />
          <circle cx="160" cy="160" r="3" fill="#0f62fe" />
        </g>

        <text x="38"  y="190" fill="#24a148" fontFamily="IBM Plex Mono, monospace" fontSize="11" letterSpacing="2">AUTO</text>
        <text x="160" y="22"  fill="#b28600" fontFamily="IBM Plex Mono, monospace" fontSize="11" textAnchor="middle" letterSpacing="2">HOLD</text>
        <text x="282" y="190" fill="#da1e28" fontFamily="IBM Plex Mono, monospace" fontSize="11" textAnchor="end" letterSpacing="2">ESCALATE</text>
      </svg>
      <div className="readout">
        <div className="value">{v.toFixed(2)}</div>
        <div className={`state ${state}`}>{label}</div>
      </div>
      <div style={{
        display: 'flex', justifyContent: 'space-between', gap: 6, width: '100%',
        fontFamily: 'IBM Plex Mono, monospace', fontSize: 11, color: 'var(--cds-text-secondary)',
        borderTop: '1px dashed var(--cds-border-subtle)', paddingTop: 8
      }}>
        <span style={{ color: '#24a148' }}>≥ 0.85 · auto</span>
        <span style={{ color: '#b28600' }}>0.65–0.84 · hold</span>
        <span style={{ color: '#da1e28' }}>&lt; 0.65 · escalate</span>
      </div>
    </div>
  )
}
