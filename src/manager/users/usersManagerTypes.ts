import { IRegisterUserReqBody } from '@/src/manager/auth/authManagerTypes'



export interface IUpdateUser {
    firstName: string | undefined
    lastName: string | undefined
    username: string | undefined
    phoneNumber: string | undefined
}

export interface IUserForm {
    email: string
    picture: File | null
    username: string
    phoneNumber: string
}

export type INewUser = Omit<IRegisterUserReqBody, 'password'>
