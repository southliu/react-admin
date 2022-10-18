import type { ISideMenu } from '#/public'
import { Icon } from '@iconify/react'
import { system } from './system'
import { demo } from './demo'

export const defaultMenus: ISideMenu[] = [
  {
    label: '仪表盘',
    key: 'dashboard',
    icon: <Icon icon='la:tachometer-alt' />,
    children: [
      {
        label: '数据总览',
        key: '/dashboard',
        rule: '/dashboard',
      }
    ]
  },
  ...demo as ISideMenu[],
  ...system as ISideMenu[],
]