import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import {
    conversationMiddleware,
    conversationSelector,
} from '@/src/redux/slices/conversations'
import Loader from '@/src/components/Loader/Loader'
import NoData from '@/src/components/v2/NoData/NoData'
import { dispatch } from '@/src/redux/hooks'
import dynamic from 'next/dynamic'
import WebSocketConversation from '@/src/components/Conversation/WebSocketConversation'
import SendMessageConversation from '@/src/components/Conversation/SendMessageConversation'
import StopGeneratingConversation from '@/src/components/Conversation/StopGeneratingConversation'
import QuestionsHeaderConversation from '@/src/components/Conversation/QuestionsHeaderConversation'
import ChatBoardConversation from '@/src/components/Conversation/ChatBoardConversation'

const ConversationContent = (): ReactNode => {
    const route = useRouter()
    const conversationRef = useRef<HTMLDivElement | null>(null)
    const [autoScroll, setAutoScroll] = useState(true)
    const threshold = 40

    const isChatMessagingInProgress = useSelector(
        conversationSelector.isChatMessagingInProgress
    )
    const isConversationFetchLoading = useSelector(
        conversationSelector.conversationFetchIsLoading
    )
    const selectedConversationId = useSelector(
        conversationSelector.selectedConversationId
    )

    const conversationMessages = useSelector(
        conversationSelector.conversationMessages
    )
    const isConversationMessagesListLoading = useSelector(
        conversationSelector.isConversationMessagesLoading
    )

    useEffect(() => {
        if (selectedConversationId) {
            dispatch(
                conversationMiddleware.getConversationMessages(
                    selectedConversationId,
                    1
                )
            )
        }
    }, [selectedConversationId])

    useEffect(() => {
        const handleRouteChange = () => {
            if (
                isChatMessagingInProgress &&
                isConversationMessagesListLoading
            ) {
                console.log(
                    'WebSocketManager component is unmounting when change the Chat',
                    isChatMessagingInProgress
                )
            }
        }

        route.events.on('routeChangeStart', handleRouteChange)

        return () => {
            route.events.off('routeChangeStart', handleRouteChange)
        }
    }, [isConversationFetchLoading, isConversationMessagesListLoading])

    useEffect(() => {
        return () => {
            if (isChatMessagingInProgress) {
                console.log(
                    'WebSocketManager component is unmounting When change the page',
                    isChatMessagingInProgress
                )
            }
        }
    }, [isChatMessagingInProgress])

    return (
        <>
            <WebSocketConversation />
            <div className="relative flex h-full flex-col">
                <QuestionsHeaderConversation />
                {isConversationMessagesListLoading ? (
                    <div className="flex h-full items-center justify-center">
                        <Loader />
                    </div>
                ) : null}
                {conversationMessages &&
                conversationMessages.length === 0 &&
                !isConversationMessagesListLoading &&
                selectedConversationId ? (
                    <div className="flex h-full items-center justify-center">
                        <NoData />
                    </div>
                ) : null}
                <ChatBoardConversation
                    autoScroll={autoScroll}
                    conversationRef={conversationRef}
                    selectedConversationId={selectedConversationId}
                    conversationMessages={conversationMessages}
                    threshold={threshold}
                    setAutoScroll={setAutoScroll}
                />
                {isChatMessagingInProgress ? (
                    <StopGeneratingConversation />
                ) : null}
                <SendMessageConversation
                    conversationRef={conversationRef}
                    threshold={threshold}
                    setAutoScroll={setAutoScroll}
                />
            </div>
        </>
    )
}

export default dynamic(() => Promise.resolve(ConversationContent), {
    ssr: false,
})
