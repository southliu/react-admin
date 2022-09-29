import type { ReactNode } from 'react'
import type { IFormData, IFormList } from '#/form'
import type { ColProps } from 'antd'
import { Button, FormProps } from 'antd'
import { Form } from 'antd'
import { SearchOutlined, PlusOutlined } from '@ant-design/icons'
import { getComponent } from '../Form/utils/componentMap'
import { handleValuePropName } from '../Form/utils/helper'

interface IProps {
  list: IFormList[];
  data: IFormData;
  isLoading?: boolean;
  isSearch?: boolean;
  isCreate?: boolean;
  children?: ReactNode;
  labelCol?: Partial<ColProps>;
  wrapperCol?: Partial<ColProps>;
  onCreate?: () => void;
  handleFinish: FormProps['onFinish'];
}

function BasicSearch(props: IProps) {
  const {
    list,
    data,
    isLoading,
    isSearch,
    isCreate,
    children,
    labelCol,
    wrapperCol,
    handleFinish
  } = props

  /** 点击新增 */
  const onCreate = () => {
    props.onCreate?.()
  }

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
    console.warn('搜索错误:', errorInfo)
  }

  return (
    <div id="searches" className="bg-white pt-4 pb-1 px-5">
      <Form
        name="basic"
        layout="inline"
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

export default BasicSearch