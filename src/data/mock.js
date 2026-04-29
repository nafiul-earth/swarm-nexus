/* =====================================================================
   GoalNexus — business coordination scenarios

   Two illustrative scenarios drive every page:

   1. SCENARIO_SUPPLYCHAIN
      Specialised process: Lost-Shipment Recovery for an FMCG distributor.
      The agent has a known workflow (Detect → Diagnose → Reroute → Notify).
      It runs in WORKFLOW mode unless context becomes ambiguous.

   2. SCENARIO_LAUNCH
      Generic process: Cross-Team Product Launch coordination.
      No fixed workflow — the agent must elicit goals, KPIs, policies,
      stakeholder constraints. Runs in ELICITATION mode until enough
      context is captured, then transitions to WORKFLOW execution.
   ===================================================================== */

export const SCENARIOS = {
  SUPPLYCHAIN: {
    id: 'supplychain',
    label: 'Specialised · Supply chain',
    description: 'Lost-Shipment Recovery — a known process that runs as a default workflow.'
  },
  LAUNCH: {
    id: 'launch',
    label: 'Generic · Cross-team coordination',
    description: 'Product launch coordination — no fixed workflow, requires elicitation.'
  }
}

/* ---------- Inbox: agent asks awaiting human input ---------- */
export const INBOX = [
  {
    id: 'ASK-2026-04-28-014',
    scenario: 'launch',
    severity: 'attention',
    kind: 'NEEDS · POLICY WEIGHT',
    title: 'How should I weigh launch-date pressure against unfinished compliance review?',
    sub: 'Goal G-LAUNCH-Q3 · 2 KPIs in tension · I\'ve drafted 3 trade-off options.',
    age: '4m ago',
    meta: 'Agent · Launch Coordinator'
  },
  {
    id: 'ASK-2026-04-28-013',
    scenario: 'launch',
    severity: 'attention',
    kind: 'NEEDS · SME INPUT',
    title: 'Legal hasn\'t signed off on the privacy disclosure copy. Who\'s the right reviewer?',
    sub: 'Suggested reviewers: J. Okafor (Privacy Counsel), R. Mehta (Senior PM).',
    age: '12m ago',
    meta: 'Agent · Launch Coordinator'
  },
  {
    id: 'ASK-2026-04-28-012',
    scenario: 'supplychain',
    severity: 'urgent',
    kind: 'AWAITING · DELEGATION',
    title: 'Tier-1 lost shipment SH-48201 — should I auto-execute the rerouting plan?',
    sub: 'Confidence 0.91 · plan saves $14.2K vs claim path · within policy.',
    age: '1m ago',
    meta: 'Agent · Recovery'
  },
  {
    id: 'ASK-2026-04-28-011',
    scenario: 'launch',
    severity: 'calm',
    kind: 'INFLUENCE · KPI WEIGHT',
    title: 'Confirming KPI weights you set: time-to-market 0.45, brand-risk 0.35, cost 0.20.',
    sub: 'Plans below are scored against these weights. Adjust anytime.',
    age: '38m ago',
    meta: 'Agent · Strategy'
  },
  {
    id: 'ASK-2026-04-28-010',
    scenario: 'supplychain',
    severity: 'calm',
    kind: 'PROGRESS · NOTE',
    title: 'Demand-Surge rebalance auto-resolved without needing your input.',
    sub: 'Reallocated 4,200 units · OTIF unchanged · cost +$1.2K (within tolerance).',
    age: '1h ago',
    meta: 'Agent · Demand'
  }
]

/* ---------- Goal portfolio ---------- */
export const GOALS = [
  {
    id: 'G-LAUNCH-Q3',
    scenario: 'launch',
    name: 'Ship "Apex Pulse" wearable to US retail by Q3 2026',
    owner: 'M. Patel — Sr Director, Product',
    delegated: 'Apr 14, 2026',
    progress: 0.42,
    mode: 'workflow',
    modeNote: 'Plan approved Apr 22 · executing 6-team coordination',
    kpis: [
      { name: 'Time-to-market', weight: 0.45, target: 'GA by Sep 12' },
      { name: 'Brand-risk score', weight: 0.35, target: '≤ 0.20 (low)' },
      { name: 'Launch cost', weight: 0.20, target: '≤ $4.8M' }
    ],
    stakeholders: ['Engineering', 'Marketing', 'Legal', 'Supply', 'Retail Ops', 'Comms'],
    blockers: 1
  },
  {
    id: 'G-LAUNCH-EU',
    scenario: 'launch',
    name: 'Expand "Apex Pulse" to EU/UK retail in Q4',
    owner: 'M. Patel — Sr Director, Product',
    delegated: 'Apr 26, 2026',
    progress: 0.08,
    mode: 'elicitation',
    modeNote: 'Agent eliciting GDPR posture, retail partner mix, and pricing policy from R. Mehta',
    kpis: [
      { name: 'Coverage', weight: 0.5, target: '6 markets · 320 stores' },
      { name: 'Compliance cost', weight: 0.3, target: '≤ $620K' },
      { name: 'Time-to-shelf', weight: 0.2, target: '≤ 11 weeks' }
    ],
    stakeholders: ['Legal/EU', 'Retail EU', 'Logistics', 'Comms EU'],
    blockers: 0
  },
  {
    id: 'G-OTIF-Q4',
    scenario: 'supplychain',
    name: 'Lift OTIF from 89.4% → 91.4% by Q4 2026',
    owner: 'M. Patel — Sr Director, Product',
    delegated: 'Jan 7, 2026',
    progress: 0.71,
    mode: 'workflow',
    modeNote: 'Default Lost-Shipment Recovery workflow handles 96.2% of events without human gate',
    kpis: [
      { name: 'OTIF %', weight: 0.5, target: '≥ 91.4%' },
      { name: 'Tier-1 recovery time', weight: 0.3, target: '≤ 6h' },
      { name: 'Cost-to-serve', weight: 0.2, target: '≤ $4.10' }
    ],
    stakeholders: ['Logistics', 'Carrier Ops', 'CX', 'Finance'],
    blockers: 0
  },
  {
    id: 'G-COLDCHAIN',
    scenario: 'supplychain',
    name: 'Hold cold-chain excursion resolution time ≤ 4h',
    owner: 'D. Owens — VP Quality',
    delegated: 'Feb 19, 2026',
    progress: 0.88,
    mode: 'workflow',
    modeNote: 'Stable workflow · 23 events handled this quarter · no human escalation needed',
    kpis: [
      { name: 'Resolution time', weight: 0.6, target: '≤ 4h' },
      { name: 'Compliance %', weight: 0.4, target: '≥ 99%' }
    ],
    stakeholders: ['Quality', 'Logistics'],
    blockers: 0
  }
]

