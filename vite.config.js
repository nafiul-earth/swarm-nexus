import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5174,
    host: true
  },
  // For deployment under a subpath, set base. Leave '/' for root deploy.
  base: '/'
})
