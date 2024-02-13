import { createSelector } from '@reduxjs/toolkit'
import { RootState } from '@/src/redux/store'

const selector = (state: RootState) => state.messages

export const isLoadingMessages = createSelector(
    [selector],
    (state) => state.isLoading
)

export const messagesConversations = createSelector(
    [selector],
    (state) => state.messagesConversations
)

export const messagesConversation = createSelector(
    [selector],
    (state) => state.messagesConversation
)
export const messagesSuggestion = createSelector(
    [selector],
    (state) => state.messagesSuggestion
)

export const showToastJenny = createSelector(
    [selector],
    (state) => state.showToastJenny
)

export const shouldExecuteScroll = createSelector(
    [selector],
    (state) => state.shouldExecuteScroll
)

export const topic = createSelector([selector], (state) => state.topic)

export default {
    isLoadingMessages,
    messagesConversations,
    messagesConversation,
    topic,
    messagesSuggestion,
    showToastJenny,
    shouldExecuteScroll,
}
