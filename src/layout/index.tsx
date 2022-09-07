import { useToken } from '@/hooks/useToken'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Menu from './components/Menu'
import Header from './components/Header'
import Tabs from './components/Tabs'
import styles from './index.module.less'

interface IProps {
  children: React.ReactNode;
}

function Layout(props: IProps) {
  const navigate = useNavigate()
  const { getToken } = useToken()
  const token = getToken()
  // const [maximize, setMaximize] = useState(false) // 是否窗口最大化

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
        { props.children }
      </div>
    </div>
  )
}

export default Layout