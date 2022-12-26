// vite.config.ts
import { defineConfig, loadEnv } from "file:///D:/case/react-admin/node_modules/.pnpm/vite@4.0.0_wbf2dudkfgquhylqvtj6pxpbau/node_modules/vite/dist/node/index.js";

// build/config.ts
var COMP_PATH = "/src/components/";
var PAGES_PATH = "/src/pages/";
var LAYOUTS_PATH = "/src/layouts";
var PAGE_PREFIX = "page_";
var COMP_PREFIX = "components_";
var LAYOUTS_NAME = "layouts";
var preloadLoad = [
  "@babel_runtime",
  "react.",
  "react-is",
  "scheduler",
  "react-dom",
  "rc-",
  "@ant-design_cssinjs",
  "@ant-design_icons-svg",
  "@ant-design_colors",
  "@ant-design_icons",
  "nprogress",
  "axios",
  "crypto-js",
  "react-router",
  LAYOUTS_NAME
];
var lazyJS = [
  "zrender",
  "echarts",
  "echarts-liquidfill",
  "@wangeditor_editor",
  "@wangeditor_editor-for-react"
];
var lazyCSS = [
  "@wangeditor_editor",
  COMP_PREFIX,
  PAGE_PREFIX
];

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
function splitJSModules(id) {
  const pnpmName = id.includes(".pnpm") ? ".pnpm/" : "";
  const fileName = `node_modules/${pnpmName}`;
  let result = id.split(fileName)[1].split("/")[0];
  if (result.includes("@")) {
    const first = result.indexOf("@");
    if (first > 0) {
      result = result.substring(0, first);
    } else {
      const second = result.indexOf("@", 1);
      result = result.substring(0, second);
    }
  }
  return result;
}
function splitPage(id) {
  var _a, _b;
  const fileName = PAGES_PATH;
  const file = id.split(fileName)[1];
  const categorize = ((_a = file == null ? void 0 : file.split("/")) == null ? void 0 : _a[0]) || "";
  let result = ((_b = file == null ? void 0 : file.split("/")) == null ? void 0 : _b[1]) || "index";
  if (result.includes("/"))
    result = (result == null ? void 0 : result.split("/")[0]) || "";
  if (result.includes(".tsx"))
    result = result.substring(0, result.length - 4);
  if (result === "components" || result === "component") {
    let compName = "/components/";
    if (id.includes("/component/"))
      compName = "/component/";
    let comResult = id.split(compName)[1];
    if (comResult.includes("/"))
      comResult = (comResult == null ? void 0 : comResult.split("/")[0]) || "";
    if (comResult.includes(".tsx"))
      comResult = comResult.substring(0, comResult.length - 4);
    return `${PAGE_PREFIX}${categorize}_comp_${comResult}`;
  }
  return `${PAGE_PREFIX}${categorize}_${result}`;
}
function getRel(html, path, start = 0) {
  const index = html.indexOf(path, start);
  const prevIndex = html.lastIndexOf('rel="', index) + 5;
  const nextIndex = html.indexOf('"', prevIndex);
  const rel = html.substring(prevIndex, nextIndex);
  return [rel, index, prevIndex, nextIndex];
}
function getPath(html, path, start = 0) {
  const index = html.indexOf(path, start);
  const prevIndex = html.lastIndexOf('href="', index) + 6;
  const nextIndex = html.indexOf('"', prevIndex);
  const result = html.substring(prevIndex, nextIndex);
  return result;
}
function delRow(html, index) {
  let result = "";
  let prevLink = html.lastIndexOf('">', index) + 2;
  const nextLink = html.indexOf('">', index) + 2;
  if (prevLink <= 0)
    prevLink = html.lastIndexOf("<link", index);
  if (prevLink > 0 && nextLink > 0) {
    const prev = html.substring(0, prevLink);
    const next = html.substring(nextLink, html.length);
    result = `${prev}${next}`;
  }
  return [result, prevLink];
}
function handleLazyCSS({ html, path, start, arr }) {
  if (html.includes(path)) {
    if (!start)
      start = html.indexOf("stylesheet");
    const currentPath = getPath(html, path, start || 0);
    const [rel, index] = getRel(html, path, start);
    let newIndex = html.indexOf(path, index + path.length);
    if (currentPath.includes(".css")) {
      arr.push(currentPath);
    }
    if (rel === "stylesheet") {
      const [result, prevLink] = delRow(html, index);
      html = result;
      newIndex = prevLink;
    }
    const props = { html, path, start: newIndex, arr };
    if (newIndex !== -1)
      html = handleLazyCSS(props);
  }
  return html;
}
function handleLazyJS({ html, path, start, arr }) {
  if (html.includes(path)) {
    if (!start)
      start = html.indexOf("stylesheet");
    const currentPath = getPath(html, path, start || 0);
    const [rel, index] = getRel(html, path, start);
    let newIndex = html.indexOf(path, index + path.length);
    if (currentPath.includes(".js")) {
      arr.push(currentPath);
    }
    if (rel === "modulepreload" || rel === "prefetch" || rel === "preload") {
      const [result, prevLink] = delRow(html, index);
      html = result;
      newIndex = prevLink;
    }
    const props = { html, path, start: newIndex, arr };
    if (newIndex !== -1)
      html = handleLazyJS(props);
  }
  return html;
}
function handlePreloadHtml(html, path, start = 0) {
  if (html.includes(path)) {
    const [rel, index, prevIndex, nextIndex] = getRel(html, path, start);
    if (rel === "prefetch") {
      const prev = html.substring(0, prevIndex);
      const next = html.substring(nextIndex, html.length);
      html = `${prev}modulepreload${next}`;
    }
    const newIndex = html.indexOf(path, index + path.length);
    if (newIndex !== -1)
      html = handlePreloadHtml(html, path, newIndex);
  }
  return html;
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
import { presetUno, presetAttributify, presetIcons } from "file:///D:/case/react-admin/node_modules/.pnpm/unocss@0.45.30_vite@4.0.0/node_modules/unocss/dist/index.mjs";

// build/plugins/pages.ts
import Pages from "file:///D:/case/react-admin/node_modules/.pnpm/vite-plugin-pages@0.26.0_vite@4.0.0/node_modules/vite-plugin-pages/dist/index.mjs";
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
import { visualizer } from "file:///D:/case/react-admin/node_modules/.pnpm/rollup-plugin-visualizer@5.8.3/node_modules/rollup-plugin-visualizer/dist/plugin/index.js";

// build/plugins/preload.ts
var preloadPlugin = (time = 1e3) => {
  return {
    name: "vite-prefetch-plugin",
    async transformIndexHtml(html) {
      html = html.replace(/modulepreload/g, "prefetch");
      if (!preloadLoad.length)
        return html;
      preloadLoad.forEach((item) => {
        html = handlePreloadHtml(html, `/${item}`);
      });
      const lazyJSArr = [];
      lazyJS.forEach((item) => {
        const props = { html, path: `/${item}`, arr: lazyJSArr };
        html = handleLazyJS(props);
      });
      const lazyCSSArr = [];
      lazyCSS.forEach((item) => {
        const props = { html, path: `/${item}`, arr: lazyCSSArr };
        html = handleLazyCSS(props);
      });
      const tiemout = `</body>
      <script>
        let href = window.location.href;
        // \u53BB\u9664search
        const searchIndex = href.indexOf('?');
        if (searchIndex > 0) href = href.substring(0, searchIndex);
        const arr = href.split('/');
        const name = arr[arr.length - 1]; // \u83B7\u53D6\u540D\u79F0
        console.log('name:', name)

        const lazyCSS = ${JSON.stringify(lazyCSSArr)};

        for (let i = 0; i < lazyCSS.length; i++) {
          if (lazyCSS[i].includes(name)) {
            console.log('css:', lazyCSS[i])
            const elem = document.createElement("link");
            elem.rel = "stylesheet";
            elem.type = "text/css";
            elem.href = lazyCSS[i];
            document.body.appendChild(elem);

            lazyCSS.split(i, 1);
            break;
          }
        }

        console.log('lazyCSS:', lazyCSS)

        setTimeout(function() {
          lazyCSS.forEach(item => {
            const elem = document.createElement("link");
            elem.rel = "stylesheet";
            elem.type = "text/css";
            elem.href = item;
            document.body.appendChild(elem);
          });
        }, ${time})

        const lazyJS = ${JSON.stringify(lazyJSArr)};

        for (let i = 0; i < lazyJS.length; i++) {
          if (lazyJS[i].includes(name)) {
            console.log('js:', lazyJS[i])
            fetch(lazyJS[i]);
            lazyJS.split(i, 1);
            break;
          }
        }

        console.log('lazyJS:', lazyJS)

        setTimeout(function() {
          lazyJS.forEach(item => fetch(item))
        }, ${time});
        </script>`;
      return html.replace("</body>", tiemout);
    }
  };
};

// build/plugins/index.ts
import react from "file:///D:/case/react-admin/node_modules/.pnpm/@vitejs+plugin-react@3.0.0_vite@4.0.0/node_modules/@vitejs/plugin-react/dist/index.mjs";
import Unocss from "file:///D:/case/react-admin/node_modules/.pnpm/unocss@0.45.30_vite@4.0.0/node_modules/unocss/dist/vite.mjs";
import viteCompression from "file:///D:/case/react-admin/node_modules/.pnpm/vite-plugin-compression@0.5.1_vite@4.0.0/node_modules/vite-plugin-compression/dist/index.mjs";
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
    configPageImportPlugin(),
    process.env.NODE_ENV === "production" && preloadPlugin()
  ];
  return vitePlugins;
}

