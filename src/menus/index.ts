import type { SideMenu } from '#/public';
import { demo } from './demo';

/**
 * 弃用，改为动态菜单获取，如果需要静态菜单将/src/hooks/useCommonStore.ts中的useCommonStore中的menuList改为defaultMenus
 * import { defaultMenus } from '@/menus';
 * // 菜单数据
 * const menuList = defaultMenus;
 */
export const defaultMenus: SideMenu[] = [
  {
    label: '仪表盘',
    labelEn: 'Dashboard',
    icon: 'la:tachometer-alt',
    key: '/dashboard',
    rule: '/dashboard'
  },
  ...demo as SideMenu[],
];
