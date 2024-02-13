import { SendJsonMessage } from 'react-use-websocket/src/lib/types'

export interface WebsocketStateProps {
    websocketInstance: WebSocket | null
    sendJsonMessage: SendJsonMessage | null
}
