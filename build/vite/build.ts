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

            let result = id
              .split(fileName)[1]
              .split('/')[0]

            if (result.includes('@')) {
              const first = result.indexOf('@')
              if (first > 0) {
                result = result.substring(0, first)
              } else {
                const second = result.indexOf('@', 1)
                result = result.substring(0, second)
              }
            }

            return result
          }
        }
      }
    }
  }
}