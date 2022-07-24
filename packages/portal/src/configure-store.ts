import { configureStore } from '@reduxjs/toolkit'
import { FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist'
import { createLogger } from 'redux-logger'

import rootReducer from './reducers'

export default (preloadedState: any) => {
  const store = configureStore({
    reducer: rootReducer,
    preloadedState,
    middleware: (getDefaultMiddleware) => {
      const defaultMiddleware = getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [
            FLUSH,
            REHYDRATE,
            PAUSE,
            PERSIST,
            PURGE,
            REGISTER,
          ],
        }
      })

      if (process.env.NODE_ENV !== 'production') {
        return defaultMiddleware.concat(createLogger({
          level: 'debug',
          collapsed: true,
        }))
      }

      return defaultMiddleware
    }
  })
  return store
}
