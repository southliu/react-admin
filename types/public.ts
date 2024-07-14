import { ItemType } from 'antd/es/menu/interface';
import type { ColumnsType } from 'antd/lib/table';

// 区间值
type EventValue<T> = T | null
export type RangeValue<T> = [EventValue<T>, EventValue<T>] | null

// 数组
export type ArrayData = string[] | number[] | boolean[]

// 空值
export type EmptyData = null | undefined

// 分页接口响应数据
export interface PageServerResult<T = unknown> {
  items: T,
  total: number
}

// 分页表格响应数据
export interface PaginationData {
  page?: number;
  pageSize?: number;
}

// 侧边菜单
export interface SideMenu extends Omit<ItemType, 'children' | 'label' | 'icon'> {
  label: string;
  labelEn: string;
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
  [key: string]: boolean | undefined;
}

// 表格列数据
export type TableColumn<T = object> = ColumnsType<T>

// 表格操作
export type TableOptions<T = object> = (value: unknown, record: T, index?: number) => JSX.Element
