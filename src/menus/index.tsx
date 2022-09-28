import type { ISideMenu } from '#/global'
import { Icon } from '@iconify/react'
import { systems } from './systems'

export const defaultMenus: ISideMenu[] = [
  {
    label: '仪表盘',
    key: 'Dashboard',
    icon: <Icon icon='la:tachometer-alt' />,
    children: [
      {
        label: '数据总览',
        key: '/dashboard',
        rule: '/dashboard',
      }
    ]
  },
  ...systems as ISideMenu[]
]