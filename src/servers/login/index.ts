import type { LoginData, LoginResult } from '@/pages/login/model'
import type { ServerResult } from '#/public'
import { request } from '@/utils/request'

/**
 * 登录
 * @param data - 请求数据
 */
export function login(data: LoginData) {
  return request.post<ServerResult<LoginResult>>('/login', data)
}

/**
 * 修改密码
 * @param data - 请求数据
 */
export function updatePassword(data: unknown) {
  return request.post<ServerResult>('/update-password', data)
}