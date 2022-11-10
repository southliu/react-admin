import type { MenuProps } from 'antd'
import type { ISideMenu } from '#/public'
import type { AppDispatch } from '@/stores'
import { useEffect, useState } from 'react'
import { Menu } from 'antd'
import { RootState } from '@/stores'
import { useDispatch, useSelector } from 'react-redux'
import { defaultMenus } from '@/menus'
import { useNavigate, useLocation } from 'react-router-dom'
import { setOpenKey } from '@/stores/menu'
import { addTabs, setNav, setActiveKey } from '@/stores/tabs'
import {
  filterMenus,
  getFirstMenu,
  getMenuByKey,
  getOpenMenuByRouter,
  splitPath
} from '@/menus/utils/helper'
import styles from '../index.module.less'
import Logo from '@/assets/images/logo.svg'

function LayoutMenu() {
  const navigate = useNavigate()
  const location = useLocation()
  const dispatch: AppDispatch = useDispatch()
  const [menus, setMenus] = useState<ISideMenu[]>([])
  const openKey = useSelector((state: RootState) => state.menu.openKey)
  // 是否窗口最大化
  const isMaximize = useSelector((state: RootState) => state.tabs.isMaximize)
  // 菜单是否收缩
  const isCollapsed = useSelector((state: RootState) => state.menu.isCollapsed)
  // 是否手机端
  const isPhone = useSelector((state: RootState) => state.menu.isPhone)
  // 权限
  const permissions = useSelector((state: RootState) => state.user.permissions)

  // 处理默认展开
  useEffect(() => {
    const { pathname } = location
    const newOpenKey = getOpenMenuByRouter(pathname)
    dispatch(setOpenKey(newOpenKey))
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location])

  // 过滤没权限菜单
  useEffect(() => {
    if (permissions.length > 0) {
      const newMenus = filterMenus(defaultMenus, permissions)
      setMenus(newMenus || [])
    }
  }, [permissions])

  /** 
   * 点击菜单
   * @param e - 菜单事件
   */
  const onClick: MenuProps['onClick'] = e => {
    navigate(e.key)
    const menuByKeyProps = { menus, permissions, key: e.key }
    const newTab = getMenuByKey(menuByKeyProps)
    if (newTab) {
      dispatch(setActiveKey(newTab.key))
      dispatch(setNav(newTab.nav))
      dispatch(addTabs(newTab))
    }
  }

  /**
   * 对比当前展开目录是否是同一层级
   * @param arr - 当前展开目录
   * @param lastArr - 最后展开的目录
   */
  const diffOpenMenu = (arr: string[], lastArr: string[]) => {
    let result = true

    for (let j = 0; j < arr.length; j++) {
      if (arr[j] !== lastArr[j]) {
        result = false
        break
      }
    }

    return result
  }

  /**
   * 展开/关闭回调
   * @param openKey - 展开键值
   */
  const onOpenChange = (openKey: string[]) => {
    const newOpenKey: string[] = []
    let last = '' // 最后一个目录结构

    // 当目录有展开值
    if (openKey.length > 0) {
      last = openKey[openKey.length - 1]
      const lastArr: string[] = splitPath(last)
      newOpenKey.push(last)

      // 对比当前展开目录是否是同一层级
      for (let i = openKey.length - 2; i >= 0; i--) {
        const arr = splitPath(openKey[i])
        const hasOpenKey = diffOpenMenu(arr, lastArr)
        if (hasOpenKey) newOpenKey.unshift(openKey[i])
      }
    }

    dispatch(setOpenKey(newOpenKey))
  }

  /** 点击logo */
  const onClickLogo = () => {
    const firstMenu = getFirstMenu(defaultMenus, permissions)
    navigate(firstMenu)
    const menuByKeyProps = { menus: defaultMenus, permissions, key: firstMenu }
    const newItems = getMenuByKey(menuByKeyProps)
    if (newItems) {
      dispatch(setActiveKey(newItems.key))
      dispatch(setNav([]))
      dispatch(addTabs(newItems))
    }
  }

  return (
    <div 
      className={`
        transition-all
        overflow-auto
        ${styles.menu}
        ${isCollapsed ? styles.menuClose : ''}
        ${isMaximize || (isPhone && isCollapsed) ? styles.menuNone : ''}
        ${isPhone ? 'z-1000' : ''}
      `}
    >
      <div
        className={`
          text-white
          flex
          content-center
          px-5
          py-2
          cursor-pointer
          ${isCollapsed ? 'justify-center' : ''}
        `}
        onClick={onClickLogo}
      >
        <img
          src={Logo}
          width={30}
          height={30}
          className="object-contain"
          alt="logo"
        />
        
        <span className={`
          text-white
          ml-3
          text-xl
          font-bold
          truncate
          ${isCollapsed ? 'hidden' : ''}
        `}>
          后台管理系统
        </span>
      </div>
      <Menu
        selectedKeys={[location.pathname]}
        openKeys={openKey}
        mode="inline"
        theme="dark"
        inlineCollapsed={isCollapsed}
        items={menus}
        onClick={onClick}
        onOpenChange={onOpenChange}
      />
    </div>
  )
}

export default LayoutMenu