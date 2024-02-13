import React, { useCallback, useEffect, useMemo, useState } from 'react'

import { useRouter } from 'next/router'

import {
    CookieKey,
    devToolsDefaultConfig,
} from '@/src/constants/defaultConfigs'
import { getFromCookie, setToCookie } from '@/src/utils/common/cookies'
import { viewsMiddleware } from '@/src/redux/slices/views'
import { ModalName } from '@/src/types/modals'
import { dispatch } from '@/src/redux/hooks'
import { updateManagersBaseUrls } from '@/src/manager/API'
import CloseIcon from '@/src/components/Icons/CloseIcon'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/src/components/ui/select'

const DevToolsModal = () => {
    const router = useRouter()
    const currentConfig = useMemo(
        () => getFromCookie(CookieKey.DEV_CONFIG, devToolsDefaultConfig),
        []
    )
    const [devConfig, setDevConfig] = useState(
        getFromCookie(CookieKey.DEV_CONFIG, devToolsDefaultConfig)
    )

    useEffect(() => {
        if (devConfig) {
            setToCookie(CookieKey.DEV_CONFIG, devConfig, {
                maxAge: 60 * 60 * 24 * 365,
            })
        }
    }, [devConfig])

    const onClose = useCallback(() => {
        dispatch(viewsMiddleware.closeModal(ModalName.DevToolsModal))

        if (devConfig.server !== currentConfig.server) {
            router.reload()
        }
    }, [currentConfig, devConfig, router])

    const onServerChange = useCallback(
        (server: string) => {
            setDevConfig({ ...devConfig, server })
            updateManagersBaseUrls(server)
        },
        [devConfig]
    )

    return (
        <div
            id="modalContainer"
            className="fixed inset-0 z-50 flex items-center justify-center bg-gray-transparent drop-shadow"
        >
            <div className="relative w-[400px] rounded-xl bg-white p-6 text-blue-dark shadow-lg">
                <div className="p-4">
                    <div className="font-bold">Dev tools</div>
                    <div className="mt-2 text-s text-gray-150">Server</div>
                    <div
                        onClick={onClose}
                        className="absolute right-4 top-4 cursor-pointer p-2"
                    >
                        <CloseIcon />
                    </div>
                    <div className="h-3">
                        <Select
                            value={devConfig.server}
                            onValueChange={(value) => {
                                onServerChange(value)
                            }}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Select a role" />
                            </SelectTrigger>
                            <SelectContent side="top" className="rounded-md">
                                {['/api', '/dev'].map((item) => (
                                    <SelectItem
                                        className="h-15 rounded-md"
                                        key={item}
                                        value={
                                            item === '/dev'
                                                ? 'https://api.dev.kurrious.com'
                                                : item
                                        }
                                    >
                                        {item === '/dev' ? 'DEV' : 'MOCK'}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DevToolsModal
