import type { PaginationProps } from 'antd';
import { Pagination } from 'antd';
import { useTranslation } from 'react-i18next';

function BasicPagination(props: PaginationProps) {
  const { t } = useTranslation();

  /**
   * 显示总数
   * @param total - 总数
   */
  const showTotal = (total?: number): string => {
    return t('public.totalNum', { num: total || 0 });
  };

  return (
    <div
      id="pagination"
      className={`
        w-full
        flex
        items-center
        justify-end
        min-h-40px
        box-border
        z-999
      `}
    >
      <Pagination
        showSizeChanger
        showQuickJumper
        size="small"
        showTotal={showTotal}
        {...props}
      />
    </div>
  );
}

export default BasicPagination;