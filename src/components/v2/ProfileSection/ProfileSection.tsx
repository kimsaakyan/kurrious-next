import React from 'react'
import { Avatar } from '@/src/components/ui/avatar'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/src/components/ui/popover'
import { ChevronDownIcon } from 'lucide-react'
import { dispatch } from '@/src/redux/hooks'
import { authMiddleware, authSelector } from '@/src/redux/slices/auth/index'
import Link from 'next/link'
import { useSelector } from 'react-redux'

const ProfileSection = (): ReactNode => {
    const currentUser = useSelector(authSelector.currentUser)

    const onLogoutClick = () => {
        dispatch(authMiddleware.logOut())
    }

    return (
        <div className="flex items-center">
            <Avatar className="mr-4 h-12 w-12 max-w-full items-center justify-center rounded-full bg-blue-bright object-contain text-base text-white">
                {currentUser?.firstName.charAt(0) || 'A'}
            </Avatar>
            <Popover>
                <PopoverTrigger>
                    <div className="flex items-center justify-center text-blue-dark">
                        {currentUser?.firstName}
                        <ChevronDownIcon
                            strokeWidth={3}
                            className="ml-2 h-5 w-5 text-blue-dark"
                        />
                    </div>
                </PopoverTrigger>

                <PopoverContent className="rounded-md bg-secondary">
                    <div className="flex w-full flex-col justify-between">
                        <Link className="text-base" href={'/settings/profile'}>
                            <div className="w-full cursor-pointer rounded-md p-2 pl-4 hover:bg-gray-400">
                                Settings
                            </div>
                        </Link>
                        <div
                            onClick={onLogoutClick}
                            className="w-full cursor-pointer rounded-md p-2 hover:bg-gray-400"
                        >
                            <p className="pl-2 text-base">Logout</p>
                        </div>
                    </div>
                </PopoverContent>
            </Popover>
        </div>
    )
}

export default ProfileSection
