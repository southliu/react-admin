import { useState } from 'react'
import { SearchOutlined } from '@ant-design/icons'
import { Tooltip } from 'antd'
import SearchModal from './components/SearchModal'

/**
 * @description: 全局搜索菜单组件
 */
function GlobalSearch() {
  const [isVisible, setVisible] = useState(false)

  /** 点击搜索 */
  const onClick = () => {
    setVisible(true)
  }

  /** 切换显示 */
  const toggle = () => {
    setVisible(!isVisible)
  }

  return (
    <>
      <Tooltip title='搜索'>
        <SearchOutlined
          className="text-lg mr-3"
          onClick={onClick}
        />
      </Tooltip>

      <SearchModal
        visible={isVisible}
        toggle={toggle}
      />
    </>
  )
}

export default GlobalSearch