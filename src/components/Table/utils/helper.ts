import type { SizeType } from 'antd/es/config-provider/SizeContext'
import type { ColumnsType } from 'antd/es/table'
import { EMPTY_VALUE } from '@/utils/config'

/** 计算表格高度 */
export function getTableHeight(): number {
  // 屏幕高度
  const screenHeight = window.innerHeight

  // 顶部高度
  const headerElm = document.getElementById('header')
  const headerHeight = headerElm?.offsetHeight

  // 搜索高度
  const searchesElm = document.getElementById('searches')
  const searchesHeight = searchesElm?.offsetHeight

  // 分页高度
  const paginationElm = document.getElementById('pagination')
  const paginationHeight = paginationElm?.offsetHeight

  // 表格高度 = 内容高度 - 搜索高度 - 分页高度
  let tableHeight = screenHeight || 0
  if (headerHeight && tableHeight > 0) tableHeight -= headerHeight
  if (searchesHeight && tableHeight > 0) tableHeight -= searchesHeight
  if (paginationHeight && tableHeight > 0) tableHeight -= paginationHeight

  return tableHeight > 0 ? tableHeight - 65 : 450
}

/**
 * 根据大小处理行高度
 * @param size - 大小
 */
export function handleRowHeight(size: SizeType): number {
  switch(size) {
    case 'large':
      return 54

    case 'middle':
      return 46

    default:
      return 38
  }
}

/**
 * 表格处理，表头超出隐藏，空值转为‘-’
 * @param columns - 表格数据
 */
export function filterTableColumns(columns: ColumnsType<object>) {
  for (let i = 0; i < columns.length; i++) {
    const element = columns[i]
    if (element.ellipsis === undefined) {
      element.ellipsis = true
    }
    if (!element.render) {
      element.render = (text: string | number) => {
        return text ? text : text === 0 ? text : EMPTY_VALUE
      }
    }
  }

  return columns
}
