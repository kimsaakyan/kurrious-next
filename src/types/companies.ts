import { NextRouter } from 'next/router'
import { IUser } from '@/src/manager/companies/companiesManagerTypes'

export interface ICollapseTableDropdown {
    key: string
    label: string
    danger?: boolean
    onClick: ({ id, router, user }: IDropDownActionMenuOnClick) => void
}

export interface IDropDownActionMenuOnClick {
    id?: string
    router?: NextRouter
    user?: IUser
}
