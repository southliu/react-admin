import type { DefaultOptionType } from 'ant-design-vue/lib/select'
import type { IServerResult } from '#/global'
import { request } from '@/utils/request'
import { recursiveData } from '@/utils/utils'

enum API {
  URL = '/platform/game',
  COMMON_URL = '/authority/common',
}

interface IResult {
  id: string;
  name: string;
  children?: IResult[];
}

export function getGames(data?: unknown): Promise<DefaultOptionType[]> {
  return new Promise((resolve, reject) => {
    request.get<IServerResult<IResult[]>>(`${API.COMMON_URL}/games`, { params: data }).then(res => {

      // 递归数据
     const result = recursiveData<IResult, DefaultOptionType>(res?.data?.data, item => {
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
