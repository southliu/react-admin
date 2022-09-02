
import type { PluginOption } from 'vite'
import { presetUno, presetAttributify, presetIcons } from 'unocss'
import Unocss from 'unocss/vite'
import react from '@vitejs/plugin-react'
import windiCSS from 'vite-plugin-windicss'

export function createVitePlugins() {
  // 插件参数
  const vitePlugins: (PluginOption[])[] = [
    react(),
    windiCSS(),
    Unocss({
      presets: [
        presetUno(), 
        presetAttributify(), 
        presetIcons()
      ],
    }),
  ]

  return vitePlugins
}