import { IWidget } from "@/src/types/redux/widget"

export interface IUser extends Record<string, unknown> {
    username: string
    email: string
    firstName: string
    lastName: string
    companyName: string
	companyId:string
    phoneNumber: string
    userType: string
    accountStatus: string
    isActive: boolean
    lastLogin: string
    dateJoined: string
    id: string
    widgets: IWidget[]
}

export interface ICompany {
    key?: string
    companyId: string
    companyName: string
    email: string
    firstName: string
    lastName: string
    tokenUsage: number
    tokenAllotment: number
    isActive: boolean
    adminId: string
    lastUpdated: string
    dateCreated: string
    users: IUser[]
}

export interface IAddCompany {
    companyName: string
    firstName: string
    lastName: string
    tokenAllotment: number
    email: string
    adminId?: string
    isActive?: boolean
}

export interface ICompanySamsaraKeyResponse {
    message: string
    apiKey: string
}

export interface IAddCompanySamsaraKeyReqBody {
    apiKey: string
}
