import type { PluginOption } from 'vite'
import { lazyCss, lazyJs, preloadLoad } from '../config'
import {
  handleLazyCss,
  handleLazyJs,
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
      const lazyJsArr: string[] = []
      lazyJs.forEach((item) => {
        const props = { html, path: `/${item}`, arr: lazyJsArr }
        html = handleLazyJs(props)
      })

      // 懒加载css
      const lazyCssArr: string[] = []
      lazyCss.forEach((item) => {
        const props = { html, path: `/${item}`, arr: lazyCssArr }
        html = handleLazyCss(props)
      })

      const timeout = `</body>
      <script>
        let href = window.location.href;
        // 去除search
        const searchIndex = href.indexOf('?');
        if (searchIndex > 0) href = href.substring(0, searchIndex);
        const arr = href.split('/');
        const name = arr[arr.length - 1]; // 获取名称

        const lazyCss = ${JSON.stringify(lazyCssArr)};
        const cssLimit = 2; // 限制css最多同时加载2个
        let cssNum = 0;

        // 加载当前页面所需的css
        for (let i = lazyCss.length - 1; i >= 0; i--) {
          if (lazyCss[i].includes(name)) {
            const elem = document.createElement("link");
            elem.rel = "stylesheet";
            elem.type = "text/css";
            elem.href = lazyCss[i];
            document.body.appendChild(elem);

            lazyCss.splice(i, 1);
          }
        }

        function handleCss() {
          for (let i = lazyCss.length - 1; i >= 0 && cssNum < cssLimit; i--) {
            const elem = document.createElement("link");
            const current = lazyCss.splice(i, 1);
            elem.rel = "stylesheet";
            elem.type = "text/css";
            elem.href = current;
            document.body.appendChild(elem);
            cssNum++;

            elem.onload = () => {
              cssNum--;
              handleCss()
            }
          }
        }

        const lazyJs = ${JSON.stringify(lazyJsArr)};
        const jsLimit = 2; // 限制js最多同时加载2个
        let jsNum = 0;

        // 数据大屏或首页echarts提前渲染
        if (name === 'dataScreen' || name === 'dashboard') {
          for (let i = lazyJs.length - 1; i >= 0; i--) {
            if (lazyJs[i].includes('echarts')) {
              const elem = document.createElement("link");
              elem.rel = "modulepreload";
              elem.crossorigin = "";
              elem.href = lazyJs[i];
              document.body.appendChild(elem);

              lazyJs.splice(i, 1);
            }
          }
        }

        // 加载当前页面所需的js
        for (let i = lazyJs.length - 1; i >= 0; i--) {
          if (lazyJs[i].includes(name)) {
            const elem = document.createElement("link");
            elem.rel = "modulepreload";
            elem.crossorigin = "";
            elem.href = lazyJs[i];
            document.body.appendChild(elem);

            lazyJs.splice(i, 1);
          }
        }

        function handleJs() {
          for (let i = lazyJs.length - 1; i >= 0 && jsNum < jsLimit; i--) {
            const elem = document.createElement("script");
            const current = lazyJs.splice(i, 1);
            elem.type = "module";
            elem.async = true;
            elem.src = current;
            document.body.appendChild(elem);
            jsNum++;

            elem.onload = () => {
              jsNum--;
              handleJs();
            }
          }
        }

        setTimeout(function() {
          handleCss()
          handleJs()
        }, ${time});
      </script>`

      return html.replace('</body>', timeout)
    }
  }
}
