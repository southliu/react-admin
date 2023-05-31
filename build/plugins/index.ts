import type { PluginOption } from 'vite';
import { presetUno, presetAttributify, presetIcons } from 'unocss';
import { visualizer } from 'rollup-plugin-visualizer';
import { preloadPlugin } from './preload';
import { timePlugin } from './time';
import react from '@vitejs/plugin-react-swc';
import legacy from '@vitejs/plugin-legacy';
import unocss from 'unocss/vite';
import viteCompression from 'vite-plugin-compression';

export function createVitePlugins() {
  // 插件参数
  const vitePlugins: PluginOption[] = [
    react(),
    unocss({
      presets: [
        presetUno(), 
        presetAttributify(), 
        presetIcons()
      ],
    })
  ];

  if (process.env.NODE_ENV === 'production') {
    // 包分析
    visualizer({
      gzipSize: true,
      brotliSize: true,
    }),
    // 兼容低版本
    legacy({
      targets: [ 
          'Android > 39', 
          'Chrome >= 60', 
          'Safari >= 10.1', 
          'iOS >= 10.3', 
          'Firefox >= 54', 
          'Edge >= 15', 
        ], 
        additionalLegacyPolyfills: ['regenerator-runtime/runtime'],
    }),
    // 打包时间
    timePlugin(),
    // 预加载处理
    vitePlugins.push(preloadPlugin());
    // 压缩包
    vitePlugins.push(viteCompression());
  }

  return vitePlugins;
}
