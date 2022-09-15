import type { AppDispatch, RootState } from '@/stores'
import type { ItemType } from 'antd/lib/menu/hooks/useItems'
import { useDispatch, useSelector } from 'react-redux'
import { toggleCollapsed } from '@/stores/menu'
import { useNavigate } from 'react-router-dom'
import { useToken } from '@/hooks/useToken'
import { clearInfo } from '@/stores/user'
import {
  Menu,
  Modal,
  Dropdown,
  MenuProps
} from 'antd'
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  LogoutOutlined,
  FormOutlined,
  ExclamationCircleOutlined
} from '@ant-design/icons'
import Avatar from '@/assets/images/avatar.png'
import styles from '../index.module.less'
import Fullscreen from '@/components/Fullscreen'
import GlobalSearch from '@/components/GlobalSearch'

type IMenuItem = 'password' | 'logout'

function Header() {
  const isCollapsed = useSelector((state: RootState) => state.menu.isCollapsed)
  const username = useSelector((state: RootState) => state.user.userInfo.username)
  const dispatch: AppDispatch = useDispatch()
  const navigate = useNavigate()
  // 是否窗口最大化
  const isMaximize = useSelector((state: RootState) => state.tabs.isMaximize)

  // 下拉菜单内容
  const menuList: ItemType[] = [
    {
      key: 'password',
      label: (<span>修改密码</span>),
      icon: <FormOutlined className="mr-1" />,
    },
    {
      key: 'logout',
      label: (<span>退出登录</span>),
      icon: <LogoutOutlined className="mr-1" />,
    },
  ]

  /** 点击菜单 */
  const onClick: MenuProps['onClick'] = e => {
    switch (e.key as IMenuItem) {
      case 'logout':
        handleLogout()
        break

      default:
        break
    }
  }

  // 下拉菜单内容
  const menu = (
    <Menu
      onClick={onClick}
      items={menuList}
    />
  )

  /** 退出登录 */
  const handleLogout = () => {
    Modal.confirm({
      title: '温馨提示',
      icon: <ExclamationCircleOutlined />,
      content: '是否确定退出系统?',
      onOk() {
        const { removeToken } = useToken()
        dispatch(clearInfo())
        removeToken()
        navigate('/login')
      }
    })
  }

  return (
    <header
      className={`
        flex
        items-center
        justify-between
        px-6
        py-6px
        box-border
        transition-all
        ${styles.headerDriver}
        ${isMaximize ? styles.none : ''}
      `}
    >
      <div className="text-lg cursor-pointer" onClick={() => dispatch(toggleCollapsed(!isCollapsed))}>
        { isCollapsed && <MenuUnfoldOutlined /> }
        { !isCollapsed && <MenuFoldOutlined /> }
      </div>
      
      <div className="flex items-center">
      <GlobalSearch />
      <Fullscreen />
      <Dropdown
        className="min-w-50px"
        overlay={menu}
      >
        <div
          className="ant-dropdown-link flex items-center cursor-pointer"
          onClick={e => e.preventDefault()}
        >
          <img
            src={Avatar}
            width={27}
            height={27}
            alt="头像"
            className="rounded-1/2 overflow-hidden object-cover bg-light-500"
          />
           <span className="ml-2 text-15px min-w-50px truncate">{ username || 'south-admin' }</span>
        </div>
      </Dropdown>
    </div>
    </header>
  )
}

export default Header