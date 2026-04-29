export default function AgentCard({ agent }) {
  return (
    <div className={`gn-agent-card ${agent.tone}`}>
      <div className="name">{agent.name}</div>
      <div className="goal">{agent.version} · {agent.goal}</div>
      <div className="top">{agent.proposal}</div>
      <div className="nodes">{agent.nodes} nodes evaluated · {agent.impact}</div>
      <div className="conf">
        <div className="bar"><div className="fill" style={{ width: `${agent.conf * 100}%` }} /></div>
        <span className="score">{agent.conf.toFixed(2)}</span>
      </div>
    </div>
  )
}
