import type { ISideMenu } from '#/global'
import { createSlice } from '@reduxjs/toolkit'

const menuSlice = createSlice({
  name: 'menu',
  initialState: {
    menus: [] as ISideMenu[],
    isCollapsed: false,
    openKey: ['Dashboard'], // 菜单展开项
  },
  reducers: {
    toggleCollapsed: (state, action) => {
      state.isCollapsed = !!action.payload
    },
    setOpenKey: (state, action) => {
      state.openKey = action.payload
    },
    setMenus: (state, action) => {
      state.menus = action.payload
    }
  }
})

export const {
  toggleCollapsed,
  setOpenKey,
  setMenus
} = menuSlice.actions

export default menuSlice.reducer