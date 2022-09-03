import type { IPageServerResult, IPaginationData } from '#/global'
import { request } from '@/utils/request'

enum API {
  URL = '/authority/user',
}

/**
 * 获取分页数据
 * @param data - 请求数据
 */
export function getSystemUserPage(data: Partial<unknown> & IPaginationData) {
  return request.get<IPageServerResult<unknown[]>>(
    `${API.URL}/index`,
    { params: data }
  )
}

/**
 * 根据ID获取数据
 * @param id - ID
 */
export function getSystemUserById(id: string) {
  return request.get(`${API.URL}/${id}`)
}

/**
 * 新增数据
 * @param data - 请求数据
 */
export function createSystemUser(data: unknown) {
  return request.post(API.URL, data)
}

/**
 * 修改数据
 * @param id - 修改id值
 * @param data - 请求数据
 */
export function updateSystemUser(id: string, data: unknown) {
  return request.put(`${API.URL}/${id}`, data)
}

/**
 * 删除
 * @param id - 删除id值
 */
export function deleteSystemUser(id: string) {
  return request.delete(`${API.URL}/${id}`)
}
