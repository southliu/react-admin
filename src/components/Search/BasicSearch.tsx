import type { FormData, SearchList } from '#/form';
import type { ColProps, FormInstance } from 'antd';
import { type LegacyRef, ReactNode, forwardRef, useEffect, useState } from 'react';
import { type FormProps, Button, Col, Flex } from 'antd';
import { Form } from 'antd';
import { useTranslation } from 'react-i18next';
import { SearchOutlined, ClearOutlined, DownOutlined } from '@ant-design/icons';
import { getComponent } from '../Form/utils/componentMap';
import { handleValuePropName } from '../Form/utils/helper';
import { filterDayjs } from '../Dates/utils/helper';

interface Props extends FormProps {
  list: SearchList[];
  data: FormData;
  isLoading?: boolean;
  isSearch?: boolean;
  isClear?: boolean;
  children?: ReactNode;
  labelCol?: Partial<ColProps>;
  wrapperCol?: Partial<ColProps>;
  isRowExpand?: boolean; // 是否显示收缩搜索功能
  defaultColCount?: number; // 默认每项占位几个，默认一行四个
  defaultRowExpand?: number; // 默认展示多少行
  handleFinish: FormProps['onFinish'];
}

const BasicSearch = forwardRef((props: Props, ref: LegacyRef<FormInstance>) => {
  const {
    list,
    data,
    isLoading,
    isSearch = true,
    isClear = true,
    isRowExpand = true,
    children,
    labelCol,
    wrapperCol,
    defaultColCount = 4,
    defaultRowExpand = 2,
    handleFinish
  } = props;
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const [isExpand, setExpand] = useState(false);
  const [isShowExpand, setShowExpand] = useState(isRowExpand);

  useEffect(() => {
    setShowExpand(isRowExpand);

    if (isRowExpand) {
      const showNum = defaultColCount * defaultRowExpand;
      setShowExpand(showNum < list.length);
    }
  }, [defaultColCount, defaultRowExpand, isRowExpand, list.length]);

  // 清除多余参数
  const formProps = { ...props };
  delete formProps.isSearch;
  delete formProps.isClear;
  delete formProps.isLoading;
  delete formProps.handleFinish;

  /** 回车处理 */
  const onPressEnter = () => {
    form?.submit();
  };

  /** 点击清除 */
  const onClear = () => {
    form?.resetFields();
    form?.setFieldsValue(data ? { ...data } : {});
    form?.submit();
  };

  /** 获取搜索按钮flex状态 */
  const getFlexCol = () => {
    // 如果搜索按钮在最后一行第一个，则靠右显示
    if (list?.length % defaultColCount === 0) {
      return 'auto';
    }

    return isShowExpand ? 'auto' : undefined;
  };

  /**
   * 处理列表
   * @param list - 列表
   */
  const filterList = (list: SearchList[]) => {
    if (!isShowExpand) return list;

    // 默认显示个数
    const showNum = defaultColCount * defaultRowExpand;

    for (let i = 0; i < list.length; i++) {
      const item = list[i];

      if (i < showNum) {
        item.hidden = false;
        continue;
      }

      item.hidden = !isExpand;
    }

    return list;
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
    <div id="searches">
      <Form
        layout="inline"
        {...formProps}
        ref={ref}
        form={form}
        labelCol={labelCol ? labelCol : { span: 8 }}
        wrapperCol={wrapperCol ? wrapperCol : { span: 16 }}
        initialValues={data}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Flex wrap className='w-full'>
          {
            filterList(list)?.map(item => (
              <div
                key={`${item.name}`}
                style={{ width: item.hidden ? 0 : `${100 / defaultColCount}%` }}
              >
                <Form.Item
                  label={item.label}
                  name={item.name}
                  className='!mb-5px'
                  hidden={item.hidden}
                  labelCol={{ style: { width: item.labelCol } }}
                  wrapperCol={{ style: { width: item.wrapperCol } }}
                  rules={item.rules}
                  valuePropName={handleValuePropName(item.component)}
                >
                  { getComponent(t, item, onPressEnter) }
                </Form.Item>
              </div>
            ))
          }

          <Col flex={getFlexCol()}>
            <Flex justify='flex-end'>
              <div className='flex items-center flex-wrap'>
                {
                  !!isSearch &&
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
                  !!isClear &&
                  <Form.Item>
                    <Button
                      className='!mb-5px'
                      icon={<ClearOutlined />}
                      onClick={onClear}
                    >
                      { t('public.clear') }
                    </Button>
                  </Form.Item>
                }

                { children }

                {
                  !!isShowExpand &&
                  <div
                    className='text-12px cursor-pointer color-#1677ff hover:color-#69b1ff'
                    onClick={() => {
                      setExpand(!isExpand);
                    }}
                  >
                    <DownOutlined rotate={ isExpand ? 180 : 0 } />
                    { isExpand ? '收缩' : '展开' }
                  </div>
                }
              </div>
            </Flex>
          </Col>
        </Flex>
      </Form>
    </div>
  );
});

export default BasicSearch;
