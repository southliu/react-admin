import type { ISideMenu } from '#/public'
import { Icon } from '@iconify/react'

export const demo: ISideMenu[] = [
  {
    label: '组件',
    key: 'Demo',
    icon: <Icon icon='fluent:box-20-regular' />,
    children: [
      {
        label: '剪切板',
        key: '/demo/copy',
        rule: '/demo/copy',
      },
      {
        label: '水印',
        key: '/demo/watermark',
        rule: '/demo/watermark',
      },
      {
        label: '虚拟滚动',
        key: '/demo/virtualScroll',
        rule: '/demo/virtualScroll',
      },
      {
        label: '富文本',
        key: '/demo/editor',
        rule: '/demo/editor',
      },
      {
        label: '层级1',
        key: '/demo/level1',
        children: [
          {
            label: '层级2',
            key: '/demo/level1/level2',
            children: [
              {
                label: '层级3',
                key: '/demo/level1/level2/level3',
                rule: '/demo/watermark',
              }
            ]
          }
        ]
      },
    ]
  }
]
