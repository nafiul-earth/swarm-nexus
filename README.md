# SwarmNexus

SwarmNexus is a **business coordination** runtime — not a chatbot, and not a chain of agents in a row.

Most agent demos sell a tool: pick a model, wire a few agents, hope the handoffs hold. Real work does not run that way. A product launch, a lost shipment, a policy conflict — those need a **method**: an explicit goal, a mode (known workflow vs still eliciting), a scored plan, a human who can override, and a trail an auditor can replay.

SwarmNexus is that method, expressed as a UI:

**Delegate → Assess → Decide → Execute → Compound**

| Stage | What happens |
| --- | --- |
| **Delegate** | A human sets the outcome, deadline, and weighted trade-offs (time, risk, cost, brand). Agents do not silently override those weights. |
| **Assess** | If the path is known, run the workflow. If it is not, switch to elicitation until policy, KPIs, and constraints are captured. |
| **Decide** | Plans are scored against the human’s KPI weights. Conflicts are suppressed, merged, or escalated — and logged. |
| **Execute** | The chosen plan runs while you watch, intervene, redirect, or override. Every intervention is a first-class event. |
| **Compound** | What was learned (policy, SME input, eval) feeds the next delegation. |

This repository is the **Carbon React demo client** for that loop. There is no backend here. Screens are driven by mock scenarios in `src/data/mock.js` so you can walk the method without standing up a mesh or policy engine.

## What you can see in the demo

Two scenarios drive every page (toggle them on **Today**):

1. **Supply chain — Lost-Shipment Recovery**  
   A specialised, known process: Detect → Diagnose → Reroute → Notify. Runs as a workflow unless context becomes ambiguous.

2. **Cross-team product launch**  
   A generic process with no fixed workflow. The agent interviews for goals, KPIs, policies, and stakeholders until it has enough to execute.

| Screen | Purpose |
| --- | --- |
| Today | Inbox of agent asks, goal status, KPIs weighted by your goals |
| Executive | Outcome tiles and a leadership snapshot |
| Goals | Delegated outcomes, mode (workflow vs elicitation), blockers |
| Delegate | Hand an outcome to an agent; elicitation until completeness |
| Live work | In-flight work, interventions, and agent activity |
| Plans | Generated plans scored against your KPI weights |
| Knowledge | Captured policy, SME input, compounding context |
| Decisions | Arbitration log — which rule resolved each conflict |
| Replay & audit | Timeline including human overrides |
| Trust & eval | Confidence, eval scores, and where the method still needs you |

## What this repo is not

- Not an agent runtime, mesh, or policy engine
- Not auth, tenancy, or live connectors
- Not production data — the demo is illustrative

Those belong beside this UI. This app is the coordination surface and the walkthrough of the method.

## Run the app

```bash
npm install
npm run dev
```

Opens at [http://localhost:5174](http://localhost:5174). Node.js 20+ recommended.

## Docs

VitePress lives in `docs/`. Site: [https://nafiul-earth.github.io/swarm-nexus/](https://nafiul-earth.github.io/swarm-nexus/)

```bash
npm run docs:dev      # http://localhost:5173
npm run docs:build
npm run docs:preview
```

Pushes to `main` build the docs and publish them to the `gh-pages` branch. Enable Pages once: **Settings → Pages → Deploy from a branch → `gh-pages` / (root)**. Details: [docs/publish.md](docs/publish.md).
