import type { BuildOptions } from 'vite'

/**
 * @description 分包配置
 */
export function buildOptions(): BuildOptions {
  return {
    chunkSizeWarningLimit: 1000, // 大于1000k才警告
    rollupOptions: {
      output: {
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
        assetFileNames: 'assets/[ext]/[name]-[hash].[ext]',
        manualChunks(id) {
          if (id.includes('node_modules')) {
            // pnpm兼容
            const pnpmName = id.includes('.pnpm') ? '.pnpm/' : ''
            const fileName = `node_modules/${pnpmName}`

            return id
              .split(fileName)[1]
              .split('/')[0]
          }
        }
      }
    }
  }
}