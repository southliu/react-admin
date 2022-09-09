import type { RouteObject } from 'react-router-dom'
import Layout from '@/layouts'

/**
 * 路由添加layout
 * @param routes - 路由数据
 */
export function layoutRoutes(routes: RouteObject[]): RouteObject[] {
  const res: RouteObject[] = [], layouts: RouteObject[] = []

  for (let i = 0; i < routes.length; i++) {
    // 路径为*和登录页不添加layouts
    if (routes[i].path === '/' || routes[i].path === '*' || routes[i].path === 'login') {
      res.push(routes[i])
      continue
    }
    // 否则其余都加入layouts
    layouts.push(routes[i])
  }

  if (layouts.length > 0) {
    // layout嵌套
    const temp: RouteObject = {
      caseSensitive: false,
      path: '/',
      element: <Layout />,
      children: layouts
    }
    return [...res, temp]
  }

  return res
}