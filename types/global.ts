import type { SubMenuType } from 'antd/lib/menu/hooks/useItems'
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

// 侧边菜单
export interface ISideMenu extends Omit<SubMenuType, 'children' | 'label' | 'icon'> {
  label: string;
  key: string;
  icon?: React.ReactNode | string;
  rule?: string; // 路由权限
  keepAlive?: boolean; // 是否开启keepAlive
  children?: ISideMenu[];
}

// 页面权限
export interface IPagePermission {
  page: boolean;
  [key: string]: boolean;
}

// 表格列数据
export type ITableColumn<T = object> = ColumnsType<T>

// 表格操作
export type ITableOptions<T = object> = (value: unknown, record: T, index?: number) => JSX.Element