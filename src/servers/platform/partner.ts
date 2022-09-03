import type { DefaultOptionType } from 'ant-design-vue/lib/select'
import type { IServerResult } from '#/global'
import { request } from '@/utils/request'

enum API {
  URL = '/platform/partner',
}

interface IResult {
  id: string;
  name: string;
}

/**
 * 获取分页数据
 * @param data - 请求数据
 */
export function getPartner(data?: unknown): Promise<DefaultOptionType[]> {
  return new Promise((resolve, reject) => {
    request.get<IServerResult<IResult[]>>(`${API.URL}`, { params: data }).then(res => {
      const data: DefaultOptionType[] = []

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
