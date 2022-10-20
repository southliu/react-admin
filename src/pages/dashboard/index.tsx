import type { IFormData } from '#/form'
import type { Moment } from 'moment'
import { useEffect, useState } from 'react'
import { useLoading } from '@/hooks/useLoading'
import { getDataTrends } from '@/servers/dashboard'
import { searchList } from './data'
import { useTitle } from '@/hooks/useTitle'
import { momentRang2StringRang } from '@/components/Dates/utils/helper'
import BasicSearch from '@/components/Search/BasicSearch'
import Line from './components/Line'
import Block from './components/Block'

function Dashboard() {
  useTitle('数据展览')
  const { isLoading, startLoading, endLoading } = useLoading()
  const [searchData, setSearchData] = useState<IFormData>({
    pay_date: ['2022-10-19', '2022-10-29']
  })

  useEffect(() => {
    getPage()
  }, [])

  /** 获取表格数据 */
  const getPage = () => {
    handleSearch(searchData)
  }

  /**
   * 搜索提交
   * @param values - 表单返回数据
   */
  const handleSearch = async (values: IFormData) => {
    setSearchData(values)
    const { pay_date } = values

    // 数据转换
    values.all_pay = values.all_pay ? 1 : undefined
    values.register = values.register ? 1 : undefined

    // 时间过滤
    if (pay_date) values.pay_date = momentRang2StringRang(pay_date as [Moment, Moment])

    const query = { ...values }
    try {
      startLoading()
      await getDataTrends(query)
    } finally {
      endLoading()
    }
  }

  return (
    <>
      <BasicSearch
        list={searchList}
        data={searchData}
        isLoading={isLoading}
        isCreate={false}
        handleFinish={handleSearch}
      />

      <div className='p-10px'>
        <Block />
      </div>
      <Line />
    </>
  )
}

export default Dashboard