import useWebSocket from 'react-use-websocket'
import { getAccessToken } from '@/src/utils/auth/authUtils'
import { dispatch } from '@/src/redux/hooks'
import { websocketMiddleware } from '@/src/redux/slices/websocket'
// import { viewsMiddleware } from '@/src/redux/slices/views'
// import { SeveritiesType } from '@/src/enums'

// let tm: NodeJS.Timeout
//
// const startPingPong = (send: SendMessage) => {
//     return setInterval(() => {
//         send('ping')
//         tm = setTimeout(() => {
//             dispatch(
//                 viewsMiddleware.setToastNotificationPopUpState({
//                     open: true,
//                     props: {
//                         severityType: SeveritiesType.info,
//                     },
//                 })
//             )
//         }, 2000)
//     }, 10000)
// }
//
// const pong = (pingTimeout: NodeJS.Timeout) => {
//     dispatch(
//         viewsMiddleware.setToastNotificationPopUpState({
//             open: false,
//             props: {},
//         })
//     )
//     clearTimeout(pingTimeout)
// }

const WebSocketManager = ({
    url,
    onMessageHandler,
}: {
    url: string
    onMessageHandler: (event: MessageEvent<unknown>) => void
}) => {
    const { sendJsonMessage, getWebSocket } = useWebSocket(url, {
        share: true,
        shouldReconnect: () => true,
        onOpen: () => {
            sendJsonMessage({ token: getAccessToken() })
            dispatch(
                websocketMiddleware.updateWebSocketInstance(
                    getWebSocket() as WebSocket
                )
            )
            dispatch(
                websocketMiddleware.sendJsonMessageWrapper(sendJsonMessage)
            )
            //TODO: Commenting this because of demo

            // const pingIntervalRef = startPingPong(sendMessage)
            //
            // return () => clearInterval(pingIntervalRef)
        },
        onMessage: (event) => {
            if (!event?.data) {
                return
            }
            if (event?.data === 'pong') {
                //TODO: Commenting this because of demo
                // pong(tm)
                return
            }

            onMessageHandler(event)
        },
        onClose: () => {
            websocketMiddleware.updateWebSocketInstance(null)
            websocketMiddleware.sendJsonMessageWrapper(null)
        },
        onError: () => {
            websocketMiddleware.updateWebSocketInstance(null)
            websocketMiddleware.sendJsonMessageWrapper(null)
        },
    })

    return null
}

export default WebSocketManager
