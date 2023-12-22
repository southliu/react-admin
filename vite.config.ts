import { defineConfig, loadEnv } from 'vite';
import { handleEnv } from './build/utils/helper';
import { createProxy } from './build/vite/proxy';
import { createVitePlugins } from './build/plugins';
import { buildOptions } from './build/vite/build';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const root = process.cwd();
  const env = loadEnv(mode, root);
  const viteEnv = handleEnv(env);
  const { VITE_SERVER_PORT, VITE_PROXY } = viteEnv;
    
  // 打包时获取版本信息
  const currentTimeVersion = new Date().getTime();

  return {
    plugins: createVitePlugins(currentTimeVersion),
    define: {
      // 定义全局变量
      'process.env.VITE_APP_VERSION': currentTimeVersion,
    },
    resolve: {
      alias: {
        '@': '/src',
        '#': '/types'
      }
    },
    css: {
      preprocessorOptions: {
        less: {
          javascriptEnabled: true,
          charset: false
        },
      },
    },
    server: {
      open: true,
      port: VITE_SERVER_PORT,
      // 跨域处理
      proxy: createProxy(VITE_PROXY)
    },
    build: buildOptions()
  };
});
