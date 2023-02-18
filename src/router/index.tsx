import { useEffect } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import nprogress from 'nprogress'
import App from './App'

// antd
import { theme, ConfigProvider } from 'antd'
import zhCN from 'antd/es/locale/zh_CN'

// antd主题
import type { RootState } from '@/stores'
import { useSelector } from 'react-redux'
const { defaultAlgorithm, darkAlgorithm } = theme

// keepalive
import { AliveScope } from 'react-activation'

function Page() {
  const theme = useSelector((state: RootState) => state.public.theme)

  // 顶部进度条
  useEffect(() => {
    nprogress.done()

    // 关闭loading
    const firstElement = document.getElementById('first')
    if (firstElement && firstElement.style?.display !== 'none') {
      firstElement.style.display = 'none'
    }

    return () => {
      nprogress.start()
    }
  }, [])

  return (
      <Router>
        <ConfigProvider
          locale={zhCN}
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