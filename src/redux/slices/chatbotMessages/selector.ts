import { createSelector } from '@reduxjs/toolkit'
import { RootState } from '@/src/redux/store'

const selector = (state: RootState) => state.chatbotMessages

export const isLoadingChatbot = createSelector(
    [selector],
    (state) => state.isLoadingChatbot
)

export default {
    isLoadingChatbot,
}
