import { defineConfig } from 'vitepress'

// Local preview uses '/'. GitHub Pages project site uses '/swarm-nexus/'.
const base = process.env.VP_BASE || '/'

export default defineConfig({
  title: 'GoalNexus',
  description: 'Business coordination runtime — delegate, assess, decide, execute, compound.',
  appearance: 'dark',
  cleanUrls: true,
  lastUpdated: true,
  ignoreDeadLinks: true,
  base,
  head: [
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' }],
    ['meta', { name: 'theme-color', content: '#0B1220' }]
  ],
  themeConfig: {
    siteTitle: 'GoalNexus',
    nav: [
      { text: 'Guide', link: '/guide/getting-started' },
      { text: 'Screens', link: '/guide/screens' },
      { text: 'Architecture', link: '/architecture' },
      { text: 'Publish', link: '/publish' }
    ],
    sidebar: [
      {
        text: 'Start',
        items: [
          { text: 'Overview', link: '/' },
          { text: 'Getting started', link: '/guide/getting-started' },
          { text: 'Screens', link: '/guide/screens' }
        ]
      },
      {
        text: 'Build',
        items: [
          { text: 'Architecture', link: '/architecture' },
          { text: 'Publish to GitHub Pages', link: '/publish' }
        ]
      }
    ],
    search: { provider: 'local' },
    outline: { level: [2, 3], label: 'On this page' },
    footer: {
      message: 'GoalNexus — a method for business coordination, expressed as a runtime.'
    }
  }
})
