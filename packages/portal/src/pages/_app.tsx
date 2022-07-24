import React, { useEffect } from 'react'
import { CacheProvider } from '@emotion/react'
import { ThemeProvider, CssBaseline } from '@mui/material'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { LocalizationProvider } from '@mui/x-date-pickers'

import createEmotionCache from '../utils/createEmotionCache'
import { store, persistor } from '../store'
import { RouteGuard } from './RouteGuard'

import lightTheme from '../styles/theme/lightTheme'
import '../styles/globals.css'

const clientSideEmotionCache = createEmotionCache()

const MyApp = (props: any) => {
  const { Component, pageProps } = props

  return (
    <CacheProvider value={clientSideEmotionCache}>
      <ThemeProvider theme={lightTheme}>
        <CssBaseline />
        <Provider store={store}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <PersistGate loading={null} persistor={persistor}>
              <RouteGuard>
                <Component {...pageProps} />
              </RouteGuard>
            </PersistGate>
          </LocalizationProvider>
        </Provider>
      </ThemeProvider>
    </CacheProvider>
  )
}

export default MyApp