/* ---------- Today KPIs (composite, weighted) ---------- */
export const KPIS = [
  { label: 'Goals on-track',     value: '3/4',   weight: 'high', delta: '+1 this week', deltaTone: 'green',
    spark: [2, 2, 2, 3, 3, 3, 3, 3, 3, 4, 3, 3] },
  { label: 'Asks awaiting me',   value: '5',     weight: 'high', delta: '−2 vs yesterday', deltaTone: 'green',
    spark: [9, 8, 8, 7, 7, 6, 6, 6, 5, 5, 5, 5] },
  { label: 'Auto-resolved · 24h',value: '142',   weight: 'med',  delta: '+18%',          deltaTone: 'green',
    spark: [110, 115, 118, 120, 124, 128, 130, 132, 135, 138, 140, 142] },
  { label: 'Held for elicitation',value: '7',    weight: 'med',  delta: '+2',            deltaTone: 'amber',
    spark: [4, 4, 4, 5, 5, 5, 6, 6, 6, 6, 7, 7] },
  { label: 'Human overrides',    value: '3',     weight: 'low',  delta: 'last 7d',       deltaTone: 'green',
    spark: [5, 4, 4, 3, 3, 3, 3, 3, 3, 3, 3, 3] }
]

/* ---------- Live (follow-along) — supply chain example ---------- */
export const LIVE_SUPPLYCHAIN = {
  goalId: 'G-OTIF-Q4',
  caseId: 'CASE-2026-04-28-SH48201',
  title: 'Lost-Shipment Recovery · SH-48201 · Pfizer Tier-1',
  mode: 'workflow',
  modeNote: 'Running default Lost-Shipment Recovery workflow — no elicitation needed.',
  agents: [
    { name: 'Recovery Agent', role: 'Plans the reroute', conf: 0.91 },
    { name: 'Cost Optimizer', role: 'Models cost trade-offs', conf: 0.74 },
    { name: 'CX Agent',       role: 'Models customer impact', conf: 0.81 }
  ],
  steps: [
    { kind: 'event', when: '08:42', what: 'shipment.lost ingested · SH-48201 · last scan MEM cross-dock', why: 'TMS event matched Lost-Shipment Recovery trigger.' },
    { kind: 'delegated', when: '08:42', what: 'Goal G-OTIF-Q4 owns this event. Workflow auto-engaged.', why: 'Trigger registered against goal · within Tier-1 recovery policy window.' },
    { kind: 'decision', when: '08:51', what: 'Recovery proposed: reroute Atlanta hub + partial Newark', why: '12 historical analogues had 87% success on this lane combo. Confidence 0.87.',
      alts: 'Cost path: insurance claim + customer credit (suppressed — violates Tier-1 grace window). CX path: same-hour partial ship (merged into Recovery — both leverage Newark).' },
    { kind: 'decision', when: '08:54', what: 'Mesh boosted Recovery 0.87 → 0.91 via CX alignment', why: 'Compatibility merge: Recovery + CX both route via Newark, customer outreach absorbs delay.' },
    { kind: 'influenced', when: '08:55', what: 'M. Patel: "Hold dispatch — confirm carrier capacity at Atlanta first."', why: 'Human override before auto-execute. Plan paused 4m for verification.',
      alts: 'Without override, plan would have dispatched at 0.91 ≥ auto-execute floor.' },
    { kind: 'decision', when: '08:59', what: 'Carrier capacity confirmed via TMS · dispatch released', why: 'Atlanta hub returned 142-unit slot at 09:30. Plan resumed.' },
    { kind: 'complete', when: '14:38', what: 'POD received from Pfizer · OTIF impact +0.4pp · cost +$14.8K', why: 'Outcome better than predicted (+0.1pp OTIF, −31m vs forecast). Logged for replay.' }
  ]
}

/* ---------- Live (follow-along) — launch coordination example ---------- */
export const LIVE_LAUNCH = {
  goalId: 'G-LAUNCH-Q3',
  caseId: 'CASE-2026-04-28-LAUNCH',
  title: 'Apex Pulse Q3 launch · cross-team coordination',
  mode: 'workflow',
  modeNote: 'Plan approved Apr 22. 6-team workflow executing. Agent will request elicitation if KPI conflict emerges.',
  agents: [
    { name: 'Launch Coordinator', role: 'Owns sequencing across teams', conf: 0.83 },
    { name: 'Risk Agent',         role: 'Tracks brand & compliance risk', conf: 0.78 },
    { name: 'Comms Agent',        role: 'Drafts and sequences messaging', conf: 0.86 }
  ],
  steps: [
    { kind: 'event', when: 'Apr 14', what: 'Goal G-LAUNCH-Q3 delegated by M. Patel', why: 'No prior workflow exists for this product line — agent enters elicitation.' },
    { kind: 'delegated', when: 'Apr 15', what: 'Elicitation: agent interviewed 6 stakeholders, captured 14 constraints, 3 KPI weights', why: 'Required to build a plan. Captured policies: brand voice, FCC compliance, retail partner SLAs.' },
    { kind: 'decision', when: 'Apr 21', what: 'Three plans proposed against KPI weights (time 0.45 / risk 0.35 / cost 0.20)', why: 'Plan A: aggressive Aug GA. Plan B (recommended): Sep 12 GA with Aug retail seeding. Plan C: Oct GA with EU pre-staging.' },
    { kind: 'influenced', when: 'Apr 22', what: 'M. Patel approved Plan B with one change: pre-brief 3 Tier-1 retailers in week 6.', why: 'Override applied to plan tree · cascaded to Comms and Retail Ops sub-plans.' },
    { kind: 'decision', when: 'Apr 28', what: 'Risk agent flagged: privacy disclosure copy not signed off by Legal', why: 'Blocking dependency for retailer comms · agent posted ask to inbox · awaiting human routing.',
      alts: 'Auto-routing path exists (J. Okafor, Privacy Counsel) but agent held it — first time triggering this branch.' },
    { kind: 'complete', when: 'pending', what: 'Awaiting human input on legal reviewer', why: 'Workflow paused — see inbox ASK-2026-04-28-013.' }
  ]
}

