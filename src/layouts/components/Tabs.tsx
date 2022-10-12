import type { TabsProps } from 'antd'
import type { AppDispatch, RootState } from '@/stores'
import { useEffect } from 'react'
import { getMenuByKey, getOpenMenuByRouter } from '@/menus/utils/helper'
import { defaultMenus } from '@/menus'
import { Tabs, Dropdown } from 'antd'
import { useLocation, useNavigate } from 'react-router-dom'
import { setActiveKey, addTabs, closeTabs, setNav } from '@/stores/tabs'
import { useDispatch, useSelector } from 'react-redux'
import { setOpenKey } from '@/stores/menu'
import styles from '../index.module.less'
import TabRefresh from './TabRefresh'
import TabMaximize from './TabMaximize'
import TabOptions from './TabOptions'
import DropdownMenu from './DropdownMenu'

function LayoutTabs() {
  const navigate = useNavigate()
  const location = useLocation()
  const dispatch: AppDispatch = useDispatch()
  const tabs = useSelector((state: RootState) => state.tabs.tabs)
  const activeKey = useSelector((state: RootState) => state.tabs.activeKey)
  const permissions = useSelector((state: RootState) => state.user.permissions)
  // 是否窗口最大化
  const isMaximize = useSelector((state: RootState) => state.tabs.isMaximize)

  useEffect(() => {
    // 当值为空时匹配路由
    if (tabs.length === 0 && permissions.length > 0) {
      if (location.pathname === '/') return
      const newItems = getMenuByKey(
        defaultMenus,
        permissions,
        location.pathname
      )
      if (newItems.key) {
        dispatch(setActiveKey(newItems.key))
        dispatch(setNav(newItems.nav))
        dispatch(addTabs(newItems))
      }
    }
  }, [permissions])

  useEffect(() => {
    // 当选中贴标签不等于当前路由则跳转
    if (activeKey && activeKey !== location.pathname) {
      navigate(activeKey)

      // 处理菜单展开
      const openKey = getOpenMenuByRouter(activeKey)
      dispatch(setOpenKey(openKey))
    }
  }, [activeKey])
  
  /** 
   * 处理更改
   * @param key - 唯一值
   */
  const onChange = (key: string) => {
    dispatch(setActiveKey(key))
  }

  /** 
   * 删除标签
   * @param targetKey - 目标key值
   */
  const remove = (targetKey: string) => {
    dispatch(closeTabs(targetKey))
  }

  /** 
   * 处理编辑
   * @param targetKey - 目标key值
   * @param action - 动作
   */
  const onEdit: TabsProps['onEdit'] = (targetKey, action) => {
    if (action === 'remove') {
      remove(targetKey as string)
    }
  }

  // 标签栏功能
  const tabOptions = [
    { element: <TabRefresh /> },
    { element: <TabOptions /> },
    { element: <TabMaximize /> }
  ]

  /** 二次封装标签 */
  const renderTabBar: TabsProps['renderTabBar'] = (tabBarProps, DefaultTabBar) => (
    <DefaultTabBar {...tabBarProps}>
      { node => (
        <Dropdown
          key={node.key}
          overlay={<DropdownMenu activeKey={node.key as string} />}
          trigger={['contextMenu']}
        >
          <div className='mr-3px'>
            { node }
          </div>
        </Dropdown>
      ) }
    </DefaultTabBar>
  )

  return (
    <div className={`
      flex
      items-center
      justify-between
      mx-2
      transition-all
      ${isMaximize ? styles.conMaximize : ''}
    `}>
      {
        tabs.length > 0 ?
        <Tabs
          hideAdd
          className="w-full h-30px py-0"
          onChange={onChange}
          activeKey={activeKey}
          type="editable-card"
          onEdit={onEdit}
          items={tabs}
          renderTabBar={renderTabBar}
        />
        : <span></span>
      }
      
      <div className='flex'>
        {
          tabOptions?.map((item, index) => (
            <div
              key={index}
              className={`
                ${styles.leftDivide}
                divide-solid
                w-36px
                h-36px
                text-#00000073
                hover:text-#404040
                flex
                place-content-center
                items-center
              `}
            >
              { item.element }
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default LayoutTabs