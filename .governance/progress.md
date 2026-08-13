# Progress

## 2026-08-13 — GitHub Pages via gh-pages

- Added `.github/workflows/deploy-docs.yml`: build VitePress and force-push `docs/.vitepress/dist` to `gh-pages`.
- CI sets `VP_BASE=/swarm-nexus/` for `https://nafiul-earth.github.io/swarm-nexus/`.
- Local `docs:dev` still uses `base: '/'`.

### Remaining (human)

Repo **Settings → Pages → Deploy from a branch → `gh-pages` / (root)** after the first green workflow.

## 2026-08-13 — Strip vendor branding from copy and fonts

- No Watsonx strings were present in this repo.
- Kept IBM Plex as the UI font (`--gn-font-mono` / `--gn-font-sans`).

## 2026-08-13 — VitePress local docs

- VitePress lives under `docs/` with `docs:dev`, `docs:build`, and `docs:preview`.
