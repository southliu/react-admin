import type { SubMenuType } from 'antd/lib/menu/hooks/useItems';
import type { ColumnsType } from 'antd/lib/table';
import type { Dayjs } from 'dayjs';

// 区间值
type EventValue<T> = T | null
export type RangeValue<T> = [EventValue<T>, EventValue<T>] | null

// 基础类型
export type BasicData = string | number | boolean

// 数组
export type ArrayData = string[] | number[] | boolean[]

// 对象
type ObjectType = Record<string, BasicData | ArrayData | EmptyData | object | object[]>
export type ObjectData = object | object[] | ObjectType

// 时间
export type DateData = Dayjs | RangeValue<Dayjs>

// 空值
export type EmptyData = null | undefined

// 唯一值
export type SymbolData = symbol | symbol[]

// 全部数据类型
export type AllTypeData = BasicData | ArrayData | EmptyData | ObjectData | SymbolData | DateData

// 接口响应数据
export interface ServerResult<T = unknown> {
  code: number;
  message?: string;
  data: T
}

// 分页接口响应数据
export interface PageServerResult<T = unknown> {
  code: number;
  message?: string;
  data: {
    items: T,
    total: number
  }
}

// 分页表格响应数据
export interface PaginationData {
  page?: number;
  pageSize?: number;
}

// 侧边菜单
export interface SideMenu extends Omit<SubMenuType, 'children' | 'label' | 'icon'> {
  label: string;
  key: string;
  icon?: React.ReactNode | string;
  rule?: string; // 路由权限
  nav?: string[]; // 面包屑路径
  children?: SideMenu[];
}

// 页面权限
export interface PagePermission {
  page?: boolean;
  create?: boolean;
  update?: boolean;
  delete?: boolean;
  [key: string]: boolean;
}

// 表格列数据
export type TableColumn<T = object> = ColumnsType<T>

// 表格操作
export type TableOptions<T = object> = (value: unknown, record: T, index?: number) => JSX.Element