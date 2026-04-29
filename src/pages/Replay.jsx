import { Tag, Button, Tile } from '@carbon/react'
import { PlayFilledAlt, Restart } from '@carbon/icons-react'
import { AUDIT_TRAIL } from '../data/mock.js'

export default function Replay() {
  return (
    <div className="gn-page">
      <div className="gn-page-head">
        <div>
          <div className="crumb">Home / Replay &amp; audit</div>
          <h1>Replay &amp; audit</h1>
          <div className="subtitle">
            Step through a closed case in time order. Useful for after-action review, training the agent,
            or showing auditors how a decision was reached.
          </div>
        </div>
        <div className="flex gap-1 flex-wrap">
          <Tag type="green">Resolved · CASE-2026-04-28-SH48201</Tag>
          <Button size="sm" kind="primary" renderIcon={PlayFilledAlt}>Replay at 1×</Button>
          <Button size="sm" kind="ghost" renderIcon={Restart}>Reset</Button>
        </div>
      </div>

      <Tile className="gn-tile mb-3">
        <div className="gn-eyebrow">Outcome summary</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.75rem', marginTop: '0.5rem' }}>
          <div>
            <div className="muted txt-sm">OTIF impact</div>
            <div className="mono" style={{ fontSize: '1.25rem', color: 'var(--gn-green)' }}>+0.4pp</div>
            <div className="muted txt-sm">predicted +0.3pp</div>
          </div>
          <div>
            <div className="muted txt-sm">Resolution time</div>
            <div className="mono" style={{ fontSize: '1.25rem', color: 'var(--gn-green)' }}>5h 41m</div>
            <div className="muted txt-sm">predicted 6h 12m</div>
          </div>
          <div>
            <div className="muted txt-sm">Cost-to-serve</div>
            <div className="mono" style={{ fontSize: '1.25rem', color: 'var(--gn-text)' }}>+$14.8K</div>
            <div className="muted txt-sm">predicted +$14.2K</div>
          </div>
          <div>
            <div className="muted txt-sm">Customer NPS</div>
            <div className="mono" style={{ fontSize: '1.25rem', color: 'var(--gn-green)' }}>+1</div>
            <div className="muted txt-sm">predicted neutral</div>
          </div>
        </div>
      </Tile>

      <div className="gn-section-title">Full audit trail</div>
      <div className="gn-audit">
        {AUDIT_TRAIL.map((row, i) => (
          <div key={i} className="row">
            <div className="ts">{row.ts}</div>
            <div className={`actor ${row.actor}`}>{row.actor}</div>
            <div>{row.text}</div>
          </div>
        ))}
      </div>

      <div className="gn-tile tinted mt-3">
        <div className="gn-eyebrow" style={{ marginBottom: 6 }}>Why HUMAN appears here</div>
        <div className="txt-sm">
          The HUMAN actor is M. Patel's pause-and-verify override at 08:55. The agent paused for 4 minutes
          while you confirmed carrier capacity, then resumed. The pause is logged as an influence event so
          downstream auditors can see exactly when human judgment changed the path.
        </div>
      </div>
    </div>
  )
}
