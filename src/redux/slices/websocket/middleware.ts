import { AppDispatch } from '@/src/redux/store'
import slice from '@/src/redux/slices/websocket/slice'
import { SendJsonMessage } from 'react-use-websocket/src/lib/types'

const { setWebsocketInstance, setSendJsonMessage } = slice.actions

const updateWebSocketInstance =
    (websocket: WebSocket | null) => async (dispatch: AppDispatch) => {
        try {
            dispatch(setWebsocketInstance(websocket))
        } catch (error) {
            console.error(error)
        }
    }

const sendJsonMessageWrapper =
    (sendJsonMessage: SendJsonMessage | null) =>
    async (dispatch: AppDispatch) => {
        try {
            dispatch(setSendJsonMessage(sendJsonMessage))
        } catch (error) {
            console.error(error)
        }
    }

export default {
    updateWebSocketInstance,
    sendJsonMessageWrapper,
}
