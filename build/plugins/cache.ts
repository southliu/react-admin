import type { PluginOption, ViteDevServer } from 'vite'
import process from 'process'
import path from 'path'
import fs from 'fs'

const name = 'vite-cache-plugin'

/**
 * 协商缓存处理
 */
export const cachePlugin = (): PluginOption => {
  // 非开发环境退出
  if (process.env.NODE_ENV !== 'development') return { name }

  let _server: ViteDevServer
  let cache = {}
  const cachePath = path.resolve('./', 'node_modules/.admin-cache/')
  const cacheJson = `${cachePath}/cache.json`

  // 文件夹不存在则创建
  if (!fs.existsSync(cachePath)) fs.mkdirSync(cachePath)

  // cache.json文件不存在则创建
  if (!fs.existsSync(cacheJson)) fs.writeFileSync(cacheJson, '{}', { encoding: 'utf-8' })

  return {
    name,
    configureServer: async (server) => {
      _server = server

      server.middlewares.use((req, res, next) => {
        // 如果存在缓存
        if (typeof cache === 'string') cache = JSON.parse(cache)

        if (cache[req.url]) {
          const ifNoneMatch = req.headers['if-none-match']
          if (ifNoneMatch && cache[req.url] === ifNoneMatch) {
            const { moduleGraph, transformRequest } = server
            if (
              moduleGraph?.urlToModuleMap?.size &&
              moduleGraph?.urlToModuleMap?.get(req.url)?.transformResult
            ) {
              next()
              return false
            } 

            res.statusCode = 304
            setTimeout(() => {
              transformRequest(req.url, {
                html: req.headers.accept?.includes('text/html')
              })
            }, 100)

            return res.end()
          }
        }

        next()
      })
    },
    buildStart: async () => {
      if (fs.existsSync(cacheJson)) {
        const value = fs.readFileSync(cacheJson, { encoding: 'utf-8' })
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
      _server?.moduleGraph?.urlToModuleMap?.forEach((value, key) => {
        if (value.transformResult?.etag) {
          cache[key] = value.transformResult.etag
        }
      })

      fs.writeFileSync(cacheJson, JSON.stringify(cache, null, 2))
    }
  }
}