import type { InputProps } from 'antd'
import { Input, message } from 'antd'
import { useCopyToClipboard } from '@/hooks/useCopyToClipboard'

const { Search } = Input

function CopyInput(props: InputProps) {
  /**
   * 处理复制
   * @param value - 复制内容
   */
  const handleCopy = (value: string) => {
    if (!value) return message.warning({ content: '请输入复制内容', key: 'copy' })
    useCopyToClipboard(value)
  }

  return (
    <Search
      {...props}
      placeholder="请输入"
      enterButton="复制"
      onSearch={handleCopy}
    />
  )
}

export default CopyInput