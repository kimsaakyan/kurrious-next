import { AxiosInstance, AxiosResponse } from 'axios'
import { IResponseBrainList, ITextBrain } from '@/src/types/redux/brain'
import { IAxiosResponseWithMeta } from '@/src/manager/axiosTypes'

const baseURL = '/brain'

const generateBrainManager = (instance: AxiosInstance) => ({
    axiosInstance: instance,

    getBrainList() {
        return instance.get<
            IResponseBrainList,
            AxiosResponse<IResponseBrainList>
        >(`${baseURL}/assets`)
    },
    createFolder(name: string, folderId: string) {
        return instance.post<null, AxiosResponse<null>>(
            `${baseURL}/assets/folder?folderId=${folderId}`,
            { name }
        )
    },
    downloadFile(
        assetId: string,
        responseType: AxiosResponse['request']['responseType'] | undefined
    ) {
        return instance.get<
            BlobPart | string,
            AxiosResponse<BlobPart | string>
        >(`${baseURL}/assets/${assetId}/download-direct`, {
            responseType: responseType,
        })
    },
    createFile(file: FormData, folderId?: string) {
        return instance.post<null, AxiosResponse<IAxiosResponseWithMeta<null>>>(
            `${baseURL}/assets/file${folderId ? '?folderId=' + folderId : ''}`,
            file,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            }
        )
    },
    crawlUrl(url: string, depth: string) {
        return instance.post<null, AxiosResponse<IAxiosResponseWithMeta<null>>>(
            `${baseURL}/assets/url`,
            { url, depth }
        )
    },
    createText(data: ITextBrain, folderId: string) {
        return instance.post<null, AxiosResponse<IAxiosResponseWithMeta<null>>>(
            `${baseURL}/assets/text?folderId=${folderId}`,
            data
        )
    },
    renameFolderOrFile(assetId: string, formData: FormData) {
        return instance.put<null, AxiosResponse<IAxiosResponseWithMeta<null>>>(
            `${baseURL}/assets/${assetId}/rename`,
            formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            }
        )
    },
    searchFolderOrFile(searchString: string) {
        return instance.post<null, AxiosResponse<IAxiosResponseWithMeta<null>>>(
            `${baseURL}/search`,
            searchString && { searchString }
        )
    },
    deleteFolderOrFile(id: string) {
        return instance.delete<
            null,
            AxiosResponse<IAxiosResponseWithMeta<null>>
        >(`${baseURL}/assets/${id}`)
    },
})

export default generateBrainManager
