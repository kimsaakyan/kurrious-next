import axios, {
    AxiosError,
    AxiosInstance,
    InternalAxiosRequestConfig,
} from 'axios'
import {
    CookieKey,
    devToolsDefaultConfig,
} from '@/src/constants/defaultConfigs'
import { getAccessToken } from '@/src/utils/auth/authUtils'
import { getFromCookie } from '@/src/utils/common/cookies'
import Router from 'next/router'

const getServerUrl = () => {
    const devConfig = getFromCookie(CookieKey.DEV_CONFIG, devToolsDefaultConfig)

    return devConfig?.server
}

class RequestManager {
    private static instance: AxiosInstance

    static getCreateInstance(): AxiosInstance {
        if (RequestManager.instance) {
            return RequestManager.instance
        }

        const serverUrl = getServerUrl()
        const axiosInstance = axios.create({ baseURL: `${serverUrl}` })

        axiosInstance.interceptors.request.use(
            async (config: InternalAxiosRequestConfig) => {
                const requestConfig = config

                // Put all headers here
                if (!requestConfig.headers.has('Content-Type')) {
                    requestConfig.headers.set({
                        'Content-Type': 'application/json',
                    })
                }

                requestConfig.headers.set({
                    Accept: 'application/json',
                    Authorization: `Bearer ${getAccessToken()}`,
                })

                return requestConfig
            }
        )

        axiosInstance.interceptors.response.use(
            (response) => response,
            (error) => {
                const axiosError = error as AxiosError
                if (
                    axiosError?.response &&
                    axiosError?.response?.status === 401
                ) {
                    localStorage.removeItem('access_token')
                    Router.push('/') // Redirect to the root path
                }

                return Promise.reject(error)
            }
        )

        RequestManager.instance = axiosInstance

        return axiosInstance
    }
}

export const Axios = () => RequestManager.getCreateInstance()
