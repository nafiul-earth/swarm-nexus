# Screens

The Carbon shell in `src/AppShell.jsx` is the navigation for the runtime. Routes live in `src/App.jsx`.

| Route | Screen | What you see |
| --- | --- | --- |
| `/` | Today | Inbox of agent asks, goal status, KPIs weighted by your goals |
| `/exec` | Executive view | Outcome tiles, deltas, and a leadership snapshot |
| `/goals` | Goals | Delegated outcomes, mode (workflow vs elicitation), blockers |
| `/delegate` | Delegate | Hand an outcome to an agent; elicitation interview until completeness |
| `/live` | Live work | In-flight work, interventions, and agent activity |
| `/plans` | Plans | Generated plans scored against your KPI weights |
| `/knowledge` | Knowledge | Captured policy, SME input, and compounding context |
| `/decisions` | Decisions | Arbitration log — what rule resolved each conflict |
| `/replay` | Replay & audit | Timeline an auditor can read, including human overrides |
| `/eval` | Trust & eval | Confidence, eval scores, and where the method still needs you |

Two scenarios drive every page. Switch them on Today with the scenario tags.

**Specialised · Supply chain** — Lost-Shipment Recovery. Detect → Diagnose → Reroute → Notify. Runs in workflow mode unless context becomes ambiguous.

**Generic · Cross-team coordination** — product launch. No fixed workflow. The agent elicits goals, KPIs, policies, and stakeholder constraints before it can execute.
