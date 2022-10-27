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

            // echarts分包
            if (id.includes('echarts')) {
              const libName = id.includes('/lib/') ? 'lib/' : ''

              return 'echarts_' + id
                .split(`/echarts/${libName}`)[1]
                .split('/')[0]
            }

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