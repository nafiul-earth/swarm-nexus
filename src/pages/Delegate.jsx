import { useState } from 'react'
import { Tag, Button, TextArea } from '@carbon/react'
import { Send, ArrowRight, Idea, AddAlt } from '@carbon/icons-react'
import { useNavigate } from 'react-router-dom'
import { ELICITATION_CHAT } from '../data/mock.js'

export default function Delegate() {
  const navigate = useNavigate()
  const [draft, setDraft] = useState('')
  const [completeness] = useState(32) // mock — auto-progresses as elicitation continues
  const threshold = 70

  return (
    <div className="gn-page">
      <div className="gn-page-head">
        <div>
          <div className="crumb">Home / Delegate</div>
          <h1>Delegate a goal</h1>
          <div className="subtitle">
            Tell the agent the outcome you want. It will interview you and your SMEs to build a plan
            it can execute. You stay in the loop on every weight, policy, and constraint it captures.
          </div>
        </div>
        <div className="flex gap-1 flex-wrap">
          <Tag type="blue">New goal · G-LAUNCH-EU</Tag>
          <div className="gn-mode elicitation"><span className="dot" />elicitation</div>
        </div>
      </div>

      {/* Goal header */}
      <div className="gn-tile accent-blue mb-3">
        <div className="gn-eyebrow">Goal you delegated</div>
        <div style={{ fontSize: '1.125rem', fontWeight: 500, margin: '0.375rem 0' }}>
          Expand "Apex Pulse" wearable to EU/UK retail in Q4 2026
        </div>
        <div className="muted txt-sm">
          The agent does not have a default workflow for EU retail launches. It is in elicitation mode
          until enough context is captured to generate a plan.
        </div>
      </div>

      {/* Two-column: chat + structured capture */}
      <div className="gn-elicit">
        {/* Chat */}
        <div className="gn-chat">
          <div className="head">
            <div className="mono" style={{ fontSize: '0.75rem', letterSpacing: '0.08em', color: 'var(--gn-text-2)', textTransform: 'uppercase' }}>
              Conversation · Launch Coordinator agent
            </div>
            <Tag size="sm" type="blue">3 SMEs queued</Tag>
          </div>
          <div className="stream">
            {ELICITATION_CHAT.map((m, i) => (
              <div key={i} className={`gn-bubble ${m.who}`}>
                <div className="who">{m.who === 'agent' ? 'Launch Coordinator' : 'You · M. Patel'}</div>
                <div>{m.text}</div>
                {m.quickReplies && (
                  <div className="quick-replies">
                    {m.quickReplies.map(qr => (
                      <span key={qr} className="qr">{qr}</span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className="composer">
            <input
              placeholder="Reply, or ask the agent to clarify…"
              value={draft}
              onChange={e => setDraft(e.target.value)}
            />
            <Button size="sm" kind="primary" renderIcon={Send}>Send</Button>
          </div>
        </div>

        {/* Capture panel */}
        <div className="gn-capture">
          <div className="head">
            <div className="mono" style={{ fontSize: '0.75rem', letterSpacing: '0.08em', color: 'var(--gn-text-2)', textTransform: 'uppercase' }}>
              What I'm capturing
            </div>
          </div>

          <div className="gn-completeness">
            <div className="label">
              <span>Context completeness</span>
              <span style={{ color: completeness >= threshold ? 'var(--gn-green)' : 'var(--gn-orange)' }}>
                {completeness}% / {threshold}%
              </span>
            </div>
            <div className="bar">
              <div className="fill" style={{ width: `${completeness}%` }} />
              <div className="threshold" style={{ left: `${threshold}%` }} />
            </div>
            <div className="hint">
              Agent will switch to <b>workflow mode</b> at {threshold}%. You can also force an early switch.
            </div>
          </div>

          <div className="group">
            <div className="gtitle">
              <span>Scope <span className="muted">(2 of 3)</span></span>
              <span className="completeness">66%</span>
            </div>
            <div className="field"><span className="k">Markets in scope</span><span className="v">UK · DE · FR · IT · ES · NL</span></div>
            <div className="field"><span className="k">Sequencing</span><span className="v">UK+DE first, then 4 parallel</span></div>
            <div className="field"><span className="k">GA window</span><span className="v missing">not yet specified</span></div>
          </div>

          <div className="group">
            <div className="gtitle">
              <span>KPIs &amp; weights <span className="muted">(0 of 3)</span></span>
              <span className="completeness" style={{ color: 'var(--gn-orange)' }}>0%</span>
            </div>
            <div className="field"><span className="k">Coverage</span><span className="v missing">eliciting</span></div>
            <div className="field"><span className="k">Compliance cost</span><span className="v missing">eliciting</span></div>
            <div className="field"><span className="k">Time-to-shelf</span><span className="v missing">eliciting</span></div>
          </div>

          <div className="group">
            <div className="gtitle">
              <span>Policy &amp; SMEs <span className="muted">(2 of 4)</span></span>
              <span className="completeness">50%</span>
            </div>
            <div className="field"><span className="k">GDPR posture owner</span><span className="v">R. Mehta (PM)</span></div>
            <div className="field"><span className="k">Privacy sign-off</span><span className="v">J. Okafor</span></div>
            <div className="field"><span className="k">Pricing policy</span><span className="v missing">not captured</span></div>
            <div className="field"><span className="k">Retail partner mix</span><span className="v missing">not captured</span></div>
          </div>

          <div className="group">
            <div className="gtitle">
              <span>Constraints captured</span>
              <span className="completeness">3</span>
            </div>
            <div className="field"><span className="k">#1 Phasing</span><span className="v">UK+DE wk 1–4</span></div>
            <div className="field"><span className="k">#2 Re-elicit weights</span><span className="v">EU risk profile differs</span></div>
            <div className="field"><span className="k">#3 SME chain</span><span className="v">R. Mehta → J. Okafor</span></div>
          </div>
        </div>
      </div>

      {/* Footer actions */}
      <div className="flex flex-between mt-3">
        <div className="muted txt-sm">
          <Idea size={14} style={{ verticalAlign: 'middle', marginRight: 6 }} />
          The agent never executes from elicitation. You will see a draft plan before anything ships.
        </div>
        <div className="flex gap-1">
          <Button kind="ghost" onClick={() => navigate('/goals')}>Save &amp; pause</Button>
          <Button kind="secondary" renderIcon={AddAlt}>Add a constraint</Button>
          <Button kind="primary" renderIcon={ArrowRight} disabled={completeness < threshold}>
            Generate draft plan
          </Button>
        </div>
      </div>
    </div>
  )
}
