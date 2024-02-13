import React, { useEffect } from 'react'
import { dispatch } from '@/src/redux/hooks'
import {
    messagesMiddleware,
    messagesSelector,
} from '@/src/redux/slices/messages'
import { cn } from '@/src/lib/utils'
import ConversationsHeader from '@/src/components/v2/ConversationsHeader/ConversationsHeader'
import InfiniteScroll from 'react-infinite-scroll-component'
import { useSelector } from 'react-redux'
import MessagePanel from '@/src/components/v2/ConversationTab/MessagePanel'
import { useRouter } from 'next/router'

const MessagesSidebar = ({ open }: { open: boolean }): ReactNode => {
    const router = useRouter()
    const messagesConversations = useSelector(
        messagesSelector.messagesConversations
    )
    const topic = useSelector(messagesSelector.topic)

    const loadMore = (): ReactNode => {
        // TODO: Wait backend
    }

    useEffect(() => {
        dispatch(messagesMiddleware.getMessagesConversations())
        dispatch(messagesMiddleware.updateMessagesConversation([]))
        dispatch(messagesMiddleware.updateMessagesTopic(null))
    }, [])

    useEffect(() => {
        const timeoutId = setInterval(() => {
            dispatch(
                messagesMiddleware.getIntervalMessagesConversations(
                    router?.query?.key as string,
                    topic
                )
            )
        }, 15000)

        return () => clearInterval(timeoutId)
    }, [topic, router])

    return (
        <div
            className={cn('flex h-full w-[350px] flex-col', [
                open && 'flex-0 w-0 overflow-hidden',
            ])}
        >
            <div className="h-full flex-1 overflow-hidden border-r border-r-gray-300 bg-azure-thin">
                <ConversationsHeader />
                <div
                    id="sidebar-scroll"
                    className="mb-12 h-[calc(100%-130px)] w-full overflow-y-auto"
                >
                    {messagesConversations?.data.length ? (
                        <InfiniteScroll
                            next={loadMore}
                            dataLength={messagesConversations?.data.length}
                            loader={false}
                            scrollableTarget="sidebar-scroll"
                            className="!overflow-hidden"
                            hasMore={false}
                        >
                            <MessagePanel data={messagesConversations?.data} />
                        </InfiniteScroll>
                    ) : null}
                </div>
            </div>
        </div>
    )
}

export default MessagesSidebar
