import { Html, Head, Main, NextScript } from 'next/document'

export default function Document(): ReactNode {
    return (
        <Html lang="en">
            <Head>
                <link rel="icon" href="/favicon.ico" type="image/x-icon" />
                <title>Kurrious</title>
            </Head>
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    )
}
