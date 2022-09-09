import React from "react"
import ReactDOM from "react-dom/client"
import Router from "./router"

// 状态管理
import { Provider } from 'react-redux'
import { store } from './stores'

// 样式
import "uno.css"
import "nprogress/nprogress.css"
import "@/assets/css/scrollbar.less"

// antd
import { ConfigProvider } from 'antd'
import 'antd/dist/antd.css'
import zhCN from 'antd/es/locale/zh_CN'

// 关闭loading
if (document?.getElementById('first')) {
  (document.getElementById('first') as HTMLElement).style.display = 'none'
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ConfigProvider locale={zhCN}>
      <Provider store={store}>
        <Router />
      </Provider>
    </ConfigProvider>
  </React.StrictMode>
)
