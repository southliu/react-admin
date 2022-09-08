import type { RouteObject } from "react-router-dom"
import { BrowserRouter, useRoutes } from "react-router-dom"
import { Suspense } from 'react'
import routes from '~react-pages'
import Layout from '@/layouts'

/**
 * 路由添加layout
 * @param routes - 路由数据
 */
function handleRoutes(routes: RouteObject[]): RouteObject[] {
  for (let i = 0; i < routes.length; i++) {
    // 路径为/和*和登录页不添加layout
    if (routes[i].path === '/' || routes[i].path === '*' || routes[i].path === 'login') {
      continue
    }
    
    // layout嵌套
    const temp: RouteObject = {
      caseSensitive: false,
      path: '/',
      element: <Layout />,
      children: [routes[i]]
    }
    routes[i] = temp
  }

  return routes
}

function Router() {
  handleRoutes(routes)

  const App = () => {
    return (
      <Suspense fallback={<p>Loading...</p>}>
        {useRoutes(routes)}
      </Suspense>
    )
  }

  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  )
}

export default Router