import { configureStore } from '@reduxjs/toolkit'
import menuReducer from './menu'
import tabsReducer from './tabs'
import userReducer from './user'

export const store = configureStore({
  reducer: {
    menu: menuReducer,
    tabs: tabsReducer,
    user: userReducer,
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
