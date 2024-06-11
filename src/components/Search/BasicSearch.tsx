import { ReactNode, Ref, useImperativeHandle } from 'react';
import type { FormData, FormList } from '#/form';
import type { ColProps } from 'antd';
import type { FormFn } from '../Form/BasicForm';
import { Button, FormProps } from 'antd';
import { Form } from 'antd';
import { useTranslation } from 'react-i18next';
import { SearchOutlined, PlusOutlined } from '@ant-design/icons';
import { getComponent } from '../Form/utils/componentMap';
import { handleValuePropName } from '../Form/utils/helper';
import { filterDayjs } from '../Dates/utils/helper';

interface Props extends FormProps {
  list: FormList[];
  data: FormData;
  isLoading?: boolean;
  isSearch?: boolean;
  isCreate?: boolean;
  children?: ReactNode;
  labelCol?: Partial<ColProps>;
  wrapperCol?: Partial<ColProps>;
  formRef?: Ref<FormFn>;
  onCreate?: () => void;
  handleFinish: FormProps['onFinish'];
}

function BasicSearch(props: Props) {
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
  } = props;
  const { t } = useTranslation();
  const [form] = Form.useForm();

  // 抛出外部方法
  useImperativeHandle(
    formRef,
    () => ({
      /**
       * 获取表单值
       * @param key - 表单唯一值
       */
      getFieldValue: (key: string) => {
        return form?.getFieldValue(key);
      },
      /** 获取表单全部值 */
      getFieldsValue: () => {
        return form?.getFieldsValue();
      },
      /** 重置表单 */
      handleReset: () => {
        form?.resetFields();
      },
      /** 提交表单  */
      handleSubmit: () => {
        form?.submit();
      }
    } as FormFn)
  );

  /** 点击新增 */
  const onCreate = () => {
    props.onCreate?.();
  };

  /**
   * 提交表单
   * @param values - 表单值
   */
  const onFinish: FormProps['onFinish'] = values => {
    if (handleFinish) {
      // 将dayjs类型转为字符串
      const params = filterDayjs(values, list);
      handleFinish?.(params);
    }
  };
  
  /**
   * 表单提交失败处理
   * @param errorInfo - 错误信息
   */
  const onFinishFailed: FormProps['onFinishFailed'] = errorInfo => {
    console.warn('搜索错误:', errorInfo);
  };

  return (
    <div id="searches" className="py-3">
      <Form
        layout="inline"
        {...props}
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
              { getComponent(t, item) }
            </Form.Item>
          ))
        }

        <div className='flex items-center flex-wrap'>
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
                { t('public.search') }
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
                { t('public.create') }
              </Button>
            </Form.Item>
          }

          { children }
        </div>
      </Form>
    </div>
  );
}

export default BasicSearch;
