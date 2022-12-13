import { Tooltip } from 'antd'
import { Icon } from '@iconify/react'
import { useNavigate, useLocation } from 'react-router-dom'

function DataScreen() {
  const navigate = useNavigate()
  const location = useLocation()

  // 跳转数据大屏
  const goDataScreen = () => {
    const { hash } = location
    const path = `${hash ? '#' : ''}/dataScreen`

    window.open(path, '_blank')
    navigate(path)
  }

  return (
    <Tooltip title='数据大屏'>
        <Icon
          className="flex items-center justify-center text-lg mr-3 cursor-pointer"
          icon='ion:bar-chart-sharp'
          onClick={goDataScreen}
        />
    </Tooltip>
  )
}

export default DataScreen