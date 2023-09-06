import type { ButtonProps } from 'antd';
import { Button, App } from 'antd';
import { useTranslation } from 'react-i18next';
import { ExclamationCircleOutlined } from '@ant-design/icons';

interface Props extends Omit<ButtonProps, 'loading'> {
  isLoading: boolean;
  handleDelete: () => void;
}

function DeleteBtn(props: Props) {
  const { isLoading, handleDelete } = props;
  const { t } = useTranslation();
  const { modal } = App.useApp();

  // 清除自定义属性
  const params: Partial<Props> = { ...props };
  delete params.isLoading;
  delete params.handleDelete;

  const showConfirm = () => {
    modal.confirm({
      title: t('public.kindTips'),
      icon: <ExclamationCircleOutlined />,
      content: t('public.confirmMessage', { name: t('public.delete') }),
      okText: t('public.confirm'),
      okType: 'danger',
      cancelText: t('public.cancel'),
      onOk() {
        handleDelete();
      },
    });
  };

  return (
    <Button
      danger
      type='primary'
      {...params}
      loading={!!isLoading}
      onClick={showConfirm}
    >
      { t('public.delete') }
    </Button>
  );
}

export default DeleteBtn;