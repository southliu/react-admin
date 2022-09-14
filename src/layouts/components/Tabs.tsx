import type { TabsProps } from 'antd'
import type { RootState } from '@/stores'
import { useState } from 'react'
import { Tabs } from 'antd'
import styles from '../index.module.less'
import TabRefresh from './TabRefresh'
import TabMaximize from './TabMaximize'
import TabOptions from './TabOptions'
import { useSelector } from 'react-redux'

const defaultPanes = new Array(2).fill(null).map((_, index) => {
  const id = String(index + 1)
  return { label: `标签 ${id}`, key: id }
})

function LayoutTabs() {
  const [activeKey, setActiveKey] = useState(defaultPanes[0].key)
  const [items, setItems] = useState(defaultPanes)
  // 是否窗口最大化
  const isMaximize = useSelector((state: RootState) => state.tabs.isMaximize)

  /** 
   * 处理更改
   * @param key - 唯一值
   */
  const onChange = (key: string) => {
    setActiveKey(key)
  }

  /** 
   * 删除标签
   * @param targetKey - 目标key值
   */
  const remove = (targetKey: string) => {
    const targetIndex = items.findIndex(pane => pane.key === targetKey)
    const newPanes = items.filter(pane => pane.key !== targetKey)
    if (newPanes.length && targetKey === activeKey) {
      const { key } = newPanes[targetIndex === newPanes.length ? targetIndex - 1 : targetIndex]
      setActiveKey(key)
    }
    setItems(newPanes)
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
        className="w-full h-34px py-0"
        onChange={onChange}
        activeKey={activeKey}
        type="editable-card"
        onEdit={onEdit}
        items={items}
        tabBarStyle={{
          height: '34px',
          marginTop: '3px'
        }}
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