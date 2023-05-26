import type { SideMenu } from '#/public';

export const system: SideMenu[] = [
  {
    label: '系统管理',
    key: 'system',
    icon: 'ion:settings-outline',
    children: [
      {
        label: '用户管理',
        key: '/system/user',
        rule: '/authority/user'
      },
      {
        label: '菜单管理',
        key: '/system/menu',
        rule: '/authority/menu'
      },
    ]
  }
];
