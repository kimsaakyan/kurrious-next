import { createSelector } from '@reduxjs/toolkit'
import { RootState } from '@/src/redux/store'

const selector = (state: RootState) => state.companies

export const companiesList = createSelector(
    [selector],
    (state) => state.companiesList
)
export const isCompaniesListLoading = createSelector(
    [selector],
    (state) => state.loading.companiesList
)
export const isCompanyCreateLoading = createSelector(
    [selector],
    (state) => state.loading.createCompany
)
export const isCompanyUpdateLoading = createSelector(
    [selector],
    (state) => state.loading.updateCompany
)
export const isCompanyDeleteLoading = createSelector(
    [selector],
    (state) => state.loading.deleteCompany
)
export const isCompanySamsaraKeyAddLoading = createSelector(
    [selector],
    (state) => state.loading.addCompanySamsaraKey
)
export const isCompanySamsaraKeyUpdateLoading = createSelector(
    [selector],
    (state) => state.loading.updateCompanySamsaraKey
)
export const isCompanyAddUserLoading = createSelector(
    [selector],
    (state) => state.loading.addUser
)

export const samsaraKey = createSelector(
    [selector],
    (state) => state.companySamsaraKey
)
export const editOrganizationData = createSelector(
    [selector],
    (state) => state.editOrganizationData
)

export const activeFinderId = createSelector(
    [selector],
    (state) => state.activeFinderId
)

export const isLoadingCompanyUser = createSelector(
    [selector],
    (state) => state.isLoadingCompanyUser
)
export const currentCompany = createSelector(
    [selector],
    (state) => state.currentCompany
)

export const companyUser = createSelector(
    [selector],
    (state) => state.companyUser
)

export default {
    isCompaniesListLoading,
    isCompanyCreateLoading,
    isCompanyUpdateLoading,
    isCompanyDeleteLoading,
    isCompanySamsaraKeyUpdateLoading,
    companiesList,
    isCompanySamsaraKeyAddLoading,
    samsaraKey,
    companyUser,
    isCompanyAddUserLoading,
    editOrganizationData,
    activeFinderId,
    isLoadingCompanyUser,
    currentCompany,
}
