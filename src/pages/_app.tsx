import type { AppProps } from 'next/app'
// TODO this will be merged
import '../styles/global.css'
import { NextPage } from 'next'
import Head from 'next/head'
import React, { useEffect, useState } from 'react'
import { Provider } from 'react-redux'
import store from '@/src/redux/store'
import { useRouter } from 'next/router'
import { loadableReady } from '@loadable/component'
import Loader from '../components/Loader/Loader'
import { ModalsController } from '@/src/components/ModalsController/ModalsController'
import RedirectionHandler from '@/src/components/RedirectionHandler/RedirectionHandler'
import { setSession } from '@/src/utils/auth/authUtils'
import { ToastNotificationsController } from '@/src/components/ModalsController/ToastNotificationsContrroller'
import dynamic from 'next/dynamic'
import { SettingsIcon } from '@/src/components/Icons/SettingsIcon'
import { dispatch } from '@/src/redux/hooks'
import { viewsMiddleware } from '@/src/redux/slices/views'
import { ModalName } from '@/src/types/modals'
import 'react-phone-number-input/style.css'

// eslint-disable-next-line @typescript-eslint/ban-types
export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
    getLayout?: (page: ReactNode) => ReactNode
}

type AppPropsWithLayout = AppProps & {
    Component: NextPageWithLayout
}

const DynamicKurious = dynamic(
    () => import('./Kurious').then((module) => module.Kurious),
    {
        ssr: false,
    }
)

export default function App({
    Component,
    pageProps,
}: AppPropsWithLayout): ReactNode {
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(true)

    const openDevToolsModal = () => {
        dispatch(
            viewsMiddleware.openModal({
                name: ModalName.DevToolsModal,
                props: {},
            })
        )
    }

    useEffect(() => {
        const token = localStorage.getItem('access_token')
        if (token) {
            setSession(token)
        }
    }, [])

    useEffect(() => {
        if (typeof window !== 'undefined' && router?.isReady) {
            setIsLoading(false)
        } else {
            loadableReady(() => {
                setIsLoading(false)
            })
        }
    }, [])

    return (
        <>
            <Provider store={store}>
                {isLoading ? (
                    <Loader />
                ) : (
                    <div>
                        <ModalsController key="modals" />
                        <ToastNotificationsController key="toasts" />
                        <RedirectionHandler />
                        <Head>
                            <title>Kurrious</title>
                        </Head>
                        <div
                            className="absolute bottom-0 left-0 z-10 cursor-pointer"
                            onClick={openDevToolsModal}
                        >
                            <SettingsIcon />
                        </div>
                        <DynamicKurious
                            Component={Component}
                            pageProps={pageProps}
                        />
                    </div>
                )}
            </Provider>
        </>
    )
}
