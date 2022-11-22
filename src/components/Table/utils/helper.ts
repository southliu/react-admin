import type { ColumnsType } from 'antd/es/table'

/** 计算表格高度 */
export function getTableHeight(columns: ColumnsType<object> | undefined): number {
  let result = 0

  if (columns?.length) {
    result = columns.length * 30 - 10
  }

  return result ?? 450
}