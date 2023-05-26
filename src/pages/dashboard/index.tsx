import type { FormData } from '#/form';
import { useCallback, useEffect, useState } from 'react';
import { getDataTrends } from '@/servers/dashboard';
import { searchList } from './model';
import { useTitle } from '@/hooks/useTitle';
import BasicSearch from '@/components/Search/BasicSearch';
import BasicContent from '@/components/Content/BasicContent';
import Line from './components/Line';
import Bar from './components/Bar';
import Block from './components/Block';

// 初始化搜索
const initSearch = {
  pay_date: ['2022-10-19', '2022-10-29']
};

function Dashboard() {
  useTitle('数据展览');
  const [isLoading, setLoading] = useState(false);

  /**
   * 搜索提交
   * @param values - 表单返回数据
   */
  const handleSearch = useCallback(async (values: FormData) => {
    // 数据转换
    values.all_pay = values.all_pay ? 1 : undefined;

    const query = { ...values };
    try {
      setLoading(true);
      await getDataTrends(query);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    handleSearch(initSearch);
  }, [handleSearch]);

  return (
    <BasicContent isPermission={true}>
      <>
        <BasicSearch
          list={searchList}
          data={initSearch}
          isLoading={isLoading}
          isCreate={false}
          handleFinish={handleSearch}
        />

        <div className='py-10px'>
          <Block />
        </div>

        <div className='flex justify-between w-full'>
          <Line />
          <Bar />
        </div>
      </>
    </BasicContent>
  );
}

export default Dashboard;