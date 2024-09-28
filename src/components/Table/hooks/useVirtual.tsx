import type { InitTableState } from '../utils/reducer';
import type { CSSProperties, ReactNode } from 'react';
import type { SizeType } from 'antd/es/config-provider/SizeContext';
import {
  useEffect,
  useReducer,
  useRef,
  useState,
  useMemo
} from 'react';
import { reducer } from '../utils/reducer';
import { isNumber } from '@/utils/is';
import { ScrollContext } from '../utils/state';
import { handleRowHeight } from '../utils/helper';
import { useThrottleFn } from 'ahooks';
import VirtualWrapper from '../components/VirtualWrapper';

const initialState: InitTableState = {
  rowHeight: 38, // 行高度
  curScrollTop: 0, // 当前的滚动高度
  scrollHeight: 0, // 可滚动区域的高度
  tableScrollY: 0 // 可滚动区域值
};

type Children = ReactNode & Array<{
  props: {
    data: {
      length: number
    }
  }
}>

interface VirtualTableProps {
  style?: CSSProperties;
  children: Children;
}

let scrollY: number | string = 0;

/**
 * 表格渲染
 * @param props - 传递值
 */
// eslint-disable-next-line react-refresh/only-export-components
function VirtualTable(props: VirtualTableProps) {
  const { style, children, ...rest } = props;
  const { width, ...restStyle } = style as CSSProperties;
  const [state, dispatch] = useReducer(reducer, initialState);

  const wrapTableRef = useRef<HTMLDivElement>(null);
  const tableRef = useRef<HTMLTableElement>(null);

  // 数据的总条数
  const [totalLen, setTotalLen] = useState<number>(children?.[2]?.props?.data?.length ?? 0);

  useEffect(() => {
    if (isNumber(children?.[1]?.props?.data?.length)) {
      setTotalLen(children?.[1]?.props?.data?.length);
    }
  }, [children]);

  // table总高度
  const tableHeight = useMemo<string | number>(() => {
    let temp: string | number = 'auto';
    if (state.rowHeight && totalLen) {
      temp = state.rowHeight * totalLen;
    }
    return temp;
  }, [state.rowHeight, totalLen]);

  // table的scrollY值
  let tableScrollY = 0;
  if (typeof scrollY === 'string') {
    tableScrollY = (wrapTableRef.current?.parentNode as HTMLElement)?.offsetHeight;
  } else {
    tableScrollY = scrollY;
  }

  if (isNumber(tableHeight) && Number(tableHeight) < tableScrollY) {
    tableScrollY = tableHeight as number;
  }

  // 处理tableScrollY小于0的情况
  if (tableScrollY <= 0) tableScrollY = 0;

  // 渲染的条数
  const renderLen = useMemo<number>(() => {
    let temp = 1;
    if (state.rowHeight && totalLen && tableScrollY) {
      if (tableScrollY <= 0) {
        temp = 0;
      } else {
        const tempRenderLen = ((tableScrollY / state.rowHeight) | 0) + 5;
        temp = tempRenderLen > totalLen ? totalLen : tempRenderLen;
      }
    }
    return temp;
  }, [state.rowHeight, totalLen, tableScrollY]);

  // 渲染中的第一条
  let start = state.rowHeight ? (state.curScrollTop / state.rowHeight) | 0 : 0;
  // 偏移量
  let offsetStart = state.rowHeight ? state.curScrollTop % state.rowHeight : 0;

  // 用来优化向上滚动出现的空白
  if (state.curScrollTop && state.rowHeight && state.curScrollTop > state.rowHeight) {
    if (start > totalLen - renderLen) {
      // 可能以后会做点操作
      offsetStart = 0;
    } else if (start > 1) {
      start = start - 1;
      offsetStart += state.rowHeight;
    }
  } else {
    start = 0;
  }

  useEffect(() => {
    // totalLen变化, 那么搜索条件一定变化, 数据也一定变化.
    const parentNode = wrapTableRef.current?.parentNode as HTMLElement;
    if (parentNode) {
      parentNode.scrollTop = 0;
    }
    dispatch({ type: 'reset' });
  }, [totalLen]);

  /** 滑动节流 */
  const throttleScroll = useThrottleFn((e: Event) => {
    const scrollTop: number = (e?.target as HTMLElement)?.scrollTop ?? 0;

    if (scrollTop !== state.curScrollTop) {
      const scrollHeight = (e?.target as HTMLElement)?.scrollHeight - tableScrollY;
      dispatch({
        type: 'changeScroll',
        curScrollTop: scrollTop,
        scrollHeight,
        tableScrollY
      });
    }
  }, { wait: 60 });

  useEffect(() => {
    const ref = wrapTableRef?.current?.parentNode as HTMLElement;

    if (ref) {
      ref.addEventListener('scroll', e => throttleScroll.run(e));
    }

    return () => {
      ref.removeEventListener('scroll', e => throttleScroll.run(e));
    };
  }, [
    wrapTableRef,
    state.curScrollTop,
    tableScrollY,
    state.scrollHeight,
    throttleScroll
  ]);

  return (
    <div
      className='virtualTable'
      ref={wrapTableRef}
      style={{
        width: '100%',
        position: 'relative',
        height: tableHeight,
        boxSizing: 'border-box',
        paddingTop: state.curScrollTop
      }}
    >
      <ScrollContext.Provider
        value={{
          dispatch,
          rowHeight: state.rowHeight,
          start,
          offsetStart,
          renderLen,
          totalLen
        }}
      >
        <table
          {...rest}
          ref={tableRef}
          style={{
            ...restStyle,
            width,
            position: 'relative'
          }}
        >
          { children }
        </table>
      </ScrollContext.Provider>
    </div>
  );
}

interface Props {
  height: number | string;
  size: SizeType
}

export default function useVirtualTable(props: Props) {
  const { height, size } = props;
  scrollY = height;
  initialState.rowHeight = handleRowHeight(size);

  return {
    table: VirtualTable,
    body: {
      wrapper: VirtualWrapper
    }
  };
}
