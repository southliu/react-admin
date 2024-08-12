import type { FormData } from '#/form';
import { useCallback, useEffect, useState } from 'react';
import { getDataTrends } from '@/servers/dashboard';
import { searchList } from './model';
import { useUnactivate } from 'react-activation';
import { useTranslation } from 'react-i18next';
import BasicSearch from '@/components/Search/BasicSearch';
import BasicContent from '@/components/Content/BasicContent';
import Bar from './components/Bar';
import Line from './components/Line';
import Block from './components/Block';
import BasicCard from '@/components/Card/BasicCard';

// 初始化搜索
const initSearch = {
  pay_date: ['2022-10-19', '2022-10-29']
};

function Dashboard() {
  const { t } = useTranslation();
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

  useUnactivate(() => {
    console.log('退出时执行');
  });

  return (
    <BasicContent isPermission={true}>
      <BasicCard>
        <BasicSearch
          list={searchList(t)}
          data={initSearch}
          isLoading={isLoading}
          handleFinish={handleSearch}
        />
      </BasicCard>

      <BasicCard className='mt-10px'>
        <div className='py-10px'>
          <Block />
        </div>

        <div className='flex justify-between w-full'>
          <Line />
          <Bar />
        </div>
      </BasicCard>
    </BasicContent>
  );
}

export default Dashboard;
