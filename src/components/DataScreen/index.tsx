import { Tooltip } from 'antd'
import { Icon } from '@iconify/react'
import { Link } from 'react-router-dom'

function DataScreen() {
  return (
    <Tooltip title='数据大屏'>
      <Link to='/dataScreen' target='_blank'>
        <Icon
          className="flex items-center justify-center text-lg mr-3 cursor-pointer"
          icon='ion:bar-chart-sharp'
        />
      </Link>
    </Tooltip>
  )
}

export default DataScreen