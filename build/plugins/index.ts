
import type { PluginOption } from 'vite'
import { presetUno, presetAttributify, presetIcons } from 'unocss'
import { configPageImportPlugin } from './pages'
import Unocss from 'unocss/vite'
import react from '@vitejs/plugin-react'
import WindiCSS from 'vite-plugin-windicss'

export function createVitePlugins() {
  // 插件参数
  const vitePlugins: PluginOption[] = [
    react(),
    WindiCSS(),
    Unocss({
      presets: [
        presetUno(), 
        presetAttributify(), 
        presetIcons()
      ],
    }),
    // 自动生成路由
    configPageImportPlugin(),
  ]

  return vitePlugins
}