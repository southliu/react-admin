import type { TabPaneProps } from 'antd';
import type { NavData } from '@/menus/utils/helper';
import type { NavigateFunction } from 'react-router-dom';
import { persist, createJSONStorage } from 'zustand/middleware';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

export interface TabsData extends Omit<TabPaneProps, 'tab'> {
  key: string;
  label: React.ReactNode;
  labelZh: React.ReactNode;
  labelEn: React.ReactNode;
  nav: NavData[];
}

interface TabsGoNext {
  key: string,
  nextPath: string;
  navigate: NavigateFunction;
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
  closeOther: (payload: string, navigate: NavigateFunction) => void;
  closeAllTab: () => void;
}

export const useTabsStore = create<TabsState>()(
  devtools(
    persist(
      (set) => ({
        isLock: false,
        isMaximize: false,
        activeKey: '',
        nav: [],
        tabs: [],
        toggleLock: (isLock) => set({ isLock }),
        toggleMaximize: (isMaximize) => set({ isMaximize }),
        setActiveKey: (key) => set({ activeKey: key }),
        setNav: (nav) => set({ nav }),
        switchTabsLang: (label) => set((state) => {
          const { tabs } = state;
          for (let i = 0; i < tabs?.length; i++) {
            const item = tabs[i];
            item.label = label === 'en' ? item.labelEn : item.labelZh;
          }
          return { tabs };
        }),
        addTabs: (payload) => set((state) => {
          const { tabs } = state;
          const has = tabs.find(item => item.key === payload.key);
          if (!has) tabs.push(payload);

          if (tabs.length) tabs[0].closable = tabs.length > 1;

          return { tabs };
        }),
        closeTabs: (payload) => set((state) => {
          const { tabs } = state;
          const index = tabs.findIndex(item => item.key === payload);
          if (index >= 0) tabs.splice(index, 1);

          if (payload === state.activeKey) {
            let target = '';
            if (index === 0) {
              target = tabs?.[index]?.key || '';
            } else {
              target = tabs[index - 1]?.key || '';
            }
            set({ activeKey: target });
          }

          if (tabs.length) tabs[0].closable = tabs.length > 1;

          return { tabs };
        }),
        closeTabGoNext: (payload) => set((state) => {
          const { tabs } = state;
          const { key, nextPath, navigate } = payload;
          const index = tabs.findIndex(item => item.key === key);
          if (index >= 0) tabs.splice(index, 1);

          if (key === state.activeKey) {
            set({ activeKey: nextPath });
            navigate(nextPath);
          }

          if (tabs.length) tabs[0].closable = tabs.length > 1;

          return { tabs };
        }),
        closeLeft: (payload) => set((state) => {
          const { tabs } = state;
          const index = tabs.findIndex(item => item.key === payload);
          if (index >= 0) tabs.splice(0, index);
          set({ activeKey: tabs[0]?.key || '' });

          if (tabs.length) tabs[0].closable = tabs.length > 1;

          return { tabs };
        }),
        closeRight: (payload) => set((state) => {
          const { tabs } = state;
          const index = tabs.findIndex(item => item.key === payload);
          if (index >= 0) tabs.splice(index + 1, tabs.length - index - 1);
          set({ activeKey: tabs[tabs.length - 1]?.key || '' });

          if (tabs.length) tabs[0].closable = tabs.length > 1;

          return { tabs };
        }),
        closeOther: (payload, navigate) => set((state) => {
          const { tabs, activeKey } = state;
          // 保留当前标签，关闭其他标签
          const filteredTabs = tabs.filter((item) => item.key === payload);

          // 如果当前标签不是要关闭的标签，就导航到要关闭的标签
          if (activeKey !== payload) {
            navigate(payload);
          }

          set({ tabs: filteredTabs, activeKey: payload });

          if (filteredTabs.length) filteredTabs[0].closable = filteredTabs.length > 1;

          return {
            tabs: filteredTabs,
            activeKey: payload
          };
        }),
        closeAllTab: () => {
          set({ tabs: [], activeKey: '' });

          return {
            tabs: [],
            activeKey: '',
          };
        }
      }),
      {
        name: 'tabs-storage', // 存储中的项目名称，必须是唯一的
        storage: createJSONStorage(() => localStorage), // 使用sessionStorage作为存储
      },
    ),
    {
      enabled: process.env.NODE_ENV === 'development',
      name: 'tabsStore'
    }
  )
);
