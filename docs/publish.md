# Build and preview locally

This repo ships a **VitePress docs site** next to the React app. Run it on your machine. GitHub Pages can wait until you have a public remote.

## Develop

```bash
npm install
npm run docs:dev
```

Opens at `http://localhost:5173`.

## Production preview

```bash
npm run docs:build
npm run docs:preview
```

`docs:build` writes static files to `docs/.vitepress/dist`. `docs:preview` serves that folder so you can check the same output GitHub Pages would host later.

| Script | What it does |
| --- | --- |
| `npm run docs:dev` | VitePress with hot reload |
| `npm run docs:build` | Static HTML in `docs/.vitepress/dist` |
| `npm run docs:preview` | Serve the built site locally |

## Later: GitHub Pages

When you are ready to publish to GitHub Pages:

1. Set `base` in `docs/.vitepress/config.mjs` to `/<repo>/` for a project site, or leave `/` for a user/org site.
2. Add a GitHub Actions workflow from the [VitePress deploy guide](https://vitepress.dev/guide/deploy#github-pages).
3. In the repo: **Settings → Pages → Source → GitHub Actions**.
