// 全局组件路径
export const COMP_PATH = '/src/components/';
// 页面路径
export const PAGES_PATH = '/src/pages/';
// 布局路径
export const LAYOUTS_PATH = '/src/layouts';
// 打包页面文件的前缀
export const PAGE_PREFIX = 'page_';
// 全局组件的前缀
export const COMP_PREFIX = 'components_';
// 布局组件的前缀
export const LAYOUTS_NAME = 'layouts';

// 预加载js
export const preloadLoad = [
  '@babel_runtime',
  'nprogress',
  'react.',
  'react-dom',
  'react-is',
  LAYOUTS_NAME,
  'antd',
  'axios',
  'crypto-js',
  'scheduler',
  'rc-',
  '@ant-design_cssinjs',
  '@ant-design_icons-svg',
  '@ant-design_colors',
  '@ant-design_icons',
];

// 懒加载js
export const lazyJs = [
  'react-router',
  'react-router-dom',
  COMP_PREFIX,
  PAGE_PREFIX,
  'zrender',
  'echarts',
  '@wangeditor_editor',
  '@wangeditor_editor-for-react',
];

// 懒加载css
export const lazyCss = [
  COMP_PREFIX,
  PAGE_PREFIX,
  '@wangeditor_editor',
];