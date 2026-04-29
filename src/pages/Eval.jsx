import { Tile, Button, Tag } from '@carbon/react'
import { CheckmarkFilled, Warning, Play } from '@carbon/icons-react'
import { EVAL_SCENARIOS, EVAL_GATE } from '../data/mock.js'

export default function EvalPage() {
  return (
    <div className="gn-page">
      <div className="gn-page-head">
        <div>
          <div className="crumb">Home / Trust &amp; eval</div>
          <h1>Trust &amp; eval</h1>
          <div className="subtitle">
            Before you trust an agent with a goal, you should know how it behaves on historical, synthetic,
            and adversarial cases. Pass rate, mode-switch correctness, and cost ceiling matter more than
            raw confidence.
          </div>
        </div>
        <div className="flex gap-1">
          <Tag type="green">Pass rate 97.8%</Tag>
          <Button size="sm" kind="primary" renderIcon={Play}>Run full suite</Button>
        </div>
      </div>

      <div className="gn-section">
        <div className="gn-section-title">Release gate</div>
        <Tile className="gn-tile">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {EVAL_GATE.map((row, i) => {
              const ok = row.ok === true
              const partial = row.ok === 'partial'
              return (
                <div key={i} className="flex" style={{ alignItems: 'center', gap: 10 }}>
                  {ok && <CheckmarkFilled size={16} style={{ color: 'var(--gn-green)' }} />}
                  {partial && <Warning size={16} style={{ color: 'var(--gn-orange)' }} />}
                  {!ok && !partial && <Warning size={16} style={{ color: 'var(--gn-red)' }} />}
                  <span style={{ fontSize: '0.875rem', color: ok ? 'var(--gn-text)' : 'var(--gn-text-2)' }}>
                    {row.label}
                  </span>
                </div>
              )
            })}
          </div>
        </Tile>
      </div>

      <div className="gn-section">
        <div className="gn-section-title">Scenario results</div>
        <div className="gn-eval">
          <div className="gn-eval-row head">
            <div>Scenario</div>
            <div>Type</div>
            <div>Pass</div>
            <div>Conf</div>
            <div>Time</div>
            <div>Mode behaviour</div>
          </div>
          {EVAL_SCENARIOS.map((s, i) => (
            <div key={i} className="gn-eval-row">
              <div>{s.name}</div>
              <div className="muted txt-sm">{s.type}</div>
              <div className={`pass ${s.pass ? 'ok' : 'no'}`}>{s.pass ? 'pass' : 'fail'}</div>
              <div className="mono">{s.conf.toFixed(2)}</div>
              <div className="mono muted">{s.time}</div>
              <div className="mono txt-sm" style={{ color: s.mode.includes('ESCALATE') || s.mode.includes('held') ? 'var(--gn-orange)' : 'var(--gn-blue-70)' }}>
                {s.mode}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="gn-tile tinted mt-3">
        <div className="gn-eyebrow" style={{ marginBottom: 6 }}>What "mode-switch correctness" means</div>
        <div className="txt-sm">
          A good agent runs the workflow when it should and switches to elicitation when it shouldn't.
          We measure both directions — false starts (running a workflow when context is missing) and
          false stalls (asking for input when the policy already covers the case).
        </div>
      </div>
    </div>
  )
}
