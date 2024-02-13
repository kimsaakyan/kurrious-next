import { AxiosResponse } from 'axios'

export interface IAxiosResponseWithMeta<T> extends AxiosResponse {
    meta: IMeta
}
export interface IAxiosResponse<T> extends AxiosResponse {
    data: IData<T>
}
export interface IAxiosResponsePaginated<T> extends AxiosResponse {
    data: IPaginatedData<T>
}

export interface IResponseMessage<T> extends AxiosResponse {
    message: string
}

export interface IResponseStatus {
    code: string
    message?: string
    title?: string
}

interface IData<T> extends IResponseStatus {
    data: T
    status: IResponseStatus
}

interface IMeta {
    page: number
    pageSize: number
    totalCount: number
}

export interface IPagination {
    pageSize: number
    currentPage: number
    totalItems: number
}

interface IPaginatedData<T> extends IData<T>, IPagination {}
