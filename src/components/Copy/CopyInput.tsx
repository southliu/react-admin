import type { InputProps } from 'antd';
import { Input, message } from 'antd';
import { useClipboard } from '@/hooks/useClipboard';

const { Search } = Input;

function CopyInput(props: InputProps) {
  const [messageApi, contextHolder] = message.useMessage();
  const [, copyToClipboard] = useClipboard();

  /**
   * 处理复制
   * @param value - 复制内容
   */
  const handleCopy = (value: string) => {
    if (!value) return messageApi.warning({ content: '请输入复制内容', key: 'copy' });
    try {
      copyToClipboard(value);
      messageApi.success({ content: '复制成功', key: 'copy' });
    } catch(e) {
      messageApi.warning({ content: '复制失败', key: 'copy' });
    }
  };

  return (
    <>
      { contextHolder }
      <Search
        {...props}
        placeholder="请输入"
        enterButton="复制"
        onSearch={handleCopy}
      />
    </>
  );
}

export default CopyInput;