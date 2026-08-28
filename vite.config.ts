import { fileURLToPath, URL } from 'node:url'

import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  server: {
    // The preview is proxied in from an external hostname. Binding to
    // localhost only, or leaving the host allowlist on, renders a blank page.
    host: true,
    allowedHosts: true,
  },
})
