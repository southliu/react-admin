import { ReactNode, Ref, useImperativeHandle } from 'react'
import type { IFormData, IFormList } from '#/form'
import type { ColProps } from 'antd'
import type { IFormFn } from '../Form/BasicForm'
import { memo } from 'react'
import { Button, FormProps } from 'antd'
import { Form } from 'antd'
import { SearchOutlined, PlusOutlined } from '@ant-design/icons'
import { getComponent } from '../Form/utils/componentMap'
import { handleValuePropName } from '../Form/utils/helper'
import { filterMoment } from '../Dates/utils/helper'

interface IProps {
  list: IFormList[];
  data: IFormData;
  isLoading?: boolean;
  isSearch?: boolean;
  isCreate?: boolean;
  children?: ReactNode;
  labelCol?: Partial<ColProps>;
  wrapperCol?: Partial<ColProps>;
  formRef?: Ref<IFormFn>;
  onCreate?: () => void;
  handleFinish: FormProps['onFinish'];
}

function BasicSearch(props: IProps) {
  const {
    list,
    data,
    formRef,
    isLoading,
    isSearch,
    isCreate,
    children,
    labelCol,
    wrapperCol,
    handleFinish
  } = props
  const [form] = Form.useForm()

  // 抛出外部方法
  useImperativeHandle(
    formRef,
    () => ({
      /**
       * 获取表单值
       * @param key - 表单唯一值
       */
      getFieldValue: (key: string) => {
        return form.getFieldValue(key)
      },
      /** 获取表单全部值 */
      getFieldsValue: () => {
        return form.getFieldsValue()
      },
      /** 重置表单 */
      handleReset: () => {
        form.resetFields()
      },
      /** 提交表单  */
      handleSubmit: () => {
        form.submit()
      }
    } as IFormFn)
  )

  /** 点击新增 */
  const onCreate = () => {
    props.onCreate?.()
  }

  /**
   * 提交表单
   * @param values - 表单值
   */
  const onFinish: FormProps['onFinish'] = values => {
    if (handleFinish) {
      // 将Moment类型转为字符串
      const params = filterMoment(values, list)
      handleFinish?.(params)
    }
  }
  
  /**
   * 表单提交失败处理
   * @param errorInfo - 错误信息
   */
  const onFinishFailed: FormProps['onFinishFailed'] = errorInfo => {
    console.warn('搜索错误:', errorInfo)
  }

  return (
    <div id="searches" className="py-3">
      <Form
        name="basic"
        layout="inline"
        form={form}
        labelCol={labelCol ? labelCol : { span: 8 }}
        wrapperCol={wrapperCol ? wrapperCol : { span: 16 }}
        initialValues={data}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        {
          list?.map(item => (
            <Form.Item
              key={`${item.name}`}
              label={item.label}
              name={item.name}
              className='!mb-5px'
              labelCol={{ style: { width: item.labelCol } }}
              wrapperCol={{ style: { width: item.wrapperCol } }}
              rules={item.rules}
              valuePropName={handleValuePropName(item.component)}
            >
              { getComponent(item) }
            </Form.Item>
          ))
        }

        {
          isSearch !== false &&
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className='!mb-5px'
              loading={isLoading}
              icon={<SearchOutlined />}
            >
              搜索
            </Button>
          </Form.Item>
        }

        {
          isCreate !== false &&
          <Form.Item>
            <Button
              type="primary"
              className='!mb-5px'
              icon={<PlusOutlined />}
              onClick={onCreate}
          >
              新增
            </Button>
          </Form.Item>
        }

        { children }
      </Form>
    </div>
  )
}

export default memo(BasicSearch)