/* ---------- Plans page (alternatives + KPI scoring) ---------- */
export const PLANS = [
  {
    id: 'PLAN-LAUNCH-B',
    scenario: 'launch',
    goalId: 'G-LAUNCH-Q3',
    name: 'Plan B · Sep 12 GA with August retail seeding',
    kind: 'recommended',
    score: 0.84,
    why: 'Best blended score against current KPI weights. Buys 4 weeks of compliance review while seeding demand at Tier-1 retailers in week 6.',
    impacts: [
      { kpi: 'Time-to-market', weight: 0.45, impact: '+8 days vs Plan A', tone: 'neg', text: 'Sep 12 GA' },
      { kpi: 'Brand-risk score', weight: 0.35, impact: '0.14 (low)', tone: 'pos', text: 'Below 0.20 threshold' },
      { kpi: 'Launch cost', weight: 0.20, impact: '$4.6M', tone: 'pos', text: '$200K under target' }
    ]
  },
  {
    id: 'PLAN-LAUNCH-A',
    scenario: 'launch',
    goalId: 'G-LAUNCH-Q3',
    name: 'Plan A · Aggressive Aug 22 GA',
    kind: 'alt',
    score: 0.71,
    why: 'Hits earliest possible GA date. Compliance review compressed, brand-risk model rated higher. Saves 3 weeks but raises exposure.',
    impacts: [
      { kpi: 'Time-to-market', weight: 0.45, impact: 'Aug 22 GA', tone: 'pos', text: '21 days early' },
      { kpi: 'Brand-risk score', weight: 0.35, impact: '0.27 (med)', tone: 'neg', text: 'Above 0.20 threshold' },
      { kpi: 'Launch cost', weight: 0.20, impact: '$5.1M', tone: 'neg', text: '$300K over' }
    ]
  },
  {
    id: 'PLAN-LAUNCH-C',
    scenario: 'launch',
    goalId: 'G-LAUNCH-Q3',
    name: 'Plan C · Oct GA with EU pre-staging',
    kind: 'alt',
    score: 0.69,
    why: 'Lowest risk profile. Adds EU pre-staging that bridges to G-LAUNCH-EU. Misses Q3 deadline by 11 days.',
    impacts: [
      { kpi: 'Time-to-market', weight: 0.45, impact: 'Oct 8 GA', tone: 'neg', text: '11 days late' },
      { kpi: 'Brand-risk score', weight: 0.35, impact: '0.09 (very low)', tone: 'pos', text: 'Best in class' },
      { kpi: 'Launch cost', weight: 0.20, impact: '$5.4M', tone: 'neg', text: 'Includes EU pre-staging' }
    ]
  },
  {
    id: 'PLAN-SC-RECOVERY',
    scenario: 'supplychain',
    goalId: 'G-OTIF-Q4',
    name: 'SH-48201 · Atlanta + partial Newark reroute',
    kind: 'recommended',
    score: 0.91,
    why: 'Default Lost-Shipment Recovery workflow. Mesh-boosted via CX alignment. Within Tier-1 grace window. Auto-execute eligible at ≥0.85.',
    impacts: [
      { kpi: 'OTIF %', weight: 0.5, impact: '+0.3pp', tone: 'pos', text: 'protects Q4 target' },
      { kpi: 'Tier-1 recovery time', weight: 0.3, impact: '5h 41m', tone: 'pos', text: 'under 6h SLA' },
      { kpi: 'Cost-to-serve', weight: 0.2, impact: '+$14.2K', tone: 'neu', text: 'within tolerance' }
    ]
  }
]

