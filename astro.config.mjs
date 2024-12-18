import { defineConfig } from 'astro/config'
import tailwind from '@astrojs/tailwind'
import react from '@astrojs/react'
import node from '@astrojs/node'
import db from '@astrojs/db'

export default defineConfig({
  integrations: [react(), tailwind(), db()],
  output: 'server',
  adapter: node({
    mode: 'standalone'
  }),
  server: { port: 3000, host: true },
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          api: 'modern-compiler'
        }
      }
    }
  },
  security: {
    checkOrigin: true
  }
})