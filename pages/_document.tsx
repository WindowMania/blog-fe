import * as React from 'react';
import Document, {Html, Head, Main, NextScript} from 'next/document';
import createEmotionServer from '@emotion/server/create-instance';
import theme from '../libs/theme';
import createEmotionCache from '../libs/emotionCache';

import type {DocumentContext, DocumentInitialProps} from 'next/document';

// https://dev.to/soom/nextjs-12-mui-5-material-ui-tutorial-hoh

export default class _Document extends Document {
    render() {
        return (
            <Html lang='ko'>
                <Head>
                    <meta name='theme-color' content={theme.palette.primary.main}/>
                    <link rel='shortcut icon' href='/favicon.ico'/>
                    <title>blog.kyb</title>
                    <link
                        rel='stylesheet'
                        href='https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap'
                    />
                    <link href="https://fonts.googleapis.com/css?family=Nanum+Myeongjo&display=swap" rel="stylesheet"/>
                    <meta name='emotion-insertion-point' content=''/>
                    {this.props.styles}
                </Head>
                <body>
                <Main/>
                <NextScript/>
                </body>
            </Html>
        );
    }
}

_Document.getInitialProps = async (ctx: DocumentContext): Promise<DocumentInitialProps> => {
    const originalRenderPage = ctx.renderPage;

    const cache = createEmotionCache();
    const {extractCriticalToChunks} = createEmotionServer(cache);

    ctx.renderPage = () =>
        originalRenderPage({
            enhanceApp: (App) =>
                function EnhanceApp(props) {
                    // @ts-ignore
                    return <App emotionCache={cache} {...props} />;
                },
        });

    const initialProps = await Document.getInitialProps(ctx);

    const emotionStyles = extractCriticalToChunks(initialProps.html);
    const emotionStyleTags = emotionStyles.styles.map((style) => (
        <style
            data-emotion={`${style.key} ${style.ids.join(' ')}`}
            key={style.key}
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{__html: style.css}}
        />
    ));

    return {
        ...initialProps,
        styles: [...React.Children.toArray(initialProps.styles), ...emotionStyleTags],
    };
};