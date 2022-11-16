import type { AppDispatch, RootState } from '@/stores'
import type { IPasswordModal } from './UpdatePassword'
import { useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useAliveController } from 'react-activation'
import { toggleCollapsed } from '@/stores/menu'
import { useNavigate } from 'react-router-dom'
import { useToken } from '@/hooks/useToken'
import { clearInfo } from '@/stores/user'
import { closeAllTab, setActiveKey } from '@/stores/tabs'
import { Modal, Dropdown, MenuProps } from 'antd'
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
import Theme from '@/components/Theme'
import UpdatePassword from './UpdatePassword'
import Nav from './Nav'

type IMenuKey = 'password' | 'logout'

function Header() {
  const isCollapsed = useSelector((state: RootState) => state.menu.isCollapsed)
  const username = useSelector((state: RootState) => state.user.userInfo.username)
  const dispatch: AppDispatch = useDispatch()
  const navigate = useNavigate()
  const [, , removeToken] = useToken()
  const { clear } = useAliveController()
  // 是否窗口最大化
  const isMaximize = useSelector((state: RootState) => state.tabs.isMaximize)
  const nav = useSelector((state: RootState) => state.tabs.nav)
  const passwordRef = useRef<IPasswordModal>(null)

  // 下拉菜单内容
  const items: MenuProps['items'] = [
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
    switch (e.key as IMenuKey) {
      case 'password':
        passwordRef.current?.open()
        break

      case 'logout':
        handleLogout()
        break

      default:
        break
    }
  }

  /** 退出登录 */
  const handleLogout = () => {
    Modal.confirm({
      title: '温馨提示',
      icon: <ExclamationCircleOutlined />,
      content: '是否确定退出系统?',
      onOk() {
        dispatch(clearInfo())
        dispatch(closeAllTab())
        dispatch(setActiveKey(''))
        removeToken()
        clear() // 清除keepalive缓存
        navigate('/login')
      }
    })
  }

  /** 右侧组件抽离减少重复渲染 */
  const RightRender = () => {
    return (
      <div className="flex items-center">
        <GlobalSearch />
        <Fullscreen />
        <Theme />
        <Dropdown
          className="min-w-50px"
          menu={{ items, onClick }}
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
            <span className="ml-2 text-15px min-w-50px truncate">
              { username || 'south-admin' }
            </span>
          </div>
        </Dropdown>
      </div>
    )
  }

  /** icon渲染 */
  const IconRender = () => {
    return (
      <div className="text-lg cursor-pointer" onClick={() => dispatch(toggleCollapsed(!isCollapsed))}>
        { isCollapsed && <MenuUnfoldOutlined /> }
        { !isCollapsed && <MenuFoldOutlined /> }
      </div>
    )
  }

  return (
    <>
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
        <div className="flex item-center">
          <IconRender />

          <Nav
            className="ml-15px"
            list={nav}
          />
        </div>
        
        <RightRender />
      </header>

      <UpdatePassword passwordRef={passwordRef} />
    </>
  )
}

export default Header