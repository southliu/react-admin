import type { SideMenu } from '#/public';

export const content: SideMenu[] = [
  {
    label: '内容管理',
    labelEn: 'Content Management',
    key: 'content',
    icon: 'majesticons:article-search-line',
    children: [
      {
        label: '文章管理',
        labelEn: 'Article Management',
        key: '/content/article',
        rule: '/content/article',
      },
    ]
  }
];
