import { SliceCaseReducers } from '@reduxjs/toolkit/src/createSlice'
import { IAction } from '@/src/redux/store'
import { ICompaniesState, ICompanyUser } from '@/src/types/redux/companies'
import { ICompany, IUser } from '@/src/manager/companies/companiesManagerTypes'

const createReducer = <T extends SliceCaseReducers<ICompaniesState>>(
    reducer: T
) => ({ ...reducer })

const reducers = createReducer({
    setCompaniesList(state, action: IAction<ICompany[]>) {
        state.companiesList = action.payload
    },
    setCompaniesListLoading(state, action: IAction<boolean>) {
        state.loading.companiesList = action.payload
    },
    setCreateCompanyLoading(state, action: IAction<boolean>) {
        state.loading.createCompany = action.payload
    },
    setUpdateCompanyLoading(state, action: IAction<boolean>) {
        state.loading.updateCompany = action.payload
    },
    setDeleteCompanyLoading(state, action: IAction<boolean>) {
        state.loading.deleteCompany = action.payload
    },
    setUpdateCompanyStatusLoading(state, action: IAction<boolean>) {
        state.loading.updateCompanyStatus = action.payload
    },
    setGetCompanySamsaraKeyLoading(state, action: IAction<boolean>) {
        state.loading.getCompanySamsaraKey = action.payload
    },
    setUpdateCompanySamsaraKeyLoading(state, action: IAction<boolean>) {
        state.loading.updateCompanySamsaraKey = action.payload
    },
    setAddCompanySamsaraKeyLoading(state, action: IAction<boolean>) {
        state.loading.addCompanySamsaraKey = action.payload
    },
    setCompanySamsaraKey(state, action: IAction<string>) {
        state.companySamsaraKey = action.payload
    },
    setCompanyUsers(state, action: IAction<IUser[]>) {
        state.companyUsers = action.payload
    },
    setCompanyAddUserLoading(state, action: IAction<boolean>) {
        state.loading.addUser = action.payload
    },
    setEditOrganizationData(state, action: IAction<ICompany>) {
        state.editOrganizationData = action.payload
    },
    setActiveFinderId(state, action: IAction<string | undefined>) {
        state.activeFinderId = action.payload
    },
    setIsLoadingCompanyUser(state, action: IAction<boolean>) {
        state.isLoadingCompanyUser = action.payload
    },
    setCurrentCompany(state, action: IAction<ICompany>) {
        state.currentCompany = action.payload
    },
    setCompanyUser(state, action: IAction<ICompanyUser>) {
        state.companyUser = action.payload
    },
})

export default reducers
