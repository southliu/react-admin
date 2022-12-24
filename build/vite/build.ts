import type { BuildOptions } from 'vite'

/**
 * @description 分包配置
 */
export function buildOptions(): BuildOptions {
  return {
    chunkSizeWarningLimit: 1000, // 大于1000k才警告
    rollupOptions: {
      output: {
        chunkFileNames: 'assets/js/[name].[hash].js',
        entryFileNames: 'assets/js/[name].[hash].js',
        assetFileNames: 'assets/[ext]/[name].[hash].[ext]',
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

          // 公共组件
          if (id.includes('/src/components/')) {
            const fileName = '/src/components/'

            const result = id
              .split(fileName)[1]
              .split('/')[0]

            return `components_${result}`
          }

          // 页面分包
          if (id.includes('/src/pages/')) {
            const fileName = '/src/pages/'

            const file = id.split(fileName)[1]
            const categorize = file?.split('/')?.[0] || ''
            let result = file?.split('/')?.[1] || 'index'

            if (result.includes('/')) result = result?.split('/')[0] || ''
            if (result.includes('.tsx')) result = result.substring(0, result.length - 4)

            // 组件
            if (result === 'components' || result === 'component') {
              let compName = '/components/'
              if (id.includes('/component/')) compName = '/component/'

              let comResult = id.split(compName)[1]
              if (comResult.includes('/')) comResult = comResult?.split('/')[0] || ''
              if (comResult.includes('.tsx')) comResult = comResult.substring(0, comResult.length - 4)

              return `page_${categorize}_comp_${comResult}`
            }

            return `page_${categorize}_${result}`
          }
        }
      }
    }
  }
}