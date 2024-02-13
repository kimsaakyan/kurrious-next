import React, { useEffect } from 'react'
import withAuth from '@/src/utils/hooks/withAuth'
import Header from '@/src/components/v2/Header/Header'
import { USER_ROLES } from '@/src/roles/roles'
import Sidebar from '@/src/components/Sidebar/Sidebar'
import { dispatch } from '@/src/redux/hooks'
import { authMiddleware } from '@/src/redux/slices/auth'
interface IProps {
    children?: ReactNode
}

const SuperAdminLayout = ({ children }: IProps): ReactNode => {
    useEffect(() => {
        dispatch(authMiddleware.currentUser())
    }, [])

    return (
        <div className="h-screen">
            <Header />
            <div className="flex h-[89%]">
                <div className="border- min-w-[200px] border-r border-gray-300 bg-white">
                    <Sidebar />
                </div>
                <div className="flex-1 overflow-auto bg-white">{children}</div>
            </div>
        </div>
    )
}

export default withAuth(SuperAdminLayout, [USER_ROLES.KURIOUS_SALES])
