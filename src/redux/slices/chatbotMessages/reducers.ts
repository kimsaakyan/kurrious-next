import { SliceCaseReducers } from '@reduxjs/toolkit/src/createSlice'
import { IChatbotMessagesProps } from '@/src/types/redux/chatbotMessages'
import { IAction } from '@/src/redux/store'

const createReducer = <T extends SliceCaseReducers<IChatbotMessagesProps>>(
    reducer: T
) => ({ ...reducer })

const reducers = createReducer({
    setIsLoadingChatbot(state, action: IAction<boolean>) {
        state.isLoadingChatbot = action.payload
    },
})

export default reducers
