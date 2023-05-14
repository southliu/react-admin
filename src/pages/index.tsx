import { useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { defaultMenus } from '@/menus'
import { getFirstMenu } from '@/menus/utils/helper'
import { useToken } from '@/hooks/useToken'
import { useCommonStore } from '@/hooks/useCommonStore'

function Page() {
  const [getToken] = useToken()
  const { permissions } = useCommonStore()
  const token = getToken()
  const navigate = useNavigate()

  /** 跳转第一个有效菜单路径 */
  const goFirstMenu = useCallback(() => {
    const firstMenu = getFirstMenu(defaultMenus, permissions)
    navigate(firstMenu)
  }, [navigate, permissions])

  useEffect(() => {
    if (!token) return navigate('/login')

    // 跳转第一个有效菜单路径
    goFirstMenu()

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token])
  
  return (
    <div></div>
  )
}

export default Page