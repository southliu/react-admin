import type { ISideMenu } from '#/global'

/**
 * 搜索相应菜单值
 * @param menus - 菜单
 * @param permissions - 权限列表
 * @param value - 匹配值
 * @param result - 返回值
 */
export function searchMenuValue(
  menus: ISideMenu[] | undefined,
  permissions: string[],
  value: string,
  result: ISideMenu[] = []
): ISideMenu[] {
  if (!menus?.length || !value) return []

  for (let i = 0; i < menus.length; i++) {
    // 如果存在子数组则递归
    if (menus[i]?.children?.length) {
      // 递归子数组，返回结果
      const childResult = searchMenuValue(
        menus[i].children,
        permissions,
        value,
        result
      )
      // 当子数组返回值有值时则合并数组
      if (childResult) result.concat(childResult)
    } else if (
      menus[i]?.label?.includes(value) &&
      permissions?.includes(menus[i].rule || '')
    ) {
      // 匹配到value值时添加到result中
      const { label, key } = menus[i]
      result.push({ label, key })
    }
  }

  return result
}

/**
 * 根据key获取菜单当前值
 * @param menus - 菜单
 * @param permissions - 权限列表
 * @param key - 路由值
 * @param result - 返回值
 */
interface IGetMenuByKeyResult {
  label: string;
  key: string;
  nav: string[];
}
export function getMenuByKey(
  menus: ISideMenu[] | undefined,
  permissions: string[],
  key: string,
  currentNav: string[] = [],
  result: IGetMenuByKeyResult = { label: '', key: '', nav: [] }
) {
  for (let i = 0; i < menus.length; i++) {
    if (!menus?.length || !key || result.key) return result

    if (menus[i]?.children?.length) {
      currentNav.pop()
      const list = [menus[i].label].concat(currentNav)
      // 递归子数组，返回结果
      const childResult = getMenuByKey(
        menus[i].children,
        permissions,
        key,
        currentNav = list,
        result
      )
      // 当子数组返回值
      if (childResult.key) result = childResult
    } else if (
      menus[i]?.key === key &&
      permissions?.includes(menus[i].rule || '')
    ) {
      currentNav.push(menus[i].label)
      const { label, key } = menus[i]
      if (key) result = { label, key, nav: currentNav }
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
      const children = filterMenus(
        menus[i].children as ISideMenu[],
        permissions
      )
      if (children?.length) menus[i].children = children
    }

    // 有权限或有子数据累加
    if (
      hasPermission(menus[i], permissions) ||
      menus[i].children?.length
    ) {
      result.push(menus[i])
    }
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
  return Boolean(route?.children?.length)
}
