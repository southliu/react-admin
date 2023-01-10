import type { PluginOption } from 'vite'
import { lazyCSS, lazyJS, preloadLoad } from '../config'
import {
  handleLazyCSS,
  handleLazyJS,
  handlePreloadHtml
} from '../utils'

/**
 * 预加载处理
 * @param paths - 路径
 */
export const preloadPlugin = (time = 1000): PluginOption => {
  return {
    name: 'vite-prefetch-plugin',
    async transformIndexHtml(html: string) {
      html = html.replace(/modulepreload/g, 'prefetch')

      if (!preloadLoad.length) return html

      // 预加载js
      preloadLoad.forEach((item) => {
        html = handlePreloadHtml(html, `/${item}`)
      })

      // 懒加载js
      const lazyJSArr: string[] = []
      lazyJS.forEach((item) => {
        const props = { html, path: `/${item}`, arr: lazyJSArr }
        html = handleLazyJS(props)
      })

      // 懒加载css
      const lazyCSSArr: string[] = []
      lazyCSS.forEach((item) => {
        const props = { html, path: `/${item}`, arr: lazyCSSArr }
        html = handleLazyCSS(props)
      })

      const timeout = `</body>
      <script>
        let href = window.location.href;
        // 去除search
        const searchIndex = href.indexOf('?');
        if (searchIndex > 0) href = href.substring(0, searchIndex);
        const arr = href.split('/');
        const name = arr[arr.length - 1]; // 获取名称

        const lazyCSS = ${JSON.stringify(lazyCSSArr)};

        for (let i = lazyCSS.length - 1; i >= 0; i--) {
          if (lazyCSS[i].includes(name)) {
            const elem = document.createElement("link");
            elem.rel = "stylesheet";
            elem.type = "text/css";
            elem.href = lazyCSS[i];
            document.body.appendChild(elem);

            lazyCSS.splice(i, 1);
          }
  
          setTimeout(function() {
            for (let i = lazyCSS.length - 1; i >= 0; i--) {
              const elem = document.createElement("link");
              elem.rel = "stylesheet";
              elem.type = "text/css";
              elem.href = lazyCSS[i] + '?v=' + new Date().getTime();
              document.body.appendChild(elem);
            }
          }, ${time})
        }

        const lazyJS = ${JSON.stringify(lazyJSArr)};

        // 数据大屏或首页echarts提前渲染
        if (name === 'dataScreen' || name === 'dashboard') {
          for (let i = lazyJS.length - 1; i >= 0; i--) {
            if (lazyJS[i].includes('echarts')) {
              const elem = document.createElement("link");
              elem.rel = "modulepreload";
              elem.crossorigin = "";
              elem.href = lazyJS[i];
              document.body.appendChild(elem);

              lazyJS.splice(i, 1);
            }
          }
        }

        for (let i = lazyJS.length - 1; i >= 0; i--) {
          if (lazyJS[i].includes(name)) {
            const elem = document.createElement("link");
            elem.rel = "modulepreload";
            elem.crossorigin = "";
            elem.href = lazyJS[i];
            document.body.appendChild(elem);

            lazyJS.splice(i, 1);
          }
        }

        setTimeout(function() {
          for (let i = 0; i < lazyJS.length; i++) {
            fetch(lazyJS[i]);
          }
        }, ${time});
        </script>`

      return html.replace('</body>', timeout)
    }
  }
}
