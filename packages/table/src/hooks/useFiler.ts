import { type TableProps } from 'antd';
import { useState } from 'react';

export function useFiler() {
  const [isLock, setLock] = useState(true);

  /**
   * 隐藏表格未勾选数据
   * @param columns - 表格数据
   * @param checks - 勾选
   */
  const handleFilterTable = (columns: TableProps['columns'], checks: string[]) => {
    if (!checks?.length || !columns?.length) return columns || [];
    if (isLock) {
      setLock(false);
      return columns || [];
    }

    for (let i = 0; i < columns?.length; i++) {
      const item = columns[i] as { dataIndex: string; hidden: boolean; };
      item.hidden = !checks.includes(item.dataIndex);
    }

    return columns;
  };

  return [handleFilterTable] as const;
}
