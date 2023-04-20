import type { ApiResult } from '#/form'
import type { ServerResult } from '#/public'
import { request } from '@/utils/request'
import { recursiveData } from '@/utils/helper'

enum API {
  URL = '/platform/game',
  COMMON_URL = '/authority/common',
}

interface Result {
  id: string;
  name: string;
  children?: Result[];
}

export function getGames(data?: unknown): Promise<ApiResult[]> {
  return new Promise((resolve, reject) => {
    request.get<ServerResult<Result[]>>(`${API.COMMON_URL}/games`, { params: data }).then(res => {

      // 递归数据
     const result = recursiveData<Result, ApiResult>(res?.data?.data, item => {
        const { id, name } = item
        const filterData = {
          value: id,
          label: `${id}:${name}`
        }
        return filterData
      })

      resolve(result)
    }).catch(() => reject([]))
  })
}
