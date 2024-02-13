import { AppDispatch } from '@/src/redux/store'
import API from '@/src/manager/API'
import slice from '@/src/redux/slices/users/slice'
import { viewsMiddleware } from '@/src/redux/slices/views'
import { SeveritiesType } from '@/src/enums'
import { IUpdateUser } from '@/src/manager/users/usersManagerTypes'
import { authMiddleware } from '@/src/redux/slices/auth'
import { AxiosResponse } from 'axios'
import { handleErrorActions } from '@/src/manager/axiosUtils'

const { setIsLoadingUsers, setAvatar } = slice.actions

const updateUsers =
    (data: IUpdateUser, userId: string | undefined) =>
    async (dispatch: AppDispatch) => {
        try {
            dispatch(setIsLoadingUsers(true))
            await API.users.updateUser(data, userId)
            dispatch(
                viewsMiddleware.setToastNotificationPopUpState({
                    open: true,
                    props: {
                        severityType: SeveritiesType.success,
                        title: 'Profile has been successfully updated!',
                    },
                })
            )
            dispatch(authMiddleware.currentUser())
        } catch (error) {
            const axiosError = error as {
                response: AxiosResponse
            }
            handleErrorActions(axiosError)
        } finally {
            dispatch(setIsLoadingUsers(false))
        }
    }

const getUsersAvatar = () => async (dispatch: AppDispatch) => {
    try {
        dispatch(setIsLoadingUsers(true))
        const response = await API.users.getUsersAvatar()
        const blob = new Blob([response.data], { type: 'image/jpeg' }) // Adjust the 'type' based on your image format
        const imageUrl = URL.createObjectURL(blob)
        dispatch(setAvatar(imageUrl))
    } catch (error) {
        const axiosError = error as {
            response: AxiosResponse
        }
        handleErrorActions(axiosError)
    } finally {
        dispatch(setIsLoadingUsers(false))
    }
}

const updateUsersAvatar = (file: File) => async (dispatch: AppDispatch) => {
    try {
        dispatch(setIsLoadingUsers(true))
        await API.users.updateUsersAvatar(file)
        dispatch(
            viewsMiddleware.setToastNotificationPopUpState({
                open: true,
                props: {
                    severityType: SeveritiesType.success,
                    title: 'Profile image has been successfully updated!',
                },
            })
        )
    } catch (error) {
        const axiosError = error as {
            response: AxiosResponse
        }
        handleErrorActions(axiosError)
    } finally {
        dispatch(setIsLoadingUsers(false))
    }
}

export default {
    updateUsers,
    getUsersAvatar,
    updateUsersAvatar,
}
