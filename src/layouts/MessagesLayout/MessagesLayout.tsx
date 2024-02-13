import React, { useEffect, useState } from 'react'
import withAuth from '@/src/utils/hooks/withAuth'
import Header from '@/src/components/v2/Header/Header'
import MenuBar from '@/src/components/v2/MenuBar/MenuBar'
import { useWindowSize } from '@/src/utils/hooks/useWindowSize'
import { Button } from '@/src/components/ui/button'
import { cn } from '@/src/lib/utils'
import { MenuIcon } from 'lucide-react'
import { USER_ROLES } from '@/src/roles/roles'
import MessagesSidebar from '@/src/components/Sidebar/MessagesSidebar'
interface IProps {
    children?: ReactNode
}

const MessagesLayout = ({ children }: IProps): ReactNode => {
    const [openSidebar, setOpenSidebar] = useState(true)
    const [showSidebarToggler, setShowSidebarToggler] = useState(false)
    const size = useWindowSize()

    useEffect(() => {
        const breakpointWidth = 991
        if (size.width) {
            if (!showSidebarToggler)
                setOpenSidebar(size.width <= breakpointWidth)
            setShowSidebarToggler(size.width <= breakpointWidth)
        }
    }, [size])

    return (
        <div className="flex h-screen flex-col">
            <Header />
            <div className="min-h-14 flex h-14 border-b border-t border-b-gray-300 border-t-gray-300 pl-6">
                <MenuBar />
            </div>
            <div className="flex h-[81%] w-full flex-1 overflow-hidden">
                <div className="relative max-h-[calc(100vh-135px)] border-r bg-secondary text-secondary">
                    <MessagesSidebar open={openSidebar} />
                    <Button
                        className={cn(
                            'absolute -end-16 top-28 z-10 h-16 w-16 rounded-r-lg bg-black hover:bg-black-light',
                            [!showSidebarToggler && 'hidden']
                        )}
                        onClick={() => setOpenSidebar((prev) => !prev)}
                    >
                        <MenuIcon />
                    </Button>
                </div>
                <div className="max-h-[calc(100vh-135px)] w-full overflow-hidden">
                    {children}
                </div>
            </div>
        </div>
    )
}
export default withAuth(MessagesLayout, [
    USER_ROLES.CLIENT_USER,
    USER_ROLES.CLIENT_ADMIN,
    USER_ROLES.KURIOUS_SALES,
    USER_ROLES.KURIOUS_SUPERUSER,
])
