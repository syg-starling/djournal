import { CacheProvider } from '@emotion/react';
import { ThemeProvider, CssBaseline } from '@mui/material';

import createEmotionCache from '../utility/createEmotionCache';
import lightTheme from '../styles/theme/lightTheme';
import '../styles/globals.css';

const clientSideEmotionCache = createEmotionCache();

const MyApp = (props: any) => {
  const { Component, pageProps } = props;

  return (
    <CacheProvider value={clientSideEmotionCache}>
      <ThemeProvider theme={lightTheme}>
        <CssBaseline />
        <Component {...pageProps} />
      </ThemeProvider>
    </CacheProvider>
  );
};

export default MyApp;