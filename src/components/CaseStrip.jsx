import { Tag } from '@carbon/react'

export default function CaseStrip({ resolved = false, right }) {
  return (
    <div className={`gn-case-strip ${resolved ? 'resolved' : ''}`}>
      <div className="live-tag">
        <span className="pulse" />
        <span>{resolved ? 'RESOLVED · AUTO-EXECUTED' : 'LIVE'}</span>
      </div>
      <div className="case-id">Case SH-48201 · shipment.lost</div>
      <div className="meta">Pfizer Tier-1 · $1.42M · age {resolved ? 'closed at +5h 56m' : '47 min'}</div>
      <div className="right">
        {right}
        <span className="gn-genui-badge">GENUI · v2.1 · composed</span>
      </div>
    </div>
  )
}
