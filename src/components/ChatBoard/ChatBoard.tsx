import React, { useEffect, useRef, useMemo, useState } from 'react'
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'
import {
    conversationMiddleware,
    conversationSelector,
} from '@/src/redux/slices/conversations'
import { websocketSelector } from '@/src/redux/slices/websocket'
import { dispatch } from '@/src/redux/hooks'
import Loader from '@/src/components/Loader/Loader'
import { IChatBoard } from '@/src/types/conversations'
import getAnswer from '@/src/components/ChatBoard/getAnswer'
import getQuestion from '@/src/components/ChatBoard/getQuestion'
import { authSelector } from '@/src/redux/slices/auth'

const ChatBoard = ({
    conversationRef,
    setAutoScroll,
    threshold,
    autoScroll,
}: IChatBoard) => {
    const lastMessageRef = useRef<HTMLUListElement>(null)
    const [atTop, setAtTop] = useState(false)
    const [currentPage, setCurrentPage] = useState(1)
    const [executedScroll, setExecutedScroll] = useState(false)
    const previousScrollHeight = useRef<number | null>(null)
    const conversationMessages = useSelector(
        conversationSelector.conversationMessages
    )
    const currentUser = useSelector(authSelector.currentUser)
    const isChatMessagingInProgress = useSelector(
        conversationSelector.isChatMessagingInProgress
    )
    const conversationFetchIsLoading = useSelector(
        conversationSelector.conversationFetchIsLoading
    )
    const conversationMessagesTotalCount = useSelector(
        conversationSelector.conversationMessagesTotalCount
    )
    const selectedConversationId = useSelector(
        conversationSelector.selectedConversationId
    )
    const sendJsonMessage = useSelector(websocketSelector.sendJsonMessage)

    const executeScroll = (): void => {
        lastMessageRef.current?.scrollIntoView({
            block: 'end',
        })
        setExecutedScroll(true)
    }

    const route = useRouter()

    const fetchMoreDataConversationMessages = () => {
        setCurrentPage(currentPage + 1)
        dispatch(
            conversationMiddleware.getConversationMessages(
                selectedConversationId,
                currentPage + 1,
                conversationMessages
            )
        )
    }

    const handleScroll = () => {
        if (!conversationRef?.current) return
        const targetElement = conversationRef?.current
        const isAtTop = targetElement.scrollTop === 0
        setAtTop(isAtTop)
    }

    useEffect(() => {
        handleScroll()

        if (conversationRef?.current) {
            conversationRef?.current.addEventListener('scroll', handleScroll)
        }

        return () => {
            if (conversationRef?.current) {
                conversationRef?.current.removeEventListener(
                    'scroll',
                    handleScroll
                )
            }
        }
    }, [conversationRef])

    useEffect(() => {
        if (conversationRef?.current) {
            const isAtBottom =
                conversationRef.current &&
                conversationRef.current.scrollHeight -
                    conversationRef.current.scrollTop <=
                    conversationRef.current.clientHeight + threshold

            if (
                conversationMessages &&
                conversationMessages?.length > 0 &&
                (autoScroll || isAtBottom)
            ) {
                setAutoScroll(false)
                executeScroll()
                setCurrentPage(1)
            }
        }
    }, [conversationMessages])

    useEffect(() => {
        lastMessageRef.current?.scrollIntoView({
            block: 'end',
        })
    }, [conversationMessagesTotalCount])

    useEffect(() => {
        if (
            atTop &&
            conversationMessages &&
            conversationMessagesTotalCount &&
            conversationMessagesTotalCount > conversationMessages.length &&
            !isChatMessagingInProgress
        ) {
            fetchMoreDataConversationMessages()
        }
    }, [atTop])

    useEffect(() => {
        if (previousScrollHeight.current !== null && atTop && executedScroll) {
            const diffScrollHeight =
                conversationRef.current!.scrollHeight -
                previousScrollHeight.current
            conversationRef.current!.scrollTop = diffScrollHeight
        }

        previousScrollHeight.current = conversationRef.current!.scrollHeight
    }, [conversationMessages])

    return (
        <>
            {conversationFetchIsLoading && <Loader />}
            {useMemo(() => {
                return (
                    <>
                        <ul className="divide-y" ref={lastMessageRef}>
                            {conversationMessages &&
                                conversationMessages.length > 0 &&
                                conversationMessages?.map((item, index) => (
                                    <li
                                        key={index}
                                        className="flex justify-between gap-x-3 py-3"
                                    >
                                        <div key={index} className="w-full">
                                            {item.question &&
                                                getQuestion({
                                                    timestamp: item?.timestamp,
                                                    question: item?.question,
                                                    firstName:
                                                        currentUser?.firstName,
                                                })}
                                            {getAnswer(
                                                item,
                                                index,
                                                route,
                                                sendJsonMessage,
                                                conversationMessages,
                                                isChatMessagingInProgress
                                            )}
                                        </div>
                                    </li>
                                ))}
                        </ul>
                    </>
                )
            }, [conversationMessages])}
        </>
    )
}

export default ChatBoard
