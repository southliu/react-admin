
import type { PluginOption } from 'vite'
import { presetUno, presetAttributify, presetIcons } from 'unocss'
import { configPageImportPlugin } from './pages'
import { visualizer } from 'rollup-plugin-visualizer'
import react from '@vitejs/plugin-react'
import Unocss from 'unocss/vite'
import viteCompression from 'vite-plugin-compression'

export function createVitePlugins() {
  // 插件参数
  const vitePlugins: PluginOption[] = [
    react(),
    Unocss({
      presets: [
        presetUno(), 
        presetAttributify(), 
        presetIcons()
      ],
    }),
    // 包分析
    visualizer({
      gzipSize: true,
      brotliSize: true,
    }),
    // 压缩包
    viteCompression(),
    // 自动生成路由
    configPageImportPlugin(),
  ]

  return vitePlugins
}