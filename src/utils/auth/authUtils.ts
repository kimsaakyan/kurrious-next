import axios from 'axios'

export const setSession = (accessToken: string | null) => {
    if (accessToken) {
        localStorage.setItem('access_token', accessToken)
        axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`
    } else {
        localStorage.removeItem('access_token')
        delete axios.defaults.headers.common.Authorization
        window.location.reload()
    }
}

export const getAccessToken = (): string | undefined | null => {
    return window.localStorage.getItem('access_token')
}
