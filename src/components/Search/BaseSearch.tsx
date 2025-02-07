import type { ColProps, FormInstance } from 'antd';
import type { FormData, FormList, SearchList } from '#/form';
import { type CSSProperties, type LegacyRef, ReactNode, forwardRef, useEffect, useState } from 'react';
import { type FormProps, Button, Col, Flex } from 'antd';
import { Form } from 'antd';
import { useTranslation } from 'react-i18next';
import { filterDayjs } from '@/components/Dates';
import { useCommonStore } from '@/hooks/useCommonStore';
import { getComponent } from '@/components/Form/utils/componentMap';
import { handleValuePropName } from '@/components/Form/utils/helper';
import { SearchOutlined, ClearOutlined, DownOutlined } from '@ant-design/icons';

interface Props extends FormProps {
  list: SearchList[];
  data: FormData;
  initSearch?: FormData;
  isLoading?: boolean;
  isSearch?: boolean;
  isClear?: boolean;
  style?: CSSProperties;
  className?: string;
  type?: 'default' | 'grid';
  children?: ReactNode;
  labelCol?: Partial<ColProps>;
  wrapperCol?: Partial<ColProps>;
  isRowExpand?: boolean; // 是否显示收缩搜索功能
  defaultColCount?: number; // 默认每项占位几个，默认一行四个
  defaultRowExpand?: number; // 默认展示多少行
  handleFinish: FormProps['onFinish'];
}

const BaseSearch = forwardRef((props: Props, ref: LegacyRef<FormInstance>) => {
  const {
    list,
    data,
    initSearch,
    isLoading,
    isSearch = true,
    isClear = true,
    isRowExpand = true,
    type = 'default',
    style,
    className,
    children,
    labelCol,
    wrapperCol,
    defaultColCount = 4,
    defaultRowExpand = 2,
    handleFinish
  } = props;
  const { t } = useTranslation();
  const { isPhone } = useCommonStore();
  const [form] = Form.useForm();
  const [isExpand, setExpand] = useState(false);
  const [isFirst, setFirst] = useState(true);
  const [isShowExpand, setShowExpand] = useState(isRowExpand);

  useEffect(() => {
    setShowExpand(isRowExpand);

    if (isRowExpand) {
      const showNum = defaultColCount * defaultRowExpand;
      setShowExpand(showNum < list.length);
    }
  }, [defaultColCount, defaultRowExpand, isRowExpand, list.length]);

  // 初始化内容
  useEffect(() => {
    try {
      if (Object.keys(data).length) {
        setFirst(false);
        form.setFieldsValue({ ...data });
      }
    } catch (e) {
      console.warn('传入的搜索数据不是一个对象');
    }
  }, [data, form, isFirst]);

  // 清除多余参数
  const formProps = { ...props };
  delete formProps.type;
  delete formProps.isSearch;
  delete formProps.isClear;
  delete formProps.isLoading;
  delete formProps.initSearch;
  delete formProps.handleFinish;

  /** 回车处理 */
  const onPressEnter = () => {
    form?.submit();
  };

  /** 点击清除 */
  const onClear = () => {
    form?.resetFields();
    form?.setFieldsValue(initSearch ? { ...initSearch } : {});
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

  /** 获取表单label宽度 */
  const getLabelCol = (item?: SearchList) => {
    if (item?.labelWidth) {
      return { style: { width: item.labelWidth } };
    }

    if (item?.labelCol) return item.labelCol;
    if (labelCol) return labelCol;

    return type === 'grid' && !isPhone ? { span: 6 } : undefined;
  };

  /** 获取输入间隙 */
  const getWrapperCol = (item?: SearchList) => {
    if (item?.wrapperWidth) {
      return { style: { width: item.wrapperWidth } };
    }

    if (item?.wrapperCol) return item.wrapperCol;
    if (wrapperCol) return wrapperCol;

    return type === 'grid' && !isPhone ? { span: 18 } : undefined;
  };

  /**
   * 提交表单
   * @param values - 表单值
   */
  const onFinish: FormProps['onFinish'] = values => {
    if (handleFinish) {
      // 将dayjs类型转为字符串
      const params = filterDayjs(values, list as FormList[]);
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

  /** 渲染按钮列表 */
  const renderBtnList = (
    <div className='flex items-center flex-wrap'>
      {
        !!isSearch &&
        <Form.Item>
          <Button
            type='primary'
            htmlType='submit'
            className={`!mb-5px ${isPhone ? 'mr-5px' : ''}`}
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
            className={`!mb-5px ${isPhone ? 'mr-5px' : ''}`}
            icon={<ClearOutlined />}
            onClick={onClear}
          >
            { t('public.clear') }
          </Button>
        </Form.Item>
      }

      {
        children &&
        <Form.Item>
          <div className={`!mb-5px ${isPhone ? 'mr-5px' : ''}`}>
            { children }
          </div>
        </Form.Item>
      }

      {
        type === 'grid' &&
        !isPhone &&
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
  );

  return (
    <div
      id="searches"
      style={style}
      className={className}
    >
      <Form
        layout={isPhone ? 'horizontal' : 'inline'}
        {...formProps}
        ref={ref}
        form={form}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        {
          (type === 'default' || isPhone) &&
          <>
            {
              list?.map(item => (
                <Form.Item
                  key={`${item.name}`}
                  label={item.label}
                  name={item.name}
                  className='!mb-5px'
                  hidden={item.hidden}
                  labelCol={getLabelCol(item)}
                  wrapperCol={getWrapperCol(item)}
                  rules={item.rules}
                  valuePropName={handleValuePropName(item.component)}
                >
                  { getComponent(t, item, onPressEnter) }
                </Form.Item>
              ))
            }
            { renderBtnList }
          </>
        }

        {
          type === 'grid' &&
          !isPhone &&
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
                    labelCol={getLabelCol(item)}
                    wrapperCol={getWrapperCol(item)}
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
                { renderBtnList }
              </Flex>
            </Col>
          </Flex>
        }
      </Form>
    </div>
  );
});

export default BaseSearch;
