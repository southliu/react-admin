import { configureStore } from '@reduxjs/toolkit'
import menuReducer from './menu'
import userReducer from './user'

export const store = configureStore({
  reducer: {
    menu: menuReducer,
    user: userReducer,
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
