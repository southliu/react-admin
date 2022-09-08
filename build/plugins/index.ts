
import type { PluginOption } from 'vite'
import { presetUno, presetAttributify, presetIcons } from 'unocss'
import Unocss from 'unocss/vite'
import react from '@vitejs/plugin-react'
import WindiCSS from 'vite-plugin-windicss'
import Pages from 'vite-plugin-pages'

export function createVitePlugins() {
  // 插件参数
  const vitePlugins: PluginOption[] = [
    react(),
    WindiCSS(),
    Pages({
      resolver: 'react',
      importMode: 'async',
      exclude: [
        '**/components/**/*',
        '**/tests/**/*',
        '**/__test__/**/*'
      ]
    }),
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