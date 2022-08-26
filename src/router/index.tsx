import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom"
import App from "@/pages/test"
import Login from "@/pages/login"
import Dashboard from "@/pages/dashboard"

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="login" element={<Login />} />
        <Route path="dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  )
}

export default Router