/* ---------- Knowledge: policies, KPIs, SME inputs ---------- */
export const KNOWLEDGE = {
  policies: [
    { name: 'Customer SLA Policy v4.2',       owner: 'Legal Ops',   age: '14d', status: 'ok',    src: 'goal G-OTIF-Q4 · referenced in 6 plans' },
    { name: 'Brand voice & messaging v3.1',   owner: 'Comms',       age: '6d',  status: 'ok',    src: 'goal G-LAUNCH-Q3 · 3 elicitation interviews' },
    { name: 'FCC product disclosure policy',  owner: 'Legal',       age: '2d',  status: 'gap',   src: 'goal G-LAUNCH-Q3 · privacy clause not signed off' },
    { name: 'Retail partner SLA matrix',      owner: 'Retail Ops',  age: '11d', status: 'ok',    src: 'goal G-LAUNCH-Q3 · 18 partners covered' },
    { name: 'EU/GDPR posture (draft)',        owner: 'Legal/EU',    age: '1d',  status: 'draft', src: 'goal G-LAUNCH-EU · being elicited from R. Mehta' },
    { name: 'Cold-chain compliance v3.0',     owner: 'Quality',     age: '8d',  status: 'ok',    src: 'goal G-COLDCHAIN' }
  ],
  kpis: [
    { name: 'Time-to-market',         owner: 'M. Patel',    age: '14d', status: 'ok',    src: 'elicited Apr 14 · weight 0.45' },
    { name: 'Brand-risk score',       owner: 'M. Patel',    age: '14d', status: 'ok',    src: 'elicited Apr 14 · weight 0.35' },
    { name: 'Launch cost',            owner: 'Finance',     age: '14d', status: 'ok',    src: 'elicited Apr 14 · weight 0.20' },
    { name: 'OTIF %',                 owner: 'M. Patel',    age: '90d', status: 'ok',    src: 'derived from SLA policy clause 3.1' },
    { name: 'Tier-1 recovery time',   owner: 'M. Patel',    age: '90d', status: 'ok',    src: 'derived from SLA policy clause 4.2' },
    { name: 'Coverage (EU markets)',  owner: 'R. Mehta',    age: '1d',  status: 'gap',   src: 'goal G-LAUNCH-EU · target not yet quantified' }
  ],
  smeInputs: [
    { name: 'J. Okafor — Privacy counsel',     owner: 'Legal',     age: '0d',  status: 'gap',   src: 'pending: review of privacy disclosure copy' },
    { name: 'R. Mehta — Senior PM',            owner: 'Product',   age: '2d',  status: 'ok',    src: '4 interviews · 11 constraints captured' },
    { name: 'A. Singh — Sr Ops Manager',       owner: 'Ops',       age: '5d',  status: 'ok',    src: '7 interviews · supply chain process notes' },
    { name: 'D. Owens — VP Quality',           owner: 'Quality',   age: '12d', status: 'ok',    src: 'cold-chain process owner · 3 interviews' }
  ]
}

/* ---------- Decision Mesh (per case) ----------
   Each mesh has stages (trigger → proposals → arbitration → plan → gate → execution)
   and a list of critical points where conflicts were resolved. The mesh visual
   reads top-to-bottom; critical points are surfaced as numbered callouts.
   ===================================================================== */
