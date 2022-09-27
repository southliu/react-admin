import type { IComponentProps, IComponentType } from '#/form'
import { PLEASE_ENTER, PLEASE_SELECT } from '@/utils/config'

/**
 * 处理子节点的值的属性
 * @param component - 组件名
 */
export function handleValuePropName(component: IComponentType): string {
  switch (component) {
    case 'Switch':
    case 'Checkbox':
    case 'CheckboxGroup':
      return 'checked'

    case 'Upload':
      return 'fileList'

    default:
      return 'value'
  }
}

/**
 * 初始化组件自定义属性
 * @param component - 组件名
 */
export function initCompProps(component: IComponentType): IComponentProps {
  switch (component) {
    // 下拉框
    case 'Select':
      return {
        allowClear: true,
        placeholder: PLEASE_SELECT
      }

    // 数字框
    case 'InputNumber':
      return {
        placeholder: PLEASE_ENTER
      }

    // 勾选框
    case 'Checkbox':
      return {}

    // 勾选框组
    case 'CheckboxGroup':
      return {}
    
    default:
      return {
        allowClear: true,
        placeholder: PLEASE_ENTER
      }
  }
}