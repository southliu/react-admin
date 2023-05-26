import { Tooltip } from 'antd';
import { Icon } from '@iconify/react';
import { useFullscreen } from '@/hooks/useFullscreen';

/**
 * @description: 全屏组件
 */
function Fullscreen() {
  const [isFullscreen, toggleFullscreen] = useFullscreen();

  return (
    <Tooltip title={ isFullscreen ? '退出全屏' : '全屏' }>
      <div
        className="flex items-center justify-center text-lg mr-3 cursor-pointer"
        onClick={toggleFullscreen}
      >
        { isFullscreen && <Icon icon="gridicons-fullscreen-exit" /> }
        { !isFullscreen && <Icon icon="gridicons-fullscreen" /> }
      </div>
    </Tooltip>
  );
}

export default Fullscreen;