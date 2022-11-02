import type { AppDispatch, RootState } from '@/stores'
import { useToken } from '@/hooks/useToken'
import { useCallback, useEffect, useState } from 'react'
import { useNavigate, Outlet } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getPermissions } from '@/servers/permissions'
import { permissionsToArray } from '@/utils/permissions'
import { setPermissions, setUserInfo } from '@/stores/user'
import { toggleCollapsed, togglePhone } from '@/stores/menu'
import { Skeleton } from 'antd'
import Menu from './components/Menu'
import Header from './components/Header'
import Tabs from './components/Tabs'
import Forbidden from '@/pages/403'
import styles from './index.module.less'
import { useDebounceFn } from 'ahooks'

function Layout() {
  const dispatch: AppDispatch = useDispatch()
  const navigate = useNavigate()
  const [getToken] = useToken()
  const token = getToken()
  const [isLoading, setLoading] = useState(true)

  // 权限
  const permissions = useSelector((state: RootState) => state.user.permissions)
  // 用户ID
  const userId = useSelector((state: RootState) => state.user.userInfo.id)
  // 是否窗口最大化
  const isMaximize = useSelector((state: RootState) => state.tabs.isMaximize)
  // 菜单是否收缩
  const isCollapsed = useSelector((state: RootState) => state.menu.isCollapsed)
  // 是否手机端
  const isPhone = useSelector((state: RootState) => state.menu.isPhone)

  /** 获取用户信息和权限 */
  const getUserInfo = useCallback(async () => {
    try {
      setLoading(true)
      const { data } = await getPermissions({ refresh_cache: false })
      if (data) {
        const { data: { user, permissions } } = data
        const newPermissions = permissionsToArray(permissions)
        dispatch(setUserInfo(user))
        dispatch(setPermissions(newPermissions))
      }
    } catch(err) {
      console.error('获取用户数据失败:', err)
      setPermissions([])
    } finally {
      setLoading(false)
    }
  }, [dispatch])

  useEffect(() => {
    // 如果没有token，则返回登录页
    if (!token) {
      navigate('/login')
    }

    // 当用户信息缓存不存在时则重新获取
    if (token && !userId) {
      getUserInfo()
    }
  }, [getUserInfo, navigate, token, userId])

  /** 判断是否是手机端 */
  const handleIsPhone = useDebounceFn(() => {
    const isPhone = window.innerWidth <= 768
    // 手机首次进来收缩菜单
    if (isPhone) dispatch(toggleCollapsed(true))
    dispatch(togglePhone(isPhone))
  }, { wait: 500 })

  // 监听是否是手机端
  useEffect(() => {
    window.addEventListener('resize', handleIsPhone.run())

    return () => {
      window.removeEventListener('resize', handleIsPhone.run())
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div id="layout" className='bg-white'>
      <div className={`
        transition-all
        ${styles.header}
        ${isCollapsed ? styles.headerCloseMenu : ''}
        ${isMaximize ? styles.headerNone : ''}
        ${isPhone && isCollapsed ? `!left-0 z-999` : ''}
      `}>
        <Header />
        <Tabs />
      </div>
      <Menu />
      <div
        className={`
          overflow-auto
          bg-white
          transition-all
          ${styles.con}
          ${isMaximize ? styles.conMaximize : ''}
          ${isPhone && isCollapsed ? `!left-0` : ''}
        `}
      >
        {
          isLoading &&
          permissions.length === 0 &&
          <Skeleton
            active
            className='p-30px'
            paragraph={{ rows: 10 }}
          />
        }
        {
          !isLoading &&
          permissions.length === 0 &&
          <Forbidden />
        }
        {
          permissions.length > 0 &&
          <Outlet />
        }
      </div>
    </div>
  )
}

export default Layout