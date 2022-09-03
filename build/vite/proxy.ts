import type { ProxyOptions } from "vite"

type ProxyList = [string, string][]

type ProxyTargetList = Record<string, ProxyOptions>

/**
 * 创建跨域
 * @param list - 二维数组参数
 */
export function createProxy(list: ProxyList = []) {
  const res: ProxyTargetList = {}
  
  for (const [prefix, target] of list) {
    res[`^${prefix}`] = {
      target,
      changeOrigin: true,
      // ws: true,
      rewrite: path => path.replace(new RegExp(`^${prefix}`), ''),
    }
  }

  return res
}