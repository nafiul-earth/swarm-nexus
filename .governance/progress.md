# Progress

## 2026-08-13 — Strip vendor branding from copy and fonts

- No Watsonx strings were present in this repo.
- Kept IBM Plex as the UI font (`--gn-font-mono` / `--gn-font-sans`).
- Docs and governance no longer mention a vendor GitHub host.

## 2026-08-13 — VitePress local docs

- VitePress lives under `docs/` with `docs:dev`, `docs:build`, and `docs:preview`.
- Site `base` is `/` for local preview. No remote deploy.

### Next

When you want a public GitHub Pages site, add a workflow from the VitePress deploy guide and set `base` to `/<repo>/`.
