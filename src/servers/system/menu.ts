import type { Key } from 'react';
import type { DataNode } from 'antd/es/tree';
import type { FormData } from '#/form';
import type { PageServerResult, PaginationData, SideMenu } from '#/public';
import { request } from '@/utils/request';

enum API {
  URL = '/authority/menu'
}

/**
 * 获取分页数据
 * @param data - 请求数据
 */
export function getMenuPage(data: Partial<FormData> & PaginationData) {
  return request.get<PageServerResult<FormData[]>>(
    `${API.URL}/page`,
    { params: data }
  );
}

/**
 * 根据ID获取数据
 * @param id - ID
 */
export function getMenuById(id: string) {
  return request.get<FormData>(`${API.URL}/detail?id=${id}`);
}

/**
 * 新增数据
 * @param data - 请求数据
 */
export function createMenu(data: FormData) {
  return request.post(API.URL, data);
}

/**
 * 修改数据
 * @param id - 修改id值
 * @param data - 请求数据
 */
export function updateMenu(id: string, data: FormData) {
  return request.put(`${API.URL}/${id}`, data);
}

/**
 * 删除
 * @param id - 删除id值
 */
export function deleteMenu(id: string) {
  return request.delete(`${API.URL}/${id}`);
}

/**
 * 获取权限列表
 * @param data - 搜索数据
 */
interface PermissionResult {
  treeData: DataNode[];
  defaultCheckedKeys: Key[];
}
export function getPermission(data: object) {
  return request.get<PermissionResult>(`${API.URL}/tree`, { params: data });
}

/**
 * 保存权限列表
 * @param data - 权限数据
 */
export function savePermission(data: object) {
  return request.put(`${API.URL}/authorize/save`, data);
}

/**
 * 获取当前菜单数据
 * @param data - 请求数据
 */
export function getMenuList() {
  return request.get<SideMenu[]>(`/menu/list`);
}
