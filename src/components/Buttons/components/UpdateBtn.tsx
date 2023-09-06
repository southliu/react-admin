import type { ButtonProps } from 'antd';
import { Button } from 'antd';
import { useTranslation } from 'react-i18next';

interface Props extends Omit<ButtonProps, 'loading'> {
  isLoading: boolean;
}

function UpdateBtn(props: Props) {
  const { isLoading } = props;
  const { t } = useTranslation();

  // 清除自定义属性
  const params: Partial<Props> = { ...props };
  delete params.isLoading;

  return (
    <Button
      type='primary'
      {...params}
      loading={!!isLoading}
    >
      { t('public.edit') }
    </Button>
  );
}

export default UpdateBtn;