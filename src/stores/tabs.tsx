import type { TabPaneProps } from 'antd'
import { createSlice } from '@reduxjs/toolkit'

interface Tab extends Omit<TabPaneProps, 'tab'> {
  key: string;
  label: React.ReactNode;
}

const tabsSlice = createSlice({
  name: 'tabs',
  initialState: {
    isMaximize: false,
    activeKey: '',
    items: [] as Tab[]
  },
  reducers: {
    toggleMaximize: (state, action) => {
      state.isMaximize = !!action.payload
    },
    setActiveKey: (state, action) => {
      state.activeKey = action.payload
    },
    addItems: (state, action) => {
      const { items } = state
      const { payload } = action

      // 如果只剩一个则无法关闭
      if (payload?.length === 1) {
        payload.closable = false
      }
      // 判断是否存在相同的路由，不存在则累加
      const has = items.find(item => item.key === payload.key)
      if (!has) items.push(payload)
    },
  }
})

export const {
  toggleMaximize,
  setActiveKey,
  addItems
} = tabsSlice.actions

export default tabsSlice.reducer