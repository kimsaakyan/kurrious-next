import React, { useEffect } from 'react'
import { dispatch } from '@/src/redux/hooks'
import { usersMiddleware } from '@/src/redux/slices/users'
import { Avatar } from '@/src/components/ui/avatar'
import { useSelector } from 'react-redux'
import { authSelector } from '@/src/redux/slices/auth'

const AvatarProfile = (): ReactNode => {
    const currentUser = useSelector(authSelector.currentUser)

    useEffect(() => {
        dispatch(usersMiddleware.getUsersAvatar())
    }, [])

    return (
        <Avatar className="h-16 w-16 max-w-full items-center justify-center rounded-full bg-blue-bright object-contain text-lg text-white">
            {currentUser?.firstName.charAt(0) || 'A'}
        </Avatar>
    )
}
export default AvatarProfile
