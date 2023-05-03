import React from 'react';
import Head from 'next/head';
import type { AppProps } from 'next/app';
import { EmotionCache } from '@emotion/cache';
import createEmotionCache from '@/utils/createEmotionCache';
import { CacheProvider } from '@emotion/react';
import { CssBaseline, ThemeProvider } from '@mui/material';
import theme from '@/utils/theme';


// Client-side cache, shared for the whole session of the user in browser. 
const clientSideEmotionCache = createEmotionCache();

export interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache
}

export default function App(props: MyAppProps) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <meta name='viewport' content='initial-scale=1, width=device-width' />
      </Head>
      <ThemeProvider theme={theme}>
        { /* TODO: Implement Redux Store */ }
        <CssBaseline/>
        <Component {...pageProps}/>
      </ThemeProvider>
    </CacheProvider>
  );
}