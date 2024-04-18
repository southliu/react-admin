import type { SideMenu } from '#/public';
import { demo } from './demo';

/**
 * 弃用，改为动态菜单获取，如果需要静态菜单将useCommonStore中的menuList改为defaultMenus
 * import { defaultMenus } from '@/menus';
 * // 菜单数据
 * const menuList = defaultMenus;
 */
export const defaultMenus: SideMenu[] = [
  {
    label: '仪表盘',
    labelEn: 'Dashboard',
    key: '/dashboard',
    icon: 'la:tachometer-alt',
    children: [
      {
        label: '数据总览',
        labelEn: 'Data Overview',
        key: '/dashboard',
        rule: '/dashboard',
      }
    ]
  },
  ...demo as SideMenu[],
];