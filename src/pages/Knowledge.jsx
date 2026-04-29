import { Button, Tag } from '@carbon/react'
import { Add, Document, ScalesTipped, UserMultiple } from '@carbon/icons-react'
import { KNOWLEDGE } from '../data/mock.js'

function Section({ title, icon: Icon, items, addLabel }) {
  return (
    <div className="gn-know">
      <div className="head">
        <div className="ttl"><Icon size={14} style={{ verticalAlign: 'middle', marginRight: 6 }} />{title}</div>
        <Button size="sm" kind="ghost" renderIcon={Add}>{addLabel}</Button>
      </div>
      {items.map(it => (
        <div key={it.name} className="row">
          <div className="nm">
            {it.name}
            <span className="src">{it.src}</span>
          </div>
          <div className="age">{it.age} · {it.owner}</div>
          <div className={`stat ${it.status}`}>
            {it.status === 'ok' ? 'parsed' : it.status === 'gap' ? 'gap' : 'draft'}
          </div>
        </div>
      ))}
    </div>
  )
}

export default function Knowledge() {
  return (
    <div className="gn-page">
      <div className="gn-page-head">
        <div>
          <div className="crumb">Home / Knowledge</div>
          <h1>Knowledge the agent uses</h1>
          <div className="subtitle">
            Policies, KPIs, and SME inputs the agent has captured. Gaps mean the agent will switch to
            elicitation if it hits this branch. Drafts are still being interviewed.
          </div>
        </div>
        <div className="flex gap-1">
          <Tag type="blue">{KNOWLEDGE.policies.length} policies</Tag>
          <Tag type="cool-gray">{KNOWLEDGE.kpis.length} KPIs</Tag>
          <Tag type="warm-gray">{KNOWLEDGE.smeInputs.length} SMEs</Tag>
        </div>
      </div>

      <div className="gn-know-grid">
        <Section
          title="Policies"
          icon={Document}
          items={KNOWLEDGE.policies}
          addLabel="Add policy"
        />
        <Section
          title="KPIs &amp; weights"
          icon={ScalesTipped}
          items={KNOWLEDGE.kpis}
          addLabel="Add KPI"
        />
      </div>

      <div className="gn-section">
        <Section
          title="Subject-matter experts"
          icon={UserMultiple}
          items={KNOWLEDGE.smeInputs}
          addLabel="Invite SME"
        />
      </div>

      <div className="gn-tile tinted mt-3">
        <div className="gn-eyebrow" style={{ marginBottom: 6 }}>How elicitation flows back here</div>
        <div className="txt-sm">
          When the agent runs elicitation on a goal, every captured policy, KPI weight, and SME constraint
          lands in this knowledge base. Future goals re-use it — so each delegation gets faster and the
          agent spends less time interviewing your team for the same context.
        </div>
      </div>
    </div>
  )
}
