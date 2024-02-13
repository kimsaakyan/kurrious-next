import { ICompany, IUser } from '@/src/manager/companies/companiesManagerTypes'

export interface ICompaniesState {
    companiesList: ICompany[]
    companySamsaraKey: string
    companyUsers: IUser[] | null
    activeFinderId: string | undefined
    editOrganizationData: ICompany | null
    isLoadingCompanyUser: boolean
    currentCompany: ICompany | null
    companyUser: ICompanyUser
    loading: {
        companiesList: boolean
        createCompany: boolean
        updateCompany: boolean
        deleteCompany: boolean
        updateCompanyStatus: boolean
        getCompanySamsaraKey: boolean
        addCompanySamsaraKey: boolean
        updateCompanySamsaraKey: boolean
        addUser: boolean
    }
}

export interface ICompanyUser {
    firstName: string
    lastName: string
    userName: string
    phoneNumber: string
    userType: string
}
