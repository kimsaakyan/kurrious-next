import { ILoginReqBody } from '@/src/manager/auth/authManagerTypes'
import { AppDispatch } from '@/src/redux/store'
import API from '@/src/manager/API'
import slice from '@/src/redux/slices/auth/slice'
import { setSession } from '@/src/utils/auth/authUtils'
import { USER_ROLES } from '@/src/roles/roles'
import { viewsMiddleware } from '@/src/redux/slices/views/index'
import { SeveritiesType } from '@/src/enums'
import { NextRouter } from 'next/router'
import { AxiosResponse } from 'axios'
import { handleErrorActions } from '@/src/manager/axiosUtils'

const { setLoginLoading, setCurrentUser } = slice.actions

const logOut = () => async () => {
    setSession('')
}

const login =
    (loginReqData: ILoginReqBody) => async (dispatch: AppDispatch) => {
        try {
            dispatch(setLoginLoading(true))

            const response = await API.auth.login(loginReqData)

            const role =
                USER_ROLES[response.data?.userType as keyof typeof USER_ROLES]

            if (
                role === USER_ROLES.KURIOUS_SUPERUSER ||
                role === USER_ROLES.KURIOUS_SALES
            ) {
                dispatch(
                    viewsMiddleware.setRedirectionState({
                        path: '/settings/groups',
                        params: '',
                        apply: true,
                    })
                )
            } else {
                dispatch(
                    viewsMiddleware.setRedirectionState({
                        path: '/jenny/conversation',
                        params: '',
                        apply: true,
                    })
                )
            }

            setSession(response.data.token)
        } catch (error) {
            const axiosError = error as {
                response: AxiosResponse
            }
            handleErrorActions(axiosError)
        } finally {
            dispatch(setLoginLoading(false))
        }
    }

const currentUser = () => async (dispatch: AppDispatch) => {
    try {
        dispatch(setLoginLoading(true))
        const response = await API.auth.currentUser()
        dispatch(setCurrentUser(response.data))
    } catch (error) {
        console.error(error)
    } finally {
        dispatch(setLoginLoading(false))
    }
}

const resetPassword =
    (password: string, router: NextRouter) => async (dispatch: AppDispatch) => {
        try {
            dispatch(setLoginLoading(true))

            await API.auth.resetPassword(router.query.token as string, password)
            router.push('/')
            dispatch(
                viewsMiddleware.setToastNotificationPopUpState({
                    open: true,
                    props: {
                        severityType: SeveritiesType.success,
                        title: 'Your password has been reset successfully',
                    },
                })
            )
        } catch (error) {
            console.error(error)
        } finally {
            dispatch(setLoginLoading(false))
        }
    }

const forgotPassword =
    (email: string | undefined) => async (dispatch: AppDispatch) => {
        try {
            dispatch(setLoginLoading(true))

            await API.auth.forgotPassword(email)
            dispatch(
                viewsMiddleware.setToastNotificationPopUpState({
                    open: true,
                    props: {
                        severityType: SeveritiesType.success,
                        title: 'If the email address exists in our system, a password reset link has been sent.',
                    },
                })
            )
        } catch (error) {
            const axiosError = error as {
                response: AxiosResponse
            }
            handleErrorActions(axiosError)
        } finally {
            dispatch(setLoginLoading(false))
        }
    }

export default {
    logOut,
    login,
    currentUser,
    forgotPassword,
    resetPassword,
}
