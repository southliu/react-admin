import type { TFunction } from 'i18next';
import { DefaultOptionType } from 'antd/es/select';

/**
 * @description: 公用常量
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

export interface Constant extends Omit<DefaultOptionType, 'children'> {
  value: string | number;
  label: string;
  color?: colors;
  children?: Constant[];
}

/**
 * 开启状态
 */
 export const OPEN_CLOSE = (t: TFunction): Constant[] => [
  { label: t('public.open'), value: 1 },
  { label: t('public.close'), value: 0 }
];

/**
 * 菜单状态
 */
 export const MENU_STATUS = (t: TFunction): Constant[] => [
  { label: t('public.show'), value: 1 },
  { label: t('public.hide'), value: 0 }
];

/**
 * 菜单模块
 */
 export const MENU_MODULE = (t: TFunction): Constant[] => [
  { value: 'authority', label: t('system.authority') },
  { value: 'platform', label: t('system.platform') },
  { value: 'stat', label: t('system.stat') },
  { value: 'ad', label: t('system.ad') },
  { value: 'cs', label: t('system.cs') },
  { value: 'log', label: t('system.log') }
];

/**
 * 菜单作用类型
 */
 export const MENU_ACTIONS = (t: TFunction): Constant[] => [
  { value: 'create', label: t('system.create') },
  { value: 'update', label: t('system.update') },
  { value: 'delete', label: t('system.delete') },
  { value: 'detail', label: t('system.detail') },
  { value: 'export', label: t('system.export') },
  { value: 'status', label: t('system.status') },
];