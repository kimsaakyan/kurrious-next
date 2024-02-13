import React, { useEffect } from 'react'
import SettingsLayout from '@/src/layouts/Settings/SettingsLayout'
import GroupsPage from '@/src/components/Groups/GroupsPage'
import { USER_ROLES } from '@/src/roles/roles'
import { useRouter } from 'next/router'
import { CheckAuth } from '@/src/utils/hooks/checkAuth'
import { useSelector } from 'react-redux'
import { authSelector } from '@/src/redux/slices/auth'

const Groups = (): ReactNode => {
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

    return <GroupsPage />
}

export default Groups

Groups.getLayout = function getLayout(page: ReactNode) {
    return <SettingsLayout>{page}</SettingsLayout>
}
