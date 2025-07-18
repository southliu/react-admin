import { type TableProps, type CheckboxProps, Button, Popover, Divider, Checkbox } from 'antd';
import { type RefObject, useEffect, useState, useRef, createRef } from 'react';
import { SettingOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { Icon } from '@iconify/react';
import { TableColumn } from '#/public';
import Draggable from 'react-draggable';

/**
 * 表格字段筛选
 */

interface CheckboxList {
  label: string;
  value: string;
}

interface Props {
  columns: TableProps['columns'];
  cacheColumns: TableProps['columns'];
  className?: string;
  getTableChecks: (checks: string[], sortList: string[]) => void;
}

type DraggleRef = { [key: string]: RefObject<HTMLDivElement | null> };

function TableFilter(props: Props) {
  const { columns, cacheColumns, className, getTableChecks } = props;
  const { t } = useTranslation();
  const [isOpen, setOpen] = useState(false);
  const [list, setList] = useState<CheckboxList[]>([]);
  const [checkedList, setCheckedList] = useState<string[]>([]);
  const [draggingIndex, setDraggingIndex] = useState<number | null>(null);
  const checkAll = list.length === checkedList.length;
  const indeterminate = checkedList.length > 0 && checkedList.length < list.length;
  const params: Partial<Props> = { ...props };
  const draggleRefs = useRef<DraggleRef>({});
  delete params.getTableChecks;
  delete params.cacheColumns;

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
    const result: CheckboxList[] = [],
      currentOptions: string[] = [],
      newDraggleRefs: DraggleRef = {};

    for (let i = 0; i < columns?.length; i++) {
      const item = columns[i];
      const { dataIndex } = item as { dataIndex: string };

      if (!item.hidden && dataIndex) {
        currentOptions?.push(dataIndex);
      }

      newDraggleRefs[dataIndex] = createRef<HTMLDivElement>();

      result.push({
        label: item.title as string,
        value: dataIndex,
      });
    }

    setList(result);
    draggleRefs.current = newDraggleRefs;
    setCheckedList(currentOptions);
  };

  /**
   * 监听多选组数据
   * @param checkedValue - 已选数据
   */
  const onChangeCheckbox = (checkedValue: string[]) => {
    setCheckedList(checkedValue);
    handleFilter(checkedValue);
  };

  /** 处理筛选 */
  const handleFilter = (checkedList: string[], currentList = list) => {
    getTableChecks(
      checkedList,
      currentList.map((item) => item.value),
    );
  };

  /** 全选 */
  const onCheckAllChange: CheckboxProps['onChange'] = (e) => {
    const checkedList = e.target.checked ? list.map((item) => item.value) : [];
    setCheckedList(checkedList);
    handleFilter(checkedList);
  };

  /** 重置列表 */
  const handleReset = () => {
    const newList: CheckboxList[] = [];
    const allCheckedList = (cacheColumns as TableColumn[])
      ?.map((item) => (item as { dataIndex: string })?.dataIndex)
      ?.filter(Boolean);

    for (let i = 0; i < (cacheColumns as TableColumn[])?.length; i++) {
      const item = (cacheColumns as TableColumn[])[i];
      newList.push({
        label: item.title as string,
        value: item.dataIndex as string,
      });
    }

    setCheckedList(allCheckedList);
    setList(newList);
    handleFilter(allCheckedList, newList);
  };

  /**
   * 拖拽排序处理
   * @param index - 当前索引
   * @param deltaY - Y轴偏移量
   */
  const handleDrag = (index: number, deltaY: number) => {
    const itemHeight = 28; // 每项高度
    // 计算目标索引
    let targetIndex = index + Math.round(deltaY / itemHeight);
    if (targetIndex < 0) targetIndex = 0;
    if (targetIndex >= list.length) targetIndex = list.length - 1;
    const newList = [...list];
    const [moved] = newList.splice(index, 1);
    newList.splice(targetIndex, 0, moved);
    setList(newList);

    // checkedList顺序也按新顺序调整
    const newCheckedList = newList
      .map((item) => item.value)
      .filter((value) => checkedList.includes(value));
    setCheckedList(newCheckedList);
    handleFilter(newCheckedList, newList);
    setDraggingIndex(null);
  };

  // 渲染内容
  const content = () => {
    return (
      <div className="min-w-140px flex flex-col">
        <div className="px-5px">
          <Checkbox
            className="w-full !pl-10px !py-3px hover:bg-blue-100 border-rd-5px"
            indeterminate={indeterminate}
            onChange={onCheckAllChange}
            checked={checkAll}
          >
            {t('public.checkAll')}
          </Checkbox>
        </div>

        <Divider className="!my-5px" />

        <Checkbox.Group
          className="flex flex-col !px-5px !pb-5px relative"
          value={checkedList}
          onChange={onChangeCheckbox}
        >
          {list?.map((item, idx) => (
            <Draggable
              key={item.value}
              nodeRef={draggleRefs.current?.[item.value] as RefObject<HTMLDivElement>}
              axis="y"
              position={{ x: 0, y: idx }}
              bounds="parent"
              handle=".drag-handle"
              onStart={() => setDraggingIndex(idx)}
              onStop={(_event, data) => handleDrag(idx, data.y)}
            >
              <div
                ref={draggleRefs.current?.[item.value]}
                className={`
                  h-28px
                  flex
                  items-center
                  pl-5px
                  hover:bg-blue-100
                  border-rd-5px
                  ${draggingIndex === idx ? 'bg-blue-100 z-10' : ''}
                `}
                style={{ transition: 'background 0.2s' }}
              >
                <div className="h-28px pr-5px cursor-move flex items-center justify-center drag-handle">
                  <Icon icon="icon-park-outline:drag" />
                </div>
                <Checkbox value={item.value} className="flex-1">
                  {item.label}
                </Checkbox>
              </div>
            </Draggable>
          ))}
        </Checkbox.Group>

        <Divider className="!mt-10px !mb-5px" />

        <Button className="flex-1 text-center" type="link" size="small" onClick={handleReset}>
          {t('public.reset')}
        </Button>
      </div>
    );
  };

  return (
    <Popover
      content={content}
      trigger="click"
      placement="bottom"
      styles={{
        body: {
          padding: '8px 0 5px',
        },
      }}
      open={isOpen}
      onOpenChange={handleClick}
    >
      <div {...params} className={`${className} inline-block`}>
        <Button icon={<SettingOutlined />} className="small-btn">
          {t('public.columnFilter')}
        </Button>
      </div>
    </Popover>
  );
}

export default TableFilter;
