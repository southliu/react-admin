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
import zhCN from 'antd/es/locale/zh_CN'
import 'antd/dist/antd.css'
import '@/assets/css/antd.less'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <ConfigProvider locale={zhCN}>
    <Provider store={store}>
      <Router />
    </Provider>
  </ConfigProvider>
)

// 关闭loading
if (document?.getElementById('first')) {
  (document.getElementById('first') as HTMLElement).style.display = 'none'
}