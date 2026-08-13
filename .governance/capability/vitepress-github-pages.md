# Capability: VitePress GitHub Pages

**ID:** vitepress-github-pages  
**Status:** implemented

## Intent

Document GoalNexus-app with VitePress and publish the static site to GitHub Pages from the `gh-pages` branch.

## In scope

- VitePress source under `docs/`
- `base: '/'` locally; `VP_BASE=/swarm-nexus/` in CI
- npm scripts for dev, build, and preview
- GitHub Actions deploy to `gh-pages`

## Out of scope

- Publishing the React SPA
- GitHub Actions Pages source (artifact + `deploy-pages`); this repo uses the branch source

## Design

The workflow builds only VitePress (`npm run docs:build`) and publishes the dist tree as an orphan `gh-pages` branch. `.nojekyll` is included so GitHub does not ignore underscored VitePress assets.

## Verify

```bash
npm run docs:build
npm run docs:preview
```
