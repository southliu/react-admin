import type { ButtonProps } from 'antd';
import { Button, message } from 'antd';
import { useClipboard } from '@/hooks/useClipboard';
import { Icon } from '@iconify/react';

interface Props extends ButtonProps {
  text: string;
  value: string;
}

function CopyBtn(props: Props) {
  const { text, value } = props;
  const [, copyToClipboard] = useClipboard();
  const [messageApi, contextHolder] = message.useMessage();

  /** 点击编辑 */
  const onClick = () => {
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
      <Button
        {...props}
        icon={<Icon icon="ant-design:copy-outlined" />}
        onClick={onClick}
      >
        { text }
      </Button>
    </>
  );
}

export default CopyBtn;