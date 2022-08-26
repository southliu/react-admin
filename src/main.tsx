import React from "react"
import ReactDOM from "react-dom/client"
import Router from "./router"

// 样式
import "uno.css"
import "nprogress/nprogress.css"
import "@/assets/css/scrollbar.less"

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Router />
  </React.StrictMode>
)