export const MESH = {
  supplychain: {
    caseId: 'CASE-2026-04-28-SH48201',
    title: 'Lost-Shipment Recovery · SH-48201 · Pfizer Tier-1',
    goalId: 'G-OTIF-Q4',
    summary: '3 proposals · 3 critical points · auto-executed with 1 human pause',
    stages: [
      {
        kind: 'trigger', label: 'Trigger',
        nodes: [{ id: 't1', label: 'shipment.lost', sub: 'SH-48201 · Tier-1 · last scan MEM', tone: 'red' }]
      },
      {
        kind: 'proposals', label: 'Agent proposals',
        nodes: [
          { id: 'p1', label: 'Recovery agent',  sub: 'Atlanta hub + partial Newark', conf: 0.87, tone: 'blue' },
          { id: 'p2', label: 'Cost optimizer',  sub: 'Insurance claim + customer credit', conf: 0.74, tone: 'gray', suppressed: true, cpRef: 1 },
          { id: 'p3', label: 'CX agent',        sub: 'Same-hour partial ship + AM outreach', conf: 0.81, tone: 'blue', cpRef: 2 }
        ]
      },
      {
        kind: 'arbitration', label: 'Mesh arbitration',
        nodes: [{ id: 'm1', label: 'Mesh resolves conflicts', sub: '1 suppressed · 1 merge · 1 boost', tone: 'mesh' }]
      },
      {
        kind: 'plan', label: 'Composite plan',
        nodes: [{ id: 'pl1', label: 'Recovery + CX merged', sub: 'Confidence 0.91 (boosted from 0.87)', tone: 'green' }]
      },
      {
        kind: 'gate', label: 'Execute gate',
        nodes: [{ id: 'g1', label: 'Auto-execute eligible', sub: 'Posture cleared at ≥0.85 · human paused for 4m', tone: 'amber', cpRef: 3 }]
      },
      {
        kind: 'execution', label: 'Execution',
        nodes: [{ id: 'e1', label: 'Dispatch released', sub: 'Atlanta confirmed · POD received 14:38', tone: 'green' }]
      }
    ],
    criticalPoints: [
      {
        n: 1, stage: 'proposals', stageLabel: 'Proposals',
        title: 'Cost path violates Tier-1 grace window',
        conflict: 'Cost agent proposed insurance + credit · would exceed 6h SLA',
        resolver: 'POLICY',
        resolution: 'SUPPRESSED',
        rule: 'Customer SLA Policy v4.2 §3.1',
        outcome: 'Cost proposal removed from candidate set before scoring.',
        affected: ['Cost optimizer (0.74) → suppressed']
      },
      {
        n: 2, stage: 'arbitration', stageLabel: 'Arbitration',
        title: 'Recovery + CX overlap on Newark',
        conflict: 'Two surviving proposals share the same logistics path',
        resolver: 'MESH',
        resolution: 'MERGED',
        rule: 'Compatibility merge · joint-leverage rule',
        outcome: 'Composite plan combines Atlanta reroute with CX outreach. Confidence boosted 0.87 → 0.91.',
        affected: ['Recovery (0.87) ⊕ CX (0.81) → composite (0.91)']
      },
      {
        n: 3, stage: 'gate', stageLabel: 'Execute gate',
        title: 'Human held auto-execute for capacity check',
        conflict: 'Plan was eligible to auto-dispatch — M. Patel paused for 4m',
        resolver: 'HUMAN',
        resolution: 'INFLUENCED',
        rule: 'M. Patel · "confirm Atlanta capacity first"',
        outcome: 'Carrier capacity returned 142-unit slot at 09:30. Plan resumed at 08:59 and dispatched.',
        affected: ['Auto-execute path → paused → resumed']
      }
    ],
    graph: {
      nodes: [
        { id: 'pol',  x: 30,   y: 30,  w: 180, h: 60,  kind: 'policy',  tone: 'gray',   label: 'SLA Policy v4.2', sub: '§3.1 · Tier-1 grace window' },
        { id: 't1',   x: 30,   y: 220, w: 180, h: 60,  kind: 'trigger', tone: 'red',    label: 'shipment.lost',   sub: 'SH-48201 · Tier-1' },
        { id: 'p1',   x: 290,  y: 60,  w: 200, h: 80,  kind: 'agent',   tone: 'blue',   label: 'Recovery agent',  sub: 'Atlanta + Newark', conf: 0.87 },
        { id: 'p2',   x: 290,  y: 200, w: 200, h: 80,  kind: 'agent',   tone: 'gray',   label: 'Cost optimizer',  sub: 'Insurance + credit', conf: 0.74, suppressed: true, cpRef: 1 },
        { id: 'p3',   x: 290,  y: 340, w: 200, h: 80,  kind: 'agent',   tone: 'blue',   label: 'CX agent',        sub: 'Same-hour partial',  conf: 0.81 },
        { id: 'm1',   x: 570,  y: 200, w: 170, h: 110, kind: 'mesh',    tone: 'mesh',   label: 'Mesh',            sub: 'arbitrate · merge · boost', cpRef: 2 },
        { id: 'pl1',  x: 800,  y: 60,  w: 200, h: 80,  kind: 'plan',    tone: 'green',  label: 'Composite plan',  sub: 'Recovery ⊕ CX · 0.91' },
        { id: 'h1',   x: 570,  y: 380, w: 170, h: 60,  kind: 'human',   tone: 'orange', label: 'Human pause',     sub: 'M. Patel · 4m hold', cpRef: 3 },
        { id: 'g1',   x: 800,  y: 220, w: 200, h: 60,  kind: 'gate',    tone: 'amber',  label: 'Auto-execute gate', sub: 'cleared after pause' },
        { id: 'out',  x: 800,  y: 340, w: 200, h: 60,  kind: 'outcome', tone: 'green',  label: 'Dispatched',      sub: 'POD received 14:38' }
      ],
      edges: [
        { from: 't1',  to: 'p1',  kind: 'flow' },
        { from: 't1',  to: 'p2',  kind: 'flow' },
        { from: 't1',  to: 'p3',  kind: 'flow' },
        { from: 'pol', to: 'p2',  kind: 'suppress', label: '§3.1 suppress' },
        { from: 'p1',  to: 'm1',  kind: 'flow' },
        { from: 'p2',  to: 'm1',  kind: 'flow-suppressed' },
        { from: 'p3',  to: 'm1',  kind: 'flow' },
        { from: 'm1',  to: 'pl1', kind: 'flow', label: 'merged + boosted' },
        { from: 'pl1', to: 'g1',  kind: 'flow' },
        { from: 'h1',  to: 'g1',  kind: 'influence', label: 'pause' },
        { from: 'g1',  to: 'out', kind: 'flow' }
      ]
    }
  },
  launch: {
    caseId: 'CASE-2026-04-28-LAUNCH',
    title: 'Apex Pulse Q3 launch · plan generation',
    goalId: 'G-LAUNCH-Q3',
    summary: '3 plans scored · 4 critical points · 1 currently escalated to you',
    stages: [
      {
        kind: 'trigger', label: 'Goal delegated',
        nodes: [{ id: 't1', label: 'Goal G-LAUNCH-Q3', sub: 'No prior workflow · enters elicitation', tone: 'blue' }]
      },
      {
        kind: 'elicitation', label: 'Elicitation',
        nodes: [{ id: 'el', label: 'Agent interviewed 6 SMEs', sub: '14 constraints · 3 KPI weights captured', tone: 'orange' }]
      },
      {
        kind: 'proposals', label: 'Plan proposals',
        nodes: [
          { id: 'a', label: 'Plan A · Aug 22 GA', sub: 'Aggressive · brand-risk 0.27', conf: 0.71, tone: 'gray', suppressed: true, cpRef: 1 },
          { id: 'b', label: 'Plan B · Sep 12 GA', sub: 'Balanced · brand-risk 0.14', conf: 0.84, tone: 'green' },
          { id: 'c', label: 'Plan C · Oct 8 GA', sub: 'Conservative · brand-risk 0.09', conf: 0.69, tone: 'blue' }
        ]
      },
      {
        kind: 'arbitration', label: 'KPI-weighted scoring',
        nodes: [{ id: 'm1', label: 'Mesh resolves trade-off', sub: 'time 0.45 / risk 0.35 / cost 0.20', tone: 'mesh', cpRef: 2 }]
      },
      {
        kind: 'plan', label: 'Selected plan',
        nodes: [{ id: 'pl1', label: 'Plan B · with retailer pre-brief', sub: 'Approved Apr 22 · cascaded to 2 sub-plans', tone: 'green', cpRef: 3 }]
      },
      {
        kind: 'gate', label: 'Execution gate',
        nodes: [{ id: 'g1', label: 'Workflow executing', sub: '6-team coordination · week 4 of 24', tone: 'blue' }]
      },
      {
        kind: 'execution', label: 'Open work',
        nodes: [{ id: 'e1', label: 'Blocked: privacy disclosure', sub: 'Awaiting your decision on routing', tone: 'red', cpRef: 4 }]
      }
    ],
    criticalPoints: [
      {
        n: 1, stage: 'proposals', stageLabel: 'Proposals',
        title: 'Plan A above brand-risk threshold',
        conflict: 'Plan A scored 0.27 brand-risk · your threshold is 0.20',
        resolver: 'POLICY',
        resolution: 'SUPPRESSED',
        rule: 'Brand-risk policy · threshold set during elicitation',
        outcome: 'Plan A dropped from final scoring round.',
        affected: ['Plan A (0.71) → suppressed']
      },
      {
        n: 2, stage: 'arbitration', stageLabel: 'Arbitration',
        title: 'Time-to-market vs brand-risk trade-off',
        conflict: 'Plan B leads on time (weight 0.45) but Plan C leads on risk (weight 0.35)',
        resolver: 'MESH',
        resolution: 'WEIGHTED',
        rule: 'KPI weights you set: time 0.45 / risk 0.35 / cost 0.20',
        outcome: 'Plan B wins composite (0.84 vs 0.69). Plan C retained as one-click alternative.',
        affected: ['Plan B → recommended', 'Plan C → retained as alt']
      },
      {
        n: 3, stage: 'plan', stageLabel: 'Plan',
        title: 'Human added retailer pre-brief constraint',
        conflict: 'M. Patel approved Plan B with one change not in the original tree',
        resolver: 'HUMAN',
        resolution: 'INFLUENCED',
        rule: 'M. Patel · "pre-brief 3 Tier-1 retailers in week 6"',
        outcome: 'Plan tree re-rendered. Comms timeline shifted forward 2 weeks; Retail Ops added 3 partner brief sessions.',
        affected: ['Comms sub-plan → cascaded', 'Retail Ops sub-plan → cascaded']
      },
      {
        n: 4, stage: 'execution', stageLabel: 'Execution',
        title: 'Legal sign-off blocking comms',
        conflict: 'Privacy disclosure copy not signed off · blocks retailer comms launch',
        resolver: 'HUMAN',
        resolution: 'ESCALATED',
        rule: 'Auto-routing path exists (J. Okafor) but agent held it — first time triggering this branch',
        outcome: 'Open ask in your inbox · ASK-2026-04-28-013. Workflow paused on this branch.',
        affected: ['Comms sub-plan → blocked']
      }
    ],
    graph: {
      nodes: [
        { id: 't1',   x: 30,   y: 60,  w: 180, h: 60,  kind: 'trigger', tone: 'blue',   label: 'Goal delegated',    sub: 'G-LAUNCH-Q3' },
        { id: 'el',   x: 30,   y: 200, w: 180, h: 60,  kind: 'elicit',  tone: 'orange', label: 'Elicitation',       sub: '6 SMEs · 14 constraints' },
        { id: 'wt',   x: 30,   y: 340, w: 180, h: 80,  kind: 'policy',  tone: 'gray',   label: 'KPI weights',       sub: 'time 0.45 · risk 0.35 · cost 0.20' },
        { id: 'br',   x: 30,   y: 460, w: 180, h: 60,  kind: 'policy',  tone: 'gray',   label: 'Brand-risk policy', sub: 'threshold 0.20' },
        { id: 'pa',   x: 290,  y: 60,  w: 200, h: 80,  kind: 'plan',    tone: 'gray',   label: 'Plan A · Aug 22 GA',sub: 'risk 0.27 (over)', conf: 0.71, suppressed: true, cpRef: 1 },
        { id: 'pb',   x: 290,  y: 220, w: 200, h: 80,  kind: 'plan',    tone: 'green',  label: 'Plan B · Sep 12 GA',sub: 'risk 0.14',         conf: 0.84 },
        { id: 'pc',   x: 290,  y: 380, w: 200, h: 80,  kind: 'plan',    tone: 'blue',   label: 'Plan C · Oct 8 GA', sub: 'risk 0.09',         conf: 0.69 },
        { id: 'm1',   x: 570,  y: 200, w: 170, h: 110, kind: 'mesh',    tone: 'mesh',   label: 'Mesh',              sub: 'KPI-weighted score', cpRef: 2 },
        { id: 'sel',  x: 800,  y: 60,  w: 200, h: 80,  kind: 'plan',    tone: 'green',  label: 'Plan B selected',   sub: '0.84 weighted', cpRef: 3 },
        { id: 'h1',   x: 570,  y: 380, w: 170, h: 60,  kind: 'human',   tone: 'orange', label: 'Human override',    sub: 'add retailer pre-brief' },
        { id: 'sub',  x: 800,  y: 220, w: 200, h: 60,  kind: 'cascade', tone: 'orange', label: 'Cascaded sub-plans',sub: 'Comms + Retail Ops' },
        { id: 'esc',  x: 800,  y: 380, w: 200, h: 80,  kind: 'block',   tone: 'red',    label: 'Blocked: legal sign-off', sub: 'escalated to your inbox', cpRef: 4 }
      ],
      edges: [
        { from: 't1', to: 'el',  kind: 'flow' },
        { from: 'el', to: 'pa',  kind: 'flow' },
        { from: 'el', to: 'pb',  kind: 'flow' },
        { from: 'el', to: 'pc',  kind: 'flow' },
        { from: 'wt', to: 'm1',  kind: 'flow', label: 'weights' },
        { from: 'br', to: 'pa',  kind: 'suppress', label: 'over threshold' },
        { from: 'pa', to: 'm1',  kind: 'flow-suppressed' },
        { from: 'pb', to: 'm1',  kind: 'flow' },
        { from: 'pc', to: 'm1',  kind: 'flow' },
        { from: 'm1', to: 'sel', kind: 'flow', label: 'weighted winner' },
        { from: 'h1', to: 'sel', kind: 'influence', label: 'override' },
        { from: 'sel',to: 'sub', kind: 'cascade', label: 'cascade' },
        { from: 'sel',to: 'esc', kind: 'escalate', label: 'blocked' }
      ]
    }
  }
}

