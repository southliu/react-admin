import type { ResizeCallbackData } from 'react-resizable'
import type { ColumnsType, ColumnType } from 'antd/es/table'
import type { TableProps } from 'antd'
import { useMemo, useState } from 'react'
import { Table } from 'antd'
import { getTableHeight } from './utils/helper'
import ResizableTitle from './components/ResizableTitle'
import useVirtualTable from './hooks/useVirtual'

interface IProps extends Omit<TableProps<object>, 'bordered'> {
  isBordered?: boolean; // 是否开启边框
  isZebra?: boolean; // 是否开启斑马线
  isVirtual?: boolean; // 是否开启虚拟滚动
}

function BasicTable(props: IProps) {
  const { loading, isZebra, isBordered, isVirtual } = props
  const [columns, setColumns] = useState(props.columns as ColumnsType<object>)

  // 表格高度
  const tableHeight = getTableHeight()

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

  const virtualOptions = useVirtualTable({
    height: tableHeight // 设置可视高度
  })

  const virtualComponents = useMemo(() => {
    return {
      header: {
        cell: ResizableTitle,
      },
      body: {
        wrapper: virtualOptions.body.wrapper
      },
      table: virtualOptions.table
    }
  }, [virtualOptions])

  const components = isVirtual !== false ? virtualComponents : {
    header: {
      cell: ResizableTitle,
    }
  }

  return (
    <div
      id="table"
      className={`
        p-10px
        overflow-auto
        ${isBordered !== false ? 'bordered' : ''}
        ${isZebra !== false ? 'zebra' : ''}
      `}
      style={{ height: tableHeight }}
    >
      <Table
        size='small'
        rowKey='id'
        pagination={false}
        loading={loading}
        {...props}
        bordered={isBordered !== false}
        scroll={{ ...props.scroll, y: tableHeight }}
        components={components}
        columns={mergeColumns}
      />
    </div>
  )
}

export default BasicTable