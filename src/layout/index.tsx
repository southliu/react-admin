import { useToken } from '@/hooks/useToken'
import { useEffect, useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import Menu from './components/Menu'
import Header from './components/Header'
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
    <>
      <div className={styles.header}>
        <Header />
      </div>
      <div className={styles.headerDriver}>
        <Menu />
      </div>
      <div className={styles.con}>
        <Outlet />
      </div>
    </>
  )
}

export default Layout