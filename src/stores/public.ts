import { createSlice } from '@reduxjs/toolkit'

export type IThemeType = 'dark' | 'light'

export const publicSlice = createSlice({
  name: 'public',
  initialState: {
    theme: 'light' as IThemeType, // 主题
    isFullscreen: false // 是否全屏
  },
  reducers: {
    /** 设置主题 */
    setThemeValue: (state, action) => {
      state.theme = action.payload
    },
    /** 设置全屏 */
    setFullscreen: (state, action) => {
      state.isFullscreen = action.payload
    }
  }
})

export const {
  setThemeValue,
  setFullscreen
} = publicSlice.actions

export default publicSlice.reducer