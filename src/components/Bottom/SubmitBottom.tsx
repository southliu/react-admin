import { Button } from 'antd';

interface Props {
  goBack: () => void;
  handleSubmit: () => void;
  isLoading?: boolean;
  children?: JSX.Element;
}

function SubmitBottom(props: Props) {
  const { goBack, handleSubmit, isLoading, children } = props;

  return (
    <div className={`
      bg
      fixed
      flex
      justify-end
      left-0
      right-0
      bottom-0
      py-5px
      px-30px
      box-border
      shadow
      shadow-gray-500
    `}>
      { children }

      <Button
        className='mr-10px'
        danger
        onClick={goBack}
      >
        返回
      </Button>
      <Button
        loading={!!isLoading}
        type="primary"
        onClick={handleSubmit}
      >
        提交
      </Button>
    </div>
  );
}

export default SubmitBottom;