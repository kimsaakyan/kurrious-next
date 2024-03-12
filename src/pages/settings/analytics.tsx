import React, { useEffect } from 'react'
import PageHeader from '@/src/components/PageHeader/PageHeader'
import SettingsLayout from '@/src/layouts/Settings/SettingsLayout'
import { USER_ROLES } from '@/src/roles/roles'
import { useRouter } from 'next/router'
import { CheckAuth } from '@/src/utils/hooks/checkAuth'
import ComingSoon from '@/src/components/Widgets/Widgets'
import { useSelector } from 'react-redux'
import { authSelector } from '@/src/redux/slices/auth'

const Analytics = (): ReactNode => {
    const router = useRouter()
    const currentUser = useSelector(authSelector.currentUser)
    const isLoadingAuth = useSelector(authSelector.isLoadingAuth)

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
            <PageHeader title="Analytics" />
            <ComingSoon />
        </>
    )
}

export default Analytics

Analytics.getLayout = function getLayout(page: ReactNode) {
    return <SettingsLayout>{page}</SettingsLayout>
}