// build/vite/build.ts
function buildOptions() {
  return {
    chunkSizeWarningLimit: 1e3,
    rollupOptions: {
      output: {
        chunkFileNames: "assets/js/[name].[hash].js",
        entryFileNames: "assets/js/[name].[hash].js",
        assetFileNames: "assets/[ext]/[name].[hash].[ext]",
        manualChunks(id) {
          if (id.includes("node_modules")) {
            return splitJSModules(id);
          }
          if (id.includes(LAYOUTS_PATH)) {
            return LAYOUTS_NAME;
          }
          if (id.includes(COMP_PATH)) {
            const result = id.split(COMP_PATH)[1].split("/")[0];
            return `${COMP_PREFIX}${result}`;
          }
          if (id.includes(PAGES_PATH)) {
            return splitPage(id);
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
    test: {
      environment: "jsdom",
      globals: true,
      setupFiles: "./tests/index.ts"
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiLCAiYnVpbGQvY29uZmlnLnRzIiwgImJ1aWxkL3V0aWxzLnRzIiwgImJ1aWxkL3ZpdGUvcHJveHkudHMiLCAiYnVpbGQvcGx1Z2lucy9pbmRleC50cyIsICJidWlsZC9wbHVnaW5zL3BhZ2VzLnRzIiwgImJ1aWxkL3BsdWdpbnMvcHJlbG9hZC50cyIsICJidWlsZC92aXRlL2J1aWxkLnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiRDpcXFxcY2FzZVxcXFxyZWFjdC1hZG1pblwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiRDpcXFxcY2FzZVxcXFxyZWFjdC1hZG1pblxcXFx2aXRlLmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vRDovY2FzZS9yZWFjdC1hZG1pbi92aXRlLmNvbmZpZy50c1wiO2ltcG9ydCB7IGRlZmluZUNvbmZpZywgbG9hZEVudiB9IGZyb20gJ3ZpdGUnXHJcbmltcG9ydCB7IGhhbmRsZUVudiB9IGZyb20gJy4vYnVpbGQvdXRpbHMnXHJcbmltcG9ydCB7IGNyZWF0ZVByb3h5IH0gZnJvbSAnLi9idWlsZC92aXRlL3Byb3h5J1xyXG5pbXBvcnQgeyBjcmVhdGVWaXRlUGx1Z2lucyB9IGZyb20gJy4vYnVpbGQvcGx1Z2lucydcclxuaW1wb3J0IHsgYnVpbGRPcHRpb25zIH0gZnJvbSAnLi9idWlsZC92aXRlL2J1aWxkJ1xyXG5cclxuLy8gaHR0cHM6Ly92aXRlanMuZGV2L2NvbmZpZy9cclxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKCh7IG1vZGUgfSkgPT4ge1xyXG4gIGNvbnN0IHJvb3QgPSBwcm9jZXNzLmN3ZCgpXHJcbiAgY29uc3QgZW52ID0gbG9hZEVudihtb2RlLCByb290KVxyXG4gIGNvbnN0IHZpdGVFbnYgPSBoYW5kbGVFbnYoZW52KVxyXG4gIGNvbnN0IHsgVklURV9TRVJWRVJfUE9SVCwgVklURV9QUk9YWSB9ID0gdml0ZUVudlxyXG5cclxuICByZXR1cm4ge1xyXG4gICAgcGx1Z2luczogY3JlYXRlVml0ZVBsdWdpbnMoKSxcclxuICAgIHJlc29sdmU6IHtcclxuICAgICAgYWxpYXM6IHtcclxuICAgICAgICAnQCc6ICcvc3JjJyxcclxuICAgICAgICAnIyc6ICcvdHlwZXMnXHJcbiAgICAgIH1cclxuICAgIH0sXHJcbiAgICBjc3M6IHtcclxuICAgICAgcHJlcHJvY2Vzc29yT3B0aW9uczoge1xyXG4gICAgICAgIGxlc3M6IHtcclxuICAgICAgICAgIGphdmFzY3JpcHRFbmFibGVkOiB0cnVlXHJcbiAgICAgICAgfSxcclxuICAgICAgfSxcclxuICAgIH0sXHJcbiAgICB0ZXN0OiB7XHJcbiAgICAgIGVudmlyb25tZW50OiAnanNkb20nLFxyXG4gICAgICBnbG9iYWxzOiB0cnVlLFxyXG4gICAgICBzZXR1cEZpbGVzOiAnLi90ZXN0cy9pbmRleC50cydcclxuICAgIH0sXHJcbiAgICBzZXJ2ZXI6IHtcclxuICAgICAgb3BlbjogdHJ1ZSxcclxuICAgICAgcG9ydDogVklURV9TRVJWRVJfUE9SVCxcclxuICAgICAgLy8gXHU4REU4XHU1N0RGXHU1OTA0XHU3NDA2XHJcbiAgICAgIHByb3h5OiBjcmVhdGVQcm94eShWSVRFX1BST1hZKVxyXG4gICAgfSxcclxuICAgIC8vIFx1NTNCQlx1OTY2NGNvbnNvbGVcdTU0OENkZWJ1Z2dlclxyXG4gICAgZXNidWlsZDoge1xyXG4gICAgICBwdXJlOiBbXCJjb25zb2xlLmxvZ1wiLCBcImRlYnVnZ2VyXCJdXHJcbiAgICB9LFxyXG4gICAgYnVpbGQ6IGJ1aWxkT3B0aW9ucygpXHJcbiAgfVxyXG59KVxyXG4iLCAiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIkQ6XFxcXGNhc2VcXFxccmVhY3QtYWRtaW5cXFxcYnVpbGRcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkQ6XFxcXGNhc2VcXFxccmVhY3QtYWRtaW5cXFxcYnVpbGRcXFxcY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9EOi9jYXNlL3JlYWN0LWFkbWluL2J1aWxkL2NvbmZpZy50c1wiOy8vIFx1NTE2OFx1NUM0MFx1N0VDNFx1NEVGNlx1OERFRlx1NUY4NFxyXG5leHBvcnQgY29uc3QgQ09NUF9QQVRIID0gJy9zcmMvY29tcG9uZW50cy8nXHJcbi8vIFx1OTg3NVx1OTc2Mlx1OERFRlx1NUY4NFxyXG5leHBvcnQgY29uc3QgUEFHRVNfUEFUSCA9ICcvc3JjL3BhZ2VzLydcclxuLy8gXHU1RTAzXHU1QzQwXHU4REVGXHU1Rjg0XHJcbmV4cG9ydCBjb25zdCBMQVlPVVRTX1BBVEggPSAnL3NyYy9sYXlvdXRzJ1xyXG4vLyBcdTYyNTNcdTUzMDVcdTk4NzVcdTk3NjJcdTY1ODdcdTRFRjZcdTc2ODRcdTUyNERcdTdGMDBcclxuZXhwb3J0IGNvbnN0IFBBR0VfUFJFRklYID0gJ3BhZ2VfJ1xyXG4vLyBcdTUxNjhcdTVDNDBcdTdFQzRcdTRFRjZcdTc2ODRcdTUyNERcdTdGMDBcclxuZXhwb3J0IGNvbnN0IENPTVBfUFJFRklYID0gJ2NvbXBvbmVudHNfJ1xyXG4vLyBcdTVFMDNcdTVDNDBcdTdFQzRcdTRFRjZcdTc2ODRcdTUyNERcdTdGMDBcclxuZXhwb3J0IGNvbnN0IExBWU9VVFNfTkFNRSA9ICdsYXlvdXRzJ1xyXG5cclxuLy8gXHU5ODg0XHU1MkEwXHU4RjdEanNcclxuZXhwb3J0IGNvbnN0IHByZWxvYWRMb2FkID0gW1xyXG4gICdAYmFiZWxfcnVudGltZScsXHJcbiAgJ3JlYWN0LicsXHJcbiAgJ3JlYWN0LWlzJyxcclxuICAnc2NoZWR1bGVyJyxcclxuICAncmVhY3QtZG9tJyxcclxuICAncmMtJyxcclxuICAnQGFudC1kZXNpZ25fY3NzaW5qcycsXHJcbiAgJ0BhbnQtZGVzaWduX2ljb25zLXN2ZycsXHJcbiAgJ0BhbnQtZGVzaWduX2NvbG9ycycsXHJcbiAgJ0BhbnQtZGVzaWduX2ljb25zJyxcclxuICAnbnByb2dyZXNzJyxcclxuICAnYXhpb3MnLFxyXG4gICdjcnlwdG8tanMnLFxyXG4gICdyZWFjdC1yb3V0ZXInLFxyXG4gIExBWU9VVFNfTkFNRVxyXG5dXHJcblxyXG4vLyBcdTYxRDJcdTUyQTBcdThGN0Rqc1xyXG5leHBvcnQgY29uc3QgbGF6eUpTID0gW1xyXG4gICd6cmVuZGVyJyxcclxuICAnZWNoYXJ0cycsXHJcbiAgJ2VjaGFydHMtbGlxdWlkZmlsbCcsXHJcbiAgJ0B3YW5nZWRpdG9yX2VkaXRvcicsXHJcbiAgJ0B3YW5nZWRpdG9yX2VkaXRvci1mb3ItcmVhY3QnXHJcbl1cclxuXHJcbi8vIFx1NjFEMlx1NTJBMFx1OEY3RGNzc1xyXG5leHBvcnQgY29uc3QgbGF6eUNTUyA9IFtcclxuICAnQHdhbmdlZGl0b3JfZWRpdG9yJyxcclxuICBDT01QX1BSRUZJWCxcclxuICBQQUdFX1BSRUZJWFxyXG5dIiwgImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFxjYXNlXFxcXHJlYWN0LWFkbWluXFxcXGJ1aWxkXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJEOlxcXFxjYXNlXFxcXHJlYWN0LWFkbWluXFxcXGJ1aWxkXFxcXHV0aWxzLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9EOi9jYXNlL3JlYWN0LWFkbWluL2J1aWxkL3V0aWxzLnRzXCI7aW1wb3J0IHsgUEFHRVNfUEFUSCwgUEFHRV9QUkVGSVggfSBmcm9tICcuL2NvbmZpZydcclxuXHJcbnR5cGUgSUVudkNvbmZpZ3MgPSBSZWNvcmQ8c3RyaW5nLCBzdHJpbmc+XHJcblxyXG4vLyBlbnZcdTY1NzBcdTYzNkVcclxuaW50ZXJmYWNlIElWaXRlRW52IHtcclxuICBWSVRFX1NFUlZFUl9QT1JUOiBudW1iZXI7XHJcbiAgVklURV9QUk9YWTogW3N0cmluZywgc3RyaW5nXVtdO1xyXG59XHJcblxyXG4vKipcclxuICogXHU1OTA0XHU3NDA2XHU4RjZDXHU1MzE2ZW52XHJcbiAqIEBwYXJhbSBlbnZDb25maWdzIFxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGhhbmRsZUVudihlbnZDb25maWdzOiBJRW52Q29uZmlncyk6IElWaXRlRW52IHtcclxuICBjb25zdCB7XHJcbiAgICBWSVRFX1NFUlZFUl9QT1JULFxyXG4gICAgVklURV9QUk9YWVxyXG4gIH0gPSBlbnZDb25maWdzXHJcblxyXG4gIGNvbnN0IHByb3h5OiBbc3RyaW5nLCBzdHJpbmddW10gPSBWSVRFX1BST1hZID8gSlNPTi5wYXJzZShWSVRFX1BST1hZLnJlcGxhY2UoLycvZywgJ1wiJykpIDogW11cclxuXHJcbiAgY29uc3QgcmVzOiBJVml0ZUVudiA9IHtcclxuICAgIFZJVEVfU0VSVkVSX1BPUlQ6IE51bWJlcihWSVRFX1NFUlZFUl9QT1JUKSB8fCA4MDgwLFxyXG4gICAgVklURV9QUk9YWTogcHJveHlcclxuICB9XHJcblxyXG4gIHJldHVybiByZXNcclxufVxyXG5cclxuLyoqXHJcbiAqIEpTXHU2QTIxXHU1NzU3XHU1MjA2XHU1MzA1XHJcbiAqIEBwYXJhbSBpZCAtIFx1NjgwN1x1OEJDNlx1N0IyNlxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIHNwbGl0SlNNb2R1bGVzKGlkOiBzdHJpbmcpIHtcclxuICAvLyBwbnBtXHU1MTdDXHU1QkI5XHJcbiAgY29uc3QgcG5wbU5hbWUgPSBpZC5pbmNsdWRlcygnLnBucG0nKSA/ICcucG5wbS8nIDogJydcclxuICBjb25zdCBmaWxlTmFtZSA9IGBub2RlX21vZHVsZXMvJHtwbnBtTmFtZX1gXHJcblxyXG4gIGxldCByZXN1bHQgPSBpZFxyXG4gICAgLnNwbGl0KGZpbGVOYW1lKVsxXVxyXG4gICAgLnNwbGl0KCcvJylbMF1cclxuXHJcbiAgaWYgKHJlc3VsdC5pbmNsdWRlcygnQCcpKSB7XHJcbiAgICBjb25zdCBmaXJzdCA9IHJlc3VsdC5pbmRleE9mKCdAJylcclxuICAgIGlmIChmaXJzdCA+IDApIHtcclxuICAgICAgcmVzdWx0ID0gcmVzdWx0LnN1YnN0cmluZygwLCBmaXJzdClcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGNvbnN0IHNlY29uZCA9IHJlc3VsdC5pbmRleE9mKCdAJywgMSlcclxuICAgICAgcmVzdWx0ID0gcmVzdWx0LnN1YnN0cmluZygwLCBzZWNvbmQpXHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICByZXR1cm4gcmVzdWx0XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBcdTk4NzVcdTk3NjJcdTUyMDZcdTUzMDVcdTU5MDRcdTc0MDZcclxuICogQHBhcmFtIGlkIC0gXHU2ODA3XHU4QkM2XHU3QjI2XHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gc3BsaXRQYWdlKGlkOiBzdHJpbmcpIHtcclxuICBjb25zdCBmaWxlTmFtZSA9IFBBR0VTX1BBVEhcclxuICBjb25zdCBmaWxlID0gaWQuc3BsaXQoZmlsZU5hbWUpWzFdXHJcbiAgY29uc3QgY2F0ZWdvcml6ZSA9IGZpbGU/LnNwbGl0KCcvJyk/LlswXSB8fCAnJ1xyXG4gIGxldCByZXN1bHQgPSBmaWxlPy5zcGxpdCgnLycpPy5bMV0gfHwgJ2luZGV4J1xyXG5cclxuICBpZiAocmVzdWx0LmluY2x1ZGVzKCcvJykpIHJlc3VsdCA9IHJlc3VsdD8uc3BsaXQoJy8nKVswXSB8fCAnJ1xyXG4gIGlmIChyZXN1bHQuaW5jbHVkZXMoJy50c3gnKSkgcmVzdWx0ID0gcmVzdWx0LnN1YnN0cmluZygwLCByZXN1bHQubGVuZ3RoIC0gNClcclxuXHJcbiAgLy8gXHU3RUM0XHU0RUY2XHJcbiAgaWYgKHJlc3VsdCA9PT0gJ2NvbXBvbmVudHMnIHx8IHJlc3VsdCA9PT0gJ2NvbXBvbmVudCcpIHtcclxuICAgIGxldCBjb21wTmFtZSA9ICcvY29tcG9uZW50cy8nXHJcbiAgICBpZiAoaWQuaW5jbHVkZXMoJy9jb21wb25lbnQvJykpIGNvbXBOYW1lID0gJy9jb21wb25lbnQvJ1xyXG5cclxuICAgIGxldCBjb21SZXN1bHQgPSBpZC5zcGxpdChjb21wTmFtZSlbMV1cclxuICAgIGlmIChjb21SZXN1bHQuaW5jbHVkZXMoJy8nKSkgY29tUmVzdWx0ID0gY29tUmVzdWx0Py5zcGxpdCgnLycpWzBdIHx8ICcnXHJcbiAgICBpZiAoY29tUmVzdWx0LmluY2x1ZGVzKCcudHN4JykpIGNvbVJlc3VsdCA9IGNvbVJlc3VsdC5zdWJzdHJpbmcoMCwgY29tUmVzdWx0Lmxlbmd0aCAtIDQpXHJcblxyXG4gICAgcmV0dXJuIGAke1BBR0VfUFJFRklYfSR7Y2F0ZWdvcml6ZX1fY29tcF8ke2NvbVJlc3VsdH1gXHJcbiAgfVxyXG5cclxuICByZXR1cm4gYCR7UEFHRV9QUkVGSVh9JHtjYXRlZ29yaXplfV8ke3Jlc3VsdH1gXHJcbn1cclxuXHJcbi8qKlxyXG4gKiBcdTgzQjdcdTUzRDZyZWxcclxuICogQHBhcmFtIGh0bWwgLSBodG1sXHU2NTcwXHU2MzZFXHJcbiAqIEBwYXJhbSBwYXRoIC0gXHU4REVGXHU1Rjg0XHJcbiAqIEBwYXJhbSBzdGFydCAtIFx1NEVDRVx1N0IyQ1x1NTFFMFx1NEY0RFx1NUYwMFx1NTlDQlx1NjdFNVx1NjI3RVxyXG4gKi9cclxuZnVuY3Rpb24gZ2V0UmVsKGh0bWw6IHN0cmluZywgcGF0aDogc3RyaW5nLCBzdGFydCA9IDApIHtcclxuICBjb25zdCBpbmRleCA9IGh0bWwuaW5kZXhPZihwYXRoLCBzdGFydClcclxuICBjb25zdCBwcmV2SW5kZXggPSBodG1sLmxhc3RJbmRleE9mKCdyZWw9XCInLCBpbmRleCkgKyA1XHJcbiAgY29uc3QgbmV4dEluZGV4ID0gaHRtbC5pbmRleE9mKCdcIicsIHByZXZJbmRleClcclxuICBjb25zdCByZWwgPSBodG1sLnN1YnN0cmluZyhwcmV2SW5kZXgsIG5leHRJbmRleClcclxuICByZXR1cm4gW3JlbCwgaW5kZXgsIHByZXZJbmRleCwgbmV4dEluZGV4XSBhcyBjb25zdFxyXG59XHJcblxyXG4vKipcclxuICogXHU4M0I3XHU1M0Q2XHU4REVGXHU1Rjg0XHJcbiAqIEBwYXJhbSBodG1sIC0gaHRtbFx1NjU3MFx1NjM2RVxyXG4gKiBAcGFyYW0gcGF0aCAtIFx1OERFRlx1NUY4NFxyXG4gKiBAcGFyYW0gc3RhcnQgLSBcdTRFQ0VcdTdCMkNcdTUxRTBcdTRGNERcdTVGMDBcdTU5Q0JcdTY3RTVcdTYyN0VcclxuICovXHJcbmZ1bmN0aW9uIGdldFBhdGgoaHRtbDogc3RyaW5nLCBwYXRoOiBzdHJpbmcsIHN0YXJ0ID0gMCkge1xyXG4gIGNvbnN0IGluZGV4ID0gaHRtbC5pbmRleE9mKHBhdGgsIHN0YXJ0KVxyXG4gIGNvbnN0IHByZXZJbmRleCA9IGh0bWwubGFzdEluZGV4T2YoJ2hyZWY9XCInLCBpbmRleCkgKyA2XHJcbiAgY29uc3QgbmV4dEluZGV4ID0gaHRtbC5pbmRleE9mKCdcIicsIHByZXZJbmRleClcclxuICBjb25zdCByZXN1bHQgPSBodG1sLnN1YnN0cmluZyhwcmV2SW5kZXgsIG5leHRJbmRleClcclxuICByZXR1cm4gcmVzdWx0XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBcdTUyMjBcdTk2NjRcdTVCRjlcdTVFOTRcdTg4NENcdTY1NzBcdTYzNkVcclxuICogQHBhcmFtIGh0bWwgLSBodG1sXHU2NTcwXHU2MzZFXHJcbiAqIEBwYXJhbSBpbmRleCAtIFx1NEUwQlx1NjgwN1xyXG4gKi9cclxuZnVuY3Rpb24gZGVsUm93KGh0bWw6IHN0cmluZywgaW5kZXg6IG51bWJlcikge1xyXG4gIGxldCByZXN1bHQgPSAnJ1xyXG4gIGxldCBwcmV2TGluayA9IGh0bWwubGFzdEluZGV4T2YoJ1wiPicsIGluZGV4KSArIDJcclxuICBjb25zdCBuZXh0TGluayA9IGh0bWwuaW5kZXhPZignXCI+JywgaW5kZXgpICsgMlxyXG4gIGlmIChwcmV2TGluayA8PSAwKSBwcmV2TGluayA9IGh0bWwubGFzdEluZGV4T2YoJzxsaW5rJywgaW5kZXgpXHJcblxyXG4gIGlmIChwcmV2TGluayA+IDAgJiYgbmV4dExpbmsgPiAwKSB7XHJcbiAgICBjb25zdCBwcmV2ID0gaHRtbC5zdWJzdHJpbmcoMCwgcHJldkxpbmspXHJcbiAgICBjb25zdCBuZXh0ID0gaHRtbC5zdWJzdHJpbmcobmV4dExpbmssIGh0bWwubGVuZ3RoKVxyXG4gICAgcmVzdWx0ID0gYCR7cHJldn0ke25leHR9YFxyXG4gIH1cclxuXHJcbiAgcmV0dXJuIFtyZXN1bHQsIHByZXZMaW5rXSBhcyBjb25zdFxyXG59XHJcblxyXG5pbnRlcmZhY2UgSUxhenlQcm9wcyB7XHJcbiAgaHRtbDogc3RyaW5nO1xyXG4gIHBhdGg6IHN0cmluZztcclxuICBhcnI6IHN0cmluZ1tdO1xyXG4gIHN0YXJ0PzogbnVtYmVyO1xyXG59XHJcblxyXG4vKipcclxuICogXHU1OTA0XHU3NDA2XHU2MUQyXHU1MkEwXHU4RjdEQ1NTXHJcbiAqIEBwYXJhbSBodG1sIC0gaHRtbFx1NjU3MFx1NjM2RVxyXG4gKiBAcGFyYW0gcGF0aCAtIFx1OERFRlx1NUY4NFxyXG4gKiBAcGFyYW0gc3RhcnQgLSBcdTRFQ0VcdTdCMkNcdTUxRTBcdTRGNERcdTVGMDBcdTU5Q0JcdTY3RTVcdTYyN0VcclxuICogQHBhcmFtIGFyciAtIFx1OEZENFx1NTZERVx1N0VEM1x1Njc5Q1xyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGhhbmRsZUxhenlDU1MoeyBodG1sLCBwYXRoLCBzdGFydCwgYXJyIH06IElMYXp5UHJvcHMpIHtcclxuICBpZiAoaHRtbC5pbmNsdWRlcyhwYXRoKSkge1xyXG4gICAgaWYgKCFzdGFydCkgc3RhcnQgPSBodG1sLmluZGV4T2YoJ3N0eWxlc2hlZXQnKVxyXG5cclxuICAgIGNvbnN0IGN1cnJlbnRQYXRoID0gZ2V0UGF0aChodG1sLCBwYXRoLCBzdGFydCB8fCAwKVxyXG4gICAgY29uc3QgW3JlbCwgaW5kZXhdID0gZ2V0UmVsKGh0bWwsIHBhdGgsIHN0YXJ0KVxyXG4gICAgbGV0IG5ld0luZGV4ID0gaHRtbC5pbmRleE9mKHBhdGgsIGluZGV4ICsgcGF0aC5sZW5ndGgpXHJcblxyXG4gICAgaWYgKGN1cnJlbnRQYXRoLmluY2x1ZGVzKCcuY3NzJykpIHtcclxuICAgICAgYXJyLnB1c2goY3VycmVudFBhdGgpXHJcbiAgICB9XHJcbiAgICBcclxuICAgIC8vIFx1NTIyMFx1OTY2NFx1NUJGOVx1NUU5NFx1NzY4NGNzc1xyXG4gICAgaWYgKHJlbCA9PT0gJ3N0eWxlc2hlZXQnKSB7XHJcbiAgICAgIGNvbnN0IFtyZXN1bHQsIHByZXZMaW5rXSA9IGRlbFJvdyhodG1sLCBpbmRleClcclxuICAgICAgaHRtbCA9IHJlc3VsdFxyXG4gICAgICBuZXdJbmRleCA9IHByZXZMaW5rXHJcbiAgICB9XHJcblxyXG4gICAgLy8gXHU2NjJGXHU1NDI2XHU1QjU4XHU1NzI4XHU0RTBCXHU0RTAwXHU0RTJBXHU3NkY4XHU1NDBDXHU1NDBEXHU1QjU3Y3NzXHJcbiAgICBjb25zdCBwcm9wcyA9IHsgaHRtbCwgcGF0aCwgc3RhcnQ6IG5ld0luZGV4LCBhcnIgfVxyXG4gICAgaWYgKG5ld0luZGV4ICE9PSAtMSkgaHRtbCA9IGhhbmRsZUxhenlDU1MocHJvcHMpXHJcbiAgfVxyXG5cclxuICByZXR1cm4gaHRtbFxyXG59XHJcblxyXG4vKipcclxuICogXHU1OTA0XHU3NDA2XHU2MUQyXHU1MkEwXHU4RjdEanNcclxuICogQHBhcmFtIGh0bWwgLSBodG1sXHU2NTcwXHU2MzZFXHJcbiAqIEBwYXJhbSBwYXRoIC0gXHU4REVGXHU1Rjg0XHJcbiAqIEBwYXJhbSBzdGFydCAtIFx1NEVDRVx1N0IyQ1x1NTFFMFx1NEY0RFx1NUYwMFx1NTlDQlx1NjdFNVx1NjI3RVxyXG4gKiBAcGFyYW0gYXJyIC0gXHU4RkQ0XHU1NkRFXHU3RUQzXHU2NzlDXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gaGFuZGxlTGF6eUpTKHsgaHRtbCwgcGF0aCwgc3RhcnQsIGFyciB9OiBJTGF6eVByb3BzKSB7XHJcbiAgaWYgKGh0bWwuaW5jbHVkZXMocGF0aCkpIHtcclxuICAgIGlmICghc3RhcnQpIHN0YXJ0ID0gaHRtbC5pbmRleE9mKCdzdHlsZXNoZWV0JylcclxuXHJcbiAgICBjb25zdCBjdXJyZW50UGF0aCA9IGdldFBhdGgoaHRtbCwgcGF0aCwgc3RhcnQgfHwgMClcclxuICAgIGNvbnN0IFtyZWwsIGluZGV4XSA9IGdldFJlbChodG1sLCBwYXRoLCBzdGFydClcclxuICAgIGxldCBuZXdJbmRleCA9IGh0bWwuaW5kZXhPZihwYXRoLCBpbmRleCArIHBhdGgubGVuZ3RoKVxyXG5cclxuICAgIGlmIChjdXJyZW50UGF0aC5pbmNsdWRlcygnLmpzJykpIHtcclxuICAgICAgYXJyLnB1c2goY3VycmVudFBhdGgpXHJcbiAgICB9XHJcbiAgICBcclxuICAgIC8vIFx1NTIyMFx1OTY2NFx1NUJGOVx1NUU5NFx1NzY4NGpzXHJcbiAgICBpZiAocmVsID09PSAnbW9kdWxlcHJlbG9hZCcgfHwgcmVsID09PSAncHJlZmV0Y2gnIHx8IHJlbCA9PT0gJ3ByZWxvYWQnKSB7XHJcbiAgICAgIGNvbnN0IFtyZXN1bHQsIHByZXZMaW5rXSA9IGRlbFJvdyhodG1sLCBpbmRleClcclxuICAgICAgaHRtbCA9IHJlc3VsdFxyXG4gICAgICBuZXdJbmRleCA9IHByZXZMaW5rXHJcbiAgICB9XHJcblxyXG4gICAgLy8gXHU2NjJGXHU1NDI2XHU1QjU4XHU1NzI4XHU0RTBCXHU0RTAwXHU0RTJBXHU3NkY4XHU1NDBDXHU1NDBEXHU1QjU3anNcclxuICAgIGNvbnN0IHByb3BzID0geyBodG1sLCBwYXRoLCBzdGFydDogbmV3SW5kZXgsIGFyciB9XHJcbiAgICBpZiAobmV3SW5kZXggIT09IC0xKSBodG1sID0gaGFuZGxlTGF6eUpTKHByb3BzKVxyXG4gIH1cclxuXHJcbiAgcmV0dXJuIGh0bWxcclxufVxyXG5cclxuLyoqXHJcbiAqIFx1NTkwNFx1NzQwNlx1OTg4NFx1NTJBMFx1OEY3RGh0bWxcdTY1NzBcdTYzNkVcclxuICogQHBhcmFtIGh0bWwgLSBodG1sXHU2NTcwXHU2MzZFXHJcbiAqIEBwYXJhbSBwYXRoIC0gXHU4REVGXHU1Rjg0XHJcbiAqIEBwYXJhbSBzdGFydCAtIFx1NEVDRVx1N0IyQ1x1NTFFMFx1NEY0RFx1NUYwMFx1NTlDQlx1NjdFNVx1NjI3RVxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGhhbmRsZVByZWxvYWRIdG1sKGh0bWw6IHN0cmluZywgcGF0aDogc3RyaW5nLCBzdGFydCA9IDApIHtcclxuICBpZiAoaHRtbC5pbmNsdWRlcyhwYXRoKSkge1xyXG4gICAgY29uc3QgW3JlbCwgaW5kZXgsIHByZXZJbmRleCwgbmV4dEluZGV4XSA9IGdldFJlbChodG1sLCBwYXRoLCBzdGFydClcclxuXHJcbiAgICBpZiAocmVsID09PSAncHJlZmV0Y2gnKSB7XHJcbiAgICAgIGNvbnN0IHByZXYgPSBodG1sLnN1YnN0cmluZygwLCBwcmV2SW5kZXgpXHJcbiAgICAgIGNvbnN0IG5leHQgPSBodG1sLnN1YnN0cmluZyhuZXh0SW5kZXgsIGh0bWwubGVuZ3RoKVxyXG4gICAgICBodG1sID0gYCR7cHJldn1tb2R1bGVwcmVsb2FkJHtuZXh0fWBcclxuICAgIH1cclxuXHJcbiAgICAvLyBcdTY2MkZcdTU0MjZcdTVCNThcdTU3MjhcdTRFMEJcdTRFMDBcdTRFMkFcdTc2RjhcdTU0MENcdTU0MERcdTVCNTdcdTdFQzRcdTRFRjZcclxuICAgIGNvbnN0IG5ld0luZGV4ID0gaHRtbC5pbmRleE9mKHBhdGgsIGluZGV4ICsgcGF0aC5sZW5ndGgpXHJcbiAgICBpZiAobmV3SW5kZXggIT09IC0xKSBodG1sID0gaGFuZGxlUHJlbG9hZEh0bWwoaHRtbCwgcGF0aCwgbmV3SW5kZXgpXHJcbiAgfVxyXG5cclxuICByZXR1cm4gaHRtbFxyXG59IiwgImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFxjYXNlXFxcXHJlYWN0LWFkbWluXFxcXGJ1aWxkXFxcXHZpdGVcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkQ6XFxcXGNhc2VcXFxccmVhY3QtYWRtaW5cXFxcYnVpbGRcXFxcdml0ZVxcXFxwcm94eS50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vRDovY2FzZS9yZWFjdC1hZG1pbi9idWlsZC92aXRlL3Byb3h5LnRzXCI7aW1wb3J0IHR5cGUgeyBQcm94eU9wdGlvbnMgfSBmcm9tICd2aXRlJ1xyXG5cclxudHlwZSBQcm94eUxpc3QgPSBbc3RyaW5nLCBzdHJpbmddW11cclxuXHJcbnR5cGUgUHJveHlUYXJnZXRMaXN0ID0gUmVjb3JkPHN0cmluZywgUHJveHlPcHRpb25zPlxyXG5cclxuLyoqXHJcbiAqIFx1NTIxQlx1NUVGQVx1OERFOFx1NTdERlxyXG4gKiBAcGFyYW0gbGlzdCAtIFx1NEU4Q1x1N0VGNFx1NjU3MFx1N0VDNFx1NTNDMlx1NjU3MFxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVByb3h5KGxpc3Q6IFByb3h5TGlzdCA9IFtdKSB7XHJcbiAgY29uc3QgcmVzOiBQcm94eVRhcmdldExpc3QgPSB7fVxyXG4gIFxyXG4gIGZvciAoY29uc3QgW3ByZWZpeCwgdGFyZ2V0XSBvZiBsaXN0KSB7XHJcbiAgICByZXNbYF4ke3ByZWZpeH1gXSA9IHtcclxuICAgICAgdGFyZ2V0LFxyXG4gICAgICBjaGFuZ2VPcmlnaW46IHRydWUsXHJcbiAgICAgIHJld3JpdGU6IHBhdGggPT4gcGF0aC5yZXBsYWNlKG5ldyBSZWdFeHAoYF4ke3ByZWZpeH1gKSwgJycpLFxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcmV0dXJuIHJlc1xyXG59IiwgImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFxjYXNlXFxcXHJlYWN0LWFkbWluXFxcXGJ1aWxkXFxcXHBsdWdpbnNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkQ6XFxcXGNhc2VcXFxccmVhY3QtYWRtaW5cXFxcYnVpbGRcXFxccGx1Z2luc1xcXFxpbmRleC50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vRDovY2FzZS9yZWFjdC1hZG1pbi9idWlsZC9wbHVnaW5zL2luZGV4LnRzXCI7aW1wb3J0IHR5cGUgeyBQbHVnaW5PcHRpb24gfSBmcm9tICd2aXRlJ1xyXG5pbXBvcnQgeyBwcmVzZXRVbm8sIHByZXNldEF0dHJpYnV0aWZ5LCBwcmVzZXRJY29ucyB9IGZyb20gJ3Vub2NzcydcclxuaW1wb3J0IHsgY29uZmlnUGFnZUltcG9ydFBsdWdpbiB9IGZyb20gJy4vcGFnZXMnXHJcbmltcG9ydCB7IHZpc3VhbGl6ZXIgfSBmcm9tICdyb2xsdXAtcGx1Z2luLXZpc3VhbGl6ZXInXHJcbmltcG9ydCB7IHByZWxvYWRQbHVnaW4gfSBmcm9tICcuL3ByZWxvYWQnXHJcbmltcG9ydCByZWFjdCBmcm9tICdAdml0ZWpzL3BsdWdpbi1yZWFjdCdcclxuaW1wb3J0IFVub2NzcyBmcm9tICd1bm9jc3Mvdml0ZSdcclxuaW1wb3J0IHZpdGVDb21wcmVzc2lvbiBmcm9tICd2aXRlLXBsdWdpbi1jb21wcmVzc2lvbidcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVWaXRlUGx1Z2lucygpIHtcclxuICAvLyBcdTYzRDJcdTRFRjZcdTUzQzJcdTY1NzBcclxuICBjb25zdCB2aXRlUGx1Z2luczogUGx1Z2luT3B0aW9uW10gPSBbXHJcbiAgICByZWFjdCgpLFxyXG4gICAgVW5vY3NzKHtcclxuICAgICAgcHJlc2V0czogW1xyXG4gICAgICAgIHByZXNldFVubygpLCBcclxuICAgICAgICBwcmVzZXRBdHRyaWJ1dGlmeSgpLCBcclxuICAgICAgICBwcmVzZXRJY29ucygpXHJcbiAgICAgIF0sXHJcbiAgICB9KSxcclxuICAgIC8vIFx1NTMwNVx1NTIwNlx1Njc5MFxyXG4gICAgdmlzdWFsaXplcih7XHJcbiAgICAgIGd6aXBTaXplOiB0cnVlLFxyXG4gICAgICBicm90bGlTaXplOiB0cnVlLFxyXG4gICAgfSksXHJcbiAgICAvLyBcdTUzOEJcdTdGMjlcdTUzMDVcclxuICAgIHZpdGVDb21wcmVzc2lvbigpLFxyXG4gICAgLy8gXHU4MUVBXHU1MkE4XHU3NTFGXHU2MjEwXHU4REVGXHU3NTMxXHJcbiAgICBjb25maWdQYWdlSW1wb3J0UGx1Z2luKCksXHJcbiAgICAvLyBcdTk4ODRcdTUyQTBcdThGN0RcdTU5MDRcdTc0MDZcclxuICAgIHByb2Nlc3MuZW52Lk5PREVfRU5WID09PSAncHJvZHVjdGlvbicgJiYgcHJlbG9hZFBsdWdpbigpXHJcbiAgXVxyXG5cclxuICByZXR1cm4gdml0ZVBsdWdpbnNcclxufSIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiRDpcXFxcY2FzZVxcXFxyZWFjdC1hZG1pblxcXFxidWlsZFxcXFxwbHVnaW5zXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJEOlxcXFxjYXNlXFxcXHJlYWN0LWFkbWluXFxcXGJ1aWxkXFxcXHBsdWdpbnNcXFxccGFnZXMudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0Q6L2Nhc2UvcmVhY3QtYWRtaW4vYnVpbGQvcGx1Z2lucy9wYWdlcy50c1wiO2ltcG9ydCBQYWdlcyBmcm9tICd2aXRlLXBsdWdpbi1wYWdlcydcclxuXHJcbi8qKlxyXG4gKiBAZGVzY3JpcHRpb24gXHU4MUVBXHU1MkE4XHU3NTFGXHU2MjEwXHU4REVGXHU3NTMxXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gY29uZmlnUGFnZUltcG9ydFBsdWdpbigpIHtcclxuICByZXR1cm4gW1xyXG4gICAgUGFnZXMoe1xyXG4gICAgICByZXNvbHZlcjogJ3JlYWN0JyxcclxuICAgICAgaW1wb3J0TW9kZTogJ3N5bmMnLFxyXG4gICAgICByb3V0ZVN0eWxlOiAnbmV4dCcsXHJcbiAgICAgIGV4dGVuc2lvbnM6IFsndHN4JywgJ2pzeCddLFxyXG4gICAgICBleGNsdWRlOiBbXHJcbiAgICAgICAgJyoqL2NvbXBvbmVudHMvKiovKicsXHJcbiAgICAgICAgJyoqL3V0aWxzLyoqLyonLFxyXG4gICAgICAgICcqKi9saWIvKiovKicsXHJcbiAgICAgICAgJyoqL2hvb2tzLyoqLyonLFxyXG4gICAgICAgICcqKi9tb2RlbC50c3gnLFxyXG4gICAgICAgICcqKi90ZXN0cy8qKi8qJyxcclxuICAgICAgICAnKiovX190ZXN0X18vKiovKidcclxuICAgICAgXSxcclxuICAgIH0pXHJcbiAgXVxyXG59IiwgImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFxjYXNlXFxcXHJlYWN0LWFkbWluXFxcXGJ1aWxkXFxcXHBsdWdpbnNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkQ6XFxcXGNhc2VcXFxccmVhY3QtYWRtaW5cXFxcYnVpbGRcXFxccGx1Z2luc1xcXFxwcmVsb2FkLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9EOi9jYXNlL3JlYWN0LWFkbWluL2J1aWxkL3BsdWdpbnMvcHJlbG9hZC50c1wiO2ltcG9ydCB0eXBlIHsgUGx1Z2luT3B0aW9uIH0gZnJvbSAndml0ZSdcclxuaW1wb3J0IHsgbGF6eUNTUywgbGF6eUpTLCBwcmVsb2FkTG9hZCB9IGZyb20gJy4uL2NvbmZpZydcclxuaW1wb3J0IHsgaGFuZGxlTGF6eUNTUywgaGFuZGxlTGF6eUpTLCBoYW5kbGVQcmVsb2FkSHRtbCB9IGZyb20gJy4uL3V0aWxzJ1xyXG5cclxuLyoqXHJcbiAqIFx1OTg4NFx1NTJBMFx1OEY3RFx1NTkwNFx1NzQwNlxyXG4gKiBAcGFyYW0gcGF0aHMgLSBcdThERUZcdTVGODRcclxuICovXHJcbmV4cG9ydCBjb25zdCBwcmVsb2FkUGx1Z2luID0gKHRpbWUgPSAxMDAwKTogUGx1Z2luT3B0aW9uID0+IHtcclxuICByZXR1cm4ge1xyXG4gICAgbmFtZTogJ3ZpdGUtcHJlZmV0Y2gtcGx1Z2luJyxcclxuICAgIGFzeW5jIHRyYW5zZm9ybUluZGV4SHRtbChodG1sOiBzdHJpbmcpIHtcclxuICAgICAgaHRtbCA9IGh0bWwucmVwbGFjZSgvbW9kdWxlcHJlbG9hZC9nLCAncHJlZmV0Y2gnKVxyXG5cclxuICAgICAgaWYgKCFwcmVsb2FkTG9hZC5sZW5ndGgpIHJldHVybiBodG1sXHJcblxyXG4gICAgICAvLyBcdTk4ODRcdTUyQTBcdThGN0Rqc1xyXG4gICAgICBwcmVsb2FkTG9hZC5mb3JFYWNoKChpdGVtKSA9PiB7XHJcbiAgICAgICAgaHRtbCA9IGhhbmRsZVByZWxvYWRIdG1sKGh0bWwsIGAvJHtpdGVtfWApXHJcbiAgICAgIH0pXHJcblxyXG4gICAgICAvLyBcdTYxRDJcdTUyQTBcdThGN0Rqc1xyXG4gICAgICBjb25zdCBsYXp5SlNBcnI6IHN0cmluZ1tdID0gW11cclxuICAgICAgbGF6eUpTLmZvckVhY2goKGl0ZW0pID0+IHtcclxuICAgICAgICBjb25zdCBwcm9wcyA9IHsgaHRtbCwgcGF0aDogYC8ke2l0ZW19YCwgYXJyOiBsYXp5SlNBcnIgfVxyXG4gICAgICAgIGh0bWwgPSBoYW5kbGVMYXp5SlMocHJvcHMpXHJcbiAgICAgIH0pXHJcblxyXG4gICAgICAvLyBcdTYxRDJcdTUyQTBcdThGN0Rjc3NcclxuICAgICAgY29uc3QgbGF6eUNTU0Fycjogc3RyaW5nW10gPSBbXVxyXG4gICAgICBsYXp5Q1NTLmZvckVhY2goKGl0ZW0pID0+IHtcclxuICAgICAgICBjb25zdCBwcm9wcyA9IHsgaHRtbCwgcGF0aDogYC8ke2l0ZW19YCwgYXJyOiBsYXp5Q1NTQXJyIH1cclxuICAgICAgICBodG1sID0gaGFuZGxlTGF6eUNTUyhwcm9wcylcclxuICAgICAgfSlcclxuXHJcbiAgICAgIGNvbnN0IHRpZW1vdXQgPSBgPC9ib2R5PlxyXG4gICAgICA8c2NyaXB0PlxyXG4gICAgICAgIGxldCBocmVmID0gd2luZG93LmxvY2F0aW9uLmhyZWY7XHJcbiAgICAgICAgLy8gXHU1M0JCXHU5NjY0c2VhcmNoXHJcbiAgICAgICAgY29uc3Qgc2VhcmNoSW5kZXggPSBocmVmLmluZGV4T2YoJz8nKTtcclxuICAgICAgICBpZiAoc2VhcmNoSW5kZXggPiAwKSBocmVmID0gaHJlZi5zdWJzdHJpbmcoMCwgc2VhcmNoSW5kZXgpO1xyXG4gICAgICAgIGNvbnN0IGFyciA9IGhyZWYuc3BsaXQoJy8nKTtcclxuICAgICAgICBjb25zdCBuYW1lID0gYXJyW2Fyci5sZW5ndGggLSAxXTsgLy8gXHU4M0I3XHU1M0Q2XHU1NDBEXHU3OUYwXHJcbiAgICAgICAgY29uc29sZS5sb2coJ25hbWU6JywgbmFtZSlcclxuXHJcbiAgICAgICAgY29uc3QgbGF6eUNTUyA9ICR7SlNPTi5zdHJpbmdpZnkobGF6eUNTU0Fycil9O1xyXG5cclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxhenlDU1MubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgIGlmIChsYXp5Q1NTW2ldLmluY2x1ZGVzKG5hbWUpKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdjc3M6JywgbGF6eUNTU1tpXSlcclxuICAgICAgICAgICAgY29uc3QgZWxlbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJsaW5rXCIpO1xyXG4gICAgICAgICAgICBlbGVtLnJlbCA9IFwic3R5bGVzaGVldFwiO1xyXG4gICAgICAgICAgICBlbGVtLnR5cGUgPSBcInRleHQvY3NzXCI7XHJcbiAgICAgICAgICAgIGVsZW0uaHJlZiA9IGxhenlDU1NbaV07XHJcbiAgICAgICAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoZWxlbSk7XHJcblxyXG4gICAgICAgICAgICBsYXp5Q1NTLnNwbGl0KGksIDEpO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnNvbGUubG9nKCdsYXp5Q1NTOicsIGxhenlDU1MpXHJcblxyXG4gICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICBsYXp5Q1NTLmZvckVhY2goaXRlbSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IGVsZW0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwibGlua1wiKTtcclxuICAgICAgICAgICAgZWxlbS5yZWwgPSBcInN0eWxlc2hlZXRcIjtcclxuICAgICAgICAgICAgZWxlbS50eXBlID0gXCJ0ZXh0L2Nzc1wiO1xyXG4gICAgICAgICAgICBlbGVtLmhyZWYgPSBpdGVtO1xyXG4gICAgICAgICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGVsZW0pO1xyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgfSwgJHt0aW1lfSlcclxuXHJcbiAgICAgICAgY29uc3QgbGF6eUpTID0gJHtKU09OLnN0cmluZ2lmeShsYXp5SlNBcnIpfTtcclxuXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsYXp5SlMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgIGlmIChsYXp5SlNbaV0uaW5jbHVkZXMobmFtZSkpIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coJ2pzOicsIGxhenlKU1tpXSlcclxuICAgICAgICAgICAgZmV0Y2gobGF6eUpTW2ldKTtcclxuICAgICAgICAgICAgbGF6eUpTLnNwbGl0KGksIDEpO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnNvbGUubG9nKCdsYXp5SlM6JywgbGF6eUpTKVxyXG5cclxuICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgbGF6eUpTLmZvckVhY2goaXRlbSA9PiBmZXRjaChpdGVtKSlcclxuICAgICAgICB9LCAke3RpbWV9KTtcclxuICAgICAgICA8L3NjcmlwdD5gXHJcblxyXG4gICAgICByZXR1cm4gaHRtbC5yZXBsYWNlKCc8L2JvZHk+JywgdGllbW91dClcclxuICAgIH1cclxuICB9XHJcbn1cclxuIiwgImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFxjYXNlXFxcXHJlYWN0LWFkbWluXFxcXGJ1aWxkXFxcXHZpdGVcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkQ6XFxcXGNhc2VcXFxccmVhY3QtYWRtaW5cXFxcYnVpbGRcXFxcdml0ZVxcXFxidWlsZC50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vRDovY2FzZS9yZWFjdC1hZG1pbi9idWlsZC92aXRlL2J1aWxkLnRzXCI7aW1wb3J0IHR5cGUgeyBCdWlsZE9wdGlvbnMgfSBmcm9tICd2aXRlJ1xyXG5pbXBvcnQgeyBzcGxpdEpTTW9kdWxlcywgc3BsaXRQYWdlIH0gZnJvbSAnLi4vdXRpbHMnXHJcbmltcG9ydCB7XHJcbiAgQ09NUF9QQVRILFxyXG4gIENPTVBfUFJFRklYLFxyXG4gIExBWU9VVFNfUEFUSCxcclxuICBMQVlPVVRTX05BTUUsXHJcbiAgUEFHRVNfUEFUSFxyXG59IGZyb20gJy4uL2NvbmZpZydcclxuXHJcbi8qKlxyXG4gKiBAZGVzY3JpcHRpb24gXHU1MjA2XHU1MzA1XHU5MTREXHU3RjZFXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gYnVpbGRPcHRpb25zKCk6IEJ1aWxkT3B0aW9ucyB7XHJcbiAgcmV0dXJuIHtcclxuICAgIGNodW5rU2l6ZVdhcm5pbmdMaW1pdDogMTAwMCwgLy8gXHU1OTI3XHU0RThFMTAwMGtcdTYyNERcdThCNjZcdTU0NEFcclxuICAgIHJvbGx1cE9wdGlvbnM6IHtcclxuICAgICAgb3V0cHV0OiB7XHJcbiAgICAgICAgY2h1bmtGaWxlTmFtZXM6ICdhc3NldHMvanMvW25hbWVdLltoYXNoXS5qcycsXHJcbiAgICAgICAgZW50cnlGaWxlTmFtZXM6ICdhc3NldHMvanMvW25hbWVdLltoYXNoXS5qcycsXHJcbiAgICAgICAgYXNzZXRGaWxlTmFtZXM6ICdhc3NldHMvW2V4dF0vW25hbWVdLltoYXNoXS5bZXh0XScsXHJcbiAgICAgICAgbWFudWFsQ2h1bmtzKGlkKSB7XHJcbiAgICAgICAgICAvLyBKU1x1NkEyMVx1NTc1N1xyXG4gICAgICAgICAgaWYgKGlkLmluY2x1ZGVzKCdub2RlX21vZHVsZXMnKSkge1xyXG4gICAgICAgICAgICByZXR1cm4gc3BsaXRKU01vZHVsZXMoaWQpXHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgLy8gXHU1RTAzXHU1QzQwXHJcbiAgICAgICAgICBpZiAoaWQuaW5jbHVkZXMoTEFZT1VUU19QQVRIKSkge1xyXG4gICAgICAgICAgICByZXR1cm4gTEFZT1VUU19OQU1FXHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgLy8gXHU1MTZDXHU1MTcxXHU3RUM0XHU0RUY2XHJcbiAgICAgICAgICBpZiAoaWQuaW5jbHVkZXMoQ09NUF9QQVRIKSkge1xyXG4gICAgICAgICAgICBjb25zdCByZXN1bHQgPSBpZFxyXG4gICAgICAgICAgICAgIC5zcGxpdChDT01QX1BBVEgpWzFdXHJcbiAgICAgICAgICAgICAgLnNwbGl0KCcvJylbMF1cclxuXHJcbiAgICAgICAgICAgIHJldHVybiBgJHtDT01QX1BSRUZJWH0ke3Jlc3VsdH1gXHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgLy8gXHU5ODc1XHU5NzYyXHU1MjA2XHU1MzA1XHJcbiAgICAgICAgICBpZiAoaWQuaW5jbHVkZXMoUEFHRVNfUEFUSCkpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHNwbGl0UGFnZShpZClcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcbn0iXSwKICAibWFwcGluZ3MiOiAiO0FBQWlQLFNBQVMsY0FBYyxlQUFlOzs7QUNDaFIsSUFBTSxZQUFZ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
