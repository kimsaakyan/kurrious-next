import { IMessagesProps } from '@/src/types/redux/messages'

export const getInitialState = (): IMessagesProps => ({
    isLoading: false,
    messagesConversations: null,
    messagesConversation: [],
    topic: null,
    messagesSuggestion: null,
    showToastJenny: false,
    shouldExecuteScroll: true,
})
