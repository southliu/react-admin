import type { ISideMenu } from '#/public'

/**
 * 根据路由获取展开菜单数组
 * @param router - 路由
 */
export function getOpenMenuByRouter(router: string): string[] {
  const arr = splitPath(router), result: string[] = []

  // 取第一个单词大写为新展开菜单key
  if (arr.length > 0) result.push(arr[0])

  // 当路由处于多级目录时
  if (arr.length > 2) {
    let str = '/' + arr[0]
    for (let i = 1; i < arr.length - 1; i++) {
      str += '/' + arr[i]
      result.push(str)
    }
  }

  return result
}

/**
 * 匹配路径内的字段
 * @param path - 路径
 * @param arr - 路径经过数组
 */
function matchPath(path: string, arr: IMenuPath[]): string[] {
  const result: string[] = []

  // 分割路径
  const pathArr = splitPath(path)
  let left = 0
  const right = pathArr.length

  for (let i = 0; i < arr.length; i++) {
    const { path } = arr[i]
    if (path?.[left] === pathArr[left]) {
      result.push(arr[i].label)
      left++
    }
    if (left === right) return result
  }

  return result
}

/**
 * 分割路径且去除首个字符串
 * @param path - 路径
 */
export function splitPath(path: string): string[] {
  // 路径为空或非字符串格式则返回空数组
  if (!path || typeof path !== 'string') return []
  // 分割路径
  const result = path?.split('/') || []
  // 去除第一个空字符串
  if (result?.[0] === '') result.shift()
  return result
}

/**
 * 搜索相应菜单值
 * @param menus - 菜单
 * @param permissions - 权限列表
 * @param value - 匹配值
 * @param currentPath - 当前路径
 * @param result - 返回值
 */

interface IMenuPath {
  label: string;
  path: string[];
}
interface ISearchMenuProps {
  menus: ISideMenu[] | undefined,
  permissions: string[],
  value: string,
  currentPath?: IMenuPath[],
  result?: ISideMenu[]
}

export function searchMenuValue(data: ISearchMenuProps): ISideMenu[] {
  const { menus, permissions, value } = data
  let { currentPath, result } = data
  if (!menus?.length || !value) return []
  if (!currentPath) currentPath = []
  if (!result) result = []

  for (let i = 0; i < menus.length; i++) {
    // 如果存在子数组则递归
    if (hasChildren(menus[i])) {
      currentPath.push({
        label: menus[i].label,
        path: splitPath(menus[i].key)
      })

      // 递归子数组，返回结果
      const childrenData = {
        menus: menus[i].children,
        permissions,
        value,
        currentPath,
        result
      }
      const childResult = searchMenuValue(childrenData)

      // 当子数组返回值有值时则合并数组
      if (childResult.length) {
        result.concat(childResult)
      } else {
        currentPath.pop()
      }
    } else if (
      menus[i]?.label?.includes(value) &&
      hasPermission(menus[i], permissions)
    ) {
      currentPath.push({
        label: menus[i].label,
        path: splitPath(menus[i].key)
      })
      const nav = matchPath(menus[i].key, currentPath)

      // 匹配到value值时添加到result中
      const { label, key } = menus[i]
      result.push({ label, key, nav })
    }
  }

  return result
}

/**
 * 根据key获取菜单当前值
 * @param menus - 菜单
 * @param permissions - 权限列表
 * @param key - 路由值
 * @param fatherNav - 父级面包屑
 * @param result - 返回值
 */
interface IGetMenuByKeyResult {
  label: string;
  key: string;
  nav: string[];
}
interface IGetMenuByKeyProps {
  menus: ISideMenu[] | undefined,
  permissions: string[],
  key: string,
  fatherNav?: string[],
  result?: IGetMenuByKeyResult
}

export function getMenuByKey(data: IGetMenuByKeyProps): IGetMenuByKeyResult | undefined {
  const { menus, permissions, key } = data
  let { fatherNav, result } = data
  if (!menus?.length) return result
  if (!fatherNav) fatherNav = []
  if (!result?.key) result = {
    key: '',
    label: '',
    nav: []
  }

  for (let i = 0; i < menus.length; i++) {
    if (!key || (result as IGetMenuByKeyResult).key) return result

    // 过滤子数据中值
    if (hasChildren(menus[i])) {
      fatherNav.push(menus[i].label)

      // 递归子数组，返回结果
      const childProps = {
        menus: menus[i].children,
        permissions,
        key,
        fatherNav,
        result
      }
      const childResult = getMenuByKey(childProps)

      // 当子数组返回值
      if (childResult?.key) {
        result = childResult
      } else {
        // 下次递归前删除面包屑前一步错误路径
        fatherNav.pop()
      }
    } else if (
      menus[i]?.key === key &&
      hasPermission(menus[i], permissions)
    ) {
      fatherNav.push(menus[i].label)
      const { label, key } = menus[i]
      if (key) result = { label, key, nav: fatherNav }
    }
  }

  return result
}

/**
 * 过滤权限菜单
 * @param menus - 菜单
 * @param permissions - 权限列表
 */
export function filterMenus(
  menus: ISideMenu[],
  permissions: string[]
): ISideMenu[] {
  const result: ISideMenu[] = []

  for (let i = 0; i < menus.length; i++) {
    // 处理子数组
    if (hasChildren(menus[i])) {
      const result = filterMenus(
        menus[i].children as ISideMenu[],
        permissions
      )

      // 有子权限数据则保留
      menus[i].children = result?.length ? result : undefined
    }

    // 有权限或有子数据累加
    if (
      hasPermission(menus[i], permissions) ||
      hasChildren(menus[i])
    ) result.push(menus[i])
  }

  return result
}

/**
 * 获取第一个有效权限路由
 * @param menus - 菜单
 * @param permissions - 权限
 */
export function getFirstMenu(
 menus: ISideMenu[],
 permissions: string[],
 result = ''
): string {
  // 有结构时直接返回
  if (result) return result

  for (let i = 0; i < menus.length; i++) {
    // 处理子数组
    if (hasChildren(menus[i]) && !result) {
      const childResult = getFirstMenu(
        menus[i].children as ISideMenu[],
        permissions,
        result
      )

      // 有结果则赋值
      if (childResult) {
        result = childResult
        return result
      }
    }

    // 有权限且没有有子数据
    if (
      hasPermission(menus[i], permissions) &&
      !hasChildren(menus[i])
    ) result = menus[i].key
  }

  return result
}

/**
 * 路由是否权限
 * @param route - 路由
 * @param permissions - 权限
 */
function hasPermission(route: ISideMenu, permissions: string[]): boolean {
  return permissions?.includes(route?.rule || '')
}

/**
 * 是否有子路由
 * @param route - 路由
 */
function hasChildren(route: ISideMenu): boolean {
  return Boolean(route.children?.length)
}
