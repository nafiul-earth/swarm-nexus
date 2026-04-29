import { useState } from 'react'
import { Tag, Button } from '@carbon/react'
import { CheckmarkFilled, ArrowRight, Edit } from '@carbon/icons-react'
import { useNavigate } from 'react-router-dom'
import { PLANS, GOALS } from '../data/mock.js'

const FILTERS = [
  { id: 'all',         label: 'All' },
  { id: 'launch',      label: 'Cross-team coordination' },
  { id: 'supplychain', label: 'Supply chain' }
]

export default function Plans() {
  const navigate = useNavigate()
  const [filter, setFilter] = useState('all')
  const plans = filter === 'all' ? PLANS : PLANS.filter(p => p.scenario === filter)

  // group plans by goalId
  const byGoal = plans.reduce((acc, p) => {
    (acc[p.goalId] = acc[p.goalId] || []).push(p)
    return acc
  }, {})

  return (
    <div className="gn-page">
      <div className="gn-page-head">
        <div>
          <div className="crumb">Home / Plans</div>
          <h1>Plans &amp; alternatives</h1>
          <div className="subtitle">
            Each goal can have several agent-generated plans. Plans are scored against the KPI weights
            you set. Pick the recommended plan, or switch to an alternative — the agent rewires its work
            from there.
          </div>
        </div>
        <div className="flex gap-1">
          <Button size="sm" kind="ghost" renderIcon={Edit}>Adjust KPI weights</Button>
        </div>
      </div>

      <div className="flex gap-1 flex-wrap mb-2" style={{ alignItems: 'center' }}>
        <span className="gn-eyebrow">Scenario</span>
        {FILTERS.map(f => (
          <Tag
            key={f.id}
            type={filter === f.id ? 'blue' : 'gray'}
            style={{ cursor: 'pointer' }}
            onClick={() => setFilter(f.id)}
          >
            {f.label}
          </Tag>
        ))}
      </div>

      {Object.entries(byGoal).map(([goalId, group]) => {
        const goal = GOALS.find(g => g.id === goalId)
        return (
          <div key={goalId} className="gn-section">
            <div className="flex flex-between mb-2">
              <div>
                <div className="gn-eyebrow">Goal</div>
                <div style={{ fontSize: '1rem', fontWeight: 500 }}>{goal?.name || goalId}</div>
                {goal && (
                  <div className="muted txt-sm" style={{ marginTop: 4 }}>
                    KPI weights: {goal.kpis.map(k => `${k.name} ${k.weight.toFixed(2)}`).join(' · ')}
                  </div>
                )}
              </div>
              <Button size="sm" kind="ghost" renderIcon={ArrowRight} onClick={() => navigate('/live')}>Open live view</Button>
            </div>

            <div style={{ display: 'grid', gap: '1rem', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))' }}>
              {group.map(p => (
                <div key={p.id} className={`gn-plan ${p.kind}`}>
                  <div className="h">
                    <div>
                      <span className={`badge ${p.kind === 'recommended' ? 'rec' : 'alt'}`}>
                        {p.kind === 'recommended' ? 'Recommended' : 'Alternative'}
                      </span>
                      <h3 className="name" style={{ marginTop: 6 }}>{p.name}</h3>
                    </div>
                    <div className="mono" style={{ fontSize: '1.125rem', fontWeight: 600, color: 'var(--gn-blue-70)' }}>
                      {p.score.toFixed(2)}
                    </div>
                  </div>
                  <div className="why">{p.why}</div>

                  <div>
                    <div className="gn-eyebrow" style={{ marginBottom: 4 }}>Impact on your KPIs</div>
                    {p.impacts.map(imp => (
                      <div key={imp.kpi} className="gn-kpi-impact">
                        <div className="nm">
                          {imp.kpi}
                          <div className="muted txt-sm">{imp.text}</div>
                        </div>
                        <div className="wt">{imp.weight.toFixed(2)}</div>
                        <div className={`impact ${imp.tone}`}>{imp.impact}</div>
                      </div>
                    ))}
                  </div>

                  <div className="flex gap-1" style={{ marginTop: 4 }}>
                    {p.kind === 'recommended'
                      ? <Button size="sm" kind="primary" renderIcon={CheckmarkFilled}>Approve plan</Button>
                      : <Button size="sm" kind="secondary">Switch to this plan</Button>}
                    <Button size="sm" kind="ghost">Influence</Button>
                    <Button size="sm" kind="ghost">See agent reasoning</Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )
      })}
    </div>
  )
}
