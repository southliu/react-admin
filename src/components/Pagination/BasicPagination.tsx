import type { PaginationProps } from 'antd'
import { Pagination } from 'antd'

interface IProps extends PaginationProps {
  isLoading: boolean;
}

function BasicPagination(props: IProps) {
  const { isLoading } = props

  /**
   * 显示总数
   * @param total - 总数
   */
  const showTotal = (total?: number): string => {
    return `共 ${total || 0} 条数据`
  }

  return (
    <div
      className={`
        pagination
        w-full
        flex
        items-center
        justify-end
        bg-white
        px-5
        min-h-40px
        z-999
      `}
    >
      <Pagination
        showSizeChanger
        showQuickJumper
        size="small"
        disabled={isLoading}
        showTotal={showTotal}
        {...props}
      />
    </div>
  )
}

export default BasicPagination