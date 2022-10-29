/** 计算表格高度 */
export function getTableHeight(): number {
  // 内容高度
  const contentElm = document.getElementById('content')
  const contentHeight = contentElm?.offsetHeight

  // 搜索高度
  const searchesElm = document.getElementById('searches')
  const searchesHeight = searchesElm?.offsetHeight

  // 分页高度
  const paginationElm = document.getElementById('pagination')
  const paginationHeight = paginationElm?.offsetHeight

  // 表格高度 = 内容高度 - 搜索高度 - 分页高度
  let tableHeight = contentHeight || 0
  if (searchesHeight && tableHeight > 0) tableHeight -= searchesHeight
  if (paginationHeight && tableHeight > 0) tableHeight -= paginationHeight

  return tableHeight > 0 ? tableHeight - 30 : 450
}