import { Grid, Column, Tile, Button, ContentSwitcher, Switch, Tag } from '@carbon/react'
import { ArrowRight, Pause, Reset, Play } from '@carbon/icons-react'
import { useNavigate } from 'react-router-dom'
import { AGENTS, REASONING_TRACE } from '../data/mock.js'
import AgentCard from '../components/AgentCard.jsx'
import CaseStrip from '../components/CaseStrip.jsx'

export default function Workspace() {
  const navigate = useNavigate()

  return (
    <div className="gn-page">
      <CaseStrip
        right={
          <>
            <Button size="sm" kind="ghost" renderIcon={Pause}>Pause flow</Button>
            <Button size="sm" kind="primary" renderIcon={ArrowRight} onClick={() => navigate('/mesh')}>Open Decision Mesh</Button>
          </>
        }
      />

      <ContentSwitcher selectedIndex={0} onChange={() => {}}>
        <Switch name="trees" text="Agent Trees" />
        <Switch name="dag" text="Causal DAG (live runtime)" />
      </ContentSwitcher>

      <Grid condensed narrow fullWidth className="mt-3">
        {/* Active agents */}
        <Column sm={4} md={3} lg={4}>
          <div className="gn-section-title">Active agents · 3</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {AGENTS.map(a => <AgentCard key={a.name} agent={a} />)}
          </div>
          <Tile className="gn-tile mt-3" style={{ borderLeft: '3px solid #0f62fe' }}>
            <div style={{ fontFamily: 'var(--gn-font-mono)', fontSize: 11, color: 'var(--cds-text-secondary)' }}>MESH STATUS</div>
            <div style={{ marginTop: 4, fontSize: '0.875rem', color: '#0f62fe' }}>● Mesh assembling proposals · ETA 4s</div>
          </Tile>
        </Column>

        {/* Trees */}
        <Column sm={4} md={5} lg={8}>
          <div className="gn-section-title">Decision trees (per agent)</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {AGENTS.map(a => (
              <Tile key={a.name} className="gn-tile" style={{ borderLeft: `3px solid ${a.color}` }}>
                <div className="flex-between">
                  <div>
                    <div className="muted" style={{ fontFamily: 'var(--gn-font-mono)', fontSize: 11, color: a.color, letterSpacing: '0.14em' }}>{a.name}</div>
                    <div style={{ fontWeight: 500, marginTop: 4 }}>Top: {a.proposal} ({a.conf.toFixed(2)})</div>
                  </div>
                  <Button size="sm" kind="ghost" renderIcon={ArrowRight}>View full tree</Button>
                </div>
                {/* Mini tree (SVG) */}
                <svg viewBox="0 0 600 100" style={{ width: '100%', height: 100, marginTop: 12 }}>
                  <line x1="40" y1="50" x2="180" y2="20" stroke={a.color} strokeWidth="1.5" />
                  <line x1="40" y1="50" x2="180" y2="50" stroke={a.color} strokeWidth="1.5" />
                  <line x1="40" y1="50" x2="180" y2="80" stroke={a.color} strokeWidth="1.5" />
                  <line x1="180" y1="20" x2="320" y2="20" stroke={a.color} strokeWidth="1.5" />
                  <line x1="180" y1="50" x2="320" y2="50" stroke={a.color} strokeWidth="1.5" strokeDasharray="3 3" opacity="0.5" />
                  <line x1="180" y1="80" x2="320" y2="80" stroke={a.color} strokeWidth="1.5" />
                  <line x1="320" y1="20" x2="500" y2="20" stroke={a.color} strokeWidth="2" />

                  <circle cx="40" cy="50" r="8" fill="#fff" stroke={a.color} strokeWidth="2" />
                  <text x="40" y="80" textAnchor="middle" fontFamily="IBM Plex Mono, monospace" fontSize="9" fill="#525252">root</text>

                  {[20, 50, 80].map((y, i) => (
                    <g key={i}>
                      <circle cx="180" cy={y} r="6" fill={i === 1 ? '#fff' : `${a.color}33`} stroke={a.color} strokeWidth="1.5" />
                    </g>
                  ))}

                  {[20, 50, 80].map((y, i) => (
                    <g key={'b'+i}>
                      <circle cx="320" cy={y} r="6" fill={i === 1 ? '#fff' : `${a.color}33`} stroke={a.color} strokeWidth="1.5" />
                    </g>
                  ))}

                  <circle cx="500" cy="20" r="10" fill={`${a.color}55`} stroke={a.color} strokeWidth="2"
                    style={{ filter: `drop-shadow(0 0 6px ${a.color}55)` }} />
                  <text x="500" y="50" textAnchor="middle" fontFamily="IBM Plex Mono, monospace" fontSize="9" fill={a.color} fontWeight="600">winning</text>
                </svg>
              </Tile>
            ))}
          </div>
        </Column>

        {/* Reasoning trace */}
        <Column sm={4} md={4} lg={4}>
          <div className="gn-section-title">Reasoning trace · Recovery</div>
          <div className="gn-trace">
            {REASONING_TRACE.map((r, i) => (
              <div key={i}>
                <span className="ts">{r.ts}</span>
                <span className={r.cursor ? 'cursor' : ''}>{r.text}</span>
              </div>
            ))}
          </div>
          <Tile className="gn-tile mt-3">
            <div style={{ fontFamily: 'var(--gn-font-mono)', fontSize: 11, color: 'var(--cds-text-secondary)' }}>GOAL ALIGNMENT (top branch)</div>
            <div className="mt-2" style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              {[
                { name: 'OTIF %', target: 0.85, val: 0.91 },
                { name: 'Tier-1 Recovery Time', target: 0.7, val: 0.84 },
                { name: 'Cost-to-Serve', target: 0.6, val: 0.74 }
              ].map(p => (
                <div key={p.name}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem' }}>
                    <span>{p.name}</span>
                    <span style={{ fontFamily: 'var(--gn-font-mono)' }}>{p.val.toFixed(2)}</span>
                  </div>
                  <div style={{ height: 6, background: 'var(--cds-border-subtle)', marginTop: 2 }}>
                    <div style={{ height: '100%', width: `${p.val * 100}%`, background: '#0f62fe' }} />
                  </div>
                </div>
              ))}
            </div>
          </Tile>
        </Column>
      </Grid>

      {/* Sticky bottom */}
      <div className="flex-between mt-4" style={{ padding: 12, background: 'var(--cds-layer-accent-01)', border: '1px solid var(--cds-border-subtle)' }}>
        <div className="flex gap-1">
          <Button size="sm" kind="ghost" renderIcon={Reset}>Rewind 30s</Button>
          <Button size="sm" kind="ghost" renderIcon={Pause}>Pause</Button>
          <Button size="sm" kind="ghost" renderIcon={Play}>Step</Button>
        </div>
        <Button kind="primary" renderIcon={ArrowRight} onClick={() => navigate('/mesh')}>Send all proposals to Mesh</Button>
      </div>
    </div>
  )
}
