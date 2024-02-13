import { AxiosInstance } from 'axios'

import {
    IPrompt,
    IPromptCategory,
    IPromptCreateReqBody,
    IPromptDeleteResponse,
} from '@/src/manager/prompt/promptManagerTypes'
import { IAxiosResponse } from '@/src/manager/axiosTypes'

const baseURL = '/prompts'

const generatePromptManager = (instance: AxiosInstance) => ({
    axiosInstance: instance,

    getPromptsCategories() {
        return instance.get<
            IPromptCategory[],
            IAxiosResponse<IPromptCategory[]>
        >(`${baseURL}/categories`)
    },

    getPromptsList() {
        return instance.get<IPrompt[], IAxiosResponse<IPrompt[]>>(
            `${baseURL}/list`
        )
    },

    getCustomPrompts() {
        return instance.get<IPrompt[], IAxiosResponse<IPrompt[]>>(
            `${baseURL}/custom`
        )
    },

    createPrompt(data: IPromptCreateReqBody) {
        return instance.post<IPrompt, IAxiosResponse<IPrompt>>(
            `${baseURL}/custom`,
            data
        )
    },

    updatePrompt(id: string, data: IPromptCreateReqBody) {
        return instance.put<IPrompt, IAxiosResponse<IPrompt>>(
            `${baseURL}/custom/${id}`,
            data
        )
    },

    deletePrompt(id: string) {
        return instance.delete<
            IPromptDeleteResponse,
            IAxiosResponse<IPromptDeleteResponse>
        >(`${baseURL}/custom/${id}`)
    },
})

export default generatePromptManager
