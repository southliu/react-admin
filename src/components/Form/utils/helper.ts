import type { ComponentProps, ComponentType } from '#/form';
import { PLEASE_ENTER, PLEASE_SELECT } from '@/utils/config';
import { DATE_FORMAT, TIME_FORMAT } from '@/utils/constants';

/**
 * 处理子节点的值的属性
 * @param component - 组件名
 */
export function handleValuePropName(component: ComponentType): string {
  switch (component) {
    case 'Switch':
    case 'Checkbox':
    case 'CheckboxGroup':
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
export function initCompProps(component: ComponentType): ComponentProps {
  switch (component) {
    // 下拉框
    case 'Select':
      return {
        allowClear: true,
        placeholder: PLEASE_SELECT
      };

    // 数字框
    case 'InputNumber':
      return {
        placeholder: PLEASE_ENTER
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
        placeholder: PLEASE_SELECT,
        format: DATE_FORMAT,
      };

    // 日期区间
    case 'RangePicker':
      return {
        placeholder: [PLEASE_SELECT, PLEASE_SELECT],
        format: [DATE_FORMAT, DATE_FORMAT],
      };

    // 时间
    case 'TimePicker':
      return {
        placeholder: PLEASE_SELECT,
        format: TIME_FORMAT,
      };

    // 时间区间
    case 'TimeRangePicker':
      return {
        placeholder: [PLEASE_SELECT, PLEASE_SELECT],
        format: [TIME_FORMAT, TIME_FORMAT],
      };
    
    default:
      return {
        allowClear: true,
        placeholder: PLEASE_ENTER
      };
  }
}