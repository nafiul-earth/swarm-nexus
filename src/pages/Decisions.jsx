import { useState } from 'react'
import { Tag, Button } from '@carbon/react'
import { ArrowRight, Information } from '@carbon/icons-react'
import { useNavigate } from 'react-router-dom'
import MeshGraph from '../components/MeshGraph.jsx'
import { MESH, DECISIONS } from '../data/mock.js'

const TABS = [
  { id: 'launch',      label: 'Launch · cross-team',          mesh: MESH.launch },
  { id: 'supplychain', label: 'Supply chain · lost shipment', mesh: MESH.supplychain }
]

const RESOLVER_TONE = {
  POLICY: 'policy',
  MESH:   'mesh',
  HUMAN:  'human'
}

export default function Decisions() {
  const navigate = useNavigate()
  const [active, setActive] = useState('launch')
  const tab = TABS.find(t => t.id === active)
  const mesh = tab.mesh

  return (
    <div className="gn-page">
      <div className="gn-page-head">
        <div>
          <div className="crumb">Home / Decisions</div>
          <h1>Decision Mesh</h1>
          <div className="subtitle">
            How agents reach a decision: proposals, policies, the mesh, and your overrides drawn as a
            graph. Edges show how each piece relates — flow, suppression, influence, cascade, escalation.
            Numbered markers are critical points where the tree could have gone a different way.
          </div>
        </div>
        <div className="flex gap-1 flex-wrap">
          <Tag type="blue">{mesh.caseId}</Tag>
          <Button size="sm" kind="ghost" renderIcon={ArrowRight} onClick={() => navigate('/replay')}>Open in replay</Button>
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

      {/* Mesh graph */}
      <div className="gn-mesh-wrap mb-3">
        <div className="gn-mesh-head">
          <div>
            <div className="gn-eyebrow">Decision graph · linked to {mesh.goalId}</div>
            <div className="ttl">{mesh.title}</div>
            <div className="sub">{mesh.summary}</div>
          </div>
          <EdgeLegend />
        </div>

        <MeshGraph graph={mesh.graph} />
      </div>

      {/* Critical points list */}
      <div className="gn-section">
        <div className="gn-section-title">Critical points · what would have changed the outcome</div>
        <div className="gn-cp-list">
          {mesh.criticalPoints.map(cp => (
            <div key={cp.n} className={`gn-cp-card ${RESOLVER_TONE[cp.resolver] || 'human'}${cp.resolution === 'ESCALATED' ? ' escalated' : ''}`}>
              <div className="cp-head">
                <div className="cp-num">{cp.n}</div>
                <div className="cp-stage">{cp.stageLabel} · resolved by {cp.resolver}</div>
                <div className={`cp-resolution ${cp.resolution}`}>{cp.resolution}</div>
              </div>
              <div className="cp-title">{cp.title}</div>
              <div className="cp-conflict">{cp.conflict}</div>
              <div className="cp-rule">{cp.rule}</div>
              <div className="cp-outcome">{cp.outcome}</div>
              <div className="cp-affected">
                {cp.affected.map((a, i) => <span key={i}>↳ {a}</span>)}
              </div>
              {cp.resolution === 'ESCALATED' && (
                <Button size="sm" kind="primary" onClick={() => navigate('/')}>Resolve in inbox</Button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Chronological log (supporting view) */}
      <div className="gn-section">
        <div className="gn-section-title flex flex-between">
          <span>Decision log · all events on this case</span>
          <span className="muted txt-sm">
            <Information size={14} style={{ verticalAlign: 'middle', marginRight: 4 }} />
            chronological audit · grouped above as critical points
          </span>
        </div>
        <div className="gn-decisions">
          {DECISIONS.slice(0, 6).map((d, i) => (
            <div key={i} className="gn-decision">
              <div className="when">{d.when}</div>
              <div className={`by-pill ${d.by}`}>{d.by}</div>
              <div className="what">
                {d.what}
                <div className="sub">{d.sub}</div>
              </div>
              <div className={`tag ${d.tag}`}>{d.tag}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function EdgeLegend() {
  const items = [
    { kind: 'flow',              color: '#0f62fe', dash: false, label: 'Flow' },
    { kind: 'flow-suppressed',   color: '#a8a8a8', dash: '3 3', label: 'Suppressed flow' },
    { kind: 'suppress',          color: '#da1e28', dash: '6 4', label: 'Policy suppress' },
    { kind: 'influence',         color: '#ff832b', dash: false, label: 'Human influence' },
    { kind: 'cascade',           color: '#ff832b', dash: '4 4', label: 'Cascade' },
    { kind: 'escalate',          color: '#da1e28', dash: false, label: 'Escalated', bold: true }
  ]
  return (
    <div className="gn-mesh-legend" style={{ marginTop: 0 }}>
      {items.map(it => (
        <span key={it.kind} className="item">
          <svg width="28" height="10" style={{ overflow: 'visible' }}>
            <line
              x1="0" y1="5" x2="24" y2="5"
              stroke={it.color}
              strokeWidth={it.bold ? 2.5 : 1.5}
              strokeDasharray={it.dash || undefined}
              markerEnd={`url(#legend-arr-${it.kind})`}
            />
            <defs>
              <marker
                id={`legend-arr-${it.kind}`}
                viewBox="0 0 12 12" refX="10" refY="6"
                markerWidth="6" markerHeight="6" orient="auto"
              >
                <path d="M 0 0 L 12 6 L 0 12 z" fill={it.color} />
              </marker>
            </defs>
          </svg>
          {it.label}
        </span>
      ))}
    </div>
  )
}
