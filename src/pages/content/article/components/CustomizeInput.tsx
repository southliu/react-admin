import type { InputProps } from 'antd';
import { Input } from 'antd';

/**
 * 自定义输入
 */
function CustomizeInput(props: InputProps) {
  return (
    <>
      <Input {...props} placeholder='请输入' />
      <div className='mb-5px text-red'>注：标题不能含有敏感信息!</div>
    </>
  );
}

export default CustomizeInput;