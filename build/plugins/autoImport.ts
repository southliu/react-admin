import type { PluginOption } from 'vite';
import path from 'path';
import AutoImport from 'unplugin-auto-import/vite';

/**
 * 自动导入处理
 */
export const autoImportPlugin = (): PluginOption => {
  return AutoImport({
    dirs: [
      'src/hooks/**',
      'src/components/**',
      'src/stores/**',
      'types/**',
      'src/utils/permissions.ts',
      'src/utils/config.ts',
    ],
    imports: [
      'react',
      'react-router',
      'react-router-dom',
      'react-i18next',
      { from: 'react', imports: ['FC'], type: true },
    ],
    dts: 'types/autoImports.d.ts',
    include: [/\.[tj]sx?$/],
    resolvers: [
      (name) => {
        // 处理 @/ 开头的路径别名
        if (name.startsWith('@/')) {
          return {
            from: name.replace('@/', path.resolve(__dirname, 'src/') + '/'),
          };
        }
      },
    ],
  });
};
