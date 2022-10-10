import type { ButtonProps } from 'antd'
import { Button } from 'antd'
import { useCopyToClipboard } from '@/hooks/useCopyToClipboard'
import { Icon } from '@iconify/react'

interface IProps extends ButtonProps {
  text: string;
  value: string;
}

function CopyBtn(props: IProps) {
  const { text, value } = props

  /** 点击编辑 */
  const onClick = () => {
    useCopyToClipboard(value)
  }

  return (
    <Button
      {...props}
      icon={<Icon icon="ant-design:copy-outlined" />}
      onClick={onClick}
    >
      { text }
    </Button>
  )
}

export default CopyBtn