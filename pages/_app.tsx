import * as React from 'react';
import Head from 'next/head';
import {ThemeProvider} from '@mui/material/styles';
import {CacheProvider} from '@emotion/react';
import CssBaseline from '@mui/material/CssBaseline';
import {GoogleOAuthProvider} from '@react-oauth/google';

import theme from '../libs/theme';
import createEmotionCache from '../libs/emotionCache';

import type {NextPage} from 'next';
import type {AppProps} from 'next/app';
import type {EmotionCache} from '@emotion/react';

type AppPropsWithCache = AppProps & {
    Component: NextPage;
    emotionCache?: EmotionCache;
};

const clientSideEmotionCache = createEmotionCache();

const MyApp = ({
                   Component,
                   emotionCache = clientSideEmotionCache,
                   pageProps,
               }: AppPropsWithCache) => {
    return (
        <CacheProvider value={emotionCache}>
            <Head>
                <meta name='viewport' content='initial-scale=1, width=device-width'/>
            </Head>

            <ThemeProvider theme={theme}>
                <GoogleOAuthProvider
                    clientId={"157841089521-n4qi1ohapk3qh9a2i9me3482v9909j8p.apps.googleusercontent.com"}>
                    <CssBaseline/>
                    <Component {...pageProps} />
                </GoogleOAuthProvider>
            </ThemeProvider>
        </CacheProvider>
    );
};

export default MyApp;