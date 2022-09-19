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
    tabs: [] as Tab[]
  },
  reducers: {
    toggleMaximize: (state, action) => {
      state.isMaximize = !!action.payload
    },
    setActiveKey: (state, action) => {
      state.activeKey = action.payload
    },
    /** 添加标签  */
    addTabs: (state, action) => {
      const { tabs } = state
      const { payload } = action

      // 判断是否存在相同的路由，不存在则累加
      const has = tabs.find(item => item.key === payload.key)
      if (!has) tabs.push(payload)

      // 如果只剩一个则无法关闭
      tabs[0].closable = tabs?.length > 1
    },
    /** 关闭标签 */
    closeTabs: (state, action) => {
      const { tabs } = state
      const { payload } = action

      // 发现下标并从数组中删除
      const index = tabs.findIndex(item => item.key === payload)
      if (index >= 0) tabs.splice(index, 1)

      // 如果当前下标是当前选中的标签，则跳转至上一个/下一个有效值
      if (payload === state.activeKey) {
        let target = ''
        if (index === 0) {
          target = tabs[index].key
        } else {
          target = tabs[index - 1].key
        }
        state.activeKey = target
      }

      // 如果只剩一个则无法关闭
      tabs[0].closable = tabs?.length > 1
    },
    /** 关闭左侧 */
    closeLeft: (state, action) => {
      const { tabs } = state
      const { payload } = action

      // 发现下标并从数组中删除
      const index = tabs.findIndex(item => item.key === payload)
      if (index >= 0) tabs.splice(0, index)
      state.activeKey = tabs[0].key

      // 如果只剩一个则无法关闭
      tabs[0].closable = tabs?.length > 1
    },
    /** 关闭右侧 */
    closeRight: (state, action) => {
      const { tabs } = state
      const { payload } = action

      // 发现下标并从数组中删除
      const index = tabs.findIndex(item => item.key === payload)
      if (index >= 0) tabs.splice(index + 1, tabs.length - index - 1)
      state.activeKey = tabs[tabs.length - 1].key

      // 如果只剩一个则无法关闭
      tabs[0].closable = tabs?.length > 1
    },
    /** 关闭其他 */
    closeOther: (state, action) => {
      const { tabs } = state
      const { payload } = action

      // 发现下标并从数组中删除
      const tab = tabs.find(item => item.key === payload)
      if (tab) {
        state.tabs = [tab]
        state.activeKey = tab.key
      }

      // 如果只剩一个则无法关闭
      tabs[0].closable = false
    },
  }
})

export const {
  toggleMaximize,
  setActiveKey,
  addTabs,
  closeTabs,
  closeLeft,
  closeRight,
  closeOther
} = tabsSlice.actions

export default tabsSlice.reducer