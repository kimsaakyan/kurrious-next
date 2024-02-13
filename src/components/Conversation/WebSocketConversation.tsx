import WebSocketManager from '@/src/manager/WebSocketManager'
import React from 'react'
import { dispatch } from '@/src/redux/hooks'
import {
    conversationMiddleware,
    conversationSelector,
} from '@/src/redux/slices/conversations'
import { useSelector } from 'react-redux'

const WebSocketConversation = () => {
    const conversationMessages = useSelector(
        conversationSelector.conversationMessages
    )
    const currentQuestion = useSelector(conversationSelector.currentQuestion)

    const onMessageEvent = (event: MessageEvent<any>) => {
        let messageContent = JSON.parse(event.data)
        try {
            if (
                messageContent.delta === undefined &&
                !messageContent.endDelta
            ) {
                if (conversationMessages) {
                    if (messageContent.isButtonResponse) {
                        const updatedMessages = [
                            ...conversationMessages,
                            messageContent,
                        ]
                        dispatch(
                            conversationMiddleware.updateConversationListMessages(
                                updatedMessages
                            )
                        )
                    } else {
                        const updatedMessages = conversationMessages.map(
                            (msg) => {
                                if (
                                    msg.answerType === 'loading' ||
                                    msg.conversationId === 'Typing'
                                ) {
                                    return messageContent
                                }
                                return msg
                            }
                        )
                        dispatch(
                            conversationMiddleware.updateConversationListMessages(
                                updatedMessages
                            )
                        )
                    }
                    dispatch(
                        conversationMiddleware.updateIsChatMessagingInProgress(
                            false
                        )
                    )
                }
                dispatch(conversationMiddleware.updateCurrentQuestionValue(''))
            } else {
                dispatch(
                    conversationMiddleware.updateIsChatMessagingInProgress(true)
                )
                if (conversationMessages) {
                    const updatedMessages = conversationMessages.map((msg) => {
                        if (
                            msg.answerType === 'loading' ||
                            msg.conversationId === 'Typing'
                        ) {
                            return {
                                conversationId: 'Typing',
                                userId: 'Typing',
                                question: currentQuestion.trim(),
                                answer:
                                    msg.answerType === 'loading'
                                        ? messageContent.delta
                                        : msg.answer +
                                          (messageContent.delta || ''),
                                answerType: 'text',
                                timestamp: new Date().toISOString(),
                                feedback: {
                                    thumbs_up: 0,
                                    thumbs_down: 0,
                                },
                                messageId: 'Typing',
                            }
                        }
                        return msg
                    })
                    dispatch(
                        conversationMiddleware.updateConversationListMessages(
                            updatedMessages
                        )
                    )
                }
            }
        } catch (error) {
            messageContent = event.data
        }
    }

    return (
        <WebSocketManager
            url={process.env.NEXT_PUBLIC_SOCKET_URL ?? ''}
            onMessageHandler={onMessageEvent}
        />
    )
}

export default WebSocketConversation
