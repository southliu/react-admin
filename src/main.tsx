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
import '@/assets/css/theme-color.less'

// antd
import '@/assets/css/antd.less'

// 时间设为中文
import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
dayjs.locale('zh-cn')

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <Provider store={store}>
    <Router />
  </Provider>
)

// 关闭loading
if (document?.getElementById('first')) {
  (document.getElementById('first') as HTMLElement).style.display = 'none'
}