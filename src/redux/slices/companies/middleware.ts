import slice from './slice'
import { AppDispatch } from '@/src/redux/store'
import API from '@/src/manager/API'
import { companiesMiddleware } from '@/src/redux/slices/companies/index'
import {
    IAddCompanySamsaraKeyReqBody,
    ICompany,
} from '@/src/manager/companies/companiesManagerTypes'
import { viewsMiddleware } from '@/src/redux/slices/views'
import { ModalName } from '@/src/types/modals'
import { SeveritiesType } from '@/src/enums'
import { INewUser } from '@/src/manager/users/usersManagerTypes'
import { NextRouter } from 'next/router'
import { AxiosResponse } from 'axios'
import { handleErrorActions } from '@/src/manager/axiosUtils'
import { ICompanyUser } from '@/src/types/redux/companies'

const {
    setCompaniesList,
    setCompaniesListLoading,
    setCreateCompanyLoading,
    setUpdateCompanyLoading,
    setDeleteCompanyLoading,
    setUpdateCompanyStatusLoading,
    setGetCompanySamsaraKeyLoading,
    setUpdateCompanySamsaraKeyLoading,
    setAddCompanySamsaraKeyLoading,
    setCompanySamsaraKey,
    setEditOrganizationData,
    setCompanyAddUserLoading,
    setActiveFinderId,
    setIsLoadingCompanyUser,
    setCompanyUser,
    setCurrentCompany,
} = slice.actions

const getCompanies = (regex?: string) => async (dispatch: AppDispatch) => {
    try {
        dispatch(setCompaniesListLoading(true))

        const response = await API.companies.getCompanies(regex)

        dispatch(setCompaniesList(response.data))
    } catch (error) {
        console.error(error)
    } finally {
        dispatch(setCompaniesListLoading(false))
    }
}

const createCompany =
    (body: ICompany, router: NextRouter) => async (dispatch: AppDispatch) => {
        try {
            dispatch(setCreateCompanyLoading(true))

            await API.companies.createCompany(body)
            dispatch(
                viewsMiddleware.setToastNotificationPopUpState({
                    open: true,
                    props: {
                        severityType: SeveritiesType.success,
                        title: 'Organization Created Successfully!',
                    },
                })
            )
            router.push('/settings/groups')
            dispatch(companiesMiddleware.getCompanies())
        } catch (error) {
            const axiosError = error as {
                response: AxiosResponse
            }
            handleErrorActions(axiosError)
        } finally {
            dispatch(setCreateCompanyLoading(false))
        }
    }

const updateCompany =
    (id: string, body: ICompany, router: NextRouter) =>
    async (dispatch: AppDispatch) => {
        try {
            dispatch(setUpdateCompanyLoading(true))

            await API.companies.updateCompany(id, body)
            dispatch(
                viewsMiddleware.setToastNotificationPopUpState({
                    open: true,
                    props: {
                        severityType: SeveritiesType.success,
                        title: 'Organization Updated Successfully!',
                    },
                })
            )
            router.push('/settings/groups')
            dispatch(companiesMiddleware.getCompanies())
        } catch (error) {
            console.error(error)
        } finally {
            dispatch(setUpdateCompanyLoading(false))
        }
    }

const deleteCompany = (companyId: string) => async (dispatch: AppDispatch) => {
    try {
        dispatch(setDeleteCompanyLoading(true))

        await API.companies.deleteCompany(companyId)
        dispatch(companiesMiddleware.getCompanies())
        dispatch(
            viewsMiddleware.setToastNotificationPopUpState({
                open: true,
                props: {
                    severityType: SeveritiesType.success,
                    title: 'Company is successfully deleted!',
                },
            })
        )
    } catch (error) {
        const axiosError = error as {
            response: AxiosResponse
        }
        handleErrorActions(axiosError)
    } finally {
        dispatch(setDeleteCompanyLoading(false))
        dispatch(viewsMiddleware.closeModal(ModalName.DeleteCompanyModal))
    }
}

const updateCompanyStatus =
    (id: string, isActive: boolean) => async (dispatch: AppDispatch) => {
        try {
            dispatch(setUpdateCompanyStatusLoading(true))

            await API.companies.updateCompanyStatus(id, isActive)
            dispatch(companiesMiddleware.getCompanies())
            dispatch(
                viewsMiddleware.setToastNotificationPopUpState({
                    open: true,
                    props: {
                        severityType: SeveritiesType.success,
                        title: 'Organization Status Updated Successfully!',
                    },
                })
            )
        } catch (error) {
            const axiosError = error as {
                response: AxiosResponse
            }
            handleErrorActions(axiosError)
        } finally {
            dispatch(setUpdateCompanyStatusLoading(false))
        }
    }

const getCompanySamsaraKey =
    (companyId: string) => async (dispatch: AppDispatch) => {
        try {
            dispatch(setGetCompanySamsaraKeyLoading(true))

            const response = await API.companies.getCompanySamsaraKey(companyId)
            dispatch(setCompanySamsaraKey(response.data.apiKey))
        } catch (error) {
            const axiosError = error as {
                response: AxiosResponse
            }
            handleErrorActions(axiosError)
        } finally {
            dispatch(setGetCompanySamsaraKeyLoading(false))
        }
    }

