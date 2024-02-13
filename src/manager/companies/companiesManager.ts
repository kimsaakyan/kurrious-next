import { AxiosInstance, AxiosResponse } from 'axios'

import { IResponseMessage } from '../axiosTypes'
import {
    IAddCompany,
    IAddCompanySamsaraKeyReqBody,
    ICompany,
    ICompanySamsaraKeyResponse,
} from '@/src/manager/companies/companiesManagerTypes'
import { ICompanyUser } from '@/src/types/redux/companies'

const baseURL = '/companies'

const generateCompaniesManager = (instance: AxiosInstance) => ({
    axiosInstance: instance,

    getCompanies(regex = '') {
        return instance.get<ICompany[], AxiosResponse<ICompany[]>>(
            `${baseURL}?&regex=${regex}`,
            { params: { orderBy: 'CREATED_AT_DATE_DESC' } }
        )
    },
    createCompany(data: IAddCompany) {
        return instance.post<ICompany, AxiosResponse<ICompany>>(
            `${baseURL}`,
            data
        )
    },
    updateCompany(id: string, body: IAddCompany) {
        return instance.put<ICompany, AxiosResponse<ICompany>>(
            `${baseURL}/${id}`,
            body
        )
    },
    deleteCompany(id: string) {
        return instance.delete<void, AxiosResponse<void>>(`${baseURL}/${id}`)
    },
    updateCompanyStatus(id: string, isActive: boolean) {
        return instance.patch<null, AxiosResponse<null>>(
            `${baseURL}/${id}/status?isActive=${isActive}`
        )
    },
    getCompanySamsaraKey(companyId: string) {
        return instance.get<
            ICompanySamsaraKeyResponse,
            AxiosResponse<ICompanySamsaraKeyResponse>
        >(`${baseURL}/${companyId}/samsaraKey`)
    },
    addCompanySamsaraKey(
        companyId: string,
        body: IAddCompanySamsaraKeyReqBody
    ) {
        return instance.post<null, IResponseMessage<null>>(
            `${baseURL}/${companyId}/samsaraKey`,
            body
        )
    },
    updateCompanySamsaraKey(
        companyId: string,
        body: IAddCompanySamsaraKeyReqBody
    ) {
        return instance.patch<null, IResponseMessage<null>>(
            `${baseURL}/${companyId}/samsaraKey`,
            body
        )
    },
    updateCompanyUser(userId: string, body: ICompanyUser) {
        return instance.patch<null, IResponseMessage<null>>(
            `${baseURL}/users/${userId}`,
            body
        )
    },
    deleteCompanyUser(userId: string) {
        return instance.delete<null, IResponseMessage<null>>(
            `${baseURL}/users/${userId}`
        )
    },
})

export default generateCompaniesManager
