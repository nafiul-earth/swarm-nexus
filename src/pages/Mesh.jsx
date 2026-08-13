import { Grid, Column, Tile, Button, Tag } from '@carbon/react'
import { ArrowRight, Reset } from '@carbon/icons-react'
import { useNavigate } from 'react-router-dom'
import MeshRadial from '../components/MeshRadial.jsx'
import ThrottleGauge from '../components/ThrottleGauge.jsx'
import CaseStrip from '../components/CaseStrip.jsx'
import { ARBITRATION_LOG } from '../data/mock.js'

const KIND_TONE = {
  submit: 'gray', conflict: 'red', policy: 'warm-gray', merge: 'green',
  boost: 'blue', throttle: 'purple', decision: 'green'
}

export default function Mesh() {
  const navigate = useNavigate()

  return (
    <div className="gn-page">
      <CaseStrip
        right={<Button size="sm" kind="ghost" renderIcon={Reset}>Replay arbitration in slow motion</Button>}
      />

      {/* Top status row */}
      <Grid condensed narrow fullWidth>
        <Column sm={4} md={4} lg={5}>
          <Tile className="gn-tile">
            <div style={{ fontFamily: 'var(--gn-font-mono)', fontSize: 11, letterSpacing: '0.14em', color: 'var(--cds-text-secondary)' }}>ARBITRATION STATUS</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 6 }}>
              <span style={{ width: 8, height: 8, borderRadius: 999, background: '#0f62fe', boxShadow: '0 0 0 4px rgba(15,98,254,0.18)' }} />
              <span style={{ fontFamily: 'var(--gn-font-mono)', fontSize: 18, fontWeight: 500 }}>ARBITRATING</span>
            </div>
            <div className="muted" style={{ fontSize: '0.8125rem', marginTop: 4 }}>3 agent proposals · 2 conflicts · 1 dominant solution emerging</div>
            <div style={{ fontFamily: 'var(--gn-font-mono)', fontSize: 22, marginTop: 8, color: '#0f62fe' }}>00:00:04</div>
          </Tile>
        </Column>
        <Column sm={4} md={4} lg={6}>
          <Tile className="gn-tile">
            <div style={{ fontFamily: 'var(--gn-font-mono)', fontSize: 11, letterSpacing: '0.14em', color: 'var(--cds-text-secondary)' }}>POLICY GUARDRAILS</div>
            <div className="flex gap-1 flex-wrap mt-2">
              <Tag type="green" size="sm">Cost ceiling $20K · OK</Tag>
              <Tag type="green" size="sm">Tier-1 SLA · OK</Tag>
              <Tag type="green" size="sm">Carbon ≤ 8.4kg · OK</Tag>
              <Tag type="green" size="sm">Safety stock floor · OK</Tag>
            </div>
            <div className="muted" style={{ fontSize: '0.75rem', marginTop: 8 }}>All originating policies satisfied.</div>
          </Tile>
        </Column>
        <Column sm={4} md={4} lg={5}>
          <Tile className="gn-tile">
            <div style={{ fontFamily: 'var(--gn-font-mono)', fontSize: 11, letterSpacing: '0.14em', color: 'var(--cds-text-secondary)' }}>MIN HUMAN-IN-LOOP</div>
            <div style={{ fontFamily: 'var(--gn-font-mono)', fontSize: 32, fontWeight: 500, color: '#0f62fe', marginTop: 4 }}>94%</div>
            <div className="muted" style={{ fontSize: '0.8125rem' }}>Of similar cases auto-resolved last 30 days.</div>
            <div style={{ display: 'flex', height: 8, marginTop: 8, gap: 1 }}>
              <div style={{ flex: 94, background: '#24a148' }} />
              <div style={{ flex: 4, background: '#f1c21b' }} />
              <div style={{ flex: 2, background: '#da1e28' }} />
            </div>
          </Tile>
        </Column>
      </Grid>

      {/* Mesh radial + throttle */}
      <Grid condensed narrow fullWidth className="mt-3">
        <Column sm={4} md={5} lg={10}>
          <MeshRadial />
        </Column>
        <Column sm={4} md={3} lg={6}>
          <ThrottleGauge value={0.91} animated={false} />
          <Tile className="gn-tile mt-3" style={{ borderLeft: '3px solid #24a148' }}>
            <div style={{ fontFamily: 'var(--gn-font-mono)', fontSize: 11, color: '#24a148', letterSpacing: '0.14em' }}>CURRENT POSTURE</div>
            <div style={{ fontWeight: 500, marginTop: 4 }}>AUTO-EXECUTE · dispatching in 12s</div>
            <div className="muted" style={{ fontSize: '0.8125rem', marginTop: 4 }}>Recommendation will dispatch unless paused.</div>
            <div className="flex gap-1 mt-2">
              <Button size="sm" kind="tertiary">Force Hold</Button>
              <Button size="sm" kind="danger--tertiary">Force Escalate</Button>
            </div>
          </Tile>
        </Column>
      </Grid>

      {/* Arbitration reasoning + winning decision */}
      <Grid condensed narrow fullWidth className="mt-3">
        <Column sm={4} md={4} lg={10}>
          <div className="gn-section-title">Arbitration reasoning</div>
          <Tile className="gn-tile" style={{ padding: 0 }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.8125rem' }}>
              <tbody>
                {ARBITRATION_LOG.map((row, i) => (
                  <tr key={i} style={{ borderTop: i ? '1px solid var(--cds-border-subtle)' : 'none' }}>
                    <td style={{ padding: '0.5rem 0.75rem', fontFamily: 'var(--gn-font-mono)', color: 'var(--cds-text-secondary)', fontSize: 11, width: 90 }}>{row.ts}</td>
                    <td style={{ padding: '0.5rem 0.75rem', width: 110 }}>
                      <Tag size="sm" type={KIND_TONE[row.kind] || 'gray'}>[{row.kind}]</Tag>
                    </td>
                    <td style={{ padding: '0.5rem 0.75rem' }}>{row.text}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Tile>
        </Column>
        <Column sm={4} md={4} lg={6}>
          <div className="gn-section-title">Winning decision</div>
          <Tile className="gn-tile" style={{ borderLeft: '3px solid #24a148' }}>
            <div style={{ fontFamily: 'var(--gn-font-mono)', fontSize: 11, letterSpacing: '0.14em', color: '#24a148' }}>ARBITRATED OUTCOME</div>
            <div style={{ fontWeight: 500, fontSize: '1rem', marginTop: 6 }}>
              Hybrid: Recovery (primary) + CX (secondary outreach)
            </div>
            <div className="muted" style={{ fontSize: '0.8125rem', marginTop: 6 }}>
              Composite confidence: <span style={{ color: '#0f62fe', fontFamily: 'var(--gn-font-mono)', fontWeight: 600 }}>0.91</span>
            </div>
            <div className="muted" style={{ fontSize: '0.8125rem', marginTop: 4 }}>
              Mesh boosted Recovery confidence by +0.04 via CX alignment.
            </div>
            <Button kind="primary" size="md" renderIcon={ArrowRight} className="mt-3" onClick={() => navigate('/action')}>
              Send to recommendation card
            </Button>
          </Tile>
        </Column>
      </Grid>
    </div>
  )
}
