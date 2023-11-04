import { useTranslation } from 'react-i18next';
import VirtualList from './components/VirtualList';
import VirtualTable from './components/VirtualTable';

function VirtualScroll() {
  const { t } = useTranslation();
  return (
    <div className='flex px-30px h-full py-5 bg-white'>
      <div className='flex flex-col mr-30px'>
        <h2>{ t('content.virtualScroll1') }：</h2>
        <div className='h-500px w-300px border border-cool-gray-100'>
          <VirtualList />
        </div>
      </div>

      <div>
        <h2>{ t('content.virtualScroll2') }：</h2>
        <VirtualTable />
      </div>
    </div>
  );
}

export default VirtualScroll;