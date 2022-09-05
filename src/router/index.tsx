import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom"
import Layout from "@/layout"
import Login from "@/pages/login"
import NotFound from "@/pages/errors/404"
import { menus } from "@/menus"

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="login" element={<Login />} />
        <Route path="/" element={<Layout />}>
          {
            menus.map(item => (
              <Route
                key={item.path}
                path={item.path}
                element={<item.element />}
              />
            ))
          }
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default Router