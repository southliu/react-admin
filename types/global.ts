import type { ColumnsType } from 'antd/lib/table'

// 接口响应数据
export interface IServerResult<T = unknown> {
  code: number;
  message?: string;
  data: T
}
export interface IPageServerResult<T = unknown> {
  code: number;
  message?: string;
  data: {
    items: T,
    total: number
  }
}

// 分页表格响应数据
export interface IPaginationData {
  page: number;
  pageSize: number;
}

// 表格列数据
export type ITableColumn<T = object> = ColumnsType<T>

// 表格操作
export type ITableOptions<T = object> = (value: unknown, record: T) => JSX.Element