import type { MenuProps } from 'antd'
import type { MenuItemType } from 'antd/lib/menu/hooks/useItems'
import { Icon } from '@iconify/react'
import { systems } from './systems'

export const menus: MenuProps['items'] = [
  {
    label: '仪表盘',
    key: 'Dashboard',
    icon: <Icon icon='la:tachometer-alt' />,
    children: [
      {
        label: '数据总览',
        key: '/dashboard',
      }
    ]
  },
  ...systems as MenuItemType[]
]