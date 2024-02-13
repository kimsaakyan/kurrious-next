import { SliceCaseReducers } from '@reduxjs/toolkit/src/createSlice'
import { IAction } from '@/src/redux/store'
import {
    ConversationStateProps,
    IConversationList,
    IMessage,
    ITopic,
} from '@/src/types/redux/conversations'

const createReducer = <T extends SliceCaseReducers<ConversationStateProps>>(
    reducer: T
) => ({ ...reducer })

const reducers = createReducer({
    setConversationTopic(state, action: IAction<ITopic>) {
        state.topic = action.payload
    },
    setIsSmaller: (state, action: IAction<boolean>) => {
        state.isSmaller = action.payload
    },
    setCreateConversationLoading: (state, action: IAction<boolean>) => {
        state.loading.conversationCreate = action.payload
    },
    setDeleteConversationLoading: (state, action: IAction<boolean>) => {
        state.loading.conversationDelete = action.payload
    },
    setUpdateConversationLoading: (state, action: IAction<boolean>) => {
        state.loading.conversationUpdate = action.payload
    },
    setCreateConversationsListLoading: (state, action: IAction<boolean>) => {
        state.loading.conversationsList = action.payload
    },
    setNewCreatedConversation(state, action: IAction<IConversation>) {
        state.newCreatedConversation = action.payload
    },
    setConversationsList(state, action: IAction<IConversationList>) {
        state.conversationsList = action.payload
    },
    setConversationMessages(state, action: IAction<IMessage[] | null>) {
        state.conversationMessages = action.payload
    },
    setConversationMessagesListLoading(state, action: IAction<boolean>) {
        state.loading.conversationMessagesList = action.payload
    },
    setSelectedConversationId(state, action: IAction<string>) {
        state.selectedConversationId = action.payload
    },
    setCurrentQuestion(state, action: IAction<string>) {
        state.currentQuestion = action.payload
    },
    setIsChatMessagingInProgress(state, action: IAction<boolean>) {
        state.isChatMessagingInProgress = action.payload
    },
    setConversationMessagesTotalCount(state, action: IAction<number>) {
        state.conversationMessagesTotalCount = action.payload
    },
    setConversationFetchIsLoading(state, action: IAction<boolean>) {
        state.conversationFetchIsLoading = action.payload
    },
    setActiveChat(state, action: IAction<number | null>) {
        state.activeChat = action.payload
    },
})

export default reducers
