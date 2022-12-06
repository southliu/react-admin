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

  return tableHeight > 0 ? tableHeight - 60 : 450
}