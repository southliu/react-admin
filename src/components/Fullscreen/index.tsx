import { Tooltip } from 'antd'
import { useFullscreen } from 'ahooks'
import { FullscreenOutlined, FullscreenExitOutlined } from '@ant-design/icons'

/**
 * @description: 全屏组件
 */
function Fullscreen() {
  const [isFullscreen, { toggleFullscreen }] = useFullscreen(
    () => document.getElementById('layout')
  )

  return (
    <Tooltip title={ isFullscreen ? '退出全屏' : '全屏' }>
      <div
        className="text-lg mr-4 cursor-pointer"
        onClick={toggleFullscreen}
      >
        { isFullscreen && <FullscreenExitOutlined /> }
        { !isFullscreen && <FullscreenOutlined /> }
      </div>
    </Tooltip>
  )
}

export default Fullscreen