import type { InputProps } from 'antd'
import { Input, message } from 'antd'
import { useClipboard } from '@/hooks/useClipboard'

const { Search } = Input

function CopyInput(props: InputProps) {
  const [, copyToClipboard] = useClipboard()

  /**
   * 处理复制
   * @param value - 复制内容
   */
  const handleCopy = (value: string) => {
    if (!value) return message.warning({ content: '请输入复制内容', key: 'copy' })
    try {
      copyToClipboard(value)
      message.success({ content: '复制成功', key: 'copy' })
    } catch(e) {
      message.warning({ content: '复制失败', key: 'copy' })
    }
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