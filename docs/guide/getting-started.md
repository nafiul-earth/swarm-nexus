# Getting started

GoalNexus is a Carbon React app for **business coordination**. This VitePress site documents the app. Run it locally with `npm run docs:dev`.

## Prerequisites

- Node.js 20 or later
- npm 10 or later

## Run the app locally

```bash
npm install
npm run dev
```

The app starts at `http://localhost:5174`. It currently uses mock scenarios from `src/data/mock.js`:

1. **Supply chain** — Lost-Shipment Recovery (known workflow)
2. **Cross-team launch** — product launch coordination (elicitation until enough context exists)

## Run this documentation locally

```bash
npm run docs:dev
```

VitePress serves the docs at `http://localhost:5173`.

| Script | What it does |
| --- | --- |
| `npm run dev` | Vite + React app |
| `npm run build` | Production build of the React app |
| `npm run docs:dev` | VitePress docs with hot reload |
| `npm run docs:build` | Static HTML in `docs/.vitepress/dist` |
| `npm run docs:preview` | Serve the built docs locally |

## Project layout

```
goalnexus-app/
  src/                 React app (Carbon UI, mock data, routes)
  docs/                VitePress source (this site)
  docs/.vitepress/     VitePress config and theme
```
