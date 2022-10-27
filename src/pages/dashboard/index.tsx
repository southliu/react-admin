import type { IFormData } from '#/form'
import { useCallback, useEffect, useState } from 'react'
import { getDataTrends } from '@/servers/dashboard'
import { searchList } from './data'
import { useTitle } from '@/hooks/useTitle'
import BasicSearch from '@/components/Search/BasicSearch'
import Line from './components/Line'
import Block from './components/Block'

function Dashboard() {
  useTitle('数据展览')
  const [isLoading, setLoading] = useState(false)
  const [searchData, setSearchData] = useState<IFormData>({
    pay_date: ['2022-10-19', '2022-10-29']
  })

  /**
   * 搜索提交
   * @param values - 表单返回数据
   */
  const handleSearch = useCallback(async (values = searchData) => {
    setSearchData(values)

    // 数据转换
    values.all_pay = values.all_pay ? 1 : undefined
    values.register = values.register ? 1 : undefined

    const query = { ...values }
    try {
      setLoading(true)
      await getDataTrends(query)
    } finally {
      setLoading(false)
    }
  }, [searchData])

  /** 获取表格数据 */
  const getPage = useCallback(() => {
    handleSearch()
  }, [handleSearch])

  useEffect(() => {
    getPage()
  }, [getPage])

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