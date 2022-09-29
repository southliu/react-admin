import type { IFormData } from '#/form'
import type { IPageServerResult, IPaginationData } from '#/global'
import { request } from '@/utils/request'

enum API {
  URL = '/authority/menu'
}

/**
 * 获取分页数据
 * @param data - 请求数据
 */
export function getMenuPage(data: Partial<IFormData> & IPaginationData) {
  return request.get<IPageServerResult<IFormData[]>>(
    `${API.URL}/index`,
    { params: data }
  )
}

/**
 * 根据ID获取数据
 * @param id - ID
 */
export function getMenuById(id: string) {
  return request.get(`${API.URL}/${id}`)
}

/**
 * 新增数据
 * @param data - 请求数据
 */
export function createMenu(data: IFormData) {
  return request.post(API.URL, data)
}

/**
 * 修改数据
 * @param id - 修改id值
 * @param data - 请求数据
 */
export function updateMenu(id: string, data: IFormData) {
  return request.put(`${API.URL}/${id}`, data)
}

/**
 * 删除
 * @param id - 删除id值
 */
 export function deleteMenu(id: string) {
  return request.delete(`${API.URL}/${id}`)
}

/**
 * 获取权限列表
 * @param data - 搜索数据
 */
 export function getPermission(data: unknown) {
  return request.get(`${API.URL}/tree`, { params: data })
}

/**
 * 保存权限列表
 * @param data - 权限数据
 */
export function savePermission(data: unknown) {
  return request.put(`${API.URL}/authorize-save`, data)
}
