import type { IFormData } from '#/form'
import { useCallback, useEffect, useState } from 'react'
import { getDataTrends } from '@/servers/dashboard'
import { searchList } from './data'
import { useTitle } from '@/hooks/useTitle'
import BasicSearch from '@/components/Search/BasicSearch'
import Line from './components/Line'
import Block from './components/Block'

// 初始化搜索
const initSearchData = {
  pay_date: ['2022-10-19', '2022-10-29']
}

function Dashboard() {
  useTitle('数据展览')
  const [isLoading, setLoading] = useState(false)

  /**
   * 搜索提交
   * @param values - 表单返回数据
   */
  const handleSearch = useCallback(async (values: IFormData) => {
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
  }, [])

  useEffect(() => {
    handleSearch(initSearchData)
  }, [handleSearch])

  return (
    <>
      <BasicSearch
        list={searchList}
        data={initSearchData}
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