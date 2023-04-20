import type { ApiResult } from '#/form'
import type { ServerResult } from '#/public'
import { request } from '@/utils/request'

enum API {
  URL = '/platform/partner',
}

interface Result {
  id: string;
  name: string;
}

/**
 * 获取分页数据
 * @param data - 请求数据
 */
export function getPartner(data?: unknown): Promise<ApiResult[]> {
  return new Promise((resolve, reject) => {
    request.get<ServerResult<Result[]>>(`${API.URL}`, { params: data }).then(res => {
      const data: ApiResult[] = []

      res?.data?.data.forEach(item => {
        data.push({
          label: item.name,
          value: item.id
        })
      })

      resolve(data)
    }).catch(() => reject([]))
  })
}
