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

  // 是否窗口最大化
  const isMaximize = useSelector((state: RootState) => state.tabs.isMaximize)
  // 菜单是否收缩
  const isCollapsed = useSelector((state: RootState) => state.menu.isCollapsed)

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
        ${isCollapsed ? styles.headerCloseMenu : ''}
        ${isMaximize ? styles.headerNone : ''}
      `}>
        <Header />
        <Tabs />
      </div>
      <Menu />
      <div
        className={`
          overflow-hidden
          bg-white
          transition-all
          ${styles.con}
          ${isMaximize ? styles.conMaximize : ''}
        `}
      >
        <Outlet />
      </div>
    </div>
  )
}

export default Layout