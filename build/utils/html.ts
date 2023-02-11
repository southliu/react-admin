/**
 * 打包index.html文件所需的js
 */

/** 获取路径 */
export function getHtmlPath() {
  let href = location.href
  // 去除search
  const searchIndex = href.indexOf('?')
  if (searchIndex > 0) href = href.substring(0, searchIndex)
  const arr = href.split('/')
  const result = arr[arr.length - 1] // 获取名称
  return result
}

/**
 * 首屏提前加载处理
 * @param path - 路径
 * @param lazyJs - 懒加载js
 * @param lazyCss - 懒加载css
 */
export function firstLoad(path: string, lazyJs: string[], lazyCss: string[]) {
  // 提前加载js处理
  for (let i = lazyJs.length - 1; i >= 0; i--) {
    // 数据大屏或首页echarts提前渲染
    if (
      (path === 'dataScreen' || path === 'dashboard') &&
      lazyJs[i]?.includes('echarts')
    ) {
      createPreloadJs(lazyJs[i])
      lazyJs.splice(i, 1)
    }

    // 内容编辑提前加载wangeditor
    if (
      path === 'dataScreen' &&
      (lazyJs[i]?.includes('@wangeditor_editor') ||
      lazyJs[i]?.includes('@wangeditor_editor/editor-for-react'))
    ) {
      createPreloadJs(lazyJs[i])
      lazyJs.splice(i, 1)
    }
  }

  // 提前加载css处理
  for (let i = lazyCss.length - 1; i >= 0; i--) {
    // 内容编辑提前加载wangeditor
    if (path === 'content/article/option' && lazyCss?.includes('@wangeditor_editor')) {
      createCss(lazyCss[i])
      lazyCss.splice(i, 1)
    }
  }

  return [lazyJs, lazyCss] as const
}

/**
 * 特定页面才会加载(特殊处理)
 * 如：需要跳转新页面才加载的数据，平时不加载
 */
export function excludeLoad(path: string, lazyJs: string[], lazyCss: string[]) {
  for (let i = lazyJs.length - 1; i >= 0; i--) {
    // 当前页面不是数据展览则不加载
    if (
      path !== 'dataScreen' &&
      (lazyJs[i].includes('dataScreen') ||
      lazyJs[i].includes('DataScreen'))
    ) {
      lazyJs.splice(i, 1)
    }
  }
  
  for (let i = lazyCss.length - 1; i >= 0; i--) {
    // 当前页面不是数据展览则不加载
    if (
      path !== 'dataScreen' &&
      (lazyCss[i].includes('dataScreen') ||
      lazyCss[i].includes('DataScreen'))
    ) {
      lazyCss.splice(i, 1)
    }
  }

  return [lazyJs, lazyCss] as const
}

/**
 * 创建预加载js
 * @param href - 值
 * @param callback - 加载完毕回调
 */
export function createPreloadJs(href: string, callback?: () => void) {
  const elem = document.createElement("link")
  elem.rel = "modulepreload"
  elem.href = href
  document.body.appendChild(elem)
  elem.onload = () => callback?.()
}

/**
 * 创建懒加载js
 * @param href - 值
 * @param callback - 加载完毕回调
 */
export function createLazyJs(href: string, callback?: () => void) {
  const elem = document.createElement("script")
  elem.type = "module"
  elem.async = true
  elem.src = href
  document.body.appendChild(elem)
  elem.onload = () => callback?.()
}

/**
 * 创建css
 * @param href - 值
 * @param callback - 加载完毕回调
 */
export function createCss(href: string, callback?: () => void) {
  const elem = document.createElement("link")
  elem.rel = "stylesheet"
  elem.type = "text/css"
  elem.href = href
  document.body.appendChild(elem)
  elem.onload = () => callback?.()
}

/**
 * 处理js
 * @param lazyJs - 懒加载js
 * @param jsNum - 懒加载数
 * @param jsLimit - 限制同时加载数
 */
export function handleJs(lazyJs: string[], jsNum = 0, jsLimit = 3) {
  for (let i = 0; i < lazyJs.length && jsNum < jsLimit; i++) {
    jsNum++
    const current = lazyJs[0]
    lazyJs.splice(0, 1)
    createLazyJs(current, () => {
      jsNum--
      handleJs(lazyJs, jsNum)
    })
  }
}

/**
 * 处理css
 * @param lazyCss - 懒加载css
 * @param cssNum - 懒加载数
 * @param cssLimit - 限制同时加载数
 */
export function handleCss(lazyCss: string[], cssNum = 0, cssLimit = 3) {
  for (let i = 0; i < lazyCss.length && cssNum < cssLimit; i++) {
    const current = lazyCss[0]
    lazyCss.splice(0, 1)
    cssNum++
    createCss(current, () => {
      cssNum--
      handleCss(lazyCss, cssNum)
    })
  }
}

/**
 * 预加载处理
 * @param params - 参数
 */
export function handlePreload(
  time: number, // 定时器时间
  lazyJs: string[], // 懒加载js
  lazyCss: string[] // 懒加载css
) {
  const path = getHtmlPath()

  // 加载当前页面所需的js
  for (let i = lazyJs.length - 1; i >= 0; i--) {
    if (path && lazyJs[i].includes(path)) {
      createPreloadJs(lazyJs[i])
      lazyJs.splice(i, 1)
    }
  }

  // 加载当前页面所需的css
  for (let i = lazyCss.length - 1; i >= 0; i--) {
    if (path && lazyCss[i].includes(path)) {
      createCss(lazyCss[i])
      lazyCss.splice(i, 1)
    }
  }

  // 排除加载模块
  const [newExcludeJs, newExcludeCss] = excludeLoad(path, lazyJs, lazyCss)
  lazyJs = newExcludeJs
  lazyCss = newExcludeCss

  // 提前加载模块
  const [newFirstJs, newFirstCss] = firstLoad(path, lazyJs, lazyCss)
  lazyJs = newFirstJs
  lazyCss = newFirstCss

  setTimeout(function() {
    handleCss(lazyCss)
    handleJs(lazyJs)
  }, time)
}