import type { ButtonProps } from 'antd'
import { Button } from 'antd'

interface IProps extends Omit<ButtonProps, 'loading'> {
  isLoading: boolean;
}

function UpdateBtn(props: IProps) {
  const { isLoading } = props

  // 清除自定义属性
  const params: Partial<IProps> = { ...props }
  delete params.isLoading

  return (
    <Button
      type='primary'
      {...params}
      loading={!!isLoading}
    >
      编辑
    </Button>
  )
}

export default UpdateBtn