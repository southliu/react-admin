// 全局组件路径
export const COMP_PATH = '/src/components/'
// 页面路径
export const PAGES_PATH = '/src/pages/'
// 布局路径
export const LAYOUTS_PATH = '/src/layouts'
// 打包页面文件的前缀
export const PAGE_PREFIX = 'page_'
// 全局组件的前缀
export const COMP_PREFIX = 'components_'
// 布局组件的前缀
export const LAYOUTS_NAME = 'layouts'

// 预加载js
export const preloadLoad = [
  '@babel_runtime',
  'react',
  'react-is',
  'scheduler',
  'react-dom',
  '@ant-design_cssinjs',
  '@ant-design_icons-svg',
  '@ant-design_colors',
  '@ant-design_icons',
  'nprogress',
  LAYOUTS_NAME
]

// 懒加载css
export const lazyCSS = [
  '@wangeditor_editor',
  COMP_PREFIX,
  PAGE_PREFIX
]