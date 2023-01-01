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
import {QueryClient, QueryClientProvider} from "react-query";
import {ReactQueryDevtools} from "react-query/devtools";
import {SnackbarProvider} from 'notistack';

const queryClient = new QueryClient();

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
                <SnackbarProvider maxSnack={3}>
                    <QueryClientProvider client={queryClient}>
                        <ReactQueryDevtools initialIsOpen={true}/>
                        <CssBaseline/>
                        <Component {...pageProps} />
                    </QueryClientProvider>
                </SnackbarProvider>
            </ThemeProvider>
        </CacheProvider>
    );
};

export default MyApp;