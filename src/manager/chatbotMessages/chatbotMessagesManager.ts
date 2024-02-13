import { AxiosInstance, AxiosResponse } from 'axios'

const generateChatbotMessagesManager = (instance: AxiosInstance) => ({
    axiosInstance: instance,

    updateFeedback(
        messageId: string,
        feedbackType: 'thumbs_up' | 'thumbs_down'
    ) {
        return instance.patch<null, AxiosResponse<null>>(
            `chatbotMessages/${messageId}/feedback?feedback_type=${feedbackType}`
        )
    },
})

export default generateChatbotMessagesManager
