import type { MenuProps } from 'antd'
import { Menu } from 'antd'
import { RootState } from '@/stores'
import { useSelector } from 'react-redux'
import { menus } from '@/menus'
import { useNavigate } from 'react-router-dom'
import styles from '../index.module.less'

function LayoutMenu() {
  const navigate = useNavigate()

  // 菜单是否收缩
  const collapsed = useSelector((state: RootState) => state.menu.collapsed)

  /** 点击菜单 */
  const onClick: MenuProps['onClick'] = e => {
    console.log('click ', e)
    navigate(e.key)
  }

  return (
    <Menu
      className={styles.menu}
      onClick={onClick}
      defaultSelectedKeys={['/dashboard']}
      defaultOpenKeys={['Dashboard']}
      mode="inline"
      theme="dark"
      inlineCollapsed={collapsed}
      items={menus}
    />
  )
}

export default LayoutMenu