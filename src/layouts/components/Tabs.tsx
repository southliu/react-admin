import type { TabsProps } from 'antd'
import type { AppDispatch, RootState } from '@/stores'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { getMenuByKey, getOpenMenuByRouter } from '@/menus/utils/helper'
import { defaultMenus } from '@/menus'
import { message, Tabs, Dropdown } from 'antd'
import { useLocation, useNavigate } from 'react-router-dom'
import { setActiveKey, addTabs, closeTabs, setNav } from '@/stores/tabs'
import { useAliveController } from 'react-activation'
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
  const { refresh } = useAliveController()
  const [isRefresh, setRefresh] = useState(false) // 重新加载
  const [time, setTime] = useState<null | NodeJS.Timeout>(null)

  const tabs = useSelector((state: RootState) => state.tabs.tabs)
  const activeKey = useSelector((state: RootState) => state.tabs.activeKey)
  const permissions = useSelector((state: RootState) => state.user.permissions)
  // 是否窗口最大化
  const isMaximize = useSelector((state: RootState) => state.tabs.isMaximize)

  /**
   * 添加标签
   * @param path - 路径
   */
  const handleAddTab = useCallback((path = location.pathname) => {
    // 当值为空时匹配路由
    if (permissions.length > 0) {
      if (path === '/') return
      const menuByKeyProps = {
        menus: defaultMenus,
        permissions,
        key: path
      }
      const newItems = getMenuByKey(menuByKeyProps)
      if (newItems) {
        dispatch(setActiveKey(newItems.key))
        dispatch(setNav(newItems.nav))
        dispatch(addTabs(newItems))
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [permissions])

  useEffect(() => {
    handleAddTab()
  }, [handleAddTab])

  useEffect(() => {
    // 当选中贴标签不等于当前路由则跳转
    if (activeKey && activeKey !== location.pathname) {
      navigate(activeKey)
      handleAddTab(activeKey)

      // 处理菜单展开
      const openKey = getOpenMenuByRouter(activeKey)
      dispatch(setOpenKey(openKey))
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeKey, location.pathname])
    
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

  /** 
   * 点击重新加载
   */
   const onClickRefresh = useCallback((key = activeKey) => {
    // 如果key不是字符串格式则退出
    if (typeof key !== 'string') return

    // 定时器没有执行时运行
    if (!time) {
      setRefresh(true)
      refresh(key)
      navigate('/loading')

      setTime(
        setTimeout(() => {
          // 当选中的key和激活的key不同则更改
          if (key !== activeKey) {
            dispatch(setActiveKey(key))
          }

          setRefresh(false)
          navigate(key)
          message.success({
            content: '刷新成功',
            key: 'refresh'
          })
          setTime(null)
        }, 1000)
      )
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeKey, time])

  // 渲染重新加载
  const RefreshRender = useMemo(() => {
    return (
      <TabRefresh
        isRefresh={isRefresh}
        onClick={onClickRefresh}
      />
    )
  }, [isRefresh, onClickRefresh])

  // 渲染标签操作
  const TabOptionsRender = useMemo(() => {
    return (
      <TabOptions
        activeKey={activeKey}
        handleRefresh={onClickRefresh}
      />
    )
  }, [activeKey, onClickRefresh])

  // 渲染最大化操作
  const TabMaximizeRender = useMemo(() => {
    return <TabMaximize />
  }, [])

  // 标签栏功能
  const tabOptions = [
    { element: RefreshRender },
    { element: TabOptionsRender },
    { element: TabMaximizeRender }
  ]

  /** 二次封装标签 */
  const renderTabBar: TabsProps['renderTabBar'] = (tabBarProps, DefaultTabBar) => (
    <DefaultTabBar {...tabBarProps}>
      { node => (
        <Dropdown
          key={node.key}
          overlay={(
            <DropdownMenu
              activeKey={node.key as string}
              handleRefresh={onClickRefresh}
            />
          )}
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