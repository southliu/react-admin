import type { InputProps } from 'antd'
import { Input } from 'antd'

/**
 * 自定义输入
 */
function CustomizeInput(props: InputProps) {
  return (
    <>
      <div className='mb-5px'>自定义渲染：</div>
      <Input {...props} placeholder='请输入' />
    </>
  )
}

export default CustomizeInput