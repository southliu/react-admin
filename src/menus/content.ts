import type { SideMenu } from '#/public'

export const content: SideMenu[] = [
  {
    label: '内容管理',
    key: 'content',
    icon: 'majesticons:article-search-line',
    children: [
      {
        label: '文章管理',
        key: '/content/article',
        rule: '/content/article',
      },
    ]
  }
]
