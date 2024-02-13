import { AxiosInstance, AxiosResponse } from 'axios'

import {
    ILoginReqBody,
    ILoginResponse,
} from '@/src/manager/auth/authManagerTypes'
import { IUser } from '@/src/manager/companies/companiesManagerTypes'

const generateAuthManager = (instance: AxiosInstance) => ({
    axiosInstance: instance,

    login(loginReqData: ILoginReqBody) {
        return instance.post<ILoginResponse, AxiosResponse<ILoginResponse>>(
            'auth/login',
            loginReqData
        )
    },
    currentUser() {
        return instance.get<IUser, AxiosResponse<IUser>>('auth/currentUser')
    },
    resetPassword(jwt: string, password: string) {
        return instance.put<null, AxiosResponse<null>>(
            `auth/resetPassword/${jwt}`,
            { password }
        )
    },
    forgotPassword(email: string | undefined) {
        return instance.post<null, AxiosResponse<null>>(`auth/forgotPassword`, {
            email,
        })
    },
})

export default generateAuthManager
