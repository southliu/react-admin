import React from "react"
import ReactDOM from "react-dom/client"
import Router from "./router"

// 样式
import "uno.css"
import "nprogress/nprogress.css"
import "@/assets/css/scrollbar.less"

// antd
import { ConfigProvider } from 'antd'
import 'antd/dist/antd.css'
import zhCN from 'antd/es/locale/zh_CN'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ConfigProvider locale={zhCN}>
      <Router />
    </ConfigProvider>
  </React.StrictMode>
)
