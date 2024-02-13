import { IChatbotMessagesProps } from '@/src/types/redux/chatbotMessages'

export const getInitialState = (): IChatbotMessagesProps => ({
    isLoadingChatbot: false,
})
