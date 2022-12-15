// PrefetchLazyPathsPlugin.ts
export const PrefetchLazyPathsPlugin = (paths: string[] = []) => {
  return {
    name: 'prefetch-lazy-paths-plugin',
    async transformIndexHtml(html: string) {
      if (!paths.length) return html
      let prefetchStr = ''
      paths.forEach((item) => {
          prefetchStr += `<link rel="prefetch" href="${item}" as="script" />`
      })
      const newHtml = html.replace('</head>', `${prefetchStr}</head>`)
      return newHtml
    },
  }
}