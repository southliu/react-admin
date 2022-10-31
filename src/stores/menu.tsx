import { createSlice } from '@reduxjs/toolkit'

const menuSlice = createSlice({
  name: 'menu',
  initialState: {
    isPhone: false,
    isCollapsed: false,
    openKey: ['Dashboard'], // 菜单展开项
  },
  reducers: {
    toggleCollapsed: (state, action) => {
      state.isCollapsed = !!action.payload
    },
    togglePhone: (state, action) => {
      state.isPhone = !!action.payload
    },
    setOpenKey: (state, action) => {
      state.openKey = action.payload
    }
  }
})

export const {
  toggleCollapsed,
  togglePhone,
  setOpenKey
} = menuSlice.actions

export default menuSlice.reducer