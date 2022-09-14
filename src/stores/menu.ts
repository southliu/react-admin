import { createSlice } from '@reduxjs/toolkit'

const menuSlice = createSlice({
  name: 'menu',
  initialState: {
    isCollapsed: false
  },
  reducers: {
    toggleCollapsed: (state, action) => {
      state.isCollapsed = !!action.payload
    }
  }
})

export const {
  toggleCollapsed
} = menuSlice.actions

export default menuSlice.reducer