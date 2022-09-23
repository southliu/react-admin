import type { ResizeCallbackData } from 'react-resizable'
import type { ColumnsType, ColumnType } from 'antd/es/table'
import type { TableProps } from 'antd'
import { Table } from 'antd'
import { useMemo, useState } from 'react'
import ResizableTitle from './components/ResizableTitle'
import useVirtualTable from './hooks/useVirtual'

interface IProps extends TableProps<object> {
  isZebra?: boolean; // 是否开启斑马线
  isVirtual?: boolean; // 是否开启虚拟滚动
}

function BasicTable(props: IProps) {
  const { isZebra, isVirtual } = props
  const [columns, setColumns] = useState(props.columns as ColumnsType<object>)

  /**
   * 处理拖拽
   * @param index - 下标
   */
  const handleResize = (index: number) => {
    return (_: React.SyntheticEvent<Element>, { size }: ResizeCallbackData) => {
      const newColumns = [...columns]
      newColumns[index] = {
        ...newColumns[index],
        width: size.width,
      }
      setColumns(newColumns)
    }
  }

  const mergeColumns: ColumnsType<object> = columns.map((col, index) => ({
    ...col,
    onHeaderCell: column => ({
      width: (column as ColumnType<object>).width,
      onResize: handleResize(index),
    }),
  }))

  const virtualComponents = useVirtualTable({
    height: 350 // 设置可视高度
  })

  console.log('virtualComponents:', virtualComponents)

  const components = useMemo(() => {
    return {
      header: {
        cell: ResizableTitle,
      },
      body: {
        wrapper: virtualComponents.body.wrapper
      },
      table: virtualComponents.table
    }
  }, [virtualComponents])

  return (
    <div className={`p-10px ${isZebra !== false ? 'zebra' : ''}`}>
      <Table
        bordered
        size='small'
        rowKey='id'
        pagination={false}
        {...props}
        scroll={{ ...props.scroll, y: 350 }}
        components={isVirtual !== false ? components : {
          header: {
            cell: ResizableTitle,
          }
        }}
        columns={mergeColumns}
      />
    </div>
  )
}

export default BasicTable