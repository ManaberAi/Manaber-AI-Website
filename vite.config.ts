import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'

// Port is allocated per-project/per-worktree by the platform.
// `.biela/ports.mjs` is not present in this workspace yet, so we read PORT from
// the environment instead of hardcoding a literal. Swap to `readPorts()` once
// the shim exists.
const port = process.env.PORT ? Number(process.env.PORT) : undefined

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    host: true,
    port,
    allowedHosts: true,
  },
})
