import { HashRouter as Router } from 'react-router-dom'
import { useEffect } from 'react'
import nprogress from 'nprogress'
import App from './App'

// antd
import { theme, ConfigProvider } from 'antd'
import zhCN from 'antd/locale/zh_CN'

// antd主题
import type { Locale } from 'antd/es/locale-provider'
import type { RootState } from "@/stores"
import { useSelector } from "react-redux"
const { defaultAlgorithm, darkAlgorithm } = theme

// keepalive
import { AliveScope } from 'react-activation'

function Page() {
  const theme = useSelector((state: RootState) => state.public.theme)

  // 顶部进度条
  useEffect(() => {
    nprogress.done()
    return () => {
      nprogress.start()
    }
  }, [])

  // 临时类型，为了解决打包之后语言包失效问题
  interface ILocale extends Locale {
    default: Locale;
  }

  return (
    <Router>
      <ConfigProvider
        locale={(zhCN as ILocale)?.default ?? zhCN}
        theme={{
          algorithm: [theme === 'dark' ? darkAlgorithm : defaultAlgorithm]
        }}
      >
        <AliveScope>
          <App />
        </AliveScope>
      </ConfigProvider>
    </Router>
  )
}

export default Page