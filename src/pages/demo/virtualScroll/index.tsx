import VirtualList from './components/VirtualList'
import VirtualTable from './components/VirtualTable'

function VirtualScroll() {
  return (
    <div className='flex m-30px h-full'>
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
  )
}

export default VirtualScroll