import type { ReactNode } from 'react'
import { ModalProps, Tooltip } from 'antd'
import type { DraggableData, DraggableEvent } from 'react-draggable'
import { useRef, useState } from 'react'
import { Modal } from 'antd'
import { Icon } from '@iconify/react'
import Draggable from 'react-draggable'

// 重写ModalProps
interface IProps extends Omit<ModalProps, 'open' | 'onCancel'> {
  isOpen: boolean;
  isLoading?: boolean;
  children: ReactNode;
  onCancel: () => void;
}

function BasicModal(props: IProps) {
  const { isOpen, isLoading } = props
  const draggleRef = useRef<HTMLDivElement>(null)
  const [isDisabled, setDisabled] = useState(false)
  const [isFullscreen, setFullscreen] = useState(false)
  const [bounds, setBounds] = useState({ left: 0, top: 0, bottom: 0, right: 0 })

  /** 开始拖拽对话框 */
  const onStartMouse = (_event: DraggableEvent, uiData: DraggableData) => {
    const { clientWidth, clientHeight } = window.document.documentElement
    const targetRect = draggleRef.current?.getBoundingClientRect()
    if (!targetRect) {
      return
    }
    setBounds({
      left: -targetRect.left + uiData.x,
      right: clientWidth - (targetRect.right - uiData.x),
      top: -targetRect.top + uiData.y,
      bottom: clientHeight - (targetRect.bottom - uiData.y),
    })
  }

  /** 鼠标拖拽结束 */
  const onMouseOver = () => {
    if (isDisabled) {
      setDisabled(false)
    }
  }

  /** 最大化 */
  const onFullscreen = () => {
    setFullscreen(!isFullscreen)
  }

  /** 自定义标题 */
  const titleRender = (
    <div
      className="w-full cursor-move flex items-center justify-between"
      onMouseOver={onMouseOver}
      onMouseOut={() => setDisabled(true)}
    >
      <span>
        { props.title || '' }
      </span>
      
      <div className="flex items-center justify-end absolute right-15px">
        <Tooltip
          className="text-#00000073 hover:text-#404040"
          placement="bottom"
          title={isFullscreen ? '退出最大化' : '最大化'}
        >
          <div
            className='p-10px mt-3px cursor-pointer'
            onClick={onFullscreen}
          >
            <Icon
              className="text-lg"
              icon={!isFullscreen ? 'ant-design:fullscreen-outlined' : 'ant-design:fullscreen-exit-outlined'}
            />
          </div>
        </Tooltip>
        <Tooltip
          className="text-#00000073 hover:text-#404040"
          placement="bottom"
          title="关闭"
        >
          <div
            className='p-10px mt-3px cursor-pointer'
            onClick={() => props?.onCancel()}
          >
            <Icon
              className="text-lg"
              icon="ant-design:close-outlined"
            />
          </div>
        </Tooltip>
      </div>
    </div>
  )

  /** 自定义渲染对话框 */
  const modalRender = (modal: ReactNode) => (
    <Draggable
      disabled={isDisabled}
      bounds={bounds}
      onStart={onStartMouse}
    >
      <div ref={draggleRef}>
        {modal}
      </div>
    </Draggable>
  )

  return (
    <Modal
      {...props}
      closable={false}
      open={isOpen}
      title={titleRender}
      width={isFullscreen ? '100%' : props.width || 520}
      wrapClassName={isFullscreen ? 'full-modal' : ''}
      modalRender={modalRender}
      confirmLoading={!!isLoading}
    >
      { props.children }
    </Modal>
  )
}

export default BasicModal