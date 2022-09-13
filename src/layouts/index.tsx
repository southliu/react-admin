import type { RootState } from '@/stores'
import { useToken } from '@/hooks/useToken'
import { useEffect } from 'react'
import { useNavigate, Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Menu from './components/Menu'
import Header from './components/Header'
import Tabs from './components/Tabs'
import styles from './index.module.less'

function Layout() {
  const navigate = useNavigate()
  const { getToken } = useToken()
  const token = getToken()
  // const [maximize, setMaximize] = useState(false) // 是否窗口最大化
  // const [isPhone, setPhone] = useState(false) // 是否是手动端

  // 菜单是否收缩
  const collapsed = useSelector((state: RootState) => state.menu.collapsed)

  useEffect(() => {
    // 如果没有token，则返回登录页
    if (!token) {
      navigate('/login')
    }
  }, [])

  return (
    <div id="layout" className='w-h-full bg-white'>
      <div className={`
        transition-all
        ${styles.header}
        ${collapsed ? styles.headerCloseMenu : ''}
      `}>
        <Header />
        <Tabs />
      </div>
      <Menu />
      <div className={styles.con}>
        <Outlet />
      </div>
    </div>
  )
}

export default Layout