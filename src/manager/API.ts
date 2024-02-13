import { AxiosInstance } from 'axios'

import { Axios } from './axiosInstance'
import generateConversationsManager from '@/src/manager/conversations/conversationManager'
import generatePromptManager from '@/src/manager/prompt/promptManager'
import generateAuthManager from '@/src/manager/auth/authManager'
import generateCompaniesManager from '@/src/manager/companies/companiesManager'
import generateIntegrationsManager from '@/src/manager/integrations/integrationsManager'
import generateBrainManager from '@/src/manager/brain/brainManager'
import generateUsersManager from '@/src/manager/users/usersManager'
import generateChatbotMessagesManager from '@/src/manager/chatbotMessages/chatbotMessagesManager'
import generateMessagesManager from '@/src/manager/messages/messagesManager'

const axiosInstance = Axios()

const createAPI = (requestManager: AxiosInstance) => ({
    auth: generateAuthManager(requestManager),
    users: generateUsersManager(requestManager),
    conversations: generateConversationsManager(requestManager),
    prompt: generatePromptManager(requestManager),
    companies: generateCompaniesManager(requestManager),
    integrations: generateIntegrationsManager(requestManager),
    brain: generateBrainManager(requestManager),
    chatbotMessages: generateChatbotMessagesManager(requestManager),
    messages: generateMessagesManager(requestManager),
})

const API = createAPI(axiosInstance)

export const updateManagersBaseUrls = (baseURL: string) => {
    Object.keys(API).forEach((key) => {
        console.log((API as IApi)[key].axiosInstance.defaults.baseURL)
        ;(API as IApi)[key].axiosInstance.defaults.baseURL = baseURL
    })
}

interface IApi {
    [key: string]: IRequestManager
}
interface IRequestManager {
    axiosInstance: AxiosInstance
}

export default API
