import { useState } from 'react'
import { Tooltip } from 'antd'
import { Icon } from '@iconify/react'

function TabRefresh() {
  const [refresh, setRefresh] = useState(false) // 重新加载

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
        onClick={() => setRefresh(true)}
        icon="ant-design:reload-outlined"
      />
    </Tooltip>
  )
}

export default TabRefresh