import React, { useEffect, useState } from 'react'
import PageHeader from '@/src/components/PageHeader/PageHeader'
import SettingsLayout from '@/src/layouts/Settings/SettingsLayout'
import { USER_ROLES } from '@/src/roles/roles'
import { useRouter } from 'next/router'
import { Button } from '@/src/components/ui/button'
import ApiTokens from '@/src/components/ApiTokens/ApiTokens'
import { ArrowLeftIcon } from 'lucide-react'
import SuccessSecondaryIcon from '@/src/components/Icons/SuccessSecondaryIcon'
import { dispatch } from '@/src/redux/hooks'
import {
    integrationsMiddleware,
    integrationsSelector,
} from '@/src/redux/slices/integrations'
import { useSelector } from 'react-redux'
import { CheckAuth } from '@/src/utils/hooks/checkAuth'
import ComingSoon from '@/src/components/Widgets/Widgets'
import { authSelector } from '@/src/redux/slices/auth'

const Integrations = () => {
    const integrationsList = useSelector(integrationsSelector.integrationsList)
    const router = useRouter()
    const currentUser = useSelector(authSelector.currentUser)
    const isLoadingAuth = useSelector(authSelector.isLoadingAuth)
    const [showApiTokensList, setShowApiTokensList] = useState<boolean>(false)
    const [integrationName, setIntegrationName] = useState<string>('')
    const [integrationIcon, setIntegrationIcon] = useState<string>('')

    const onConnectClick = (id: string, icon: string, name: string) => {
        setShowApiTokensList(!showApiTokensList)
        dispatch(integrationsMiddleware.getIntegrationsApiTokensList(id))
        setIntegrationIcon(icon)
        setIntegrationName(name)
    }

    const onBackArrowClick = () => {
        setShowApiTokensList(!showApiTokensList)
    }

    useEffect(() => {
        CheckAuth(
            [
                USER_ROLES.KURIOUS_SALES,
                USER_ROLES.KURIOUS_SUPERUSER,
                USER_ROLES.CLIENT_ADMIN,
            ],
            currentUser,
            isLoadingAuth
        )
    }, [router, isLoadingAuth])

    return (
        <>
            <div className="flex w-full items-center">
                <div className="flex w-full items-center ">
                    <div className="w-full">
                        {showApiTokensList ? (
                            <div className="flex w-full items-center border-b border-t border-b-gray-300 border-t-gray-300 p-3.5">
                                <div
                                    className="cursor-pointer"
                                    onClick={onBackArrowClick}
                                >
                                    <ArrowLeftIcon />
                                </div>
                                <div className="px-3.5">
                                    <img
                                        width={47}
                                        height={37}
                                        src={integrationIcon}
                                    />
                                </div>
                                <div className="text-base	font-semibold">
                                    {integrationName} Integration
                                </div>
                            </div>
                        ) : (
                            <PageHeader title="Integrations" />
                        )}
                    </div>
                </div>
            </div>
            {showApiTokensList ? (
                <div className=" py-5">
                    <ApiTokens />
                </div>
            ) : integrationsList && integrationsList.length ? (
                <div className="flex flex-wrap">
                    {integrationsList.map((item) => (
                        <div key={item.id} className="p-5">
                            <div
                                key={item.id}
                                className="w-72 rounded-xl border border-gray-light"
                            >
                                <div className="flex w-24 flex-col items-center p-3 text-s text-quaternary">
                                    <img
                                        width={50}
                                        height={50}
                                        src={item.icon}
                                    />
                                    <div className="mt-1">{item.name}</div>
                                </div>
                                <div className="flex w-full items-center justify-between border-t border-gray-light px-4 pb-3 pt-4">
                                    <div className="flex items-center justify-between">
                                        <Button
                                            onClick={() =>
                                                onConnectClick(
                                                    item.id,
                                                    item.icon,
                                                    item.name
                                                )
                                            }
                                            variant="outline"
                                            className="mr-2.5 font-semibold text-black-200	"
                                        >
                                            {item.status ? (
                                                <div className="flex items-center">
                                                    Connected
                                                    <span className="ml-2">
                                                        <SuccessSecondaryIcon />
                                                    </span>
                                                </div>
                                            ) : (
                                                'Connect'
                                            )}
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <ComingSoon />
            )}
        </>
    )
}

export default Integrations

Integrations.getLayout = function getLayout(page: ReactNode) {
    return <SettingsLayout>{page}</SettingsLayout>
}
