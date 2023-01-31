import Head from 'next/head';
import type {NextPage} from 'next';
import type {AppProps} from 'next/app';
import type {EmotionCache} from '@emotion/react';
import {CacheProvider} from '@emotion/react';
import CssBaseline from '@mui/material/CssBaseline';
import {QueryClient, QueryClientProvider} from "react-query";
import {SnackbarProvider} from 'notistack';

import CustomThemeProvider from "@/provider/CustomThemeProvider";

import createEmotionCache from '../libs/emotionCache';

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
                <title>kyb.blog</title>
            </Head>
            <CustomThemeProvider>
                <SnackbarProvider maxSnack={3}>
                    <QueryClientProvider client={queryClient}>
                        <CssBaseline/>
                        <Component {...pageProps} />
                    </QueryClientProvider>
                </SnackbarProvider>
            </CustomThemeProvider>
        </CacheProvider>
    );
};

export default MyApp;