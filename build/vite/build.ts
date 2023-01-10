import type { BuildOptions } from 'vite'
import {
  splitJSModules,
  splitPage
} from '../utils'
import {
  COMP_PATH,
  COMP_PREFIX,
  LAYOUTS_PATH,
  LAYOUTS_NAME,
  PAGES_PATH
} from '../config'

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
          // JS模块
          if (id.includes('node_modules')) {
            return splitJSModules(id)
          }

          // 布局
          if (id.includes(LAYOUTS_PATH)) {
            return LAYOUTS_NAME
          }

          // 公共组件
          if (id.includes(COMP_PATH)) {
            const result = id
              .split(COMP_PATH)[1]
              .split('/')[0]

            return `${COMP_PREFIX}${result}`
          }

          // 页面分包
          if (id.includes(PAGES_PATH)) {
            return splitPage(id)
          }
        }
      }
    },
  }
}