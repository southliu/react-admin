import type { ResizeCallbackData } from 'react-resizable'
import type { ColumnsType, ColumnType } from 'antd/es/table'
import type { TableProps } from 'antd'
import { Table } from 'antd'
import { Resizable } from 'react-resizable'
import { useState } from 'react'

/** 自定义拖拽  */
const ResizableTitle = (
  props: React.HTMLAttributes<unknown> & {
    onResize: (e: React.SyntheticEvent<Element>, data: ResizeCallbackData) => void
    width: number
  },
) => {
  const { onResize, width, ...restProps } = props

  if (!width) {
    return <th {...restProps} />
  }

  return (
    <Resizable
      width={width}
      height={0}
      handle={
        <span
          className="react-resizable-handle"
          onClick={e => {
            e.stopPropagation()
          }}
        />
      }
      onResize={onResize}
      draggableOpts={{ enableUserSelectHack: false }}
    >
      <th {...restProps} />
    </Resizable>
  )
}

interface IProps extends TableProps<object> {
  isZebra?: boolean; // 是否开启斑马线
}

function BasicTable(props: IProps) {
  const { isZebra } = props
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

  return (
    <div className={`p-10px ${isZebra !== false ? 'zebra' : ''}`}>
      <Table
        bordered
        size='small'
        rowKey='id'
        pagination={false}
        {...props}
        components={{
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