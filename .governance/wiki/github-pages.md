# VitePress GitHub Pages

GoalNexus-app documentation is a VitePress site. CI publishes it to the `gh-pages` branch.

| Item | Value |
| --- | --- |
| Source | `docs/` |
| Config | `docs/.vitepress/config.mjs` |
| Dev | `npm run docs:dev` → `http://localhost:5173` |
| Build | `npm run docs:build` → `docs/.vitepress/dist` |
| Workflow | `.github/workflows/deploy-docs.yml` |
| Branch | `gh-pages` (orphan, force-pushed) |
| URL | `https://nafiul-earth.github.io/swarm-nexus/` |
| `base` locally | `/` |
| `base` in CI | `/swarm-nexus/` via `VP_BASE` |

Enable Pages from the `gh-pages` branch after the first green workflow. Steps: `docs/publish.md`.
