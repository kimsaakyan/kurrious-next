import { AxiosInstance, AxiosResponse } from 'axios'
import { getAccessToken } from '@/src/utils/auth/authUtils'
import {
    IWidget,
    IGetWidgetsResponse,
    IUpdateWidgetsResponse,
} from './widgetsManagerTypes'

const generateWidgetsManager = (instance: AxiosInstance) => ({
    axiosInstance: instance,

    getWidgets(companyId: string) {
        return instance.get<
            IGetWidgetsResponse,
            AxiosResponse<IGetWidgetsResponse>
        >(`/companies/v2/${companyId}/widgets`, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${getAccessToken()}`,
            },
        })
    },

    updateWidgets(companyId: string, updatedWidgets: IWidget[]) {
        return instance.patch<
            IUpdateWidgetsResponse,
            AxiosResponse<IUpdateWidgetsResponse>
        >(
            `/companies/v2/${companyId}/widgets`,
            {
                widgets: updatedWidgets,
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${getAccessToken()}`,
                },
            }
        )
    },
})

export default generateWidgetsManager
