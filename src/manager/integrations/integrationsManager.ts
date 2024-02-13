import { AxiosInstance, AxiosResponse } from 'axios'
import {
    ICreateIntegrationsApiToken,
    IIntegrations,
    IIntegrationsApiToken,
} from '@/src/types/redux/integrations'
import { IAxiosResponseWithMeta } from '@/src/manager/axiosTypes'

const baseURL = '/integrations'

const generateIntegrationsManager = (instance: AxiosInstance) => ({
    axiosInstance: instance,

    getIntegrationsList() {
        return instance.get<
            IIntegrations[],
            AxiosResponse<IAxiosResponseWithMeta<IIntegrations[]>>
        >(`${baseURL}/list`)
    },
    getIntegrationsApiTokensList(id: string) {
        return instance.get<
            IIntegrationsApiToken[],
            AxiosResponse<IAxiosResponseWithMeta<IIntegrationsApiToken[]>>
        >(`${baseURL}/${id}`)
    },
    createIntegrationsApiToken(data: ICreateIntegrationsApiToken) {
        return instance.post<
            ICreateIntegrationsApiToken[],
            AxiosResponse<ICreateIntegrationsApiToken[]>
        >(`${baseURL}/apiToken`, data)
    },
    deactivateApiToken(data: { id: string }) {
        return instance.put<void, AxiosResponse<void>>(
            `${baseURL}/deactivate/apiToken?id=${data.id}`
        )
    },
})

export default generateIntegrationsManager
