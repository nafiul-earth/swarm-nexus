import { useEffect, useState } from 'react'
import { Grid, Column, Tile, Button, Tag, ContentSwitcher, Switch } from '@carbon/react'
import { ArrowRight, CheckmarkFilled, View } from '@carbon/icons-react'
import { useNavigate } from 'react-router-dom'
import CaseStrip from '../components/CaseStrip.jsx'

export default function Action() {
  const navigate = useNavigate()
  const [posture, setPosture] = useState(0) // 0 auto, 1 hold, 2 escalate
  const [secs, setSecs] = useState(8)

  useEffect(() => {
    if (posture !== 0) return
    if (secs <= 0) return
    const t = setTimeout(() => setSecs(s => s - 1), 1000)
    return () => clearTimeout(t)
  }, [secs, posture])

  return (
    <div className="gn-page">
      <CaseStrip
        right={<Button size="sm" kind="ghost" renderIcon={View} onClick={() => navigate('/replay')}>Replay arbitration</Button>}
      />

      {/* GenUI state bar */}
      <Tile className="gn-tile mt-2" style={{ display: 'flex', alignItems: 'center', gap: 14, flexWrap: 'wrap', borderLeft: '3px solid #8a3ffc' }}>
        <span className="gn-genui-badge">GENUI · v2.1 · composed</span>
        <span className="muted" style={{ fontFamily: 'var(--gn-font-mono)', fontSize: 11 }}>
          {['auto-execute · high-conf · 4 widgets', 'hold · evidence-required · 5 widgets', 'escalate · human-in-loop · 6 widgets'][posture]}
        </span>
        <div style={{ marginLeft: 'auto' }}>
          <ContentSwitcher size="sm" selectedIndex={posture} onChange={({ index }) => { setPosture(index); setSecs(8) }}>
            <Switch name="auto" text="Auto-execute" />
            <Switch name="hold" text="Hold" />
            <Switch name="escalate" text="Escalate" />
          </ContentSwitcher>
        </div>
      </Tile>

      {/* Recommendation card — composes by posture */}
      <div className="gn-rec mt-3">
        {posture === 0 && (
          <div className="banner">
            <span className="check">✓</span>
            <div>
              <div className="state">AUTO-EXECUTE</div>
              <div className="muted" style={{ fontSize: '0.8125rem' }}>Mesh confidence 0.91 · cleared threshold (≥ 0.85)</div>
            </div>
            <div className="countdown">
              <div className="label">Dispatching in</div>
              <div className="time">00:00:{String(Math.max(secs, 0)).padStart(2, '0')}</div>
            </div>
          </div>
        )}
        {posture === 1 && (
          <div className="banner" style={{ background: 'rgba(241,194,27,0.1)', borderColor: 'rgba(241,194,27,0.4)' }}>
            <span className="check" style={{ background: '#f1c21b' }}>!</span>
            <div>
              <div className="state" style={{ color: '#b28600' }}>HOLD FOR REVIEW</div>
              <div className="muted" style={{ fontSize: '0.8125rem' }}>Mesh confidence 0.74 · below auto threshold (0.85)</div>
            </div>
            <div className="countdown">
              <div className="label">Awaiting evidence</div>
              <div className="time" style={{ color: '#b28600' }}>—:—</div>
            </div>
          </div>
        )}
        {posture === 2 && (
          <div className="banner" style={{ background: 'rgba(218,30,40,0.1)', borderColor: 'rgba(218,30,40,0.4)' }}>
            <span className="check" style={{ background: '#da1e28' }}>!</span>
            <div>
              <div className="state" style={{ color: '#da1e28' }}>ESCALATE TO HUMAN</div>
              <div className="muted" style={{ fontSize: '0.8125rem' }}>Mesh confidence 0.61 · routed to A. Singh, Sr Ops Mgr</div>
            </div>
            <div className="countdown">
              <div className="label">SLA</div>
              <div className="time" style={{ color: '#da1e28' }}>30 min</div>
            </div>
          </div>
        )}

        <div className="body">
          <div className="meta-row">
            <Tag type="purple" size="sm">AI · Mesh-arbitrated</Tag>
            <Tag type="blue" size="sm">Composite confidence: {posture === 0 ? '0.91' : posture === 1 ? '0.74' : '0.61'}</Tag>
            <Tag type="gray" size="sm">3 agent proposals · view trace</Tag>
            <span className="muted" style={{ marginLeft: 'auto', fontSize: 11 }}>Generated 12s ago</span>
          </div>

          <h3 className="headline">
            Re-route via Atlanta hub + partial-ship 40% from Newark DC + Account-manager outreach to Pfizer
          </h3>
          <div className="sub">Composite hybrid action. Two parallel sub-flows + one customer comms task. Estimated full resolution: 5h 41m.</div>

          <div className="flex gap-1 flex-wrap">
            <Tag type="blue">Recovery (primary)</Tag>
            <Tag type="magenta">CX (outreach)</Tag>
            <Tag type="warm-gray" style={{ textDecoration: 'line-through', opacity: 0.7 }}>Cost (suppressed by policy)</Tag>
          </div>

          <div className="impact-grid">
            <div className="tile">
              <div className="tlabel">Goal — Lift OTIF Q4</div>
              <div className="tvalue green">+0.3pp recovered</div>
              <div className="tnote">vs −0.6pp if no action</div>
            </div>
            <div className="tile">
              <div className="tlabel">Cost-to-serve</div>
              <div className="tvalue amber">+$14.2K</div>
              <div className="tnote">within $20K cap</div>
            </div>
            <div className="tile">
              <div className="tlabel">Customer SLA · Pfizer</div>
              <div className="tvalue green">Met within grace · NPS +1</div>
              <div className="tnote">4h to resolution</div>
            </div>
          </div>

          {/* Posture-specific widgets (HOLD = evidence form, ESCALATE = approval form) */}
          {posture === 1 && (
            <Tile className="gn-tile" style={{ background: 'rgba(241,194,27,0.04)' }}>
              <div style={{ fontFamily: 'var(--gn-font-mono)', fontSize: 11, letterSpacing: '0.14em', color: '#b28600' }}>EVIDENCE REQUEST · GENUI WIDGET</div>
              <div className="muted" style={{ fontSize: '0.8125rem', marginTop: 6 }}>
                Mesh requires confirmation that Newark DC has 4,200 units of matching SKU before approving partial ship.
              </div>
              <Button size="sm" kind="primary" className="mt-2">Confirm inventory in Newark</Button>
            </Tile>
          )}

          {posture === 2 && (
            <Tile className="gn-tile" style={{ background: 'rgba(218,30,40,0.04)' }}>
              <div style={{ fontFamily: 'var(--gn-font-mono)', fontSize: 11, letterSpacing: '0.14em', color: '#da1e28' }}>ESCALATION · GENUI WIDGET</div>
              <div className="muted" style={{ fontSize: '0.8125rem', marginTop: 6 }}>
                Routed to <strong>A. Singh, Senior Operations Manager</strong>. SLA: 30 minutes.
              </div>
              <div className="flex gap-1 mt-2">
                <Button size="sm" kind="primary">Acknowledge</Button>
                <Button size="sm" kind="danger--tertiary">Reassign</Button>
              </div>
            </Tile>
          )}

          <Tile className="gn-tile" style={{ background: 'var(--cds-layer-accent-01)' }}>
            <div style={{ fontFamily: 'var(--gn-font-mono)', fontSize: 11, letterSpacing: '0.14em', color: 'var(--cds-text-secondary)' }}>POLICY COMPLIANCE</div>
            <div className="flex gap-1 flex-wrap mt-2">
              <Tag type="green" size="sm">Customer SLA v4.2 · §3.1, §4.2</Tag>
              <Tag type="green" size="sm">Cost-to-Serve v2.1 · §1.1</Tag>
              <Tag type="green" size="sm">Cold-Chain v3.0 · n/a</Tag>
              <Tag type="green" size="sm">Sustainability v1.4 · §1.3</Tag>
            </div>
          </Tile>

          <div className="actions">
            {posture === 0 ? (
              <>
                <Button kind="primary" renderIcon={CheckmarkFilled} onClick={() => navigate('/replay')}>Approve & dispatch now</Button>
                <Button kind="tertiary">Modify parameters</Button>
                <Button kind="ghost">Reject & re-arbitrate</Button>
              </>
            ) : posture === 1 ? (
              <>
                <Button kind="primary">Approve with evidence</Button>
                <Button kind="tertiary">Send back to mesh</Button>
                <Button kind="ghost">Hold longer</Button>
              </>
            ) : (
              <>
                <Button kind="danger">Escalate to VP Logistics</Button>
                <Button kind="tertiary">Take ownership</Button>
                <Button kind="ghost">Send back to mesh</Button>
              </>
            )}
          </div>

          <div className="genui-foot">
            Composed by GenUI v2.1 · recipe <span className="m">{['auto-execute.high-conf.policy-clean.tier1', 'hold.evidence-needed.policy-clean.tier1', 'escalate.low-conf.named-human.tier1'][posture]}</span>
            {' '}— {posture === 0 ? '4 widgets surfaced, 2 suppressed (HumanApprovalForm, EscalationAssignment)' :
                    posture === 1 ? '5 widgets surfaced (incl. EvidenceRequest), 1 suppressed (EscalationAssignment)' :
                    '6 widgets surfaced (incl. EscalationAssignment, OwnershipForm)'}
          </div>
        </div>
      </div>

      <Tile className="gn-tile mt-4" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap' }}>
        <div>
          <div style={{ fontFamily: 'var(--gn-font-mono)', fontSize: 11, color: 'var(--cds-text-secondary)', letterSpacing: '0.14em' }}>NEXT</div>
          <div style={{ fontWeight: 500 }}>After dispatch, the case lands in Replay & Audit for sign-off.</div>
        </div>
        <Button kind="primary" renderIcon={ArrowRight} onClick={() => navigate('/replay')}>Open Replay & Audit</Button>
      </Tile>
    </div>
  )
}
