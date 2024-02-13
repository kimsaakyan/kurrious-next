import SendMessage from '@/src/components/v2/AskQuestionSearchBar/SendMessage'
import React, { FormEvent, useEffect, useState } from 'react'
import { dispatch } from '@/src/redux/hooks'
import {
    conversationMiddleware,
    conversationSelector,
} from '@/src/redux/slices/conversations'
import { getDeviceTimeZone } from '@/src/utils/common/DateTime'
import {
    websocketMiddleware,
    websocketSelector,
} from '@/src/redux/slices/websocket'
import { useSelector } from 'react-redux'
import { promptSelector } from '@/src/redux/slices/prompts'
import { useRouter } from 'next/router'
import { ISendMessageConversation } from '@/src/types/conversations'

const SendMessageConversation = ({
    conversationRef,
    threshold,
    setAutoScroll,
}: ISendMessageConversation) => {
    const [questionValue, setQuestionValue] = useState('')
    const route = useRouter()
    const currentPrompt = useSelector(promptSelector.currentPrompt)
    const currentQuestion = useSelector(conversationSelector.currentQuestion)
    const wsInstance = useSelector(websocketSelector.websocketInstance)
    const sendJsonMessage = useSelector(websocketSelector.sendJsonMessage)
    const conversationMessages = useSelector(
        conversationSelector.conversationMessages
    )
    const isConversationMessagesListLoading = useSelector(
        conversationSelector.isConversationMessagesLoading
    )
    const isChatMessagingInProgress = useSelector(
        conversationSelector.isChatMessagingInProgress
    )
    const isConversationFetchLoading = useSelector(
        conversationSelector.conversationFetchIsLoading
    )

    const handleSendMessage = (
        question: string,
        conversationId: string
    ): void => {
        dispatch(conversationMiddleware.updateCurrentQuestionValue(question))

        if (!route.query?.key) {
            const reqBody = {
                title: 'New chat',
                summary: 'New chat summary',
            }
            dispatch(
                conversationMiddleware.createNewConversationWithMessage(
                    reqBody,
                    question,
                    sendJsonMessage
                )
            )
        } else {
            if (wsInstance?.readyState === WebSocket.OPEN) {
                const messageObject = {
                    conversationId: conversationId,
                    text: question,
                }
                if (sendJsonMessage) {
                    sendJsonMessage(messageObject)
                }
            } else {
                dispatch(websocketMiddleware.updateWebSocketInstance(null))
                throw 'WebSocket is not open. Unable to send messages.'
            }
        }
    }

    const onSendMessageSubmit = (
        event: FormEvent<HTMLFormElement> | React.KeyboardEvent
    ): void => {
        event.preventDefault()
        const trimmedValue = currentQuestion.trim()

        if (!trimmedValue) return

        const loadingMessage = {
            conversationId: 'dummyConversationId',
            userId: 'dummyUserId',
            question: trimmedValue,
            answer: 'loading',
            answerType: 'loading',
            timestamp: new Date().toISOString(),
            messageId: 'dummyMessageId',
        }
        const dataBeforeResponse = [
            ...(conversationMessages ?? []),
            loadingMessage,
        ]

        dispatch(
            conversationMiddleware.updateConversationListMessages(
                dataBeforeResponse
            )
        )

        const body = {
            question: trimmedValue,
            userTimezone: getDeviceTimeZone(),
        }
        dispatch(conversationMiddleware.updateIsChatMessagingInProgress(true))
        handleSendMessage(body.question, route?.query?.key as string)
        setQuestionValue('')
        if (conversationRef?.current) {
            const isAtBottom =
                conversationRef.current &&
                conversationRef.current.scrollHeight -
                    conversationRef.current.scrollTop <=
                    conversationRef.current.clientHeight + threshold
            setAutoScroll(isAtBottom)
        }
    }

    useEffect(() => {
        if (currentPrompt?.text) {
            setQuestionValue(currentPrompt?.text)
            dispatch(
                conversationMiddleware.updateCurrentQuestionValue(
                    currentPrompt?.text
                )
            )
        } else {
            setQuestionValue('')
        }
    }, [currentPrompt?.text])

    return (
        <div className="my-2.5">
            <form onSubmit={(event) => onSendMessageSubmit(event)}>
                <SendMessage
                    disabled={
                        isConversationMessagesListLoading ||
                        isChatMessagingInProgress ||
                        isConversationFetchLoading
                    }
                    onSendMessageSubmit={(event: React.KeyboardEvent) =>
                        onSendMessageSubmit(event)
                    }
                    onQuestionUpdate={setQuestionValue}
                    question={questionValue}
                />
            </form>
        </div>
    )
}

export default SendMessageConversation
