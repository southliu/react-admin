import { useTitle } from '@/hooks/useTitle';
import { useTranslation } from 'react-i18next';
import VirtualList from './components/VirtualList';
import VirtualTable from './components/VirtualTable';

function VirtualScroll() {
  const { t } = useTranslation();
  useTitle(t, '虚拟滚动');
  return (
    <div className='flex px-30px h-full py-5 bg-white'>
      <div className='flex flex-col mr-30px'>
        <h2>虚拟滚动列表(10000条)：</h2>
        <div className='h-500px w-300px border border-cool-gray-100'>
          <VirtualList />
        </div>
      </div>

      <div>
        <h2>虚拟滚动表格(10000条)：</h2>
        <VirtualTable />
      </div>
    </div>
  );
}

export default VirtualScroll;