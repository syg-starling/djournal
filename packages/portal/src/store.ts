import {
  Action,
  ThunkAction,
} from '@reduxjs/toolkit'
import { persistStore } from 'redux-persist'

import configureAppStore from './configure-store'

export const store = configureAppStore({})
export const persistor = persistStore(store)

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>
