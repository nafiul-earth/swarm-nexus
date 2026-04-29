import { useMemo } from 'react'
import { Tag, Button } from '@carbon/react'
import { ArrowRight, Download, ArrowUp, ArrowDown, Subtract } from '@carbon/icons-react'
import { useNavigate } from 'react-router-dom'
import { EXEC } from '../data/mock.js'

function HeroTile({ label, value, delta, deltaTone, spark, tone = 'positive' }) {
  const points = useMemo(() => {
    if (!spark || !spark.length) return ''
    const w = 110, h = 36
    const max = Math.max(...spark) * 1.05
    const min = Math.min(...spark) * 0.95
    return spark.map((v, i) => {
      const x = (i / (spark.length - 1)) * w
      const y = h - ((v - min) / (max - min || 1)) * h
      return `${x},${y}`
    }).join(' ')
  }, [spark])

  return (
    <div className={`gn-exec-tile hero-${tone}`}>
      <div className="label">{label}</div>
      <div className="value">{value}</div>
      <div className={`delta ${deltaTone}`}>{delta}</div>
      {spark && (
        <svg className="spark" viewBox="0 0 110 36" preserveAspectRatio="none">
          <defs>
            <linearGradient id={`grad-${label}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%"  stopColor="#42be65" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#42be65" stopOpacity="0" />
            </linearGradient>
          </defs>
          <polygon
            points={`0,36 ${points} 110,36`}
            fill={`url(#grad-${label})`}
          />
          <polyline points={points} fill="none" stroke="#42be65" strokeWidth="1.5" />
        </svg>
      )}
    </div>
  )
}

function TrendIcon({ trend }) {
  if (trend === 'up') return <ArrowUp size={14} />
  if (trend === 'down') return <ArrowDown size={14} />
  return <Subtract size={14} />
}

function TrendChart({ data }) {
  const w = 1100
  const h = 200
  const padX = 32, padY = 24
  const max = Math.max(...data.automated) * 1.05
  const ptsAuto = data.automated.map((v, i) => {
    const x = padX + (i / (data.months.length - 1)) * (w - padX * 2)
    const y = h - padY - ((v / max) * (h - padY * 2))
    return [x, y]
  })
  const ptsOver = data.overrides.map((v, i) => {
    const x = padX + (i / (data.months.length - 1)) * (w - padX * 2)
    const y = h - padY - ((v / max) * (h - padY * 2)) * 8 // amplify so it's visible alongside
    return [x, y]
  })
  const polyA = ptsAuto.map(p => p.join(',')).join(' ')
  const polyO = ptsOver.map(p => p.join(',')).join(' ')

  return (
    <svg viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none">
      <defs>
        <linearGradient id="auto-area" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor="#4589ff" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#4589ff" stopOpacity="0.0" />
        </linearGradient>
      </defs>
      {/* gridlines */}
      {[0, 1, 2, 3].map(i => (
        <line key={i}
          x1={padX} x2={w - padX}
          y1={padY + i * ((h - padY * 2) / 3)} y2={padY + i * ((h - padY * 2) / 3)}
          stroke="#393939" strokeDasharray="2 4"
        />
      ))}
      {/* area */}
      <polygon
        points={`${padX},${h - padY} ${polyA} ${w - padX},${h - padY}`}
        fill="url(#auto-area)"
      />
      {/* lines */}
      <polyline points={polyA} fill="none" stroke="#4589ff" strokeWidth="2" />
      <polyline points={polyO} fill="none" stroke="#ff832b" strokeWidth="1.5" strokeDasharray="4 3" />
      {/* labels */}
      {data.months.map((m, i) => (
        <text key={m}
          x={padX + (i / (data.months.length - 1)) * (w - padX * 2)} y={h - 4}
          textAnchor="middle"
          fontFamily="IBM Plex Mono, monospace" fontSize="9.5" fill="#8d8d8d"
        >{m}</text>
      ))}
      <text x={w - padX} y={padY - 8} textAnchor="end" fontFamily="IBM Plex Mono, monospace" fontSize="10" fill="#4589ff">
        decisions automated
      </text>
      <text x={w - padX} y={padY - 8 + 14} textAnchor="end" fontFamily="IBM Plex Mono, monospace" fontSize="10" fill="#ff832b">
        human overrides (×8 scale)
      </text>
    </svg>
  )
}

export default function Executive() {
  const navigate = useNavigate()
  return (
    <div className="gn-page">
      <div className="gn-page-head">
        <div>
          <div className="crumb">Home / Executive</div>
          <h1>Executive view</h1>
          <div className="subtitle">
            What the sponsor sees: outcomes, trust posture, and exposure across delegated goals.
            Dense by design — every number is one click from the underlying work.
          </div>
        </div>
        <div className="flex gap-1">
          <Tag type="green">Q2 2026 · in flight</Tag>
          <Button size="sm" kind="ghost" renderIcon={Download}>Export PDF</Button>
        </div>
      </div>

      {/* Hero strip */}
      <div className="gn-section">
        <div className="gn-section-title">Quarter at a glance</div>
        <div className="gn-exec-hero">
          {EXEC.hero.map((h, i) => (
            <HeroTile key={i} {...h} tone={i === 3 ? 'positive' : 'positive'} />
          ))}
        </div>
      </div>

      {/* Trend chart */}
      <div className="gn-section">
        <div className="gn-section-title flex flex-between">
          <span>Decisions automated · 12-month trend</span>
          <span className="muted txt-sm mono">overrides held under 5% throughout</span>
        </div>
        <div className="gn-trend-chart">
          <TrendChart data={EXEC.trendline} />
        </div>
      </div>

      {/* Goal health matrix */}
      <div className="gn-section">
        <div className="gn-section-title">Goal portfolio · health &amp; mode</div>
        <div className="gn-goal-matrix">
          {EXEC.goalMatrix.map(g => (
            <div
              key={g.id}
              className={`gn-matrix-card scenario-${g.scenario}`}
              style={{ cursor: 'pointer' }}
              onClick={() => navigate('/goals')}
            >
              <div className="gid">{g.id}</div>
              <div className="gname">{g.name}</div>
              <div className="row">
                <div className={`gn-mode ${g.mode}`}><span className="dot" />{g.mode}</div>
                <span className={`trend ${g.trend}`}>
                  <TrendIcon trend={g.trend} />
                  {g.trend === 'up' ? ' on track' : g.trend === 'down' ? ' slipping' : ' steady'}
                </span>
              </div>
              <div className="progress"><div className="fill" style={{ width: `${Math.round(g.progress * 100)}%` }} /></div>
              <div className="row">
                <span className="muted">Progress</span>
                <span>{Math.round(g.progress * 100)}%</span>
              </div>
              {g.blockers > 0 ? (
                <div className="row" style={{ color: 'var(--gn-orange)' }}>
                  <span>{g.blockers} blocker</span>
                  <ArrowRight size={14} />
                </div>
              ) : (
                <div className="row" style={{ color: 'var(--gn-green)' }}>
                  <span>healthy</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Trust posture */}
      <div className="gn-section">
        <div className="gn-section-title flex flex-between">
          <span>Trust posture · agent reliability you can audit</span>
          <Button size="sm" kind="ghost" renderIcon={ArrowRight} onClick={() => navigate('/eval')}>Open eval suite</Button>
        </div>
        <div className="gn-trust">
          {EXEC.trust.map((t, i) => (
            <div key={i} className={`gn-trust-row ${t.status}`}>
              <div className="lbl">{t.label}</div>
              <div className="val">{t.value}</div>
              <div className="tgt">target {t.target}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Scenario comparison */}
      <div className="gn-section">
        <div className="gn-section-title">Scenario comparison · supply chain vs cross-team coordination</div>
        <div className="gn-compare">
          <div className="gn-compare-row head">
            <div>Metric</div>
            <div>Supply chain</div>
            <div>Cross-team</div>
            <div>Note</div>
          </div>
          {EXEC.scenarioCompare.map((r, i) => (
            <div key={i} className="gn-compare-row">
              <div className="metric">{r.metric}</div>
              <div className="v sc">{r.sc}</div>
              <div className="v launch">{r.launch}</div>
              <div className="note">{r.note}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Exposure */}
      <div className="gn-section">
        <div className="gn-section-title flex flex-between">
          <span>Open exposure · what could affect outcomes today</span>
          <Button size="sm" kind="ghost" renderIcon={ArrowRight} onClick={() => navigate('/decisions')}>Open mesh</Button>
        </div>
        <div className="gn-exposure-list">
          {EXEC.exposure.map((e, i) => (
            <div key={i} className={`gn-exposure-row ${e.kind}`}>
              <div className="kind">{e.kind}</div>
              <div className="body">
                {e.text}
                <div className="meta">{e.meta}</div>
              </div>
              <div className="age">{e.age}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent wins */}
      <div className="gn-section">
        <div className="gn-section-title flex flex-between">
          <span>Recent wins · outcomes against forecast</span>
          <Button size="sm" kind="ghost" renderIcon={ArrowRight} onClick={() => navigate('/replay')}>Replay any</Button>
        </div>
        <div className="gn-wins">
          {EXEC.recentWins.map((w, i) => (
            <div key={i} className="gn-win">
              <div>
                <div className="ttl">{w.title}</div>
                <div className="delta">{w.delta}</div>
              </div>
              <div className="when">{w.when}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
