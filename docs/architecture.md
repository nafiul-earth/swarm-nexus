# Architecture

GoalNexus-app is a single-page Carbon React client. There is no backend in this repository; pages read from `src/data/mock.js`.

```
Browser
  └─ Vite (React)
       ├─ AppShell     Carbon Header + SideNav
       ├─ Routes       Today, Executive, Goals, Delegate, Live, Plans, …
       └─ mock data    Two scenarios, inbox, goals, KPIs, plans, decisions
```

## Stack

| Layer | Choice |
| --- | --- |
| UI | `@carbon/react` + `@carbon/icons-react`, theme `g100` |
| Routing | `react-router-dom` (`BrowserRouter`) |
| Bundler | Vite 5 + `@vitejs/plugin-react` |
| Styles | `src/styles.scss` on top of Carbon |
| Docs | VitePress 1.x, published to GitHub Pages |

## Method mapping

The product is a **method** expressed as a runtime, not a chain of agents:

| Stage | Actor | App surface |
| --- | --- | --- |
| Delegate | Human | Delegate, Goals |
| Assess | Mode-aware agent | Goals, Live |
| Decide | Mesh + policy | Plans, Decisions |
| Execute | Human-in-the-loop | Live, Replay |
| Compound | Knowledge | Knowledge, Eval |

## What this repo does not include

- Agent runtime, mesh, or policy engine
- Auth, tenancy, or live connectors
- API contracts with other GoalNexus packages

Those belong in sibling repositories. This app is the coordination UI and the demo surface for the method.
