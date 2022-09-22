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
      extensions: ['tsx', 'jsx'],
      exclude: [
        '**/components/**/*',
        '**/utils/**/*',
        '**/hooks/**/*',
        '**/data.tsx',
        '**/tests/**/*',
        '**/__test__/**/*'
      ],
    })
  ]
}