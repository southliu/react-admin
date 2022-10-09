import type { IFormData } from '#/form'
import { isMoment, Moment } from 'moment'
import { useEffect, useState } from 'react'
import { useLoading } from '@/hooks/useLoading'
import { getDataTrends } from '@/servers/dashboard'
import { searchList } from './data'
import BasicSearch from '@/components/Search/BasicSearch'
import Line from './components/Line'
import Block from './components/Block'
import { DATE_FORMAT } from '@/utils/constants'

function Dashboard() {
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

    // 数据转换
    values.all_pay = values.all_pay ? 1 : undefined
    values.register = values.register ? 1 : undefined

    // 时间过滤
    if (
      (values.pay_date as [Moment, Moment])?.length === 2 &&
      isMoment((values.pay_date as [Moment, Moment])[0]) &&
      isMoment((values.pay_date as [Moment, Moment])[1])
    ) {
      values.pay_date = [
        (values.pay_date as [Moment, Moment])[0].format(DATE_FORMAT),
        (values.pay_date as [Moment, Moment])[1].format(DATE_FORMAT)
      ]
    }

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