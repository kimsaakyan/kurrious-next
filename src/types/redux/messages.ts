import { ITopic } from '@/src/types/redux/conversations'
import { IToastJenny } from '@/src/types/conversations'

export interface IMessagesProps {
    isLoading: boolean
    messagesConversations: IMessagesList | null
    topic: ITopic | null
    messagesConversation: IMessagesConversations[]
    messagesSuggestion: IToastJenny | null
    showToastJenny: boolean
    shouldExecuteScroll: boolean
}

export interface IMessagesList {
    data: IMessagesConversations[]
}

export interface IMessagesConversations {
    _id?: string
    companyId?: string
    driverId?: string
    text: string
    sentAt?: string
    createdAt: string
    samsaraIsRead?: boolean
    isRead?: boolean
    sender: {
        type: string
        name: string
    }
}
