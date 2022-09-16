import type { ItemType, SubMenuType } from 'antd/lib/menu/hooks/useItems'

// ItemType类型中没有label值，强制断言，后续有label值则修复
export interface ISearchMenuValue {
  label: string;
  key: string;
}

/**
 * 搜索相应菜单值
 * @param menus - 菜单
 * @param value - 匹配值
 * @param result - 返回值
 */
export function searchMenuValue(
  menus: ItemType[] | undefined,
  value: string,
  result: ItemType[] = []
) {
  if (!menus?.length || !value) return []

  for (let i = 0; i < menus.length; i++) {
    // 如果存在子数组则递归
    if ((menus[i] as SubMenuType)?.children?.length) {
      // 递归子数组，返回结果
      const childResult = searchMenuValue(
        (menus[i] as SubMenuType).children,
        value,
        result
      )
      // 当子数组返回值有值时则合并数组
      if (childResult) result.concat(childResult)
    } else if ((menus[i] as ISearchMenuValue)?.label?.includes(value)) {
      // 匹配到value值时添加到result中
      const { label, key } = menus[i] as ISearchMenuValue
      result.push({ label, key})
    }
  }

  return result
}

/**
 * 根据key获取菜单当前值
 * @param menus - 菜单
 * @param key - 路由值
 * @param result - 返回值
 */
export function getMenuByKey(
  menus: ItemType[] | undefined,
  key: string,
  result = { label: '', key: '' }
) {
  if (!menus?.length || !key || result.key) return result

  for (let i = 0; i < menus.length; i++) {
    // 如果存在子数组则递归
    if ((menus[i] as SubMenuType)?.children?.length) {
      // 递归子数组，返回结果
      const childResult = getMenuByKey(
        (menus[i] as SubMenuType).children,
        key,
        result
      )
      // 当子数组返回值
      if (childResult.key) result = childResult
    } else if (menus[i]?.key === key) {
      const { label, key } = menus[i] as ISearchMenuValue
      if (key) result = { label, key }
    }
  }

  return result
}