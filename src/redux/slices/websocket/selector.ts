import { createSelector } from '@reduxjs/toolkit'
import { RootState } from '@/src/redux/store'

const selector = (state: RootState) => state.websocket

export const websocketInstance = createSelector(
    [selector],
    (state) => state.websocketInstance
)
export const sendJsonMessage = createSelector(
    [selector],
    (state) => state.sendJsonMessage
)

export default {
    websocketInstance,
    sendJsonMessage,
}
