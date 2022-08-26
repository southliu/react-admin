/**
 * 公用常量
 */

/**
 * 颜色
 */
 export enum colors {
  success = 'green',
  primary = '#409EFF',
  warning = '#E6A23C',
  danger = 'red',
  info = '#909399'
}

interface IConstant {
  value: string | number;
  label: string;
  color?: colors;
}

// 日期格式化
export const DATE_FORMAT = 'YYYY-MM-DD'
export const TIME_FORMAT = 'YYYY-MM-DD hh:mm:ss'

/**
 * 开启状态
 */
 export const OPEN_CLOSE: IConstant[] = [
  { label: '开启', value: 1 },
  { label: '关闭', value: 0 }
]

/**
 * 菜单状态
 */
 export const MENU_STATUS: IConstant[] = [
  { label: '显示', value: 1 },
  { label: '隐藏', value: 0 }
]

/**
 * 菜单模块
 */
 export const MENU_MODULE: IConstant[] = [
  { value: 'authority', label: '权限系统' },
  { value: 'platform', label: '运营系统' },
  { value: 'stat', label: '统计系统' },
  { value: 'ad', label: '投放系统' },
  { value: 'cs', label: '客服系统' },
  { value: 'log', label: '日志系统' }
]

/**
 * 菜单作用类型
 */
 export const MENU_ACTIONS: IConstant[] = [
  { value: 'create', label: '创建' },
  { value: 'update', label: '更新' },
  { value: 'delete', label: '删除' },
  { value: 'detail', label: '详情' },
  { value: 'export', label: '导出' },
  { value: 'status', label: '状态' },
]