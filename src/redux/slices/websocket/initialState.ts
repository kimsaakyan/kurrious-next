import { WebsocketStateProps } from '@/src/types/redux/websocket'

export const getInitialState = (): WebsocketStateProps => ({
    websocketInstance: null,
    sendJsonMessage: null,
})
