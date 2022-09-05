import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    // 用户权限
    permissions: [],
    // 用户信息
    userInfo: {
      id: 0,
      username: '',
      email: '',
      phone: ''
    }
  },
  reducers: {
    /** 设置用户信息 */
    setUserInfo: (state, action) => {
      state.userInfo = action.payload
    },
    /** 设置权限 */
    setPermissions: (state, action) => {
      state.permissions = action.payload
    },
    /** 清除用户信息 */
    clearInfo: (state) => {
      state.userInfo = {
        id: 0,
        username: '',
        email: '',
        phone: ''
      }
    }
  }
})

export const {
  setUserInfo,
  setPermissions,
  clearInfo
} = userSlice.actions

export default userSlice.reducer