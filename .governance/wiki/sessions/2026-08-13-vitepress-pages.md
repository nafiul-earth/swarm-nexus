# Session 2026-08-13 — VitePress GitHub Pages

## Ask

Add a workflow to deploy as GitHub Pages on the `gh-pages` branch.

## What shipped

- `.github/workflows/deploy-docs.yml` builds docs and force-pushes `gh-pages`
- `VP_BASE=/swarm-nexus/` in CI
- Publish guide and README updated

## Human follow-up

Enable Pages: Settings → Pages → Deploy from a branch → `gh-pages` / (root).
