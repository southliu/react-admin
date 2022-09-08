import type { TabsProps } from 'antd'
import { useState } from 'react'
import { Tabs, Tooltip } from 'antd'
import { Icon } from '@iconify/react'
import styles from '../index.module.less'

const defaultPanes = new Array(2).fill(null).map((_, index) => {
  const id = String(index + 1)
  return { label: `标签 ${id}`, children: `Content of Tab Pane ${index + 1}`, key: id }
})

function LayoutTabs() {
  const [activeKey, setActiveKey] = useState(defaultPanes[0].key)
  const [items, setItems] = useState(defaultPanes)
  const [refresh, setRefresh] = useState(false) // 重新加载

  /** 
   * 处理更改
   * @param key - 唯一值
   */
  const onChange = (key: string) => {
    console.log('key:', key)
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

  return (
    <div className="flex items-center justify-between mx-2 transition-all">
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
      
      <div>
        <div className={`
          ${styles.leftDivide}
          divide-solid
          w-36px
          h-36px
          text-#00000073
          hover:text-#404040
          flex
          place-content-center
          items-center
        `}>
          <Tooltip title="重新加载" placement="bottom">
            <Icon
              className={`
                flex
                items-center
                justify-center
                text-lg
                cursor-pointer
                ${refresh && 'animate-spin'}
              `}
              onClick={() => setRefresh(true)}
              icon="ant-design:reload-outlined"
            />
          </Tooltip>
        </div>
      </div>
    </div>
  )
}

export default LayoutTabs