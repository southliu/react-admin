import type { ButtonProps } from 'antd';
import { Button, message } from 'antd';
import { Icon } from '@iconify/react';
import { useTranslation } from 'react-i18next';
import { useClipboard } from '@/hooks/useClipboard';

interface Props extends ButtonProps {
  text: string;
  value: string;
}

function CopyBtn(props: Props) {
  const { text, value } = props;
  const { t } = useTranslation();
  const [, copyToClipboard] = useClipboard();
  const [messageApi, contextHolder] = message.useMessage();

  /** 点击编辑 */
  const onClick = () => {
    try {
      copyToClipboard(value);
      messageApi.success({ content: t('public.copySuccessfully'), key: 'copy' });
    } catch(e) {
      messageApi.warning({ content: t('public.copyFailed'), key: 'copy' });
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