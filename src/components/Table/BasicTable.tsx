import type { ResizeCallbackData } from 'react-resizable';
import type { ColumnsType, ColumnType } from 'antd/es/table';
import type { TableProps } from 'antd';
import { useMemo, useState, useEffect, useRef, memo } from 'react';
import { Table, Skeleton } from 'antd';
import { getTableHeight, handleRowHeight, filterTableColumns } from './utils/helper';
import ResizableTitle from './components/ResizableTitle';
import useVirtualTable from './hooks/useVirtual';

type Components = TableProps<object>['components']

interface Props extends Omit<TableProps<object>, 'bordered'> {
  isBordered?: boolean; // 是否开启边框
  isZebra?: boolean; // 是否开启斑马线
  isVirtual?: boolean; // 是否开启虚拟滚动
  scrollX?: number;
  scrollY?: number;
}

function BasicTable(props: Props) {
  const {
    loading,
    isZebra,
    isBordered,
    isVirtual,
    scrollX,
    scrollY,
    rowClassName,
    size
  } = props;
  const [columns, setColumns] = useState(filterTableColumns(props.columns as ColumnsType<object>));
  const tableRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setColumns(filterTableColumns(props.columns as ColumnsType<object>));
  }, [props.columns]);

  // 表格高度
  const tableHeight = getTableHeight(tableRef.current);

  /**
   * 处理拖拽
   * @param index - 下标
   */
  const handleResize = (index: number) => {
    return (_: React.SyntheticEvent<Element>, { size }: ResizeCallbackData) => {
      const newColumns = [...columns];
      newColumns[index] = {
        ...newColumns[index],
        width: size.width,
      };
      setColumns(newColumns);
    };
  };

  // 合并列表
  const mergeColumns = columns.map((col, index) => ({
    ...col,
    onHeaderCell: (column: ColumnType<object>) => ({
      width: column.width,
      onResize: handleResize(index),
    }),
  }));

  // 虚拟滚动操作值
  const virtualOptions = useVirtualTable({
    height: tableHeight, // 设置可视高度
    size: size || 'small'
  });

  // 虚拟滚动组件
  const virtualComponents = useMemo(() => {
    return {
      header: {
        cell: ResizableTitle,
      },
      body: {
        wrapper: virtualOptions.body.wrapper
      },
      table: virtualOptions.table
    } as Components;
  }, [virtualOptions]);

  // 只带拖拽功能组件
  const components: Components = isVirtual === true ? virtualComponents : {
    header: {
      cell: ResizableTitle,
    }
  };

  // 滚动
  const scroll = {
    ...props.scroll,
    x: scrollX ?? 'max-content',
    y: scrollY || tableHeight || undefined
  };

  /**
   * 处理行内样式
   */
  const handleRowClassName: TableProps<object>['rowClassName'] = (record: object, index: number, indent: number) => {
    const className = typeof rowClassName === 'string' ? rowClassName : rowClassName?.(record, index, indent);
    const rowSize = `!h-${handleRowHeight(size)}px`;

    return `${className || ''} ${rowSize}`;
  };

  return (
    <div
      id="table"
      className={`
        overflow-auto
        ${isBordered !== false ? 'bordered' : ''}
        ${isZebra !== false ? 'zebra' : ''}
      `}
    >
      {
        !tableHeight &&
        <Skeleton />
      }
      {
        tableHeight &&
        <div ref={tableRef}>
          <Table
            size='small'
            rowKey='id'
            pagination={false}
            loading={loading}
            {...props}
            rowClassName={handleRowClassName}
            style={{
              borderRadius: 10,
              borderRight: '1px solid rgba(0, 0, 0, .05)',
              borderBottom: '1px solid rgba(0, 0, 0, .05)',
              overflow: 'auto',
              ...props.style
            }}
            bordered={isBordered !== false}
            scroll={scroll}
            components={components}
            columns={mergeColumns as ColumnsType<object>}
          />
        </div>
      }
    </div>
  );
}

export default memo(BasicTable);