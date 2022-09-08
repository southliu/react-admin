import type { MenuProps } from 'antd'
import { Icon } from '@iconify/react'

export const systems: MenuProps['items'] = [
  {
    label: '系统管理',
    key: 'System',
    icon: <Icon icon='ion:settings-outline' />,
    children: [
      {
        label: '用户管理',
        key: '/system/user'
      },
      {
        label: '菜单管理',
        key: '/system/menu'
      },
    ]
  }
]
