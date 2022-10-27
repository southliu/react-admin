import ReactDOM from "react-dom/client"
import Router from "./router"
import '@/assets/css/public.less'

// 状态管理
import { Provider } from 'react-redux'
import { store } from './stores'

// 样式
import 'virtual:uno.css'
import "nprogress/nprogress.css"
import "@/assets/css/scrollbar.less"

// antd
import { ConfigProvider } from 'antd'
import zhCN from 'antd/es/locale/zh_CN'
import 'antd/dist/antd.less'
import '@/assets/css/antd.less'

import { AliveScope } from 'react-activation'

// 时间设为中文
import moment from 'moment'
import 'moment/dist/locale/zh-cn'
moment.locale('zh-cn')

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <ConfigProvider locale={zhCN}>
    <Provider store={store}>
      <AliveScope>
        <Router />
      </AliveScope>
    </Provider>
  </ConfigProvider>
)

// 关闭loading
if (document?.getElementById('first')) {
  (document.getElementById('first') as HTMLElement).style.display = 'none'
}