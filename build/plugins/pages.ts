import Pages from 'vite-plugin-pages'

/**
 * @description 自动生成路由
 */
export function configPageImportPlugin() {
  return [
    Pages({
      resolver: 'react',
      importMode: 'sync',
      routeStyle: 'next',
      exclude: [
        '**/components/**/*',
        '**/tests/**/*',
        '**/__test__/**/*',
        '**/*.ts'
      ],
    })
  ]
}