import type { InputProps } from 'antd';
import { Input, message } from 'antd';
import { useTranslation } from 'react-i18next';
import { useClipboard } from '@/hooks/useClipboard';

const { Search } = Input;

function CopyInput(props: InputProps) {
  const { t } = useTranslation();
  const [messageApi, contextHolder] = message.useMessage();
  const [isCopied, error, copyText] = useClipboard();

  /**
   * 处理复制
   * @param value - 复制内容
   */
  const handleCopy = (value: string) => {
    if (!value) return messageApi.warning({ content: t('public.inputPleaseEnter'), key: 'copy' });
    try {
      copyText(value);
      if (isCopied) {
        messageApi.success({ content: t('public.copySuccessfully'), key: 'copy' });
      } else {
        messageApi.warning({ content: error || t('public.copyFailed'), key: 'copy' });
      }
    } catch(e) {
      console.error(e);
      messageApi.warning({ content: error || t('public.copyFailed'), key: 'copy' });
    }
  };

  return (
    <>
      { contextHolder }
      <Search
        {...props}
        placeholder={t('public.inputPleaseEnter')}
        enterButton={t('public.copy')}
        onSearch={handleCopy}
      />
    </>
  );
}

export default CopyInput;
