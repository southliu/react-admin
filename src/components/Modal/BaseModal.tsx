import type { MouseEventHandler, ReactNode } from 'react';
import type { ModalProps } from 'antd';
import { useEffect, useRef, useState } from 'react';
import { Modal, Tooltip } from 'antd';
import { Icon } from '@iconify/react';
import { useTranslation } from 'react-i18next';
import { useCommonStore } from '@/hooks/useCommonStore';
import './index.less';

interface Position {
  x: number | undefined;
  y: number | undefined;
}

interface Props extends Omit<ModalProps, 'onCancel'> {
  onCancel: () => void;
}

function BaseModal(props: Props) {
  const { open, width, children, wrapClassName, onCancel } = props;
  const { t } = useTranslation();
  const { isPhone } = useCommonStore();
  const [isFullscreen, setFullscreen] = useState(false);
  const [isDragging, setDragging] = useState(false);
  const [position, setPosition] = useState<Position>({ x: undefined, y: undefined });
  const [startPosition, setStartPosition] = useState({ x: 0, y: 0 });
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open && modalRef.current) {
      modalRef.current.style.left = isFullscreen ? '0px' : `${position.x}px`;
      modalRef.current.style.top = isFullscreen ? '0px' : `${position.y}px`;
    }
  }, [open, isFullscreen, modalRef.current]);

  /** 最大化 */
  const onFullscreen: MouseEventHandler<HTMLDivElement> = (e) => {
    e.stopPropagation();
    setFullscreen(!isFullscreen);
  };

  /** 点击关闭 */
  const handleCancel: MouseEventHandler<HTMLDivElement> = (e) => {
    e.stopPropagation();
    onCancel?.();
  };

  /** 自定义关闭和放大图标 */
  const CloseRender = () => (
    <div className="flex items-center justify-end absolute right-15px">
      <Tooltip
        className="hover:text-#404040"
        placement="bottom"
        title={!isFullscreen ? t('public.maximize') : t('public.exitMaximized')}
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
        placement="bottom"
        title={t('public.close')}
      >
        <div
          className='p-10px mt-3px cursor-pointer'
          onClick={handleCancel}
        >
          <Icon
            className="text-lg"
            icon="ant-design:close-outlined"
          />
        </div>
      </Tooltip>
    </div>
  );

  /** 自定义标题 */
  const titleRender = (
    <div className="modal-custom-title">
      <span className='cursor-text'>
        { props.title || '' }
      </span>

      { CloseRender() }
    </div>
  );

  /** 开始拖拽对话框 */
  const handleMouseDown: MouseEventHandler = (e) => {
    if (isFullscreen) return;
    const currentPosition = { x: e.clientX - (position.x || 0), y: e.clientY - (position.y || 0) };
    setDragging(true);
    setStartPosition(currentPosition);
  };

  /** 拖拽对话框移动 */
  const handleMouseMove: MouseEventHandler = (e) => {
    if (isDragging && !isFullscreen && modalRef.current) {
      const newX = e.clientX - startPosition.x;
      const newY = e.clientY - startPosition.y;
      setPosition({ x: newX, y: newY });
      // 更新Modal的位置
      modalRef.current.style.left = `${newX}px`;
      modalRef.current.style.top = `${newY}px`;
    }
  };

  /** 结束拖拽对话框 */
  const handleMouseUp = () => {
    if (isFullscreen) return;
    setDragging(false);
  };

  /** 自定义渲染对话框 */
  const modalRender = (modal: ReactNode) => (
    <div
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      {modal}
    </div>
  );

  return (
    <Modal
      destroyOnClose
      closable={false}
      maskClosable={false}
      modalRender={!isPhone ? modalRender : undefined}
      okText={t('public.ok')}
      cancelText={t('public.cancel')}
      {...props}
      wrapProps={{ ...props.wrapProps, ref: modalRef }}
      className={`base-modal ${props.className}`}
      title={titleRender}
      wrapClassName={isFullscreen ? 'full-modal' : wrapClassName || ''}
      width={isFullscreen ? '100%' : width || 520}
    >
      <div className='base-modal-content'>
        { children }
      </div>
    </Modal>
  );
}

export default BaseModal;
