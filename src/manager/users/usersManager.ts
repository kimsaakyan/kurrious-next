import { AxiosInstance, AxiosResponse } from 'axios'

import { INewUser, IUpdateUser } from '@/src/manager/users/usersManagerTypes'

const generateUsersManager = (instance: AxiosInstance) => ({
    axiosInstance: instance,

    getUsers() {
        return instance.get<null, AxiosResponse<null>>('users')
    },
    getUsersAvatar() {
        return instance.get<BlobPart, AxiosResponse<BlobPart>>('users/avatar')
    },
    updateUsersAvatar(file: File) {
        return instance.put<null, AxiosResponse<null>>(
            'users/avatar',
            { file },
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            }
        )
    },
    createNewUser(authReqData: INewUser) {
        return instance.post<INewUser, AxiosResponse<INewUser>>(
            'users/create-user',
            authReqData
        )
    },
    updateUser(data: IUpdateUser, userId: string | undefined) {
        return instance.patch<null, AxiosResponse<null>>(
            `users/${userId}`,
            data
        )
    },
})

export default generateUsersManager
