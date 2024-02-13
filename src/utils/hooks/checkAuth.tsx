import { USER_ROLES } from '@/src/roles/roles'
import Router from 'next/router'
import { IUser } from '@/src/manager/companies/companiesManagerTypes'
import { setSession } from '@/src/utils/auth/authUtils'

export const CheckAuth = (
    userRoles: string[],
    currentUser: IUser | null,
    isLoading: boolean
): void => {
    if (
        !isLoading &&
        !userRoles.includes(
            USER_ROLES[currentUser?.userType as keyof typeof USER_ROLES] || ''
        )
    ) {
        setSession('')
        Router.push('/')
    }
}
