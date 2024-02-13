import { ConversationStateProps } from '@/src/types/redux/conversations'

export const getInitialState = (): ConversationStateProps => ({
    meta: null,
    error: null,
    topic: null,
    isSmaller: false,
    newCreatedConversation: null,
    conversationsList: null,
    conversationMessagesTotalCount: null,
    conversationMessages: null,
    conversationFetchIsLoading: false,
    currentQuestion: '',
    selectedConversationId: '',
    shouldConversationsUpdate: false,
    isChatMessagingInProgress: false,
    activeChat: null,
    loading: {
        conversationCreate: false,
        conversationsList: false,
        conversationMessagesList: false,
        conversationUpdate: false,
        conversationDelete: false,
    },
})
