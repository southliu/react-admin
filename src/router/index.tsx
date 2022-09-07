import {
  BrowserRouter,
  useRoutes
} from "react-router-dom"
import { Suspense } from 'react'
import routes from '~react-pages'

function Router() {
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