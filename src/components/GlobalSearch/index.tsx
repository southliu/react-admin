import type { ISearchModal } from './components/SearchModal'
import { useRef } from 'react'
import { SearchOutlined } from '@ant-design/icons'
import { Tooltip } from 'antd'
import SearchModal from './components/SearchModal'

/**
 * @description: 全局搜索菜单组件
 */
function GlobalSearch() {
  const modalRef = useRef<ISearchModal>(null)

  /** 切换显示 */
  const toggle = () => {
    modalRef.current?.toggle()
  }

  return (
    <>
      <Tooltip title='搜索'>
        <SearchOutlined
          className="text-lg mr-3"
          onClick={toggle}
        />
      </Tooltip>

      <SearchModal
        modalRef={modalRef}
      />
    </>
  )
}

export default GlobalSearch