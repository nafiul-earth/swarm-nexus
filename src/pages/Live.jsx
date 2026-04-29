import { useState } from 'react'
import { Tag, Button } from '@carbon/react'
import { Pause, ArrowRight, ChatLaunch, Edit, Stop } from '@carbon/icons-react'
import { useNavigate } from 'react-router-dom'
import { LIVE_SUPPLYCHAIN, LIVE_LAUNCH } from '../data/mock.js'

const TABS = [
  { id: 'launch',      label: 'Launch · cross-team', case: LIVE_LAUNCH },
  { id: 'supplychain', label: 'Supply chain · lost shipment', case: LIVE_SUPPLYCHAIN }
]

const STEP_ICONS = {
  event:      'E',
  delegated:  'D',
  decision:   '◆',
  influenced: 'H',
  complete:   '✓'
}

export default function Live() {
  const navigate = useNavigate()
  const [active, setActive] = useState('launch')
  const tab = TABS.find(t => t.id === active)
  const c = tab.case

  return (
    <div className="gn-page">
      <div className="gn-page-head">
        <div>
          <div className="crumb">Home / Live work</div>
          <h1>Live work</h1>
          <div className="subtitle">
            Follow along as agents execute. Every step shows what was decided, why, and what alternatives
            were considered. You can pause, redirect, override, or ask a question at any point.
          </div>
        </div>
        <div className="flex gap-1 flex-wrap">
          <Tag type="blue">{c.caseId}</Tag>
          <div className={`gn-mode ${c.mode}`}><span className="dot" />{c.mode}</div>
        </div>
      </div>

      {/* Scenario tabs */}
      <div className="flex gap-1 flex-wrap mb-2" style={{ alignItems: 'center' }}>
        <span className="gn-eyebrow">Active case</span>
        {TABS.map(t => (
          <Tag
            key={t.id}
            type={active === t.id ? 'blue' : 'gray'}
            style={{ cursor: 'pointer' }}
            onClick={() => setActive(t.id)}
          >
            {t.label}
          </Tag>
        ))}
      </div>

      {/* Case header */}
      <div className="gn-tile accent-blue mb-3">
        <div className="flex flex-between" style={{ alignItems: 'flex-start' }}>
          <div>
            <div className="gn-eyebrow">Case · linked to {c.goalId}</div>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 500, margin: '0.375rem 0 0.25rem' }}>{c.title}</h2>
            <div className="muted txt-sm">{c.modeNote}</div>
          </div>
          <div className="flex gap-1">
            <Button size="sm" kind="ghost" renderIcon={Pause}>Pause</Button>
            <Button size="sm" kind="ghost" renderIcon={ChatLaunch}>Ask the agent</Button>
            <Button size="sm" kind="secondary" renderIcon={Edit}>Influence plan</Button>
          </div>
        </div>
      </div>

      {/* Two-column: timeline + control */}
      <div className="gn-live">
        <div className="gn-timeline">
          <div className="head">
            <div className="mono" style={{ fontSize: '0.75rem', letterSpacing: '0.08em', color: 'var(--gn-text-2)', textTransform: 'uppercase' }}>
              Decision &amp; execution timeline
            </div>
            <span className="muted txt-sm">{c.steps.length} steps</span>
          </div>
          {c.steps.map((s, i) => (
            <div key={i} className={`step ${s.kind}`}>
              <div className="marker">
                <div className="node">{STEP_ICONS[s.kind] || '•'}</div>
                <div className="line" />
              </div>
              <div className="content">
                <div className="when">{s.when} · {labelFor(s.kind)}</div>
                <div className="what">{s.what}</div>
                {s.why && <div className="why">{s.why}</div>}
                {s.alts && (
                  <div className="alts">
                    <div className="at">Alternatives considered</div>
                    {s.alts}
                  </div>
                )}
                {(s.kind === 'decision' || s.kind === 'delegated') && (
                  <div className="row-actions">
                    <Button size="sm" kind="ghost">Why this?</Button>
                    <Button size="sm" kind="ghost">See alternatives</Button>
                    <Button size="sm" kind="ghost">Override</Button>
                  </div>
                )}
                {s.kind === 'influenced' && (
                  <div className="row-actions">
                    <Button size="sm" kind="ghost">View override</Button>
                    <Button size="sm" kind="ghost">See cascade</Button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Control / intervention sidebar */}
        <div className="gn-control">
          <div className="head">
            <div className="mono" style={{ fontSize: '0.75rem', letterSpacing: '0.08em', color: 'var(--gn-text-2)', textTransform: 'uppercase' }}>
              Your controls
            </div>
          </div>

          <div className="group">
            <div className="gtitle">Mode</div>
            <div className={`gn-mode ${c.mode}`} style={{ width: '100%', justifyContent: 'center' }}>
              <span className="dot" />{c.mode}
            </div>
            <div className="muted txt-sm" style={{ marginTop: 8 }}>
              {c.mode === 'workflow'
                ? 'Default workflow is executing. Switch to elicitation if you want the agent to re-interview SMEs.'
                : 'Agent is gathering context. It will not execute until you approve a draft plan.'}
            </div>
            <div className="flex gap-1 mt-2">
              <Button size="sm" kind="secondary" style={{ flex: 1 }}>
                {c.mode === 'workflow' ? '→ elicitation' : '→ workflow'}
              </Button>
            </div>
          </div>

          <div className="group">
            <div className="gtitle">Agents on this case</div>
            <div className="agents">
              {c.agents.map(a => (
                <div key={a.name} className="agent">
                  <div className="nm">{a.name}<span className="role">{a.role}</span></div>
                  <div className="conf">{a.conf.toFixed(2)}</div>
                  <div className="barwrap"><div className="fill" style={{ width: `${a.conf * 100}%` }} /></div>
                </div>
              ))}
            </div>
          </div>

          <div className="group">
            <div className="gtitle">Influence the plan</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <Button size="sm" kind="ghost" renderIcon={Edit} style={{ justifyContent: 'flex-start' }}>Re-weight KPIs</Button>
              <Button size="sm" kind="ghost" renderIcon={Edit} style={{ justifyContent: 'flex-start' }}>Add a constraint</Button>
              <Button size="sm" kind="ghost" renderIcon={ChatLaunch} style={{ justifyContent: 'flex-start' }}>Ask a clarifying question</Button>
              <Button size="sm" kind="ghost" renderIcon={Pause} style={{ justifyContent: 'flex-start' }}>Pause &amp; review</Button>
              <Button size="sm" kind="ghost" renderIcon={Stop} style={{ justifyContent: 'flex-start', color: 'var(--gn-red)' }}>Stop &amp; recall</Button>
            </div>
          </div>

          <div className="group">
            <div className="gtitle">Open in</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              <Button size="sm" kind="ghost" renderIcon={ArrowRight} onClick={() => navigate('/plans')} style={{ justifyContent: 'flex-start' }}>Plans (alternatives)</Button>
              <Button size="sm" kind="ghost" renderIcon={ArrowRight} onClick={() => navigate('/decisions')} style={{ justifyContent: 'flex-start' }}>Decision log</Button>
              <Button size="sm" kind="ghost" renderIcon={ArrowRight} onClick={() => navigate('/replay')} style={{ justifyContent: 'flex-start' }}>Replay &amp; audit</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function labelFor(kind) {
  switch (kind) {
    case 'event':      return 'event'
    case 'delegated':  return 'agent owned the work'
    case 'decision':   return 'agent decision'
    case 'influenced': return 'human influence'
    case 'complete':   return 'outcome'
    default:           return kind
  }
}
