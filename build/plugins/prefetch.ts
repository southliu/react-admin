import type { PluginOption } from 'vite'

/**
 * 处理html数据
 * @param html - html数据
 * @param lazyLoad - 懒加载组件
 * @param start - 从第几位开始查找
 */
const handleHtml = (html: string, lazyLoad: string[], start = 0) => {
  lazyLoad.forEach((item) => {
    if (html.includes(item)) {
      const index = html.indexOf(`/${item}.`, start)
      const prevIndex = html.lastIndexOf('rel="', index) + 5
      const nextIndex = html.indexOf('"', prevIndex)
      const rel = html.substring(prevIndex, nextIndex)

      if (rel === 'modulepreload') {
        const prev = html.substring(0, prevIndex)
        const next = html.substring(nextIndex, html.length)
        const str = `${prev}prefetch${next}`
        html = str
      }

      if (rel === 'stylesheet') {
        const prev = html.substring(0, prevIndex)
        const next = html.substring(nextIndex, html.length)
        const str = `${prev}prefetch" as="style${next}`
        html = str
      }

      // 是否存在下一个相同名字组件
      const newIndex = html.indexOf(`/${item}.`, index + item.length)
      if (newIndex !== -1) html = handleHtml(html, lazyLoad, newIndex)
    }
  })

  return html
}

export const prefetchLazyPlugin = (lazyLoad: string[] = []): PluginOption => {
  return {
    name: 'vite-prefetch-plugin',
    async transformIndexHtml(html: string) {
      if (!lazyLoad.length) return html

      html = handleHtml(html, lazyLoad)

      return html
    }
  }
}
