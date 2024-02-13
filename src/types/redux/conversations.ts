export interface ITopic {
    id: string | undefined
    title: string
}

export interface IConversationList {
    data: IConversation[]
    meta: IMeta
}

export interface IMessage {
    messageId: string
    conversationId: string
    userId: string
    imageUrl?: string
    question: string
    answer: string
    data?: any
    answerType: string
    reference_docs?: IReferenceDocs[]
    timestamp: string
}

export interface IReferenceDocs {
    content: string
    id: string
    source: string
    tokens: number
}

export interface IGetQuestion {
    timestamp: string
    question: string
    firstName: string | undefined
}

export interface ConversationStateProps {
    meta: IMeta | null
    newCreatedConversation: IConversation | null
    conversationFetchIsLoading: boolean
    shouldConversationsUpdate: boolean
    conversationsList: IConversationList | null
    conversationMessages: IMessage[] | null
    selectedConversationId: string
    conversationMessagesTotalCount: number | null
    currentQuestion: string
    isChatMessagingInProgress: boolean
    activeChat: number | null
    loading: {
        conversationCreate: boolean
        conversationsList: boolean
        conversationMessagesList: boolean
        conversationUpdate: boolean
        conversationDelete: boolean
    }
    error: string | null
    topic: ITopic | null
    isSmaller: boolean
}

export interface IDeleteConversationTopicModalProps {
    conversationId: string
}
