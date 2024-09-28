import {
  type TableProps,
  Button,
  Popover,
  Divider,
  Checkbox,
} from 'antd';
import { useEffect, useState } from "react";
import { UnorderedListOutlined } from '@ant-design/icons';

/**
 * 表格字段筛选
 */

interface CheckboxList {
  label: string;
  value: string;
}

interface Props {
  columns: TableProps['columns'];
  className?: string;
  getTableChecks: (checks: string[]) => void;
}

function FilterButton(props: Props) {
  const { columns, className, getTableChecks } = props;
  const [isOpen, setOpen] = useState(false);
  const [list, setList] = useState<CheckboxList[]>([]);
  const [checkList, setCheckList] = useState<string[]>([]);
  const params: Partial<Props> = { ...props };
  delete params.getTableChecks;

  useEffect(() => {
    filterColumns(columns);
  }, [columns]);

  /** 处理点击事件 */
  const handleClick = () => {
    setOpen(!isOpen);
  };

  /**
   * 过滤表格数据为多选组数据
   * @param columns - 表格数据
   */
  const filterColumns = (columns: TableProps['columns']) => {
    if (!columns?.length) return [];
    const result: CheckboxList[] = [], currentOptions: string[] = [];

    for (let i = 0; i < columns?.length; i++) {
      const item = columns[i];
      const { dataIndex } = item as { dataIndex: string };

      if (!item.hidden && dataIndex) {
        currentOptions?.push(dataIndex);
      }

      result.push({
        label: item.title as string,
        value: dataIndex
      });
    }

    setList(result);
    setCheckList(currentOptions);
  };

  /**
   * 监听多选组数据
   * @param checkedValue - 已选数据
   */
  const onChangeCheckbox = (checkedValue: string[]) => {
    setCheckList(checkedValue);
  };

  /** 处理筛选 */
  const handleFilter = () => {
    handleClick();
    getTableChecks(checkList);
  };

  // 渲染内容
  const content = () => {
    return (
      <div className='min-w-130px'>
        <Checkbox.Group
          className='flex flex-col !px-12px'
          value={checkList}
          onChange={onChangeCheckbox}
        >
          {
            list?.map(item => (
              <div key={item.value}>
                <Checkbox
                  value={item.value}
                >
                  { item.label }
                </Checkbox>
              </div>
            ))
          }
        </Checkbox.Group>

        <Divider className='!mt-10px !mb-5px' />

        <div className='flex justify-end px-10px'>
          <Button
            size='small'
            className='mr-5px'
            onClick={handleClick}
          >
            取消
          </Button>

          <Button
            type='primary'
            size='small'
            onClick={handleFilter}
          >
            筛选
          </Button>
        </div>
      </div>
    );
  };

  return (
    <Popover
      content={content}
      trigger='click'
      placement='bottom'
      overlayInnerStyle={{
        padding: '12px 0 10px'
      }}
      open={isOpen}
      onOpenChange={handleClick}
    >
      <div
        {...params}
        className={`${className} inline-block cursor-pointer`}
      >
        <UnorderedListOutlined />
      </div>
    </Popover>
  );
}

export default FilterButton;
