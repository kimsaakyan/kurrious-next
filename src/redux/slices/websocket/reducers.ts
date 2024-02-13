import { SliceCaseReducers } from '@reduxjs/toolkit/src/createSlice'
import { IAction } from '@/src/redux/store'
import { WebsocketStateProps } from '@/src/types/redux/websocket'
import { SendJsonMessage } from 'react-use-websocket/src/lib/types'

const createReducer = <T extends SliceCaseReducers<WebsocketStateProps>>(
    reducer: T
) => ({ ...reducer })

const reducers = createReducer({
    setWebsocketInstance(state, action: IAction<WebSocket | null>) {
        state.websocketInstance = action.payload
    },
    setSendJsonMessage(state, action: IAction<SendJsonMessage | null>) {
        state.sendJsonMessage = action.payload
    },
})

export default reducers