/* ---------- Decisions log (kept as supporting chronological view) ---------- */
export const DECISIONS = [
  { when: '14:38 today', by: 'agent',  what: 'Closed CASE-SH48201 · POD received', sub: 'Auto-resolved · within policy · outcome better than forecast', tag: 'auto' },
  { when: '08:59 today', by: 'agent',  what: 'Released dispatch after carrier capacity confirmed', sub: 'Resumed plan paused by human override', tag: 'auto' },
  { when: '08:55 today', by: 'human',  what: 'M. Patel: "Hold dispatch — confirm carrier capacity at Atlanta first"', sub: 'Override applied to Recovery plan · 4m hold', tag: 'override' },
  { when: '08:54 today', by: 'mesh',   what: 'Recovery plan boosted 0.87 → 0.91 via CX alignment', sub: 'Compatibility merge · both leverage Newark', tag: 'auto' },
  { when: '08:54 today', by: 'policy', what: 'Cost path suppressed by SLA Policy v4.2 §3.1', sub: 'Tier-1 grace window violated', tag: 'policy' },
  { when: 'Apr 28',      by: 'agent',  what: 'Launch agent posted ask: legal reviewer for privacy copy', sub: 'Held auto-routing — first-time path', tag: 'auto' },
  { when: 'Apr 22',      by: 'human',  what: 'M. Patel approved Plan B with retailer pre-brief change', sub: 'Cascaded to Comms and Retail Ops sub-plans', tag: 'override' },
  { when: 'Apr 21',      by: 'agent',  what: 'Generated 3 launch plans against KPI weights', sub: '14 constraints, 3 KPI weights from elicitation', tag: 'auto' },
  { when: 'Apr 14',      by: 'human',  what: 'M. Patel set KPI weights: time 0.45 / risk 0.35 / cost 0.20', sub: 'Influence captured · agent re-scored all draft plans', tag: 'override' }
]

