// vite.config.ts
import { defineConfig, loadEnv } from "vite";

// build/utils.ts
function handleEnv(envConfigs) {
  const {
    VITE_SERVER_PORT,
    VITE_PROXY
  } = envConfigs;
  const proxy = VITE_PROXY ? JSON.parse(VITE_PROXY.replace(/'/g, '"')) : [];
  const res = {
    VITE_SERVER_PORT: Number(VITE_SERVER_PORT) || 8080,
    VITE_PROXY: proxy
  };
  return res;
}

// build/vite/proxy.ts
function createProxy(list = []) {
  const res = {};
  for (const [prefix, target] of list) {
    res[`^${prefix}`] = {
      target,
      changeOrigin: true,
      rewrite: (path) => path.replace(new RegExp(`^${prefix}`), "")
    };
  }
  return res;
}

// build/plugins/index.ts
import { presetUno, presetAttributify, presetIcons } from "unocss";

// build/plugins/pages.ts
import Pages from "vite-plugin-pages";
function configPageImportPlugin() {
  return [
    Pages({
      resolver: "react",
      importMode: "sync",
      routeStyle: "next",
      extensions: ["tsx", "jsx"],
      exclude: [
        "**/components/**/*",
        "**/utils/**/*",
        "**/lib/**/*",
        "**/hooks/**/*",
        "**/model.tsx",
        "**/tests/**/*",
        "**/__test__/**/*"
      ]
    })
  ];
}

// build/plugins/index.ts
import { visualizer } from "rollup-plugin-visualizer";
import react from "@vitejs/plugin-react";
import Unocss from "unocss/vite";
import viteCompression from "vite-plugin-compression";
function createVitePlugins() {
  const vitePlugins = [
    react(),
    Unocss({
      presets: [
        presetUno(),
        presetAttributify(),
        presetIcons()
      ]
    }),
    visualizer({
      gzipSize: true,
      brotliSize: true
    }),
    viteCompression(),
    configPageImportPlugin()
  ];
  return vitePlugins;
}

// build/vite/build.ts
function buildOptions() {
  return {
    chunkSizeWarningLimit: 1e3,
    rollupOptions: {
      output: {
        chunkFileNames: "assets/js/[name]-[hash].js",
        entryFileNames: "assets/js/[name]-[hash].js",
        assetFileNames: "assets/[ext]/[name]-[hash].[ext]",
        manualChunks(id) {
          if (id.includes("node_modules")) {
            const pnpmName = id.includes(".pnpm") ? ".pnpm/" : "";
            const fileName = `node_modules/${pnpmName}`;
            return id.split(fileName)[1].split("/")[0];
          }
        }
      }
    }
  };
}

// vite.config.ts
var vite_config_default = defineConfig(({ mode }) => {
  const root = process.cwd();
  const env = loadEnv(mode, root);
  const viteEnv = handleEnv(env);
  const { VITE_SERVER_PORT, VITE_PROXY } = viteEnv;
  return {
    plugins: createVitePlugins(),
    resolve: {
      alias: {
        "@": "/src",
        "#": "/types"
      }
    },
    css: {
      preprocessorOptions: {
        less: {
          javascriptEnabled: true
        }
      }
    },
    server: {
      open: true,
      port: VITE_SERVER_PORT,
      proxy: createProxy(VITE_PROXY)
    },
    esbuild: {
      pure: ["console.log", "debugger"]
    },
    build: buildOptions()
  };
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiLCAiYnVpbGQvdXRpbHMudHMiLCAiYnVpbGQvdml0ZS9wcm94eS50cyIsICJidWlsZC9wbHVnaW5zL2luZGV4LnRzIiwgImJ1aWxkL3BsdWdpbnMvcGFnZXMudHMiLCAiYnVpbGQvdml0ZS9idWlsZC50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIkQ6XFxcXGNhc2VcXFxccmVhY3QtYWRtaW5cIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkQ6XFxcXGNhc2VcXFxccmVhY3QtYWRtaW5cXFxcdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0Q6L2Nhc2UvcmVhY3QtYWRtaW4vdml0ZS5jb25maWcudHNcIjtpbXBvcnQgeyBkZWZpbmVDb25maWcsIGxvYWRFbnYgfSBmcm9tICd2aXRlJ1xuaW1wb3J0IHsgaGFuZGxlRW52IH0gZnJvbSAnLi9idWlsZC91dGlscydcbmltcG9ydCB7IGNyZWF0ZVByb3h5IH0gZnJvbSAnLi9idWlsZC92aXRlL3Byb3h5J1xuaW1wb3J0IHsgY3JlYXRlVml0ZVBsdWdpbnMgfSBmcm9tICcuL2J1aWxkL3BsdWdpbnMnXG5pbXBvcnQgeyBidWlsZE9wdGlvbnMgfSBmcm9tICcuL2J1aWxkL3ZpdGUvYnVpbGQnXG5cbi8vIGh0dHBzOi8vdml0ZWpzLmRldi9jb25maWcvXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoKHsgbW9kZSB9KSA9PiB7XG4gIGNvbnN0IHJvb3QgPSBwcm9jZXNzLmN3ZCgpXG4gIGNvbnN0IGVudiA9IGxvYWRFbnYobW9kZSwgcm9vdClcbiAgY29uc3Qgdml0ZUVudiA9IGhhbmRsZUVudihlbnYpXG4gIGNvbnN0IHsgVklURV9TRVJWRVJfUE9SVCwgVklURV9QUk9YWSB9ID0gdml0ZUVudlxuXG4gIHJldHVybiB7XG4gICAgcGx1Z2luczogY3JlYXRlVml0ZVBsdWdpbnMoKSxcbiAgICByZXNvbHZlOiB7XG4gICAgICBhbGlhczoge1xuICAgICAgICAnQCc6ICcvc3JjJyxcbiAgICAgICAgJyMnOiAnL3R5cGVzJyxcbiAgICAgICAgLy8gbW9tZW50XHU2NTM5XHU0RTNBZGF5anNcbiAgICAgICAgLy8gJ3JjLXBpY2tlci9lcy9nZW5lcmF0ZS9tb21lbnQnOiAncmMtcGlja2VyL2VzL2dlbmVyYXRlL2RheWpzJ1xuICAgICAgfVxuICAgIH0sXG4gICAgY3NzOiB7XG4gICAgICBwcmVwcm9jZXNzb3JPcHRpb25zOiB7XG4gICAgICAgIGxlc3M6IHtcbiAgICAgICAgICBqYXZhc2NyaXB0RW5hYmxlZDogdHJ1ZVxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICB9LFxuICAgIHNlcnZlcjoge1xuICAgICAgb3BlbjogdHJ1ZSxcbiAgICAgIHBvcnQ6IFZJVEVfU0VSVkVSX1BPUlQsXG4gICAgICAvLyBcdThERThcdTU3REZcdTU5MDRcdTc0MDZcbiAgICAgIHByb3h5OiBjcmVhdGVQcm94eShWSVRFX1BST1hZKVxuICAgIH0sXG4gICAgLy8gXHU1M0JCXHU5NjY0Y29uc29sZVx1NTQ4Q2RlYnVnZ2VyXG4gICAgZXNidWlsZDoge1xuICAgICAgcHVyZTogW1wiY29uc29sZS5sb2dcIiwgXCJkZWJ1Z2dlclwiXVxuICAgIH0sXG4gICAgYnVpbGQ6IGJ1aWxkT3B0aW9ucygpXG4gIH1cbn0pXG4iLCAiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIkQ6XFxcXGNhc2VcXFxccmVhY3QtYWRtaW5cXFxcYnVpbGRcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkQ6XFxcXGNhc2VcXFxccmVhY3QtYWRtaW5cXFxcYnVpbGRcXFxcdXRpbHMudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0Q6L2Nhc2UvcmVhY3QtYWRtaW4vYnVpbGQvdXRpbHMudHNcIjt0eXBlIElFbnZDb25maWdzID0gUmVjb3JkPHN0cmluZywgc3RyaW5nPlxyXG5cclxuLy8gZW52XHU2NTcwXHU2MzZFXHJcbmludGVyZmFjZSBJVml0ZUVudiB7XHJcbiAgVklURV9TRVJWRVJfUE9SVDogbnVtYmVyO1xyXG4gIFZJVEVfUFJPWFk6IFtzdHJpbmcsIHN0cmluZ11bXTtcclxufVxyXG5cclxuLyoqXHJcbiAqIFx1NTkwNFx1NzQwNlx1OEY2Q1x1NTMxNmVudlxyXG4gKiBAcGFyYW0gZW52Q29uZmlncyBcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBoYW5kbGVFbnYoZW52Q29uZmlnczogSUVudkNvbmZpZ3MpOiBJVml0ZUVudiB7XHJcbiAgY29uc3Qge1xyXG4gICAgVklURV9TRVJWRVJfUE9SVCxcclxuICAgIFZJVEVfUFJPWFlcclxuICB9ID0gZW52Q29uZmlnc1xyXG5cclxuICBjb25zdCBwcm94eTogW3N0cmluZywgc3RyaW5nXVtdID0gVklURV9QUk9YWSA/IEpTT04ucGFyc2UoVklURV9QUk9YWS5yZXBsYWNlKC8nL2csICdcIicpKSA6IFtdXHJcblxyXG4gIGNvbnN0IHJlczogSVZpdGVFbnYgPSB7XHJcbiAgICBWSVRFX1NFUlZFUl9QT1JUOiBOdW1iZXIoVklURV9TRVJWRVJfUE9SVCkgfHwgODA4MCxcclxuICAgIFZJVEVfUFJPWFk6IHByb3h5XHJcbiAgfVxyXG5cclxuICByZXR1cm4gcmVzXHJcbn0iLCAiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIkQ6XFxcXGNhc2VcXFxccmVhY3QtYWRtaW5cXFxcYnVpbGRcXFxcdml0ZVwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiRDpcXFxcY2FzZVxcXFxyZWFjdC1hZG1pblxcXFxidWlsZFxcXFx2aXRlXFxcXHByb3h5LnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9EOi9jYXNlL3JlYWN0LWFkbWluL2J1aWxkL3ZpdGUvcHJveHkudHNcIjtpbXBvcnQgdHlwZSB7IFByb3h5T3B0aW9ucyB9IGZyb20gXCJ2aXRlXCJcclxuXHJcbnR5cGUgUHJveHlMaXN0ID0gW3N0cmluZywgc3RyaW5nXVtdXHJcblxyXG50eXBlIFByb3h5VGFyZ2V0TGlzdCA9IFJlY29yZDxzdHJpbmcsIFByb3h5T3B0aW9ucz5cclxuXHJcbi8qKlxyXG4gKiBcdTUyMUJcdTVFRkFcdThERThcdTU3REZcclxuICogQHBhcmFtIGxpc3QgLSBcdTRFOENcdTdFRjRcdTY1NzBcdTdFQzRcdTUzQzJcdTY1NzBcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVQcm94eShsaXN0OiBQcm94eUxpc3QgPSBbXSkge1xyXG4gIGNvbnN0IHJlczogUHJveHlUYXJnZXRMaXN0ID0ge31cclxuICBcclxuICBmb3IgKGNvbnN0IFtwcmVmaXgsIHRhcmdldF0gb2YgbGlzdCkge1xyXG4gICAgcmVzW2BeJHtwcmVmaXh9YF0gPSB7XHJcbiAgICAgIHRhcmdldCxcclxuICAgICAgY2hhbmdlT3JpZ2luOiB0cnVlLFxyXG4gICAgICByZXdyaXRlOiBwYXRoID0+IHBhdGgucmVwbGFjZShuZXcgUmVnRXhwKGBeJHtwcmVmaXh9YCksICcnKSxcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHJldHVybiByZXNcclxufSIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiRDpcXFxcY2FzZVxcXFxyZWFjdC1hZG1pblxcXFxidWlsZFxcXFxwbHVnaW5zXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJEOlxcXFxjYXNlXFxcXHJlYWN0LWFkbWluXFxcXGJ1aWxkXFxcXHBsdWdpbnNcXFxcaW5kZXgudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0Q6L2Nhc2UvcmVhY3QtYWRtaW4vYnVpbGQvcGx1Z2lucy9pbmRleC50c1wiO1xyXG5pbXBvcnQgdHlwZSB7IFBsdWdpbk9wdGlvbiB9IGZyb20gJ3ZpdGUnXHJcbmltcG9ydCB7IHByZXNldFVubywgcHJlc2V0QXR0cmlidXRpZnksIHByZXNldEljb25zIH0gZnJvbSAndW5vY3NzJ1xyXG5pbXBvcnQgeyBjb25maWdQYWdlSW1wb3J0UGx1Z2luIH0gZnJvbSAnLi9wYWdlcydcclxuaW1wb3J0IHsgdmlzdWFsaXplciB9IGZyb20gJ3JvbGx1cC1wbHVnaW4tdmlzdWFsaXplcidcclxuaW1wb3J0IHJlYWN0IGZyb20gJ0B2aXRlanMvcGx1Z2luLXJlYWN0J1xyXG5pbXBvcnQgVW5vY3NzIGZyb20gJ3Vub2Nzcy92aXRlJ1xyXG5pbXBvcnQgdml0ZUNvbXByZXNzaW9uIGZyb20gJ3ZpdGUtcGx1Z2luLWNvbXByZXNzaW9uJ1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVZpdGVQbHVnaW5zKCkge1xyXG4gIC8vIFx1NjNEMlx1NEVGNlx1NTNDMlx1NjU3MFxyXG4gIGNvbnN0IHZpdGVQbHVnaW5zOiBQbHVnaW5PcHRpb25bXSA9IFtcclxuICAgIHJlYWN0KCksXHJcbiAgICBVbm9jc3Moe1xyXG4gICAgICBwcmVzZXRzOiBbXHJcbiAgICAgICAgcHJlc2V0VW5vKCksIFxyXG4gICAgICAgIHByZXNldEF0dHJpYnV0aWZ5KCksIFxyXG4gICAgICAgIHByZXNldEljb25zKClcclxuICAgICAgXSxcclxuICAgIH0pLFxyXG4gICAgLy8gXHU1MzA1XHU1MjA2XHU2NzkwXHJcbiAgICB2aXN1YWxpemVyKHtcclxuICAgICAgZ3ppcFNpemU6IHRydWUsXHJcbiAgICAgIGJyb3RsaVNpemU6IHRydWUsXHJcbiAgICB9KSxcclxuICAgIC8vIFx1NTM4Qlx1N0YyOVx1NTMwNVxyXG4gICAgdml0ZUNvbXByZXNzaW9uKCksXHJcbiAgICAvLyBcdTgxRUFcdTUyQThcdTc1MUZcdTYyMTBcdThERUZcdTc1MzFcclxuICAgIGNvbmZpZ1BhZ2VJbXBvcnRQbHVnaW4oKSxcclxuICBdXHJcblxyXG4gIHJldHVybiB2aXRlUGx1Z2luc1xyXG59IiwgImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFxjYXNlXFxcXHJlYWN0LWFkbWluXFxcXGJ1aWxkXFxcXHBsdWdpbnNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkQ6XFxcXGNhc2VcXFxccmVhY3QtYWRtaW5cXFxcYnVpbGRcXFxccGx1Z2luc1xcXFxwYWdlcy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vRDovY2FzZS9yZWFjdC1hZG1pbi9idWlsZC9wbHVnaW5zL3BhZ2VzLnRzXCI7aW1wb3J0IFBhZ2VzIGZyb20gJ3ZpdGUtcGx1Z2luLXBhZ2VzJ1xyXG5cclxuLyoqXHJcbiAqIEBkZXNjcmlwdGlvbiBcdTgxRUFcdTUyQThcdTc1MUZcdTYyMTBcdThERUZcdTc1MzFcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBjb25maWdQYWdlSW1wb3J0UGx1Z2luKCkge1xyXG4gIHJldHVybiBbXHJcbiAgICBQYWdlcyh7XHJcbiAgICAgIHJlc29sdmVyOiAncmVhY3QnLFxyXG4gICAgICBpbXBvcnRNb2RlOiAnc3luYycsXHJcbiAgICAgIHJvdXRlU3R5bGU6ICduZXh0JyxcclxuICAgICAgZXh0ZW5zaW9uczogWyd0c3gnLCAnanN4J10sXHJcbiAgICAgIGV4Y2x1ZGU6IFtcclxuICAgICAgICAnKiovY29tcG9uZW50cy8qKi8qJyxcclxuICAgICAgICAnKiovdXRpbHMvKiovKicsXHJcbiAgICAgICAgJyoqL2xpYi8qKi8qJyxcclxuICAgICAgICAnKiovaG9va3MvKiovKicsXHJcbiAgICAgICAgJyoqL21vZGVsLnRzeCcsXHJcbiAgICAgICAgJyoqL3Rlc3RzLyoqLyonLFxyXG4gICAgICAgICcqKi9fX3Rlc3RfXy8qKi8qJ1xyXG4gICAgICBdLFxyXG4gICAgfSlcclxuICBdXHJcbn0iLCAiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIkQ6XFxcXGNhc2VcXFxccmVhY3QtYWRtaW5cXFxcYnVpbGRcXFxcdml0ZVwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiRDpcXFxcY2FzZVxcXFxyZWFjdC1hZG1pblxcXFxidWlsZFxcXFx2aXRlXFxcXGJ1aWxkLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9EOi9jYXNlL3JlYWN0LWFkbWluL2J1aWxkL3ZpdGUvYnVpbGQudHNcIjtpbXBvcnQgdHlwZSB7IEJ1aWxkT3B0aW9ucyB9IGZyb20gJ3ZpdGUnXHJcblxyXG4vKipcclxuICogQGRlc2NyaXB0aW9uIFx1NTIwNlx1NTMwNVx1OTE0RFx1N0Y2RVxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGJ1aWxkT3B0aW9ucygpOiBCdWlsZE9wdGlvbnMge1xyXG4gIHJldHVybiB7XHJcbiAgICBjaHVua1NpemVXYXJuaW5nTGltaXQ6IDEwMDAsIC8vIFx1NTkyN1x1NEU4RTEwMDBrXHU2MjREXHU4QjY2XHU1NDRBXHJcbiAgICByb2xsdXBPcHRpb25zOiB7XHJcbiAgICAgIG91dHB1dDoge1xyXG4gICAgICAgIGNodW5rRmlsZU5hbWVzOiAnYXNzZXRzL2pzL1tuYW1lXS1baGFzaF0uanMnLFxyXG4gICAgICAgIGVudHJ5RmlsZU5hbWVzOiAnYXNzZXRzL2pzL1tuYW1lXS1baGFzaF0uanMnLFxyXG4gICAgICAgIGFzc2V0RmlsZU5hbWVzOiAnYXNzZXRzL1tleHRdL1tuYW1lXS1baGFzaF0uW2V4dF0nLFxyXG4gICAgICAgIG1hbnVhbENodW5rcyhpZCkge1xyXG4gICAgICAgICAgaWYgKGlkLmluY2x1ZGVzKCdub2RlX21vZHVsZXMnKSkge1xyXG4gICAgICAgICAgICAvLyBwbnBtXHU1MTdDXHU1QkI5XHJcbiAgICAgICAgICAgIGNvbnN0IHBucG1OYW1lID0gaWQuaW5jbHVkZXMoJy5wbnBtJykgPyAnLnBucG0vJyA6ICcnXHJcbiAgICAgICAgICAgIGNvbnN0IGZpbGVOYW1lID0gYG5vZGVfbW9kdWxlcy8ke3BucG1OYW1lfWBcclxuXHJcbiAgICAgICAgICAgIHJldHVybiBpZFxyXG4gICAgICAgICAgICAgIC5zcGxpdChmaWxlTmFtZSlbMV1cclxuICAgICAgICAgICAgICAuc3BsaXQoJy8nKVswXVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxufSJdLAogICJtYXBwaW5ncyI6ICI7QUFBaVAsU0FBUyxjQUFjLGVBQWU7OztBQ1loUixTQUFTLFVBQVUsWUFBbUM7QUFDM0QsUUFBTTtBQUFBLElBQ0o7QUFBQSxJQUNBO0FBQUEsRUFDRixJQUFJO0FBRUosUUFBTSxRQUE0QixhQUFhLEtBQUssTUFBTSxXQUFXLFFBQVEsTUFBTSxHQUFHLENBQUMsSUFBSSxDQUFDO0FBRTVGLFFBQU0sTUFBZ0I7QUFBQSxJQUNwQixrQkFBa0IsT0FBTyxnQkFBZ0IsS0FBSztBQUFBLElBQzlDLFlBQVk7QUFBQSxFQUNkO0FBRUEsU0FBTztBQUNUOzs7QUNoQk8sU0FBUyxZQUFZLE9BQWtCLENBQUMsR0FBRztBQUNoRCxRQUFNLE1BQXVCLENBQUM7QUFFOUIsYUFBVyxDQUFDLFFBQVEsTUFBTSxLQUFLLE1BQU07QUFDbkMsUUFBSSxJQUFJLFlBQVk7QUFBQSxNQUNsQjtBQUFBLE1BQ0EsY0FBYztBQUFBLE1BQ2QsU0FBUyxVQUFRLEtBQUssUUFBUSxJQUFJLE9BQU8sSUFBSSxRQUFRLEdBQUcsRUFBRTtBQUFBLElBQzVEO0FBQUEsRUFDRjtBQUVBLFNBQU87QUFDVDs7O0FDcEJBLFNBQVMsV0FBVyxtQkFBbUIsbUJBQW1COzs7QUNGeU4sT0FBTyxXQUFXO0FBSzlSLFNBQVMseUJBQXlCO0FBQ3ZDLFNBQU87QUFBQSxJQUNMLE1BQU07QUFBQSxNQUNKLFVBQVU7QUFBQSxNQUNWLFlBQVk7QUFBQSxNQUNaLFlBQVk7QUFBQSxNQUNaLFlBQVksQ0FBQyxPQUFPLEtBQUs7QUFBQSxNQUN6QixTQUFTO0FBQUEsUUFDUDtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLE1BQ0Y7QUFBQSxJQUNGLENBQUM7QUFBQSxFQUNIO0FBQ0Y7OztBRG5CQSxTQUFTLGtCQUFrQjtBQUMzQixPQUFPLFdBQVc7QUFDbEIsT0FBTyxZQUFZO0FBQ25CLE9BQU8scUJBQXFCO0FBRXJCLFNBQVMsb0JBQW9CO0FBRWxDLFFBQU0sY0FBOEI7QUFBQSxJQUNsQyxNQUFNO0FBQUEsSUFDTixPQUFPO0FBQUEsTUFDTCxTQUFTO0FBQUEsUUFDUCxVQUFVO0FBQUEsUUFDVixrQkFBa0I7QUFBQSxRQUNsQixZQUFZO0FBQUEsTUFDZDtBQUFBLElBQ0YsQ0FBQztBQUFBLElBRUQsV0FBVztBQUFBLE1BQ1QsVUFBVTtBQUFBLE1BQ1YsWUFBWTtBQUFBLElBQ2QsQ0FBQztBQUFBLElBRUQsZ0JBQWdCO0FBQUEsSUFFaEIsdUJBQXVCO0FBQUEsRUFDekI7QUFFQSxTQUFPO0FBQ1Q7OztBRTNCTyxTQUFTLGVBQTZCO0FBQzNDLFNBQU87QUFBQSxJQUNMLHVCQUF1QjtBQUFBLElBQ3ZCLGVBQWU7QUFBQSxNQUNiLFFBQVE7QUFBQSxRQUNOLGdCQUFnQjtBQUFBLFFBQ2hCLGdCQUFnQjtBQUFBLFFBQ2hCLGdCQUFnQjtBQUFBLFFBQ2hCLGFBQWEsSUFBSTtBQUNmLGNBQUksR0FBRyxTQUFTLGNBQWMsR0FBRztBQUUvQixrQkFBTSxXQUFXLEdBQUcsU0FBUyxPQUFPLElBQUksV0FBVztBQUNuRCxrQkFBTSxXQUFXLGdCQUFnQjtBQUVqQyxtQkFBTyxHQUNKLE1BQU0sUUFBUSxFQUFFLEdBQ2hCLE1BQU0sR0FBRyxFQUFFO0FBQUEsVUFDaEI7QUFBQSxRQUNGO0FBQUEsTUFDRjtBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBQ0Y7OztBTHBCQSxJQUFPLHNCQUFRLGFBQWEsQ0FBQyxFQUFFLEtBQUssTUFBTTtBQUN4QyxRQUFNLE9BQU8sUUFBUSxJQUFJO0FBQ3pCLFFBQU0sTUFBTSxRQUFRLE1BQU0sSUFBSTtBQUM5QixRQUFNLFVBQVUsVUFBVSxHQUFHO0FBQzdCLFFBQU0sRUFBRSxrQkFBa0IsV0FBVyxJQUFJO0FBRXpDLFNBQU87QUFBQSxJQUNMLFNBQVMsa0JBQWtCO0FBQUEsSUFDM0IsU0FBUztBQUFBLE1BQ1AsT0FBTztBQUFBLFFBQ0wsS0FBSztBQUFBLFFBQ0wsS0FBSztBQUFBLE1BR1A7QUFBQSxJQUNGO0FBQUEsSUFDQSxLQUFLO0FBQUEsTUFDSCxxQkFBcUI7QUFBQSxRQUNuQixNQUFNO0FBQUEsVUFDSixtQkFBbUI7QUFBQSxRQUNyQjtBQUFBLE1BQ0Y7QUFBQSxJQUNGO0FBQUEsSUFDQSxRQUFRO0FBQUEsTUFDTixNQUFNO0FBQUEsTUFDTixNQUFNO0FBQUEsTUFFTixPQUFPLFlBQVksVUFBVTtBQUFBLElBQy9CO0FBQUEsSUFFQSxTQUFTO0FBQUEsTUFDUCxNQUFNLENBQUMsZUFBZSxVQUFVO0FBQUEsSUFDbEM7QUFBQSxJQUNBLE9BQU8sYUFBYTtBQUFBLEVBQ3RCO0FBQ0YsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K