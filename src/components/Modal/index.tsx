import type { ReactNode } from 'react'
import type { ModalProps } from 'antd'
import { Modal } from 'antd'

// 重写open为isOpen
interface IProps extends Omit<ModalProps, 'open'> {
  isOpen: boolean;
  children: ReactNode;
}

function BaseModal(props: IProps) {
  const { isOpen } = props

  return (
    <Modal
      {...props}
      open={isOpen}
    >
      { props.children }
    </Modal>
  )
}

export default BaseModal