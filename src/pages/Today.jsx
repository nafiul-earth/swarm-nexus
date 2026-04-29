import { useState } from 'react'
import { Grid, Column, Tag, Tile, Button } from '@carbon/react'
import { ArrowRight, AddAlt } from '@carbon/icons-react'
import { useNavigate } from 'react-router-dom'
import KpiTile from '../components/KpiTile.jsx'
import { KPIS, INBOX, GOALS, SCENARIOS } from '../data/mock.js'

const FILTERS = [
  { id: 'all',         label: 'All' },
  { id: 'launch',      label: 'Cross-team coordination' },
  { id: 'supplychain', label: 'Supply chain' }
]

export default function Today() {
  const navigate = useNavigate()
  const [filter, setFilter] = useState('all')
  const inbox = filter === 'all' ? INBOX : INBOX.filter(i => i.scenario === filter)
  const goals = filter === 'all' ? GOALS : GOALS.filter(g => g.scenario === filter)

  return (
    <div className="gn-page">
      <div className="gn-page-head">
        <div>
          <div className="crumb">Home / Today</div>
          <h1>Today</h1>
          <div className="subtitle">
            What your delegated agents are doing right now, what they need from you,
            and where they want you to weigh in.
          </div>
        </div>
        <div className="flex gap-1 flex-wrap">
          <Tag type="blue">{GOALS.length} active goals</Tag>
          <Tag type="warm-gray">{INBOX.filter(i => i.severity !== 'calm').length} need attention</Tag>
          <Button size="sm" kind="primary" renderIcon={AddAlt} onClick={() => navigate('/delegate')}>
            Delegate a goal
          </Button>
        </div>
      </div>

      {/* Filter */}
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

      {/* KPI strip */}
      <div className="gn-section">
        <div className="gn-section-title">At a glance · weighted by your goals</div>
        <Grid condensed narrow fullWidth>
          {KPIS.map(k => (
            <Column key={k.label} sm={4} md={2} lg={3} style={{ marginBottom: '0.5rem' }}>
              <KpiTile {...k} />
            </Column>
          ))}
        </Grid>
      </div>

      {/* Two columns: Inbox + Goal status */}
      <Grid condensed narrow fullWidth>
        <Column sm={4} md={8} lg={9}>
          <div className="gn-section-title">Asks from your agents</div>
          <div className="gn-inbox">
            {inbox.map(row => (
              <div
                key={row.id}
                className={`gn-inbox-row ${row.severity}`}
                onClick={() => {
                  if (row.kind.includes('DELEGATION') || row.kind.includes('NOTE') || row.kind.includes('INFLUENCE')) {
                    navigate('/live')
                  } else {
                    navigate('/live')
                  }
                }}
              >
                <div className="severity-bar" />
                <div className="ask-kind">{row.kind}</div>
                <div className="body">
                  <div>{row.title}</div>
                  <div className="sub">{row.sub}</div>
                </div>
                <div className="meta">
                  <span className={`gn-scenario-chip ${row.scenario}`}>
                    {row.scenario === 'launch' ? 'Launch' : 'Supply chain'}
                  </span>
                  <div style={{ marginTop: 4, fontSize: '0.75rem' }}>{row.meta}</div>
                </div>
                <div className="age">{row.age}</div>
              </div>
            ))}
            {inbox.length === 0 && (
              <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--gn-text-3)' }}>
                No asks for this scenario.
              </div>
            )}
          </div>
        </Column>

        <Column sm={4} md={8} lg={7}>
          <div className="gn-section-title">Goals you've delegated</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {goals.map(g => (
              <div
                key={g.id}
                className={`gn-goal-card scenario-${g.scenario}`}
                onClick={() => navigate('/goals')}
                style={{ cursor: 'pointer' }}
              >
                <div className="head">
                  <div>
                    <div className="scenario">
                      {SCENARIOS[g.scenario === 'launch' ? 'LAUNCH' : 'SUPPLYCHAIN'].label}
                    </div>
                    <h3 className="name">{g.name}</h3>
                  </div>
                  <div className={`gn-mode ${g.mode}`}>
                    <span className="dot" />{g.mode}
                  </div>
                </div>
                <div className="owner-row">
                  <span className="muted">Owner</span><span>{g.owner}</span>
                  <span className="muted">·</span>
                  <span className="muted">Delegated</span><span>{g.delegated}</span>
                </div>
                <div className="progress"><div className="fill" style={{ width: `${Math.round(g.progress * 100)}%` }} /></div>
                <div className="footer">
                  <span>Progress {Math.round(g.progress * 100)}%</span>
                  <span>·</span>
                  <span>{g.kpis.length} KPIs</span>
                  <span>·</span>
                  <span>{g.stakeholders.length} teams</span>
                  {g.blockers > 0 && <><span>·</span><span style={{ color: 'var(--gn-orange)', fontWeight: 600 }}>{g.blockers} blocker</span></>}
                </div>
                <div style={{ fontSize: '0.8125rem', color: 'var(--gn-text-2)' }}>{g.modeNote}</div>
              </div>
            ))}
          </div>
        </Column>
      </Grid>

      {/* Helper hint */}
      <Tile className="gn-tile tinted mt-4" style={{ display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
        <div style={{ flex: 1, minWidth: 240 }}>
          <div style={{ fontWeight: 500 }}>How GoalNexus stays useful</div>
          <div className="muted" style={{ fontSize: '0.875rem', marginTop: 4 }}>
            When the goal and policy are clear, agents run a default <b>workflow</b>. When context is missing or KPIs conflict,
            they switch to <b>elicitation</b> — interviewing you and your SMEs — and resume work once the gap is closed.
          </div>
        </div>
        <Button kind="ghost" renderIcon={ArrowRight} onClick={() => navigate('/live')}>Watch a live case</Button>
      </Tile>
    </div>
  )
}
