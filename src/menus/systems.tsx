import type { ISideMenu } from '#/public'
import { Icon } from '@iconify/react'

export const systems: ISideMenu[] = [
  {
    label: '系统管理',
    key: 'System',
    icon: <Icon icon='ion:settings-outline' />,
    children: [
      {
        label: '用户管理father',
        key: '/system/user/father',
        rule: '/authority/user',
        children: [
          {
            label: '用户管理',
            key: '/system/user',
            rule: '/authority/user',
          }
        ]
      },
      {
        label: '菜单管理father',
        key: '/system/menu/father',
        rule: '/authority/menu',
        children: [
          {
            label: '菜单管理',
            key: '/system/menu',
            rule: '/authority/menu',
          }
        ]
      },
    ]
  }
]
