import type { IFormData } from '#/form'
import type { IPageServerResult, IPaginationData } from '#/public'
import { request } from '@/utils/request'

enum API {
  URL = '/content/article'
}

/**
 * 获取分页数据
 * @param data - 请求数据
 */
export function getArticlePage(data: Partial<IFormData> & IPaginationData) {
  return request.get<IPageServerResult<IFormData[]>>(
    `${API.URL}/index`,
    { params: data }
  )
}

/**
 * 根据ID获取数据
 * @param id - ID
 */
export function getArticleById(id: string) {
  return request.get(`${API.URL}/${id}`)
}

/**
 * 新增数据
 * @param data - 请求数据
 */
export function createArticle(data: IFormData) {
  return request.post(API.URL, data)
}

/**
 * 修改数据
 * @param id - 修改id值
 * @param data - 请求数据
 */
export function updateArticle(id: string, data: IFormData) {
  return request.put(`${API.URL}/${id}`, data)
}

/**
 * 删除
 * @param id - 删除id值
 */
export function deleteArticle(id: string) {
  return request.delete(`${API.URL}/${id}`)
}
