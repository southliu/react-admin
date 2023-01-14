import type { PluginOption, ViteDevServer } from 'vite'
import process from 'process'
import path from 'path'
import fs from 'fs'

/**
 * 协商缓存处理
 */
export const cachePlugin = (): PluginOption => {
  let _server: ViteDevServer
  let cache = {}
  const cachePath = path.resolve('./', 'node_modules/.vite/cache/')
  const cacheJson = `${cachePath}/cache.json`

  return {
    name: 'vite-cache-plugin',
    configureServer: async server => {
      _server = server
      server.middlewares.use((req, res, next) => {
        // 如果存在缓存
        if (cache && typeof cache === 'string') cache = JSON.parse(cache)
        if (cache[req.url]) {
          const ifNoneMatch = req.headers['if-none-match']
          if (ifNoneMatch && cache[req.url] === ifNoneMatch) {
            const { moduleGraph, transformRequest } = server
            if (moduleGraph?.urlToModuleMap?.size && moduleGraph?.urlToModuleMap?.get(req.url)?.transformResult) {
              next()
              return false
            } 

            res.statusCode = 304
            setTimeout(() => {
              transformRequest(req.url, {
                html: req.headers.accept?.includes('text/html')
              })
            }, 3000)
            return res.end()
            
          }
        }

        next()
      })
    },
    buildStart: async () => {
      if (fs.existsSync(cacheJson)) {
        const value = fs.readFileSync(cacheJson, { encoding: 'utf-8' })?.toString() || '{}'
        cache = JSON.parse(value)
      }

      // 添加ctrl+c事件，dev server会因为ctrl+c而关闭
      process.once('SIGINT', async () => {
        try {
          await _server.close()
        } finally {
          process.exit()
        }
      })
    },
    buildEnd: async () => {
      if (!fs.existsSync(cachePath)) {
        fs.mkdirSync(cachePath)
      }

      if (cache && typeof cache === 'string') cache = JSON.parse(cache)
      for (const key in _server?.moduleGraph?.urlToModuleMap) {
        const value = _server.moduleGraph.urlToModuleMap.get(key)

        if (value.transformResult?.etag) {
          cache[key] = value.transformResult.etag
        }
      }

      fs.writeFileSync(cacheJson, JSON.stringify(cache))
    }
  }
}