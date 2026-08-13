# Capability: VitePress docs

**ID:** vitepress-docs  
**Status:** implemented (local)

## Intent

Document GoalNexus-app with VitePress and preview the static site locally. Remote GitHub Pages is deferred.

## In scope

- VitePress source under `docs/`
- `base: '/'` for local `docs:dev` / `docs:preview`
- npm scripts for dev, build, and preview

## Out of scope

- Remote issues, projects, or Pages
- Publishing the React SPA
- CI deploy workflows

## Verify

```bash
npm run docs:dev
npm run docs:build
npm run docs:preview
```
