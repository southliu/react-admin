import type { ItemType, SubMenuType } from 'antd/lib/menu/hooks/useItems'

/**
 * 搜索相应菜单值
 * @param menus - 菜单
 * @param value - 匹配值
 */
// IMenuItem类型中没有label值，强制断言，后续有label值则修复
export interface ISearchMenuValue {
  label: string;
  key: string;
}
export function searchMenuValue(
  menus: ItemType[] | undefined,
  value: string,
  result: ItemType[] = []
) {
  if (!menus || !menus?.length || !value) return []

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