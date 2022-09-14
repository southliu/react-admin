import type { AppDispatch, RootState } from '@/stores'
import { Tooltip } from 'antd'
import { Icon } from '@iconify/react'
import { useDispatch, useSelector } from 'react-redux'
import { toggleMaximize } from '@/stores/tabs'

function TabMaximize() {
  const dispatch: AppDispatch = useDispatch()
  // 是否窗口最大化
  const isMaximize = useSelector((state: RootState) => state.tabs.isMaximize)

  /** 点击最大化/最小化 */
  const onClick = () => {
    dispatch(toggleMaximize(!isMaximize))
  }

  return (
    <Tooltip
      title={ isMaximize ? "最小化" : "最大化"}
      placement="bottom"
    >
      <Icon
        className={`
          flex
          items-center
          justify-center
          text-lg
          cursor-pointer
        `}
        icon={ isMaximize ? "ant-design:compress-outlined" : "ant-design:expand-outlined" }
        onClick={onClick}
      />
    </Tooltip>
  )
}

export default TabMaximize