/* ---------- Audit / Replay trail (for one case) ---------- */
export const AUDIT_TRAIL = [
  { ts: '08:42:17', actor: 'SYS',     text: 'Event shipment.lost ingested · SH-48201' },
  { ts: '08:42:18', actor: 'AGT',     text: 'Goal G-OTIF-Q4 owns event · workflow engaged' },
  { ts: '08:43:00', actor: 'AGT',     text: '3 agents engaged: Recovery, Cost Optimizer, CX' },
  { ts: '08:51:31', actor: 'AGT',     text: 'Recovery proposal · 0.87' },
  { ts: '08:51:33', actor: 'AGT',     text: 'Cost proposal · 0.74' },
  { ts: '08:51:34', actor: 'AGT',     text: 'CX proposal · 0.81' },
  { ts: '08:54:02', actor: 'AGT',     text: 'Mesh arbitration · 3 proposals' },
  { ts: '08:54:03', actor: 'POLICY',  text: 'Cost suppressed by SLA Policy v4.2 §3.1' },
  { ts: '08:54:03', actor: 'AGT',     text: 'Compatibility merged: Recovery + CX' },
  { ts: '08:54:03', actor: 'AGT',     text: 'Confidence boost: 0.87 → 0.91' },
  { ts: '08:54:04', actor: 'AGT',     text: 'Posture: AUTO-EXECUTE eligible' },
  { ts: '08:55:11', actor: 'HUMAN',   text: 'M. Patel · hold dispatch · verify carrier capacity' },
  { ts: '08:59:02', actor: 'SYS',     text: 'Carrier capacity confirmed · Atlanta · 142 units' },
  { ts: '08:59:14', actor: 'AGT',     text: 'Plan resumed · dispatch released' },
  { ts: '09:12:44', actor: 'SYS',     text: 'Atlanta dispatch confirmed via TMS' },
  { ts: '14:38:19', actor: 'OUTCOME', text: 'POD received from Pfizer' }
]

/* ---------- Trust & Eval scenarios ---------- */
export const EVAL_SCENARIOS = [
  { name: 'SH-48201 replay (Pfizer)',                            type: 'Historical',     pass: true,  conf: 0.94, time: '5h 41m', cost: '$14.8K', mode: 'WORKFLOW' },
  { name: 'Cold-chain excursion + carrier strike',               type: 'Synthetic',      pass: true,  conf: 0.88, time: '8h 12m', cost: '$19.2K', mode: 'WORKFLOW' },
  { name: 'Launch goal with missing KPI weights',                type: 'Synthetic',      pass: true,  conf: 0.76, time: '—',      cost: '—',      mode: 'ELICITATION (correctly switched)' },
  { name: 'Carrier API outage 4h',                               type: 'Adversarial',    pass: true,  conf: 0.82, time: '9h 48m', cost: '$18.4K', mode: 'WORKFLOW (held)' },
  { name: 'Launch with conflicting stakeholder constraints',     type: 'Adversarial',    pass: true,  conf: 0.71, time: '—',      cost: '—',      mode: 'ELICITATION → ESCALATE' },
  { name: 'Policy clause ambiguity injected',                    type: 'Adversarial',    pass: false, conf: 0.49, time: '—',      cost: '—',      mode: 'ESCALATE (needs review)' }
]

export const EVAL_GATE = [
  { ok: true,      label: 'Goal pass rate ≥ 95% (current 97.8%)' },
  { ok: true,      label: 'Mode-switch correctness ≥ 90% (current 96.4%)' },
  { ok: true,      label: 'No regression vs prior version on historical replay' },
  { ok: true,      label: 'Adversarial scenarios handled, held, or correctly escalated' },
  { ok: true,      label: 'Cost ceiling never breached' },
  { ok: 'partial', label: 'Human review of 1 escalation (assigned to A. Singh — pending)' }
]

