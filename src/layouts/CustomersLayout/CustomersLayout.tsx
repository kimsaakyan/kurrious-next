import withAuth from '@/src/utils/hooks/withAuth'
import Header from '@/src/components/v2/Header/Header'
import MenuBar from '@/src/components/v2/MenuBar/MenuBar'

import { USER_ROLES } from '@/src/roles/roles'
interface IProps {
    children?: ReactNode
}

const CustomersLayout = ({ children }: IProps): ReactNode => {
    return (
        <div className="flex h-screen flex-col">
            <Header />
            <div className="min-h-14 flex h-14 border-b border-t border-b-gray-300 border-t-gray-300 pl-6">
                <MenuBar />
            </div>
            <div className="flex h-[81%] w-full flex-1 overflow-hidden">
                <div className="max-h-[calc(100vh-135px)] w-full overflow-hidden border-2">
                    {children}
                    <div className="mx-auto my-18 flex h-[320px] w-[320px] items-center justify-center rounded-full bg-sky-500">
                        <p className="flex flex-col items-center text-xl uppercase text-white">
                            <span>Customers Page</span>
                            <span>Coming Soon</span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default withAuth(CustomersLayout, [
    USER_ROLES.CLIENT_USER,
    USER_ROLES.CLIENT_ADMIN,
    USER_ROLES.KURIOUS_SALES,
    USER_ROLES.KURIOUS_SUPERUSER,
])
