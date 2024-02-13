import { getEnvironmentVariables } from '@/src/utils/getEnvironmentVariables'

const { NEXT_PUBLIC_BASE_URL } = getEnvironmentVariables()

export enum CookieKey {
    DEV_CONFIG = 'devConfig',
}

//'http://localhost:3000/api/v1'
export const devToolsDefaultConfig = {
    server: NEXT_PUBLIC_BASE_URL,
}
