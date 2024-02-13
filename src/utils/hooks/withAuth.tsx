/* eslint-disable react/display-name */
import { useEffect } from 'react'
import LoadingIcon from '@/src/components/Icons/LoadingIcon'
import { dispatch } from '@/src/redux/hooks'
import { authMiddleware, authSelector } from '@/src/redux/slices/auth'
import { useSelector } from 'react-redux'
import { CheckAuth } from '@/src/utils/hooks/checkAuth'
import { getAccessToken } from '@/src/utils/auth/authUtils'
import { useRouter } from 'next/router'

const withAuth = (ProtectedComponent: ReactNode, allowedRoles: string[]) => {
    return (props: any) => {
        const router = useRouter()
        const currentUser = useSelector(authSelector.currentUser)
        const isLoadingAuth = useSelector(authSelector.isLoadingAuth)

        useEffect(() => {
            if (currentUser && !isLoadingAuth) {
                CheckAuth(allowedRoles, currentUser, isLoadingAuth)
            }
        }, [currentUser, isLoadingAuth])

        useEffect(() => {
            if (getAccessToken()) {
                dispatch(authMiddleware.currentUser())
            } else {
                router.push('/')
            }
        }, [])

        return currentUser ? (
            <ProtectedComponent {...props} />
        ) : isLoadingAuth ? (
            <div className="fixed flex min-h-full w-full items-center justify-center text-[40px]">
                <LoadingIcon />
            </div>
        ) : null
    }
}

export default withAuth
