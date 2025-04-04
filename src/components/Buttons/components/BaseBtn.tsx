import type { ReactNode } from 'react';
import type { ButtonProps } from 'antd';
import { Button } from 'antd';

interface Props extends ButtonProps {
  isLoading?: boolean;
  children?: ReactNode;
}

function BaseBtn(props: Props) {
  const { isLoading, loading, children } = props;

  // 清除自定义属性
  const params: Partial<Props> = { ...props };
  delete params.isLoading;

  return (
    <Button
      type='primary'
      {...params}
      loading={!!isLoading || loading}
    >
      { children }
    </Button>
  );
}

export default BaseBtn;
