import { createSlice } from '@reduxjs/toolkit'

const menuSlice = createSlice({
  name: 'menu',
  initialState: {
    isPhone: false,
    isCollapsed: false,
    openKeys: ['Dashboard'], // 菜单展开项
  },
  reducers: {
    toggleCollapsed: (state, action) => {
      state.isCollapsed = !!action.payload
    },
    togglePhone: (state, action) => {
      state.isPhone = !!action.payload
    },
    setOpenKeys: (state, action) => {
      state.openKeys = action.payload
    }
  }
})

export const {
  toggleCollapsed,
  togglePhone,
  setOpenKeys
} = menuSlice.actions

export default menuSlice.reducer