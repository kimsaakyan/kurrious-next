import { SliceCaseReducers } from '@reduxjs/toolkit/src/createSlice'
import { IAction } from '@/src/redux/store'
import {
    IMessagesConversations,
    IMessagesList,
    IMessagesProps,
} from '@/src/types/redux/messages'
import { ITopic } from '@/src/types/redux/conversations'
import { IToastJenny } from '@/src/types/conversations'

const createReducer = <T extends SliceCaseReducers<IMessagesProps>>(
    reducer: T
) => ({ ...reducer })

const reducers = createReducer({
    setIsLoading(state, action: IAction<boolean>) {
        state.isLoading = action.payload
    },
    setMessagesConversations(state, action: IAction<IMessagesList>) {
        state.messagesConversations = action.payload
    },
    setMessagesConversation(state, action: IAction<IMessagesConversations[]>) {
        state.messagesConversation = action.payload
    },
    setConversationTopic(state, action: IAction<ITopic | null>) {
        state.topic = action.payload
    },
    setMessagesSuggestion(state, action: IAction<IToastJenny>) {
        state.messagesSuggestion = action.payload
    },
    setShowToastJenny(state, action: IAction<boolean>) {
        state.showToastJenny = action.payload
    },
    setShouldExecuteScroll(state, action: IAction<boolean>) {
        state.shouldExecuteScroll = action.payload
    },
})

export default reducers
