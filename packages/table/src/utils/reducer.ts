
export interface InitTableState {
  rowHeight: number
  curScrollTop: number
  scrollHeight: number
  tableScrollY: number
}

export interface TableAction extends Partial<InitTableState> {
  type: 'changeScroll' | 'reset';
}

/**
 * 状态管理reducer
 * @param state - 初始化值
 * @param action - 触发值
 */
export function reducer(state: InitTableState, action: TableAction) {
  switch (action.type) {
    // 监听滚动变化
    case 'changeScroll':
      let curScrollTop = action.curScrollTop || 0;
      let scrollHeight = action.scrollHeight || 0;
      const tableScrollY = action.tableScrollY || 0;

      // 处理scrollHeight小于0的情况
      if (scrollHeight <= 0) scrollHeight = 0;

      // 更新可滚动区高度
      if (scrollHeight !== 0 && tableScrollY === state.tableScrollY) {
        scrollHeight = state.scrollHeight;
      }

      // 更新当前滚动高度
      if (state.scrollHeight && curScrollTop > state.scrollHeight) {
        curScrollTop = state.scrollHeight;
      }
      
      return {
        ...state,
        curScrollTop,
        scrollHeight,
        tableScrollY
      };

    // 重置
    case 'reset':
      return {
        ...state,
        curScrollTop: 0,
        scrollHeight: 0
      };

    default:
      throw new Error('表格：未知错误类型!');
  }
}