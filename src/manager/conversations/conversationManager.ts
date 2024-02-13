import { AxiosInstance, AxiosResponse } from 'axios'

import { IAxiosResponseWithMeta } from '../axiosTypes'
import { IConversation } from '@/src/manager/conversations/conversationManagerTypes'
import { IMessage } from '@/src/types/redux/conversations'

const baseURL = '/conversations'

const generateConversationsManager = (instance: AxiosInstance) => ({
    axiosInstance: instance,

    getConversations(pagination: IPagination, regex = '') {
        return instance.get<
            IConversation[],
            IAxiosResponseWithMeta<IConversation[]>
        >(
            pagination
                ? `${baseURL}?page=${pagination.currentPage}&pageSize=${pagination.pageSize}&regex=${regex}&orderBy=UPDATED_AT_DATE_DESC`
                : `${baseURL}?&regex=${regex}&orderBy=DATE_ASC`
        )
    },
    getConversationMessages(id: string, page: number) {
        return instance.get<IMessage[], IAxiosResponseWithMeta<IMessage[]>>(
            `${baseURL}/${id}?&orderBy=DATE_DESC&page=${page}`
        )
    },
    createConversationTopic(data: INewConversationTopic) {
        return instance.post<IConversation, AxiosResponse<IConversation>>(
            `${baseURL}`,
            data
        )
    },
    deleteConversationTopic(id: string) {
        return instance.delete<null, AxiosResponse<null>>(`${baseURL}/${id}`)
    },
    updateConversationTopic(id: string, data: INewConversationTopic) {
        return instance.put<IConversation, AxiosResponse<IConversation>>(
            `${baseURL}/${id}`,
            data
        )
    },
})

export default generateConversationsManager
