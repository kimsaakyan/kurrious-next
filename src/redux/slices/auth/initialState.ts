import { AuthStateProps } from '@/src/types/redux/auth'

export const getInitialState = (): AuthStateProps => ({
    currentUser: null,
    loading: {
        login: false,
    },
})
