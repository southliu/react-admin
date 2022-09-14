import { createSlice } from '@reduxjs/toolkit'

const tabsSlice = createSlice({
  name: 'tabs',
  initialState: {
    isMaximize: false
  },
  reducers: {
    toggleMaximize: (state, action) => {
      state.isMaximize = !!action.payload
    }
  }
})

export const {
  toggleMaximize
} = tabsSlice.actions

export default tabsSlice.reducer