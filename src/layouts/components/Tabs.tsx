import type { TabsProps } from 'antd'
import type { AppDispatch, RootState } from '@/stores'
import { useEffect } from 'react'
import { getMenuByKey } from '@/menus/utils/helper'
import { menus } from '@/menus'
import { Tabs, Dropdown } from 'antd'
import { useLocation, useNavigate } from 'react-router-dom'
import { setActiveKey, addTabs, closeTabs } from '@/stores/tabs'
import { useDispatch, useSelector } from 'react-redux'
import styles from '../index.module.less'
import TabRefresh from './TabRefresh'
import TabMaximize from './TabMaximize'
import TabOptions from './TabOptions'
import DropdownMenu from './DropdownMenu'
import { firstCapitalize } from '@/utils/utils'
import { setOpenKey } from '@/stores/menu'

function LayoutTabs() {
  const navigate = useNavigate()
  const location = useLocation()
  const dispatch: AppDispatch = useDispatch()
  // 是否窗口最大化
  const isMaximize = useSelector((state: RootState) => state.tabs.isMaximize)
  const tabs = useSelector((state: RootState) => state.tabs.tabs)
  const activeKey = useSelector((state: RootState) => state.tabs.activeKey)
  // 菜单展开值
  const openKey = useSelector((state: RootState) => state.menu.openKey)

  useEffect(() => {
    // 当值为空时匹配路由
    if (tabs.length === 0) {
      if (location.pathname === '/') return
      const newItems = getMenuByKey(menus, location.pathname)
      dispatch(setActiveKey(newItems.key))
      dispatch(addTabs(newItems))
    }
  }, [])

  useEffect(() => {
    // 当选中贴标签不等于当前路由则跳转
    if (activeKey && activeKey !== location.pathname) {
      navigate(activeKey)

      // 处理菜单展开
      const arr = activeKey.split('/')
      if (arr.length > 1) {
        // 取第一个单词大写为新展开菜单key
        const newOpenKey = firstCapitalize(arr[1])
        if (newOpenKey !== openKey?.[0]) {
          dispatch(setOpenKey([newOpenKey]))
        }
      }
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

  // 二次封装标签
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
      
      <div className='flex'>
        {
          tabOptions.map((item, index) => (
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