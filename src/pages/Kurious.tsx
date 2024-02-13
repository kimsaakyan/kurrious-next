import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import { NextPageWithLayout } from '@/src/pages/_app'
import { AppInitialProps } from 'next/dist/shared/lib/utils'

interface KuriousAppProps {
    Component: NextPageWithLayout
    pageProps: AppInitialProps
}
export const Kurious = ({ Component, pageProps }: KuriousAppProps) => {
    const getLayout = Component.getLayout || ((page: number) => page)

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return <>{getLayout(<Component {...pageProps} />)}</>
}

const Default = () => {
    const router = useRouter()

    useEffect(() => {
        router.push('/')
    }, [router])

    return null
}

export default Default
