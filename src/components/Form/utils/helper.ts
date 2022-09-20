import type { IComponentProps, IComponentType } from '#/form'
import { PLEASE_ENTER, PLEASE_SELECT } from '@/utils/config'

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
    
    default:
      return {
        allowClear: true,
        placeholder: PLEASE_ENTER
      }
  }
}