# Build, preview, and publish

This repo ships a **VitePress docs site** next to the React app.

## Develop locally

```bash
npm install
npm run docs:dev
```

Opens at `http://localhost:5173`. Local `base` is `/`.

## Production preview

```bash
npm run docs:build
npm run docs:preview
```

`docs:build` writes static files to `docs/.vitepress/dist`.

| Script | What it does |
| --- | --- |
| `npm run docs:dev` | VitePress with hot reload |
| `npm run docs:build` | Static HTML in `docs/.vitepress/dist` |
| `npm run docs:preview` | Serve the built site locally |

## GitHub Pages (`gh-pages`)

Pushes to `main` run `.github/workflows/deploy-docs.yml`. That job builds the docs with `VP_BASE=/swarm-nexus/` and force-pushes the output to the `gh-pages` branch.

Enable Pages once:

1. Repo **Settings → Pages**
2. Source: **Deploy from a branch**
3. Branch: `gh-pages`, folder: `/ (root)`
4. Save

Site: `https://nafiul-earth.github.io/swarm-nexus/`

You can also run the workflow by hand from the **Actions** tab.
