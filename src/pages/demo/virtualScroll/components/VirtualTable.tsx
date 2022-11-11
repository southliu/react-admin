import type { ITableColumn } from '#/public'
import BasicTable from '@/components/Table/BasicTable'

function VirtualTable() {
  const columns: ITableColumn = [
    { title: 'ID', dataIndex: 'id', width: 200 },
    { title: '名称', dataIndex: 'name', width: 200 },
    { title: '电话', dataIndex: 'phone', width: 200 },
    { title: '数量', dataIndex: 'number', width: 200 },
  ]

  const data = new Array(0).fill({})
  for (let i = 0; i < 10000; i++) {
    const num = i + 1
    data.push({
      id: num,
      name: 'name' + num,
      phone: num * 13,
      number: num * 3,
    })
  }

  return (
    <BasicTable
      scrollY={400}
      columns={columns}
      dataSource={data}
      style={{
        borderBottom: '1px solid rgba(0, 0, 0, .05)'
      }}
    />
  )
}

export default VirtualTable