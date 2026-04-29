import { Tag, Button } from '@carbon/react'
import { AddAlt, ArrowRight } from '@carbon/icons-react'
import { useNavigate } from 'react-router-dom'
import { GOALS, SCENARIOS } from '../data/mock.js'

export default function Goals() {
  const navigate = useNavigate()
  return (
    <div className="gn-page">
      <div className="gn-page-head">
        <div>
          <div className="crumb">Home / Goals</div>
          <h1>Goals you've delegated</h1>
          <div className="subtitle">
            Each goal is an outcome you've handed to an agent. The agent picks the right mode —
            workflow when the path is known, elicitation when it isn't — and tells you what's blocked.
          </div>
        </div>
        <div className="flex gap-1">
          <Button size="sm" kind="primary" renderIcon={AddAlt} onClick={() => navigate('/delegate')}>
            Delegate a new goal
          </Button>
        </div>
      </div>

      <div style={{ display: 'grid', gap: '1rem', gridTemplateColumns: 'repeat(auto-fill, minmax(420px, 1fr))' }}>
        {GOALS.map(g => (
          <div key={g.id} className={`gn-goal-card scenario-${g.scenario}`}>
            <div className="head">
              <div>
                <div className="scenario">
                  {SCENARIOS[g.scenario === 'launch' ? 'LAUNCH' : 'SUPPLYCHAIN'].label}
                </div>
                <h3 className="name" style={{ marginTop: '0.375rem' }}>{g.name}</h3>
              </div>
              <div className={`gn-mode ${g.mode}`}>
                <span className="dot" />{g.mode}
              </div>
            </div>

            <div className="owner-row">
              <span className="muted">Owner</span><span>{g.owner}</span>
              <span className="muted">·</span>
              <span className="muted">Delegated</span><span>{g.delegated}</span>
              <span className="muted">·</span>
              <span className="muted">ID</span><span className="mono">{g.id}</span>
            </div>

            <div>
              <div className="gn-eyebrow" style={{ marginBottom: 6 }}>KPIs &amp; weights (set by you)</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                {g.kpis.map(k => (
                  <div key={k.name} className="flex flex-between txt-sm">
                    <span>{k.name}</span>
                    <span style={{ display: 'inline-flex', gap: 8, alignItems: 'center' }}>
                      <span className="mono" style={{ background: 'var(--gn-blue-10)', color: 'var(--gn-blue-70)', padding: '1px 6px', border: '1px solid var(--gn-blue-20)' }}>{k.weight.toFixed(2)}</span>
                      <span className="muted">{k.target}</span>
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div className="gn-eyebrow" style={{ marginBottom: 6 }}>Stakeholders</div>
              <div className="flex gap-1 flex-wrap">
                {g.stakeholders.map(s => <Tag key={s} size="sm" type="cool-gray">{s}</Tag>)}
              </div>
            </div>

            <div className="progress"><div className="fill" style={{ width: `${Math.round(g.progress * 100)}%` }} /></div>

            <div className="footer flex flex-between" style={{ marginTop: 0 }}>
              <span>Progress {Math.round(g.progress * 100)}%</span>
              {g.blockers > 0
                ? <span style={{ color: 'var(--gn-orange)', fontWeight: 600 }}>{g.blockers} blocker · needs you</span>
                : <span style={{ color: 'var(--gn-green)' }}>healthy</span>}
            </div>

            <div className="muted txt-sm">{g.modeNote}</div>

            <div className="flex gap-1" style={{ marginTop: 4 }}>
              <Button size="sm" kind="ghost" renderIcon={ArrowRight} onClick={() => navigate('/live')}>Open live view</Button>
              <Button size="sm" kind="ghost" renderIcon={ArrowRight} onClick={() => navigate('/plans')}>See plans</Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
