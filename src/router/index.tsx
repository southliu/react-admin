import { BrowserRouter, useRoutes } from "react-router-dom"
import { Suspense } from 'react'
import { layoutRoutes } from "./utils/helper"
import routes from '~react-pages'
import Loading from '@/components/Loading'

function Router() {
  // 自动生成路径转换为layout嵌套路径
  const newRoutes = layoutRoutes(routes)
  // const [isPending, startTransition] = useTransition()

  const App = () => {
    return (
      <Suspense fallback={<Loading />}>
        {useRoutes(newRoutes)}
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