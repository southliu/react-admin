import DataGrid from 'react-data-grid'

const columns = [
  { key: 'id', name: 'ID', resizable: true, },
  { key: 'title', name: 'Title', resizable: true, }
]

const rows = [
  { id: 0, title: 'Example' },
  { id: 1, title: 'Demo' }
]

function BasicTable() {
  return (
    <div className='p-10px'>
      <DataGrid
        className='rdg-light'
        columns={columns}
        rows={rows}
      />
    </div>
  )
}

export default BasicTable