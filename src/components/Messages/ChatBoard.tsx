import React, { useEffect, useRef } from 'react'
import getQuestion from '@/src/components/ChatBoard/getQuestion'
import { useSelector } from 'react-redux'
import {
    messagesMiddleware,
    messagesSelector,
} from '@/src/redux/slices/messages'
import { SenderType } from '@/src/enums'
import ResponseSection from '@/src/components/v2/ResponseSection/ResponseSection'
import { dispatch } from '@/src/redux/hooks'
import moment from 'moment'
import { IChatBoardMessage } from '@/src/types/conversations'
import { authSelector } from '@/src/redux/slices/auth'

const ChatBoard = ({ messagesRef }: IChatBoardMessage) => {
    const messagesConversation = useSelector(
        messagesSelector.messagesConversation
    )
    const showToastJenny = useSelector(messagesSelector.showToastJenny)
    const currentUser = useSelector(authSelector.currentUser)
    const shouldExecuteScroll = useSelector(
        messagesSelector.shouldExecuteScroll
    )
    const lastMessageRef = useRef<HTMLUListElement>(null)
    const topic = useSelector(messagesSelector.topic)

    const executeScroll = (): void => {
        lastMessageRef.current?.scrollIntoView({
            block: 'end',
        })
    }

    useEffect(() => {
        if (messagesRef?.current && shouldExecuteScroll) {
            executeScroll()
            dispatch(messagesMiddleware.updateShouldExecuteScroll(false))
        }
    }, [messagesConversation, shouldExecuteScroll])

    useEffect(() => {
        if (
            messagesConversation &&
            messagesConversation[messagesConversation.length - 1].sender
                .type === SenderType.DRIVER &&
            topic?.id
        ) {
            dispatch(messagesMiddleware.getSuggestion(topic.id))
        } else {
            dispatch(messagesMiddleware.updateShowToastJenny(false))
        }
    }, [messagesConversation])

    useEffect(() => {
        if (!showToastJenny) {
            executeScroll()
        }
    }, [showToastJenny])

    return (
        <ul className="divide-y" ref={lastMessageRef}>
            {messagesConversation?.length &&
                messagesConversation?.map((item, index) => (
                    <li
                        key={index}
                        className="flex justify-between gap-x-3 py-3"
                    >
                        <div key={index} className="w-full">
                            {item?.sender?.type === SenderType.DISPATCH ? (
                                getQuestion({
                                    timestamp: item.createdAt,
                                    question: item.text,
                                    firstName: currentUser?.firstName,
                                })
                            ) : (
                                <ResponseSection
                                    desc={item.text}
                                    name={item.sender.name}
                                    avatarUrl=""
                                    timeStamp={moment(item.createdAt).format(
                                        'LT'
                                    )}
                                />
                            )}
                        </div>
                    </li>
                ))}
        </ul>
    )
}

export default ChatBoard
