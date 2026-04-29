import { Grid, Column, Tag, Tile, Button } from '@carbon/react'
import { ArrowRight, Warning } from '@carbon/icons-react'
import { useNavigate } from 'react-router-dom'
import KpiTile from '../components/KpiTile.jsx'
import EventStream from '../components/EventStream.jsx'
import ThrottleGauge from '../components/ThrottleGauge.jsx'
import { KPIS, FLOWS, THROTTLE } from '../data/mock.js'

export default function Operations() {
  const navigate = useNavigate()
  return (
    <div className="gn-page">
      <div className="gn-page-head">
        <div>
          <div className="crumb">Home / Operations</div>
          <h1>Operations console</h1>
          <div className="subtitle">Live event-driven view of the supply chain. Click a red event to investigate.</div>
        </div>
        <div className="flex gap-1 flex-wrap">
          <Tag type="green">Production · US-East</Tag>
          <Tag type="blue">23 active flows</Tag>
          <Tag type="gray">M. Patel, CSCO</Tag>
        </div>
      </div>

      {/* KPI strip */}
      <div className="gn-section">
        <div className="gn-section-title">KPI strip</div>
        <Grid condensed narrow fullWidth>
          {KPIS.map(k => (
            <Column key={k.label} sm={4} md={2} lg={3} style={{ marginBottom: '0.5rem' }}>
              <KpiTile {...k} />
            </Column>
          ))}
        </Grid>
      </div>

      {/* Two-column: stream + active flows / throttle */}
      <Grid condensed narrow fullWidth>
        <Column sm={4} md={8} lg={9}>
          <div className="gn-section-title">Live event stream</div>
          <EventStream />
        </Column>

        <Column sm={4} md={8} lg={7}>
          <div className="gn-section-title">Active agentic flows</div>
          <Tile className="gn-tile" style={{ padding: 0 }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.8125rem' }}>
              <thead>
                <tr style={{ background: 'var(--cds-layer-accent-01)' }}>
                  <th style={{ textAlign: 'left', padding: '0.5rem 0.75rem', fontWeight: 500, color: 'var(--cds-text-secondary)' }}>Flow</th>
                  <th style={{ textAlign: 'left', padding: '0.5rem 0.75rem', fontWeight: 500, color: 'var(--cds-text-secondary)' }}>Status</th>
                  <th style={{ textAlign: 'right', padding: '0.5rem 0.75rem', fontWeight: 500, color: 'var(--cds-text-secondary)' }}>Conf</th>
                </tr>
              </thead>
              <tbody>
                {FLOWS.map(f => (
                  <tr key={f.name} style={{ borderTop: '1px solid var(--cds-border-subtle)', cursor: 'pointer' }}
                      onClick={() => navigate(f.name === 'Lost-Shipment Recovery' ? '/workspace' : '/mesh')}>
                    <td style={{ padding: '0.5rem 0.75rem' }}>
                      <div style={{ fontWeight: 500 }}>{f.name}</div>
                      <div style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: '0.6875rem', color: 'var(--cds-text-secondary)' }}>{f.goal} · {f.last}</div>
                    </td>
                    <td style={{ padding: '0.5rem 0.75rem' }}>
                      <Tag size="sm" type={
                        f.tone === 'blue' ? 'blue' :
                        f.tone === 'green' ? 'green' :
                        f.tone === 'amber' ? 'warm-gray' :
                        f.tone === 'red' ? 'red' : 'gray'
                      }>{f.status}</Tag>
                    </td>
                    <td style={{ padding: '0.5rem 0.75rem', textAlign: 'right', fontFamily: 'IBM Plex Mono, monospace', fontWeight: 500 }}>{f.conf.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Tile>

          <div className="gn-section-title mt-3">Decision Mesh · live throttle</div>
          <Tile className="gn-tile">
            <div className="flex-between">
              <div>
                <div style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: 11, letterSpacing: '0.12em', color: 'var(--cds-text-secondary)' }}>GLOBAL POSTURE</div>
                <div style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: 24, color: '#0f62fe', fontWeight: 500 }}>{THROTTLE.needle.toFixed(2)} · AUTO</div>
              </div>
              <Button size="sm" kind="ghost" renderIcon={ArrowRight} onClick={() => navigate('/mesh')}>Open Decision Mesh</Button>
            </div>
            <div className="mt-2" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 8 }}>
              <div className="gn-tile" style={{ borderLeft: '3px solid #24a148' }}>
                <div style={{ fontFamily: 'IBM Plex Mono', fontSize: 11, letterSpacing: '0.12em', color: '#525252' }}>AUTO-RESOLVED · 1H</div>
                <div style={{ fontFamily: 'IBM Plex Mono', fontSize: 20, fontWeight: 500 }}>{THROTTLE.autoResolved}</div>
              </div>
              <div className="gn-tile" style={{ borderLeft: '3px solid #f1c21b' }}>
                <div style={{ fontFamily: 'IBM Plex Mono', fontSize: 11, letterSpacing: '0.12em', color: '#525252' }}>HELD FOR CLARITY</div>
                <div style={{ fontFamily: 'IBM Plex Mono', fontSize: 20, fontWeight: 500 }}>{THROTTLE.held}</div>
              </div>
              <div className="gn-tile" style={{ borderLeft: '3px solid #da1e28' }}>
                <div style={{ fontFamily: 'IBM Plex Mono', fontSize: 11, letterSpacing: '0.12em', color: '#525252' }}>ESCALATED</div>
                <div style={{ fontFamily: 'IBM Plex Mono', fontSize: 20, fontWeight: 500 }}>{THROTTLE.escalated}</div>
              </div>
            </div>
          </Tile>

          <div className="mt-3">
            <ThrottleGauge value={THROTTLE.needle} animated />
          </div>
        </Column>
      </Grid>

      {/* Hint */}
      <Tile className="gn-tile mt-4" style={{ borderLeft: '3px solid #0f62fe', display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
        <Warning size={20} color="#0f62fe" />
        <div style={{ flex: 1, minWidth: 240 }}>
          <div style={{ fontWeight: 500 }}>A Tier-1 lost shipment just fired.</div>
          <div className="muted" style={{ fontSize: '0.8125rem' }}>Click the red row in the event stream, or jump straight to the Decision Workspace to watch the agents reason.</div>
        </div>
        <Button kind="primary" renderIcon={ArrowRight} onClick={() => navigate('/workspace')}>Open Decision Workspace</Button>
      </Tile>
    </div>
  )
}
