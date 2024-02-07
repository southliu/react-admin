import { createSlice } from '@reduxjs/toolkit';

export type ThemeType = 'dark' | 'light'

export const publicSlice = createSlice({
  name: 'public',
  initialState: {
    theme: 'light' as ThemeType, // 主题
    isFullscreen: false, // 是否全屏
    isRefresh: false, // 重新加载
    isRefreshPage: false // 重新加载页面
  },
  reducers: {
    /** 设置主题 */
    setThemeValue: (state, action) => {
      state.theme = action.payload;
    },
    /** 设置全屏 */
    setFullscreen: (state, action) => {
      state.isFullscreen = action.payload;
    },
    /** 设置重新加载 */
    setRefresh: (state, action) => {
      state.isRefresh = action.payload;
    },
    /** 设置重新加载页面 */
    setRefreshPage: (state, action) => {
      state.isRefreshPage = action.payload;
    }
  }
});

export const {
  setThemeValue,
  setFullscreen,
  setRefresh,
  setRefreshPage
} = publicSlice.actions;

export default publicSlice.reducer;