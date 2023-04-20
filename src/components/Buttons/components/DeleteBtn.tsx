import type { ButtonProps } from 'antd'
import { Button, Modal } from 'antd'
import { ExclamationCircleOutlined } from '@ant-design/icons'

const { confirm } = Modal

interface Props extends Omit<ButtonProps, 'loading'> {
  isLoading: boolean;
  handleDelete: () => void;
}

function DeleteBtn(props: Props) {
  const { isLoading, handleDelete } = props

  // 清除自定义属性
  const params: Partial<Props> = { ...props }
  delete params.isLoading
  delete params.handleDelete

  const showConfirm = () => {
    confirm({
      title: '提示',
      icon: <ExclamationCircleOutlined />,
      content: '确定要删除吗?',
      okText: '确认',
      okType: 'danger',
      cancelText: '取消',
      onOk() {
        handleDelete()
      },
    })
  }

  return (
    <Button
      danger
      type='primary'
      {...params}
      loading={!!isLoading}
      onClick={showConfirm}
    >
      删除
    </Button>
  )
}

export default DeleteBtn