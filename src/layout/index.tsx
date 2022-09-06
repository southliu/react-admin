import { useToken } from '@/hooks/useToken'
import { useEffect, useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import Menu from './components/Menu'
import Header from './components/Header'
import Tabs from './components/Tabs'
import styles from './index.module.less'

function Layout() {
  const navigate = useNavigate()
  const { getToken } = useToken()
  const token = getToken()
  const [maximize, setMaximize] = useState(false)

  useEffect(() => {
    // 如果没有token，则返回登录页
    if (!token) {
      navigate('/login')
    }
  }, [])

  return (
    <div id="layout" className='w-h-full bg-white'>
      <div className={`${styles.header}`}>
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