import type { ISideMenu } from '#/public'
import { Icon } from '@iconify/react'

export const content: ISideMenu[] = [
  {
    label: '内容管理',
    key: 'content',
    icon: <Icon icon='majesticons:article-search-line' />,
    children: [
      {
        label: '文章管理',
        key: '/content/article',
        rule: '/content/article',
      },
    ]
  }
]
