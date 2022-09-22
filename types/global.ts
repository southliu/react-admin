import type { IFormData } from './form'
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
export type ITableColumn = ColumnsType<object>

// 表格操作
export type ITableOptions = (value: unknown, record: object) => JSX.Element