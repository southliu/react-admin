import type { IFormData } from '#/form'
import type { IPageServerResult, IPaginationData } from '#/public'
import { request } from '@/utils/request'

enum API {
  URL = '/authority/user'
}

/**
 * 获取分页数据
 * @param data - 请求数据
 */
export function getUserPage(data: Partial<IFormData> & IPaginationData) {
  return request.get<IPageServerResult<IFormData[]>>(
    `${API.URL}/index`,
    { params: data }
  )
}

/**
 * 根据ID获取数据
 * @param id - ID
 */
export function getUserById(id: string) {
  return request.get(`${API.URL}/${id}`)
}

/**
 * 新增数据
 * @param data - 请求数据
 */
export function createUser(data: IFormData) {
  return request.post(API.URL, data)
}

/**
 * 修改数据
 * @param id - 修改id值
 * @param data - 请求数据
 */
export function updateUser(id: string, data: IFormData) {
  return request.put(`${API.URL}/${id}`, data)
}

/**
 * 删除
 * @param id - 删除id值
 */
export function deleteUser(id: string) {
  return request.delete(`${API.URL}/${id}`)
}
