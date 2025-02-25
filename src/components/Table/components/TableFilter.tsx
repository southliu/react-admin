import {
  type TableProps,
  type CheckboxProps,
  Button,
  Popover,
  Divider,
  Checkbox,
  message,
} from 'antd';
import { useEffect, useState } from "react";
import { useTranslation } from 'react-i18next';
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
  const { t } = useTranslation();
  const [isOpen, setOpen] = useState(false);
  const [list, setList] = useState<CheckboxList[]>([]);
  const [checkedList, setCheckedList] = useState<string[]>([]);
  const checkAll = list.length === checkedList.length;
  const indeterminate = checkedList.length > 0 && checkedList.length < list.length;
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
    setCheckedList(currentOptions);
  };

  /**
   * 监听多选组数据
   * @param checkedValue - 已选数据
   */
  const onChangeCheckbox = (checkedValue: string[]) => {
    setCheckedList(checkedValue);
  };

  /** 处理筛选 */
  const handleFilter = () => {
    if (!checkedList?.length) {
      return message.warning({
        content: t('public.checkAllWarning'),
        key: 'filter',
      });
    }
    handleClick();
    getTableChecks(checkedList);
  };

  const onCheckAllChange: CheckboxProps['onChange'] = (e) => {
    const checkedList = e.target.checked ? list.map(item => item.value) : [];
    setCheckedList(checkedList);
  };

  // 渲染内容
  const content = () => {
    return (
      <div className='min-w-130px flex flex-col'>
        <Checkbox
          className='!px-12px'
          indeterminate={indeterminate}
          onChange={onCheckAllChange}
          checked={checkAll}
        >
          { t('public.checkAll') }
        </Checkbox>
        <Checkbox.Group
          className='flex flex-col !px-12px'
          value={checkedList}
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
      styles={{
        body: {
          padding: '12px 0 10px'
        }
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
