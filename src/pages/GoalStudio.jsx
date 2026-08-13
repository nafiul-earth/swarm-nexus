import { Grid, Column, Tile, Button, ContentSwitcher, Switch, TextInput, Tag, FormGroup } from '@carbon/react'
import { useNavigate } from 'react-router-dom'
import { Add, ArrowRight, Save } from '@carbon/icons-react'
import { GOALS, SUGGESTIONS } from '../data/mock.js'
import CausalDAG from '../components/CausalDAG.jsx'

export default function GoalStudio() {
  const navigate = useNavigate()
  const goal = GOALS.find(g => g.highlighted)

  return (
    <div className="gn-page">
      <div className="gn-page-head">
        <div>
          <div className="crumb">Goal Studio / Lift OTIF Q4 / Compose</div>
          <h1>Goal Studio</h1>
          <div className="subtitle">Author goals, KPIs, data sources, and knowledge bases. Watch them compile into the live causal DAG.</div>
        </div>
        <div className="flex gap-1 flex-wrap">
          <span style={{ fontFamily: 'var(--gn-font-mono)', fontSize: 11, color: '#24a148' }}>DAG · 47 nodes · 96 edges · ✓ valid · last compile 2s ago</span>
          <Button kind="primary" renderIcon={ArrowRight} onClick={() => navigate('/workspace')}>Materialize to runtime</Button>
        </div>
      </div>

      <ContentSwitcher onChange={() => {}} selectedIndex={0} size="md">
        <Switch name="goals" text="Goals" />
        <Switch name="kpis" text="KPIs" />
        <Switch name="data" text="Data" />
        <Switch name="knowledge" text="Knowledge" />
        <Switch name="dag" text="Causal DAG (preview)" />
      </ContentSwitcher>

      <Grid condensed narrow fullWidth className="mt-3">
        {/* Authoring pane */}
        <Column sm={4} md={4} lg={4}>
          <div className="flex-between mb-2">
            <span className="gn-section-title" style={{ margin: 0 }}>Authoring · Goals</span>
            <Button size="sm" renderIcon={Add} kind="ghost">New goal</Button>
          </div>

          <Tile className="gn-tile accent-blue gn-goal-form">
            <div className="field">
              <span className="label">Name</span>
              <TextInput id="goal-name" labelText="" defaultValue="Lift OTIF Q4" />
            </div>
            <div className="field">
              <span className="label">Statement</span>
              <textarea defaultValue="Lift OTIF from 89.4% to 91.4% by Q4 2026"
                style={{ width: '100%', minHeight: 56, padding: 8, fontFamily: 'inherit', fontSize: 14, border: '1px solid var(--cds-border-strong)', background: '#fff' }} />
            </div>
            <FormGroup legendText="Target metric">
              <Tag type="green">KPI-OTIF-001 · OTIF %</Tag>
            </FormGroup>
            <div className="field">
              <span className="label">Time horizon</span>
              <div>Nov 14, 2026</div>
            </div>
            <div className="field">
              <span className="label">Owner</span>
              <Tag type="gray">M. Patel, CSCO</Tag>
            </div>
            <div className="field">
              <span className="label">Stakeholders</span>
              <div className="flex gap-1 flex-wrap">
                <Tag type="gray" size="sm">Logistics Ops</Tag>
                <Tag type="gray" size="sm">Customer Ops</Tag>
                <Tag type="gray" size="sm">Carrier Mgmt</Tag>
              </div>
            </div>
            <div className="field">
              <span className="label">Trigger event types</span>
              <div className="flex gap-1 flex-wrap">
                {goal.triggers.map(t => <Tag key={t} type="blue" size="sm">{t}</Tag>)}
              </div>
            </div>
            <div className="field">
              <span className="label">Linked policies</span>
              <div className="flex gap-1 flex-wrap">
                {goal.sources.map(s => <Tag key={s} type="purple" size="sm">{s}</Tag>)}
              </div>
            </div>
            <div className="field">
              <span className="label">Constraints</span>
              <ul style={{ paddingLeft: 18, fontSize: '0.875rem', color: 'var(--cds-text-secondary)' }}>
                <li>Cost ≤ $4.10 / unit</li>
                <li>Safety stock ≥ 14d</li>
                <li>Tier-1 SLAs immutable</li>
              </ul>
            </div>
            <div style={{ fontFamily: 'var(--gn-font-mono)', fontSize: 11, color: 'var(--cds-text-secondary)', borderTop: '1px dashed var(--cds-border-subtle)', paddingTop: 8 }}>
              On save → +8 nodes / +14 edges to DAG · <a href="#" style={{ color: '#0f62fe' }}>Preview impact</a>
            </div>
          </Tile>

          {/* Other goals collapsed */}
          <div className="gn-prov-stack mt-2">
            {GOALS.filter(g => !g.highlighted).map(g => (
              <Tile key={g.id} className="gn-tile">
                <div className="flex" style={{ justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <div style={{ fontWeight: 500, fontSize: '0.875rem' }}>{g.name}</div>
                    <div style={{ fontFamily: 'var(--gn-font-mono)', fontSize: 11, color: 'var(--cds-text-secondary)', marginTop: 2 }}>{g.id}</div>
                  </div>
                  <span className={`gn-provenance-pill ${g.provenance}`}>
                    {g.provenance === 'policy' ? 'policy-derived' : g.provenance === 'user' ? 'user-authored' : 'hybrid'}
                  </span>
                </div>
              </Tile>
            ))}
          </div>
        </Column>

        {/* DAG */}
        <Column sm={4} md={4} lg={8}>
          <CausalDAG />

          <div className="gn-buildlog mt-2">
            <div><span className="ts">08:39:14</span> <span className="ok">[build]</span> +8 nodes from goal 'Lift OTIF Q4' · OK</div>
            <div><span className="ts">08:39:14</span> <span className="ok">[build]</span> +4 edges from KB 'Memphis cross-dock playbook' · OK</div>
            <div><span className="ts">08:39:14</span> <span className="ok">[validate]</span> DAG acyclic ✓ · 47 nodes</div>
            <div><span className="ts">08:39:15</span> <span className="ok">[publish]</span> Materialized to runtime · agents notified ▍</div>
          </div>
        </Column>

        {/* AI Assist */}
        <Column sm={4} md={4} lg={4}>
          <div className="gn-section-title">AI Assist · Studio Copilot</div>
          <div className="muted" style={{ fontFamily: 'var(--gn-font-mono)', fontSize: 11, marginBottom: 12 }}>
            Suggestions are auto-generated, never auto-applied.
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {SUGGESTIONS.map((s, i) => (
              <div key={i} className={`gn-suggestion ${s.warn ? 'warn' : ''}`}>
                <div className="head">
                  <span style={{ width: 6, height: 6, borderRadius: 999, background: s.warn ? '#f1c21b' : '#8a3ffc' }} />
                  <span>{s.kind}</span>
                </div>
                <div className="body">{s.body}</div>
                <div className="actions">
                  {s.actions.map((a, j) => (
                    <Button key={j} size="sm" kind={j === 0 ? 'primary' : 'ghost'}>{a}</Button>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <Tile className="gn-tile mt-3">
            <div style={{ fontFamily: 'var(--gn-font-mono)', fontSize: 11, letterSpacing: '0.14em', color: 'var(--cds-text-secondary)' }}>RUNTIME PREVIEW</div>
            <div className="muted" style={{ fontSize: '0.8125rem', marginTop: 6 }}>
              This DAG drives 23 active flows across 47 production agents. Last materialization: 2s ago.
            </div>
            <Button size="sm" kind="ghost" renderIcon={ArrowRight} onClick={() => navigate('/workspace')}>Open runtime</Button>
          </Tile>
        </Column>
      </Grid>

      {/* Sticky bottom-bar */}
      <div className="flex-between mt-4" style={{ padding: 12, background: 'var(--cds-layer-accent-01)', border: '1px solid var(--cds-border-subtle)' }}>
        <span style={{ fontFamily: 'var(--gn-font-mono)', fontSize: 12, color: '#24a148' }}>● Unsaved edits: 3 · auto-save in 4s</span>
        <div className="flex gap-1">
          <Button kind="tertiary">Validate DAG</Button>
          <Button renderIcon={Save} kind="primary">Materialize to runtime</Button>
          <Button kind="ghost" renderIcon={ArrowRight} onClick={() => navigate('/eval')}>Run sandbox eval</Button>
        </div>
      </div>
    </div>
  )
}
