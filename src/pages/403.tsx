import type { AppDispatch, RootState } from '@/stores'
import { defaultMenus } from '@/menus'
import { getMenuByKey } from '@/menus/utils/helper'
import { addTabs, setNav, setActiveKey } from '@/stores/tabs'
import { Button } from 'antd'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import styles from './all.module.less'

function Forbidden() {
  const navigate = useNavigate()
  const dispatch: AppDispatch = useDispatch()
  const permissions = useSelector((state: RootState) => state.user.permissions)

  /** 跳转首页 */
  const goIndex = () => {
    navigate('/dashboard')
    const newItems = getMenuByKey(
      defaultMenus,
      permissions,
      '/dashboard'
    )
    if (newItems.key) {
      dispatch(setActiveKey(newItems.key))
      dispatch(setNav([]))
      dispatch(addTabs(newItems))
    }
  }
  
  return (
    <div className="absolute left-50% top-50% -translate-x-1/2 -translate-y-1/2 text-center">
      <h1 className={`${styles.animation} w-full text-6rem font-bold`}>
        403
      </h1>
      <p className="w-full text-20px font-bold mt-15px text-dark-700">
        很抱歉，您的访问请求被禁止!
      </p>
      <Button className="mt-25px margin-auto" onClick={goIndex}>
        返回首页
      </Button>
    </div>
  )
}

export default Forbidden