/* ---------- Executive rollup (sponsor view) ---------- */
export const EXEC = {
  hero: [
    { label: 'Goals on-track',     value: '3 / 4',  delta: '+1 this quarter',  deltaTone: 'green',
      spark: [2, 2, 2, 3, 3, 3, 3, 3, 3, 4, 3, 3] },
    { label: 'Decisions automated',value: '1,847',  delta: '+18% QoQ',         deltaTone: 'green',
      spark: [1100, 1180, 1240, 1320, 1410, 1490, 1560, 1640, 1700, 1760, 1810, 1847] },
    { label: 'Hours returned',     value: '412h',   delta: '+62h vs Q1',       deltaTone: 'green',
      spark: [240, 260, 280, 300, 320, 340, 360, 376, 388, 398, 405, 412] },
    { label: 'Value delivered',    value: '$2.1M',  delta: '+$340K vs Q1',     deltaTone: 'green',
      spark: [1.4, 1.45, 1.5, 1.6, 1.7, 1.78, 1.84, 1.92, 1.98, 2.02, 2.07, 2.1] }
  ],
  trust: [
    { label: 'Goal pass rate',         value: '97.8%', target: '≥ 95%',  status: 'ok' },
    { label: 'Mode-switch correctness',value: '96.4%', target: '≥ 90%',  status: 'ok' },
    { label: 'Auto-resolve rate',      value: '96.2%', target: '≥ 90%',  status: 'ok' },
    { label: 'Human override rate',    value: '4.2%',  target: '≤ 8%',   status: 'ok' },
    { label: 'Mean time to plan',      value: '8m',    target: '≤ 30m',  status: 'ok' },
    { label: 'Open escalations',       value: '1',     target: '—',      status: 'attention' }
  ],
  goalMatrix: [
    { id: 'G-LAUNCH-Q3', name: 'Apex Pulse Q3 launch (US)',          scenario: 'launch',      mode: 'workflow',    progress: 0.42, trend: 'up',    blockers: 1 },
    { id: 'G-LAUNCH-EU', name: 'Apex Pulse EU/UK expansion',          scenario: 'launch',      mode: 'elicitation', progress: 0.08, trend: 'flat',  blockers: 0 },
    { id: 'G-OTIF-Q4',   name: 'Lift OTIF 89.4% → 91.4% by Q4',       scenario: 'supplychain', mode: 'workflow',    progress: 0.71, trend: 'up',    blockers: 0 },
    { id: 'G-COLDCHAIN', name: 'Cold-chain excursion ≤ 4h',           scenario: 'supplychain', mode: 'workflow',    progress: 0.88, trend: 'up',    blockers: 0 }
  ],
  scenarioCompare: [
    { metric: 'Cases handled (YTD)',  sc: '142',     launch: '4',          note: 'Launch is high-touch by design' },
    { metric: 'Auto-resolve rate',    sc: '97%',     launch: '25%',        note: 'Launch typically needs elicitation' },
    { metric: 'Avg cycle time',       sc: '5h 41m',  launch: '~3 days',    note: 'Launch elicitation is the long pole' },
    { metric: 'Human overrides',      sc: '3 / 142', launch: '2 / 4',      note: 'Override rate proportional to novelty' },
    { metric: 'Cost / value impact',  sc: '+$2.1M',  launch: 'in flight',  note: 'SC = avoided cost; launch = TBD on close' }
  ],
  exposure: [
    { kind: 'escalation',  text: 'Legal sign-off blocking Apex Pulse comms',          meta: 'Goal G-LAUNCH-Q3 · ASK-2026-04-28-013', age: '4m ago' },
    { kind: 'elicitation', text: 'EU expansion still gathering pricing + retail mix', meta: 'Goal G-LAUNCH-EU · 32% complete',       age: '2d' },
    { kind: 'elicitation', text: 'Cold-chain policy refresh has 1 unresolved field',  meta: 'Knowledge · refresh due Q3',            age: '5d' }
  ],
  recentWins: [
    { title: 'SH-48201 · Pfizer Tier-1 dispatched',  delta: '+0.4pp OTIF (+0.1pp vs forecast) · 5h 41m', when: 'Today 14:38' },
    { title: 'Demand-surge auto-resolved',           delta: '4,200 units reallocated · cost +$1.2K',     when: '1h ago' },
    { title: 'Plan B approved with retailer brief',  delta: 'Saved 2 weeks of compliance review',        when: 'Apr 22' },
    { title: 'Cold-chain Q1 review',                 delta: 'Quarterly resolution time 3h 12m (target 4h)', when: 'Apr 1' }
  ],
  trendline: {
    /* monthly cumulative decisions automated, 12 months */
    months: ['M1','M2','M3','M4','M5','M6','M7','M8','M9','M10','M11','M12'],
    automated: [1100, 1180, 1240, 1320, 1410, 1490, 1560, 1640, 1700, 1760, 1810, 1847],
    overrides: [42, 48, 51, 55, 58, 62, 64, 68, 70, 73, 76, 78]
  }
}

/* ---------- Elicitation chat for the New-EU-Launch goal ---------- */
export const ELICITATION_CHAT = [
  { who: 'agent', text: 'Hi M. Patel. You delegated "Expand Apex Pulse to EU/UK retail in Q4." I don\'t have a default workflow for EU retail launches yet — let me build one with you.' },
  { who: 'agent', text: 'First: which markets are in scope, and do you want them sequenced or parallel?', quickReplies: ['UK + DE first, others parallel', '6 markets parallel', 'I\'ll list them'] },
  { who: 'user',  text: 'UK and DE first (week 1–4), then FR, IT, ES, NL in parallel from week 5.' },
  { who: 'agent', text: 'Got it. Capturing as constraint #1. Now KPI weighting — I see three candidates from G-LAUNCH-Q3 that likely apply: coverage, compliance cost, time-to-shelf. Carry weights forward, or re-elicit?', quickReplies: ['Carry forward', 'Re-elicit', 'Show me Q3 weights'] },
  { who: 'user',  text: 'Re-elicit. EU has different risk profile.' },
  { who: 'agent', text: 'Understood. I\'ll set up a 5-minute weighting exercise. Before that — who owns GDPR posture for this launch? I need to interview them before I can plan compliance steps.', quickReplies: ['R. Mehta', 'J. Okafor (privacy)', 'Both'] },
  { who: 'user',  text: 'R. Mehta on policy, escalate to J. Okafor for sign-off.' },
  { who: 'agent', text: 'Captured. I\'ll book 30 min with R. Mehta and draft a sign-off package for J. Okafor. Completeness now at 32% — I still need: pricing policy, retail partner mix, comms calendar. Should I continue elicitation, or pause for your review?', quickReplies: ['Continue', 'Pause for review'] }
]
