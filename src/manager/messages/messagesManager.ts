import { AxiosInstance } from 'axios'
import { IMessagesConversations } from '@/src/types/redux/messages'
import { IAxiosResponseWithMeta } from '@/src/manager/axiosTypes'

const generateMessagesManager = (instance: AxiosInstance) => ({
    axiosInstance: instance,

    getMessagesConversations() {
        return instance.get<
            IMessagesConversations,
            IAxiosResponseWithMeta<IMessagesConversations>
        >(`messages/conversations`)
    },
    getMessagesConversation(driverId: string | undefined) {
        return instance.get<
            IMessagesConversations,
            IAxiosResponseWithMeta<IMessagesConversations>
        >(`messages/conversations/${driverId}`)
    },
    createMessagesConversation(
        driverId: string | undefined,
        text: string | undefined
    ) {
        return instance.post<
            IMessagesConversations,
            IAxiosResponseWithMeta<IMessagesConversations>
        >(`messages/conversations/${driverId}`, { text })
    },
    getSuggestion(driverId: string | undefined) {
        return instance.get<
            IMessagesConversations,
            IAxiosResponseWithMeta<IMessagesConversations>
        >(`messages/brain/suggestion/${driverId}`)
    },
})

export default generateMessagesManager
