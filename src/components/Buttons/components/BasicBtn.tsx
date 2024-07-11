import type { ButtonProps } from 'antd';
import { Button } from 'antd';

interface Props extends Omit<ButtonProps, 'loading'> {
  isLoading: boolean;
  children?: JSX.Element | string;
}

function BasicBtn(props: Props) {
  const { isLoading, children } = props;

  // 清除自定义属性
  const params: Partial<Props> = { ...props };
  delete params.isLoading;

  return (
    <Button
      type='primary'
      {...params}
      loading={!!isLoading}
    >
      { children }
    </Button>
  );
}

export default BasicBtn;
