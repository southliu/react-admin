import { Tooltip } from 'antd'
import { Icon } from '@iconify/react'

function DataScreen() {
  /** 跳转数据大屏 */
  const goDataScreen = () => {
    window.open('https://iamsouth.github.io')
  }

  return (
    <Tooltip title='数据大屏'>
      <div onClick={goDataScreen}>
        <Icon
          className="flex items-center justify-center text-lg mr-3 cursor-pointer"
          icon='ion:bar-chart-sharp'
        />
      </div>
    </Tooltip>
  )
}

export default DataScreen