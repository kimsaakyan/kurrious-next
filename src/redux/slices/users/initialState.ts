import { UsersStateProps } from '@/src/types/redux/users'

export const getInitialState = (): UsersStateProps => ({
    isLoadingUsers: false,
    avatar: '',
})
