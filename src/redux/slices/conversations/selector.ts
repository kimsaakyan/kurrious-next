import { createSelector } from '@reduxjs/toolkit'
import { RootState } from '@/src/redux/store'

const selector = (state: RootState) => state.conversations

export const isSmaller = createSelector([selector], (state) => state.isSmaller)
export const topic = createSelector([selector], (state) => state.topic)
export const selectedConversationId = createSelector(
    [selector],
    (state) => state.selectedConversationId
)

export const currentQuestion = createSelector(
    [selector],
    (state) => state.currentQuestion
)

export const conversationsList = createSelector(
    [selector],
    (state) => state.conversationsList
)
export const newCreatedConversation = createSelector(
    [selector],
    (state) => state.newCreatedConversation
)

export const shouldUpdateConversationsList = createSelector(
    [selector],
    (state) => state.shouldConversationsUpdate
)
export const conversationMessages = createSelector(
    [selector],
    (state) => state.conversationMessages
)
export const isConversationMessagesLoading = createSelector(
    [selector],
    (state) => state.loading.conversationMessagesList
)
export const isCreateConversationLoading = createSelector(
    [selector],
    (state) => state.loading.conversationCreate
)

export const isUpdateConversationLoading = createSelector(
    [selector],
    (state) => state.loading.conversationUpdate
)
export const isCreateConversationsListLoading = createSelector(
    [selector],
    (state) => state.loading.conversationsList
)
export const isChatMessagingInProgress = createSelector(
    [selector],
    (state) => state.isChatMessagingInProgress
)

export const conversationMessagesTotalCount = createSelector(
    [selector],
    (state) => state.conversationMessagesTotalCount
)

export const conversationFetchIsLoading = createSelector(
    [selector],
    (state) => state.conversationFetchIsLoading
)
export const isConversationDeleteLoading = createSelector(
    [selector],
    (state) => state.loading.conversationDelete
)
export const activeChat = createSelector(
    [selector],
    (state) => state.activeChat
)

export default {
    isSmaller,
    topic,
    conversationsList,
    shouldUpdateConversationsList,
    newCreatedConversation,
    isCreateConversationLoading,
    isCreateConversationsListLoading,
    conversationMessages,
    isConversationMessagesLoading,
    selectedConversationId,
    isUpdateConversationLoading,
    currentQuestion,
    isChatMessagingInProgress,
    conversationMessagesTotalCount,
    conversationFetchIsLoading,
    isConversationDeleteLoading,
    activeChat,
}
