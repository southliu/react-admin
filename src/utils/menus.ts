import type { IGlobalSearchResult } from './../components/GlobalSearch/model'
import type { IMenus } from '@/router/model'
import type { IMenuItem, ISidebar } from '@/stores/menu'
import type { RouteRecordRaw } from 'vue-router'
import { checkPermission } from './permissions'

/**
 * 获取菜单数据，只获取最底层菜单数据
 * @param menus - 菜单数据
 * @param result - 返回结果数据
 * @param permissions - 权限
 * @param topValue - 头部值
 */
export function getMenus(
  menus: IMenus[],
  permissions: string[],
  result: ISidebar[] = [],
  topValue: string | undefined = undefined,
  topTitle: string | undefined = undefined
): ISidebar[] {
  for (let i = 0; i < menus.length; i++) {
    const item = menus[i],
          top = topValue || item.name as string,
          title = topTitle || item?.meta?.title || '' as string

    // 隐藏菜单跳过循环
    if (hasHidden(item)) continue

    // 空子路由跳出循环
    if (item?.children && item.children?.length === 0) continue

    // 没有子路由进行权限判断
    if (!item?.children && !checkPermission(item.meta?.rule || '', permissions)) continue

    // 当前有子路由继续遍历
    let children = undefined
    if (hasChildren(item)) {
      children = getMenus(item.children as IMenus[], permissions, [], top, topTitle)
    }

    // 有子路由切子数据为空跳过循环
    if (children && children?.length === 0) continue

    // 当有缓存则添加数据
    result.push({
      key: item.name as string,
      path: item.path,
      top,
      topTitle: title,
      rule: item?.meta?.rule || '',
      title: item?.meta?.title || '',
      icon: item?.meta?.icon,
      children
    })
  }
  return result
}

/**
 * 获取缓存路由中的路由名，只获取最底层菜单数据
 * @param menus - 菜单数据
 * @param result - 返回结果数据
 */
export function getCacheRoutes(menus: RouteRecordRaw[], result: string[] = []): string[] {
  for (let i = 0; i < menus.length; i++) {
    const item = menus[i]

    // 当前有子路由继续遍历
    if (hasChildren(item)) {
      getCacheRoutes(item.children as RouteRecordRaw[], result)
    }

    // 当有缓存则添加数据
    keepAlive(item) && result.push(item.name as string)
  }

  return result
}

/**
 * 根据路由地址获取当前菜单值
 * @param route - 路由地址
 * @param menus - 菜单数据
 */
export function getCurrentMenuByRoute(route: string, menus: ISidebar[]): IMenuItem {
  let res: IMenuItem = {
    key: '',
    path: '',
    top: '',
    topTitle: '',
    title: ''
  }
  for (let i = 0; i < menus.length; i++) {
    const element = menus[i]
    if (element.path === route) {
      res = element
    }
    if (res.key) return res
  
    // 如果存在子路由则遍历子路由
    if (element.children && element.children?.length > 0) {
      res = getCurrentMenuByRoute(route, element.children)
    }
  }
  return res
}

/**
 * 根据名称获取当前菜单值
 * @param name - 名称
 * @param menus - 菜单数据
 */
export function getCurrentMenuByName(
  name: string,
  menus: ISidebar[],
  res: IGlobalSearchResult[] = []
): IGlobalSearchResult[] {
  for (let i = 0; i < menus.length; i++) {
    const element = menus[i]
    if (!element.children && element.title.includes(name)) {
      const { title, key, path, topTitle } = element
      const params = { title, key, path, topTitle, index: res.length }
      res.push(params)
    }
    // 如果存在子路由则遍历子路由
    if (element.children && element.children?.length > 0) {
      getCurrentMenuByName(name, element.children, res)
    }
  }
  return res
}

/**
 * 获取菜单中第一个路由地址
 * @param menus - 菜单数据
 */
export function getFirstMenu(menus: ISidebar[]): IMenuItem {
  let res: IMenuItem = {
    key: '',
    path: '',
    top: '',
    topTitle: '',
    title: ''
  }
  for (let i = 0; i < menus.length; i++) {
    const element = menus[i]
    if (res.key) return res
    // 如果存在子路由则遍历子路由
    if (element.children && element.children?.length > 0) {
      res = getFirstMenu(element.children)
    } else {
      res = element
      return res
    }
  }
  return res
}
/**
 * 路由是否缓存
 * @param route
 */
function keepAlive(route: RouteRecordRaw): boolean {
  return Boolean(route?.meta?.keepAlive)
}

/**
 * 是否有子路由
 * @param route
 */
function hasChildren(route: RouteRecordRaw): boolean {
  return Boolean(route.children?.length)
}

/**
 * 是否隐藏菜单列表
 * @param route
 */
function hasHidden(route: RouteRecordRaw): boolean {
  return Boolean(route?.meta?.hidden)
}