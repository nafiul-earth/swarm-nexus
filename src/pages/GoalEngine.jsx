import { Grid, Column, Tile, Tag, Button, Slider, FormGroup } from '@carbon/react'
import { ArrowRight, Document, MachineLearningModel, Flag } from '@carbon/icons-react'
import { useNavigate } from 'react-router-dom'
import { POLICIES, KPI_DERIVED, GOALS } from '../data/mock.js'

export default function GoalEngine() {
  const navigate = useNavigate()
  const goal = GOALS.find(g => g.highlighted)

  return (
    <div className="gn-page">
      <div className="gn-page-head">
        <div>
          <div className="crumb">Goal Engine / Lift OTIF Q4 / Provenance</div>
          <h1>Goal provenance map</h1>
          <div className="subtitle">Every active goal traces back to a business policy or a user-authored declaration in Goal Studio.</div>
        </div>
        <Button kind="primary" renderIcon={ArrowRight} onClick={() => navigate('/goal-studio')}>Open in Goal Studio</Button>
      </div>

      <div className="gn-section-title">Provenance · Policies → Policy Agent + KPIs → Goals</div>

      <div className="gn-provenance-cols">
        {/* Column 1 — Policies */}
        <div>
          <div className="flex" style={{ alignItems: 'center', gap: 8, marginBottom: 12 }}>
            <Document />
            <span style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: 11, letterSpacing: '0.16em', color: 'var(--cds-text-secondary)' }}>BUSINESS POLICIES</span>
          </div>
          <div className="gn-prov-stack">
            {POLICIES.map(p => (
              <Tile key={p.name} className={`gn-tile ${p.highlighted ? 'accent-blue' : ''}`}>
                <div style={{ fontWeight: 500 }}>{p.name}</div>
                <div style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: 11, color: 'var(--cds-text-secondary)', marginTop: 4 }}>
                  {p.owner} · {p.age} · <Tag size="sm" type="green">{p.status}</Tag>
                  {p.isNew && <Tag size="sm" type="blue" style={{ marginLeft: 6 }}>NEW</Tag>}
                </div>
              </Tile>
            ))}
          </div>
        </div>

        {/* Column 2 — Policy Agent + Derived KPIs */}
        <div>
          <Tile className="gn-tile" style={{ borderLeft: '3px solid #8a3ffc' }}>
            <div className="flex" style={{ alignItems: 'center', gap: 8 }}>
              <MachineLearningModel />
              <span style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: 11, letterSpacing: '0.16em', color: '#8a3ffc' }}>POLICY AGENT</span>
            </div>
            <div style={{ fontWeight: 500, marginTop: 6 }}>policy-extractor-v2.4</div>
            <div className="muted" style={{ fontSize: '0.8125rem', marginTop: 4 }}>Reads policies, extracts measurable KPIs.</div>
            <div style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: 11, color: 'var(--cds-text-secondary)', marginTop: 8 }}>
              Last refit 6h ago · 142 KPIs derived from 5 policies
            </div>
            <Button size="sm" kind="ghost" style={{ marginTop: 8 }}>Run re-ingestion</Button>
          </Tile>

          <div className="gn-section-title mt-3">DERIVED KPIs</div>
          <div className="gn-prov-stack">
            {KPI_DERIVED.map(k => (
              <Tile key={k.name} className={`gn-tile ${k.highlighted ? 'accent-blue' : ''}`}>
                <div style={{ fontWeight: 500, fontSize: '0.875rem' }}>{k.name}</div>
                <div style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: 11, color: 'var(--cds-text-secondary)', marginTop: 4 }}>
                  {k.from} · target {k.target}
                </div>
              </Tile>
            ))}
          </div>
        </div>

        {/* Column 3 — Goals */}
        <div>
          <div className="flex" style={{ alignItems: 'center', gap: 8, marginBottom: 12 }}>
            <Flag />
            <span style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: 11, letterSpacing: '0.16em', color: 'var(--cds-text-secondary)' }}>ACTIVE GOALS</span>
          </div>
          <div className="gn-prov-stack">
            {GOALS.map(g => (
              <Tile key={g.id} className={`gn-tile ${g.highlighted ? 'accent-blue' : ''}`}>
                <div style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: 11, color: 'var(--cds-text-secondary)' }}>{g.id}</div>
                <div style={{ fontWeight: 500, marginTop: 4 }}>{g.name}</div>
                <div className="muted" style={{ fontSize: '0.8125rem', marginTop: 4 }}>{g.owner}</div>

                <div style={{ marginTop: 8, display: 'flex', flexWrap: 'wrap', gap: 4 }}>
                  <span className={`gn-provenance-pill ${g.provenance}`}>
                    {g.provenance === 'hybrid' ? 'Hybrid: policy + user' :
                     g.provenance === 'policy' ? 'Policy-derived' : 'User-authored'}
                  </span>
                </div>
                {g.kpis.length > 0 && (
                  <div className="muted" style={{ marginTop: 8, fontSize: '0.75rem' }}>
                    <strong style={{ color: 'var(--cds-text-primary)' }}>Linked KPIs: </strong>
                    {g.kpis.join(' · ')}
                  </div>
                )}
                {g.highlighted && (
                  <div style={{ marginTop: 12, paddingTop: 8, borderTop: '1px dashed var(--cds-border-subtle)', fontFamily: 'IBM Plex Mono, monospace', fontSize: 11, color: '#24a148' }}>
                    {g.status}
                  </div>
                )}
              </Tile>
            ))}
          </div>
        </div>
      </div>

      {/* Inspector — slider + policy excerpt */}
      <div className="gn-section">
        <div className="gn-section-title">Goal configuration</div>
        <Grid condensed narrow fullWidth>
          <Column sm={4} md={5} lg={9}>
            <Tile className="gn-tile">
              <FormGroup legendText="Target range — OTIF %">
                <Slider id="otif-slider" min={89} max={94} step={0.1} value={91.4}
                  labelText="" minLabel="89.0" maxLabel="94.0" />
                <div className="muted" style={{ fontSize: '0.75rem', marginTop: 4 }}>
                  Min 90.0% · Target 91.4% · Stretch 92.5% · Current 91.2%
                </div>
              </FormGroup>
              <div className="mt-3">
                <div className="label" style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: 11, color: 'var(--cds-text-secondary)', letterSpacing: '0.14em' }}>TIME HORIZON</div>
                <div>By Nov 14, 2026 · 201 days remaining</div>
              </div>
              <div className="mt-3">
                <div className="label" style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: 11, color: 'var(--cds-text-secondary)', letterSpacing: '0.14em' }}>EVENT TRIGGERS</div>
                <div className="flex gap-1 flex-wrap mt-1">
                  {goal.triggers.map(t => <Tag key={t} type="blue" size="sm">{t}</Tag>)}
                </div>
              </div>
              <div className="mt-3">
                <div className="label" style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: 11, color: 'var(--cds-text-secondary)', letterSpacing: '0.14em' }}>CONSTRAINTS</div>
                <ul style={{ marginTop: 4, paddingLeft: 18 }}>
                  <li>Cost ceiling ≤ $4.10 / unit</li>
                  <li>Safety stock ≥ 14 days</li>
                  <li>Tier-1 SLAs immutable</li>
                </ul>
              </div>
            </Tile>
          </Column>
          <Column sm={4} md={3} lg={7}>
            <Tile className="gn-tile">
              <div style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: 11, color: 'var(--cds-text-secondary)', letterSpacing: '0.14em' }}>POLICY EXCERPT</div>
              <div style={{ fontWeight: 500, marginTop: 4 }}>Customer SLA Policy v4.2, Clause 3.1</div>
              <blockquote style={{ borderLeft: '3px solid #0f62fe', background: 'rgba(15,98,254,0.04)', padding: '0.75rem 1rem', margin: '0.75rem 0 0', fontStyle: 'italic', color: 'var(--cds-text-primary)' }}>
                "All Tier-1 customer shipments shall be measured against an On-Time In-Full standard of no less than{' '}
                <span style={{ background: 'rgba(15,98,254,0.18)', padding: '0 4px' }}>91.4%</span> on a rolling 90-day basis,
                with recovery actions for missed shipments initiated within{' '}
                <span style={{ background: 'rgba(15,98,254,0.18)', padding: '0 4px' }}>30 minutes of detection</span>..."
              </blockquote>
              <div style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: 11, color: 'var(--cds-text-secondary)', marginTop: 8 }}>
                Extracted: 1 KPI · 1 SLA constraint · 1 trigger condition
              </div>
            </Tile>
          </Column>
        </Grid>
      </div>

      <div className="flex gap-1 mt-4">
        <Button kind="primary" renderIcon={ArrowRight} onClick={() => navigate('/goal-studio')}>Open in Goal Studio</Button>
        <Button kind="tertiary">Re-derive KPIs from policy</Button>
      </div>
    </div>
  )
}
