import { PAGES_PATH, PAGE_PREFIX } from './config'

type IEnvConfigs = Record<string, string>

// env数据
interface IViteEnv {
  VITE_SERVER_PORT: number;
  VITE_PROXY: [string, string][];
}

/**
 * 处理转化env
 * @param envConfigs 
 */
export function handleEnv(envConfigs: IEnvConfigs): IViteEnv {
  const {
    VITE_SERVER_PORT,
    VITE_PROXY
  } = envConfigs

  const proxy: [string, string][] = VITE_PROXY ? JSON.parse(VITE_PROXY.replace(/'/g, '"')) : []

  const res: IViteEnv = {
    VITE_SERVER_PORT: Number(VITE_SERVER_PORT) || 8080,
    VITE_PROXY: proxy
  }

  return res
}

/**
 * JS模块分包
 * @param id - 标识符
 */
export function splitJSModules(id: string) {
  // pnpm兼容
  const pnpmName = id.includes('.pnpm') ? '.pnpm/' : ''
  const fileName = `node_modules/${pnpmName}`

  let result = id
    .split(fileName)[1]
    .split('/')[0]

  if (result.includes('@')) {
    const first = result.indexOf('@')
    if (first > 0) {
      result = result.substring(0, first)
    } else {
      const second = result.indexOf('@', 1)
      result = result.substring(0, second)
    }
  }

  return result
}

/**
 * 页面分包处理
 * @param id - 标识符
 */
export function splitPage(id: string) {
  const fileName = PAGES_PATH
  const file = id.split(fileName)[1]
  const categorize = file?.split('/')?.[0] || ''
  let result = file?.split('/')?.[1] || 'index'

  if (result.includes('/')) result = result?.split('/')[0] || ''
  if (result.includes('.tsx')) result = result.substring(0, result.length - 4)

  // 组件
  if (result === 'components' || result === 'component') {
    let compName = '/components/'
    if (id.includes('/component/')) compName = '/component/'

    let comResult = id.split(compName)[1]
    if (comResult.includes('/')) comResult = comResult?.split('/')[0] || ''
    if (comResult.includes('.tsx')) comResult = comResult.substring(0, comResult.length - 4)

    return `${PAGE_PREFIX}${categorize}_comp_${comResult}`
  }

  return `${PAGE_PREFIX}${categorize}_${result}`
}

/**
 * 获取rel
 * @param html - html数据
 * @param path - 路径
 * @param start - 从第几位开始查找
 */
function getRel(html: string, path: string, start = 0) {
  const index = html.indexOf(path, start)
  const prevIndex = html.lastIndexOf('rel="', index) + 5
  const nextIndex = html.indexOf('"', prevIndex)
  const rel = html.substring(prevIndex, nextIndex)
  return [rel, index, prevIndex, nextIndex] as const
}

/**
 * 获取路径
 * @param html - html数据
 * @param path - 路径
 * @param start - 从第几位开始查找
 */
function getPath(html: string, path: string, start = 0) {
  const index = html.indexOf(path, start)
  const prevIndex = html.lastIndexOf('href="', index) + 6
  const nextIndex = html.indexOf('"', prevIndex)
  const result = html.substring(prevIndex, nextIndex)
  return result
}

/**
 * 删除对应行数据
 * @param html - html数据
 * @param index - 下标
 */
function delRow(html: string, index: number) {
  let result = ''
  let prevLink = html.lastIndexOf('">', index) + 2
  const nextLink = html.indexOf('">', index) + 2
  if (prevLink <= 0) prevLink = html.lastIndexOf('<link', index)

  if (prevLink > 0 && nextLink > 0) {
    const prev = html.substring(0, prevLink)
    const next = html.substring(nextLink, html.length)
    result = `${prev}${next}`
  }

  return [result, prevLink] as const
}

interface ILazyProps {
  html: string;
  path: string;
  arr: string[];
  start?: number;
}

/**
 * 处理懒加载CSS
 * @param html - html数据
 * @param path - 路径
 * @param start - 从第几位开始查找
 * @param arr - 返回结果
 */
export function handleLazyCss({ html, path, start, arr }: ILazyProps) {
  if (html.includes(path)) {
    if (!start) start = html.indexOf('stylesheet')

    const currentPath = getPath(html, path, start || 0)
    const [rel, index] = getRel(html, path, start)
    let newIndex = html.indexOf(path, index + path.length)

    if (currentPath.includes('.css')) {
      arr.push(currentPath)
    }
    
    // 删除对应的css
    if (rel === 'stylesheet') {
      const [result, prevLink] = delRow(html, index)
      html = result
      newIndex = prevLink
    }

    // 是否存在下一个相同名字css
    const props = { html, path, start: newIndex, arr }
    if (newIndex !== -1) html = handleLazyCss(props)
  }

  return html
}

/**
 * 处理懒加载js
 * @param html - html数据
 * @param path - 路径
 * @param start - 从第几位开始查找
 * @param arr - 返回结果
 */
export function handleLazyJs({ html, path, start, arr }: ILazyProps) {
  if (html.includes(path)) {
    if (!start) start = 0

    const currentPath = getPath(html, path, start || 0)
    const [rel, index] = getRel(html, path, start)
    let newIndex = html.indexOf(path, index + path.length)

    if (currentPath.includes('.js')) {
      arr.push(currentPath)
    }
    
    // 删除对应的js
    if (rel === 'modulepreload' || rel === 'prefetch' || rel === 'preload') {
      const [result, prevLink] = delRow(html, index)
      html = result
      newIndex = prevLink
    }

    // 是否存在下一个相同名字js
    const props = { html, path, start: newIndex, arr }
    if (newIndex !== -1) html = handleLazyJs(props)
  }

  return html
}

/**
 * 处理预加载html数据
 * @param html - html数据
 * @param path - 路径
 * @param start - 从第几位开始查找
 */
export function handlePreloadHtml(html: string, path: string, start = 0) {
  if (html.includes(path)) {
    const [rel, index, prevIndex, nextIndex] = getRel(html, path, start)

    if (rel === 'prefetch') {
      const prev = html.substring(0, prevIndex)
      const next = html.substring(nextIndex, html.length)
      html = `${prev}modulepreload${next}`
    }

    // 是否存在下一个相同名字组件
    const newIndex = html.indexOf(path, index + path.length)
    if (newIndex !== -1) html = handlePreloadHtml(html, path, newIndex)
  }

  return html
}
