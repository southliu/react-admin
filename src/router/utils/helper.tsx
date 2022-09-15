import type { RouteObject } from 'react-router-dom'

/**
 * 路由添加layout
 * @param routes - 路由数据
 */
export function layoutRoutes(routes: RouteObject[]): RouteObject[] {
  const layouts: RouteObject[] = [] // layout内部组件

  for (let i = 0; i < routes.length; i++) {
    // 路径为根目录或登录页不添加layouts
    if (routes[i].path !== '/' && routes[i].path !== 'login') {
      layouts.push(routes[i])
    }
  }

  return layouts
}