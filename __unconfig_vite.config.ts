
let __unconfig_data;
let __unconfig_stub = function (data = {}) { __unconfig_data = data };
__unconfig_stub.default = (data = {}) => { __unconfig_data = data };
import { defineConfig, loadEnv } from 'vite'
import { handleEnv } from './build/utils/helper'
import { createProxy } from './build/vite/proxy'
import { createVitePlugins } from './build/plugins'
import { buildOptions } from './build/vite/build'

// https://vitejs.dev/config/
const __unconfig_default =  defineConfig(({ mode }) => {
  const root = process.cwd()
  const env = loadEnv(mode, root)
  const viteEnv = handleEnv(env)
  const { VITE_SERVER_PORT, VITE_PROXY } = viteEnv

  return {
    plugins: createVitePlugins(),
    resolve: {
      alias: {
        '@': '/src',
        '#': '/types'
      }
    },
    css: {
      preprocessorOptions: {
        less: {
          javascriptEnabled: true
        },
      },
    },
    test: {
      environment: 'jsdom',
      globals: true,
      setupFiles: './tests/index.ts'
    },
    server: {
      open: true,
      port: VITE_SERVER_PORT,
      // 跨域处理
      proxy: createProxy(VITE_PROXY)
    },
    // 去除console和debugger
    esbuild: {
      pure: ["console.log", "debugger"]
    },
    build: buildOptions()
  }
})

if (typeof __unconfig_default === "function") __unconfig_default(...[{"command":"serve","mode":"development"}]);export default __unconfig_data;