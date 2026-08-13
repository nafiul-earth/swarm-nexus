# GoalNexus app — design principles

1. **Method over tool.** The product is a named coordination loop (delegate → assess → decide → execute → compound), not a chain of agents.
2. **Humans own weights.** KPI weights, policy, and escalation stay human-authored. Agents do not silently override them.
3. **Mode is explicit.** Workflow when the path is known; elicitation when it is not. The UI must show which mode is active.
4. **Evidence over narrative.** Decisions, interventions, and overrides are first-class events an auditor can replay.
5. **UI is a client of the method.** This repository is the Carbon coordination surface. Runtime, mesh, and connectors live in sibling packages — do not copy them here.
6. **Docs travel with the product.** VitePress in `docs/` is previewed locally (`docs:dev` / `docs:preview`). Remote Pages is optional and later.
