import { IUser } from '@/src/manager/companies/companiesManagerTypes'

export interface AuthStateProps {
    loading: {
        login: boolean
    }
    currentUser: IUser | null
}

export interface ISignInForm {
    email: string
    password: string
}
