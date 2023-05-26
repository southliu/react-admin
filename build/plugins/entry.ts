import type { PluginOption } from 'vite';
import { handleEntry } from '../utils/helper';

/**
 * 打包后入口文件处理
 */
export const entryPlugin = (): PluginOption => {
  return {
    name: 'vite-build-entry',
    transformIndexHtml: (html: string) => {
      const [newHtml, code] = handleEntry(html, 'index.');
      if (code) {
        html = newHtml;
        html.replace('</head>', `\n${code}\n</head>`);
      }

      return html;
    }
  };
};