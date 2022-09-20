import type { ReactNode, Ref } from 'react'
import type { IFormData, IFormList } from '#/form'
import type { ColProps } from 'antd'
import { useImperativeHandle } from 'react'
import { FormProps } from 'antd'
import { Form } from 'antd'
import { getComponent } from '../Form/utils/componentMap'

export interface IFormFn {
  handleSubmit: () => void;
}

interface IProps {
  list: IFormList[];
  data: IFormData;
  children?: ReactNode;
  labelCol?: Partial<ColProps>;
  wrapperCol?: Partial<ColProps>;
  formRef?: Ref<IFormFn>;
  handleFinish: FormProps['onFinish'];
}

function BasicForm(props: IProps) {
  const {
    list,
    data,
    children,
    labelCol,
    wrapperCol,
    formRef,
    handleFinish
  } = props
  const [form] = Form.useForm()

  // 抛出外部方法
  useImperativeHandle(
    formRef,
    () => ({
      /** 提交表单  */
      handleSubmit: () => {
        form.submit()
      }
    })
  )

  /**
   * 提交表单
   * @param values - 表单值
   */
  const onFinish: FormProps['onFinish'] = values => {
    handleFinish?.(values)
  }
  
  /**
   * 表单提交失败处理
   * @param errorInfo - 错误信息
   */
  const onFinishFailed: FormProps['onFinishFailed'] = errorInfo => {
    console.warn('表单错误:', errorInfo)
  }

  return (
    <div>
      <Form
        name="basic"
        form={form}
        labelCol={labelCol ? labelCol : { span: 8 }}
        wrapperCol={wrapperCol ? wrapperCol : { span: 16 }}
        initialValues={data}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        {
          list.map(item => (
            <Form.Item
              key={`${item.name}`}
              label={item.label}
              name={item.name}
              rules={!item.hidden ? item.rules : []}
              className={item.hidden ? '!hidden' : ''}
            >
              { getComponent(item) }
            </Form.Item>
          ))
        }

        { children }
      </Form>
    </div>
  )
}

export default BasicForm