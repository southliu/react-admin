// import type { VxeTableProps } from "vxe-table"
import type { IFormData } from "./form"

// 搜索数据
export interface ISearchData {
  data: IFormData;
}

// 新增数据
export interface ICreateData {
  id: string;
  isVisible: boolean;
  title: string;
  data: IFormData;
}

// 分页数据
export interface IPaginationData {
  page: number;
  pageSize: number;
}

// 表格数据
// export type ITableData = {
//   total?: number;
// } & VxeTableProps

// 接口响应数据
export interface IServerResult<T = unknown> {
  code: number;
  message?: string;
  data: T
}

// 分页表格响应数据
export interface IPageServerResult<T = unknown> {
  code: number;
  message?: string;
  data: {
    items: T,
    total: number
  }
}