import type { PluginOption } from 'vite'

export const prefetchLazyPathsPlugin = (jsLazyLoad: string[] = []): PluginOption => {
  return {
    name: 'vite-prefetch-plugin',
    async transformIndexHtml(html: string) {
      if (!jsLazyLoad.length) return html

      jsLazyLoad.forEach((item) => {
        if (html.includes(item)) {
          const index = html.indexOf(item)
          const prevIndex = html.lastIndexOf('rel="', index) + 5
          const nextIndex = html.indexOf('"', prevIndex)
          const rel = html.substring(prevIndex, nextIndex)

          if (rel === 'modulepreload') {
            const prev = html.substring(0, prevIndex)
            const next = html.substring(nextIndex, html.length)
            const str = `${prev}prefetch${next}`
            html = str
          }
        }
      })

      return html
    }
  }
}
