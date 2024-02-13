export interface ILoginReqBody {
    email: string
    password: string
}

export interface ILoginResponse {
    id: string
    email: string
    userType: string
    token: string
}

export interface IRegisterUserReqBody {
    email: string
    password: string
    firstName: string
    lastName: string
    companyName?: string
    userType: string
}

export interface ICreateYourPassword {
    password: string
    reEnterPassword: string
}

export interface IForgotPassword {
    email: string
}
