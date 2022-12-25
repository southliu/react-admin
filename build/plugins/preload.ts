import type { PluginOption } from 'vite'
import { lazyCSS, preloadLoad } from '../config'
import { handleLazyCSS, handlePreloadHtml } from '../utils'

/**
 * 预加载处理
 * @param paths - 路径
 */
export const preloadPlugin = (time = 500): PluginOption => {
  return {
    name: 'vite-prefetch-plugin',
    async transformIndexHtml(html: string) {
      html = html.replace(/modulepreload/g, 'prefetch')

      if (!preloadLoad.length) return html

      // 预加载js
      preloadLoad.forEach((item) => {
        html = handlePreloadHtml(html, `/${item}.`)
      })

      const lazyCSSArr: string[] = []
      // 懒加载css
      lazyCSS.forEach((item) => {
        const props = { html, path: `/${item}`, arr: lazyCSSArr }
        html = handleLazyCSS(props)
      })

      const tiemout = `
        </body>
        <script>
          const lazyPages = ${JSON.stringify(lazyCSSArr)};
          setTimeout(function(){
            lazyPages.forEach(item => {
              const elem = document.createElement("link");
              elem.rel = "stylesheet";
              elem.type = "text/css";
              elem.href = item;
              document.body.appendChild(elem);
            });
          }, ${time})
        </script>
      `

      return html.replace('</body>', tiemout)
    }
  }
}
