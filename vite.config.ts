import { defineConfig } from 'vite'
import { createVitePlugins } from './build/plugins'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: createVitePlugins(),
  resolve: {
    alias: {
      '@': '/src',
      '#': '/types'
    }
  },
  server: {
    open: true
  }
})