const resetCompanySamsaraKey = () => async (dispatch: AppDispatch) => {
    try {
        dispatch(setCompanySamsaraKey(''))
    } catch (error) {
        console.error(error)
    }
}

const addCompanySamsaraKey =
    (companyId: string, body: IAddCompanySamsaraKeyReqBody) =>
    async (dispatch: AppDispatch) => {
        try {
            dispatch(setAddCompanySamsaraKeyLoading(true))

            await API.companies.addCompanySamsaraKey(companyId, body)
            dispatch(companiesMiddleware.getCompanies())
            dispatch(
                viewsMiddleware.setToastNotificationPopUpState({
                    open: true,
                    props: {
                        severityType: SeveritiesType.success,
                        title: 'Samsara key is successfully added!',
                    },
                })
            )
        } catch (error) {
            console.error(error)
        } finally {
            dispatch(setAddCompanySamsaraKeyLoading(false))
            dispatch(viewsMiddleware.closeModal(ModalName.SamsaraKeyModal))
            dispatch(companiesMiddleware.resetCompanySamsaraKey())
        }
    }

const updateCompanySamsaraKey =
    (companyId: string, body: IAddCompanySamsaraKeyReqBody) =>
    async (dispatch: AppDispatch) => {
        try {
            dispatch(setUpdateCompanySamsaraKeyLoading(true))

            await API.companies.updateCompanySamsaraKey(companyId, body)
            dispatch(companiesMiddleware.getCompanies())
            dispatch(
                viewsMiddleware.setToastNotificationPopUpState({
                    open: true,
                    props: {
                        severityType: SeveritiesType.success,
                        title: 'Samsara key is successfully updated!',
                    },
                })
            )
        } catch (error) {
            console.error(error)
        } finally {
            dispatch(setUpdateCompanySamsaraKeyLoading(false))
            dispatch(viewsMiddleware.closeModal(ModalName.SamsaraKeyModal))
            dispatch(companiesMiddleware.resetCompanySamsaraKey())
        }
    }

const updateCompanyUser =
    (userId: string, data: ICompanyUser) => async (dispatch: AppDispatch) => {
        try {
            dispatch(setIsLoadingCompanyUser(true))
            await API.companies.updateCompanyUser(userId, data)
            dispatch(
                viewsMiddleware.setToastNotificationPopUpState({
                    open: true,
                    props: {
                        severityType: SeveritiesType.success,
                        title: 'User is successfully updated!',
                    },
                })
            )
            dispatch(companiesMiddleware.getCompanies())
        } catch (error) {
            const axiosError = error as {
                response: AxiosResponse
            }
            handleErrorActions(axiosError)
        } finally {
            dispatch(setIsLoadingCompanyUser(false))
        }
    }

const deleteCompanyUser = (userId: string) => async (dispatch: AppDispatch) => {
    try {
        dispatch(setIsLoadingCompanyUser(true))
        await API.companies.deleteCompanyUser(userId)
        dispatch(
            viewsMiddleware.setToastNotificationPopUpState({
                open: true,
                props: {
                    severityType: SeveritiesType.success,
                    title: 'User is successfully deleted!',
                },
            })
        )
        dispatch(companiesMiddleware.getCompanies())
    } catch (error) {
        const axiosError = error as {
            response: AxiosResponse
        }
        handleErrorActions(axiosError)
    } finally {
        dispatch(setIsLoadingCompanyUser(false))
    }
}

const addCompanyUsers = (body: INewUser) => async (dispatch: AppDispatch) => {
    dispatch(setCompanyAddUserLoading(true))
    try {
        await API.users.createNewUser(body)
        dispatch(companiesMiddleware.getCompanies())
        dispatch(
            viewsMiddleware.setToastNotificationPopUpState({
                open: true,
                props: {
                    severityType: SeveritiesType.success,
                    title: 'Email have been sent successfully!',
                },
            })
        )
        dispatch(
            viewsMiddleware.setRedirectionState({
                path: '/settings/groups',
                params: '',
                apply: true,
            })
        )
    } catch (error) {
        const axiosError = error as {
            response: AxiosResponse
        }
        handleErrorActions(axiosError)
    } finally {
        dispatch(setCompanyAddUserLoading(false))
    }
}

const editOrganizationData =
    (data: ICompany) => async (dispatch: AppDispatch) => {
        dispatch(setEditOrganizationData(data))
    }

const updateActiveFinderId =
    (id: string | undefined) => async (dispatch: AppDispatch) => {
        dispatch(setActiveFinderId(id))
    }

const updateCompanyUserData =
    (value: ICompanyUser) => async (dispatch: AppDispatch) => {
        dispatch(setCompanyUser(value))
    }

const updateCurrentCompany =
    (value: ICompany) => async (dispatch: AppDispatch) => {
        dispatch(setCurrentCompany(value))
    }

export default {
    getCompanies,
    createCompany,
    updateCompany,
    deleteCompany,
    updateCompanyUserData,
    updateCompanyStatus,
    getCompanySamsaraKey,
    addCompanySamsaraKey,
    updateCompanySamsaraKey,
    addCompanyUsers,
    resetCompanySamsaraKey,
    editOrganizationData,
    updateActiveFinderId,
    updateCompanyUser,
    deleteCompanyUser,
    updateCurrentCompany,
}
