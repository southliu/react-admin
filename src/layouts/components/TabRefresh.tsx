import type { RootState } from '@/stores'
import { useState } from 'react'
import { Tooltip } from 'antd'
import { Icon } from '@iconify/react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

function TabRefresh() {
  const navigate = useNavigate()
  const [refresh, setRefresh] = useState(false) // 重新加载
  const activeKey = useSelector((state: RootState) => state.tabs.activeKey)
  const [time, setTime] = useState<null | NodeJS.Timeout>(null)

  /** 
   * 点击重新加载
   * TODO: 优化重新加载逻辑
   */
  const onClick = () => {
    // 定时器没有执行时运行
    if (!time) {
      setRefresh(true)
      navigate('/loading')

      setTime(
        setTimeout(() => {
          setRefresh(false)
          navigate(activeKey)
          setTime(null)
        }, 1000)
      )
    }
  }

  return (
    <Tooltip title="重新加载" placement="bottom">
      <Icon
        className={`
          flex
          items-center
          justify-center
          text-lg
          cursor-pointer
          ${refresh ? 'animate-spin' : ''}
        `}
        onClick={onClick}
        icon="ant-design:reload-outlined"
      />
    </Tooltip>
  )
}

export default TabRefresh