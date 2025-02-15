import type { TFunction } from 'i18next';
import type { FormItemProps } from 'antd';
import type { ComponentProps, ComponentType, FormList } from '#/form';
import { cloneDeep } from 'lodash';
import { DATE_FORMAT, TIME_FORMAT } from '@/utils/config';

/**
 * 处理子节点的值的属性
 * @param component - 组件名
 */
export function handleValuePropName(component: ComponentType): string {
  switch (component) {
    case 'Switch':
      return 'checked';

    case 'Upload':
      return 'fileList';

    default:
      return 'value';
  }
}

/**
 * 初始化组件自定义属性
 * @param component - 组件名
 */
export function initCompProps(
  t: TFunction,
  component: ComponentType,
  onPressEnter: () => void
): ComponentProps {
  switch (component) {
    // 下拉框
    case 'Select':
      return {
        allowClear: true,
        showSearch: true,
        optionFilterProp: 'label',
        placeholder: t('public.inputPleaseSelect')
      };

    // 树形下拉框
    case 'TreeSelect':
      return {
        allowClear: true,
        showSearch: true,
        treeNodeFilterProp: 'label',
        placeholder: t('public.inputPleaseSelect')
      };

    // 数字框
    case 'InputNumber':
      return {
        placeholder: t('public.inputPleaseEnter'),
        onPressEnter
      };

    // 勾选框
    case 'Checkbox':
      return {};

    // 勾选框组
    case 'CheckboxGroup':
      return {};

    // 日期
    case 'DatePicker':
      return {
        placeholder: t('public.inputPleaseSelect'),
        format: DATE_FORMAT,
      };

    // 日期区间
    case 'RangePicker':
      return {
        placeholder: [t('public.inputPleaseSelect'), t('public.inputPleaseSelect')],
        format: [DATE_FORMAT, DATE_FORMAT],
      };

    // 时间
    case 'TimePicker':
      return {
        placeholder: t('public.inputPleaseSelect'),
        format: TIME_FORMAT,
      };

    // 时间区间
    case 'TimeRangePicker':
      return {
        placeholder: [t('public.inputPleaseSelect'), t('public.inputPleaseSelect')],
        format: [TIME_FORMAT, TIME_FORMAT],
      };

    default:
      return {
        allowClear: true,
        placeholder: t('public.inputPleaseEnter'),
      };
  }
}

/** 处理上传组件数据格式 */
const handleUploadData: FormItemProps['getValueFromEvent'] = (e) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};

/**
 * 过滤表单数据
 * @param data - 表单数据
 */
export const filterFormItem = (data: FormList): FormItemProps => {
  const result = cloneDeep(data);
  delete result.componentProps;
  delete result.render;

  // 如果当前项时隐藏且存在规则，则移除规则校验
  if (result.hidden && result.rules?.length) {
    result.rules = undefined;
  }

  // 上传组建特殊处理
  if (result.component === 'Upload' && !result?.getValueFromEvent) {
    result.getValueFromEvent = handleUploadData;
  }

  return result as FormItemProps;
};
