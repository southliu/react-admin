import type { TabPaneProps } from 'antd';
import type { NavData } from '@/menus/utils/helper';
import { create } from 'zustand';

interface TabsData extends Omit<TabPaneProps, 'tab'> {
  key: string;
  label: React.ReactNode;
  labelZh: React.ReactNode;
  labelEn: React.ReactNode;
  nav: NavData[];
}

interface TabsGoNext {
  key: string,
  nextPath: string;
}

interface TabsState {
  isLock: boolean;
  isMaximize: boolean;
  activeKey: string;
  nav: NavData[];
  tabs: TabsData[];
  toggleLock: (isLock: boolean) => void;
  toggleMaximize: (isMaximize: boolean) => void;
  setActiveKey: (key: string) => void;
  setNav: (nav: NavData[]) => void;
  switchTabsLang: (label: string) => void;
  addTabs: (payload: TabsData) => void;
  closeTabs: (payload: string) => void;
  closeTabGoNext: (payload: TabsGoNext) => void;
  closeLeft: (payload: string) => void;
  closeRight: (payload: string) => void;
  closeOther: (payload: string) => void;
  closeAllTab: () => void;
}

export const useTabsStore = create<TabsState>((set) => ({
  isLock: false,
  isMaximize: false,
  activeKey: '',
  nav: [],
  tabs: [],
  toggleLock: (isLock) => set({ isLock }),
  toggleMaximize: (isMaximize) => set({ isMaximize }),
  setActiveKey: (key) => set({ activeKey: key }),
  setNav: (nav) => set({ nav }),
  /** 国际化替换 */
  switchTabsLang: (label) => set((state) => {
    const { tabs } = state;

    for (let i = 0; i < tabs?.length; i++) {
      const item = tabs[i];
      const text = label === 'en' ? item.labelEn : item.labelZh;
      item.label = text;
    }

    return { tabs };
  }),
  /** 添加标签  */
  addTabs: (payload) => set((state) => {
    const { tabs } = state;

    // 判断是否存在相同的路由，不存在则累加
    const has = tabs.find(item => item.key === payload.key);
    if (!has) tabs.push(payload);

    // 如果只剩一个则无法关闭
    if (tabs?.length) tabs[0].closable = tabs?.length > 1;

    return { tabs };
  }),
  /** 关闭标签 */
  closeTabs: (payload) => set((state) => {
    const { tabs } = state;

    // 发现下标并从数组中删除
    const index = tabs.findIndex(item => item.key === payload);
    if (index >= 0) tabs.splice(index, 1);

    // 如果当前下标是当前选中的标签，则跳转至上一个/下一个有效值
    if (payload === state.activeKey) {
      let target = '';
      if (index === 0) {
        target = tabs?.[index]?.key || '';
      } else {
        target = tabs[index - 1].key;
      }
      state.activeKey = target;
      state.isLock = true;
    }

    // 如果只剩一个则无法关闭
    if (tabs?.length) tabs[0].closable = tabs?.length > 1;

    return { tabs };
  }),
  /** 关闭标签并跳转新的页面 */
  closeTabGoNext: (payload) => set((state) => {
    const { tabs } = state;
    const { key, nextPath } = payload;

    // 发现下标并从数组中删除
    const index = tabs.findIndex(item => item.key === key);
    if (index >= 0) tabs.splice(index, 1);

    // 如果当前下标是当前选中的标签，则跳转至上一个/下一个有效值
    if (key === state.activeKey) {
      state.activeKey = nextPath;
      state.isLock = true;
    }

    // 如果只剩一个则无法关闭
    if (tabs?.length) tabs[0].closable = tabs?.length > 1;

    return { tabs };
  }),
  /** 关闭左侧 */
  closeLeft: (payload) => set((state) => {
    const { tabs } = state;

    // 发现下标并从数组中删除
    const index = tabs.findIndex(item => item.key === payload);
    if (index >= 0) tabs.splice(0, index);
    state.activeKey = tabs[0].key;

    // 如果只剩一个则无法关闭
    if (tabs?.length) tabs[0].closable = tabs?.length > 1;

    return { tabs };
  }),
  /** 关闭右侧 */
  closeRight: (payload) => set((state) => {
    const { tabs } = state;

    // 发现下标并从数组中删除
    const index = tabs.findIndex(item => item.key === payload);
    if (index >= 0) tabs.splice(index + 1, tabs.length - index - 1);
    state.activeKey = tabs[tabs.length - 1].key;

    // 如果只剩一个则无法关闭
    if (tabs?.length) tabs[0].closable = tabs?.length > 1;

    return { tabs };
  }),
  /** 关闭其他 */
  closeOther: (payload) => set((state) => {
    const { tabs } = state;

    // 发现下标并从数组中删除
    const tab = tabs.find(item => item.key === payload);
    if (tab) {
      state.tabs = [tab];
      state.activeKey = tab.key;
      state.isLock = true;
    }

    // 如果只剩一个则无法关闭
    tabs[0].closable = false;

    return { tabs };
  }),
  /** 关闭全部 */
  closeAllTab: () => set({ tabs: [] }),
}));
