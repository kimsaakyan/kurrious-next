import React from 'react'
import withAuth from '@/src/utils/hooks/withAuth'
import Header from '@/src/components/v2/Header/Header'
import { USER_ROLES } from '@/src/roles/roles'
import Sidebar from '@/src/components/Sidebar/Sidebar'

interface IProps {
    children?: ReactNode
}

const SettingsLayout = ({ children }: IProps): ReactNode => {
    return (
        <div className="h-screen">
            <Header />
            <div className="flex h-[89%]">
                <div className="min-w-[200px] border border-r border-gray-300 bg-white">
                    <Sidebar />
                </div>
                <div className="flex-1 overflow-auto bg-white">{children}</div>
            </div>
        </div>
    )
}
export default withAuth(SettingsLayout, [
    USER_ROLES.CLIENT_USER,
    USER_ROLES.CLIENT_ADMIN,
    USER_ROLES.KURIOUS_SALES,
    USER_ROLES.KURIOUS_SUPERUSER,
])
