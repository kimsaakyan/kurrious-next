import React, { useEffect, useState } from 'react'
import { useDebounce } from '@/src/utils/hooks/useDebounce'
import Loader from '@/src/components/Loader/Loader'
import ConversationsHeader from '@/src/components/v2/ConversationsHeader/ConversationsHeader'
import SearchConversationBar from '@/src/components/v2/SearchConversationBar/SearchConversationBar'
import InfiniteScroll from 'react-infinite-scroll-component'
import ConversationPanel from '@/src/components/v2/ConversationTab/ConversationPanel'
import DividerWithText from '@/src/components/v2/Divider/DividerWithText'
import { dispatch } from '@/src/redux/hooks'
import {
    conversationMiddleware,
    conversationSelector,
} from '@/src/redux/slices/conversations'
import { useSelector } from 'react-redux'
import { cn } from '@/src/lib/utils'
import { promptMiddleware } from '@/src/redux/slices/prompts'
import { Button } from '@/src/components/ui/button'
import { PlusIcon } from 'lucide-react'

const ChatSidebar = ({ open }: { open: boolean }): ReactNode => {
    const isCreateConversationsListLoading = useSelector(
        conversationSelector.isCreateConversationsListLoading
    )
    const isChatMessagingInProgress = useSelector(
        conversationSelector.isChatMessagingInProgress
    )
    const conversationsList = useSelector(
        conversationSelector.conversationsList
    )
    const shouldUpdateConversationsList = useSelector(
        conversationSelector.shouldUpdateConversationsList
    )
    const activeChat = useSelector(conversationSelector.activeChat)
    const [pagination, setPagination] = useState<IPagination>({
        currentPage: 1,
        pageSize: 20,
    })
    const [searchText, setSearchText] = useState<string | null>(null)
    const debouncedSearchTerm = useDebounce(searchText, 200)

    const onNewConversationClick = () => {
        dispatch(
            conversationMiddleware.createNewConversation({
                title: 'New Chat',
            })
        )
    }

    const loadMore = (): ReactNode => {
        setPagination({
            ...pagination,
            currentPage: pagination.currentPage + 1,
        })
    }

    useEffect(() => {
        dispatch(promptMiddleware.clearSelectedPrompt())
    }, [activeChat])

    useEffect(() => {
        dispatch(conversationMiddleware.getConversations(pagination, ''))
    }, [])

    useEffect(() => {
        if (pagination.currentPage > 1) {
            dispatch(conversationMiddleware.fetchConversations(pagination, ''))
        }
    }, [pagination.currentPage, shouldUpdateConversationsList])

    useEffect(() => {
        if (debouncedSearchTerm !== null) {
            dispatch(
                conversationMiddleware.getConversations(
                    { ...pagination, currentPage: 1 },
                    debouncedSearchTerm
                )
            )
        }
    }, [debouncedSearchTerm])

    return (
        <div
            className={cn('flex h-full w-[350px] flex-col', [
                open && 'flex-0 w-0 overflow-hidden',
            ])}
        >
            <div className="h-full flex-1 overflow-hidden border-r border-r-gray-300 bg-azure-thin">
                <ConversationsHeader />
                <div className="px-4 py-3">
                    <div className="mb-3">
                        <SearchConversationBar
                            onSearch={(event) =>
                                setSearchText(event.target.value)
                            }
                        />
                    </div>
                    <Button
                        variant="outline"
                        size="full"
                        disabled={isChatMessagingInProgress}
                        className="flex justify-start border-gray-bright text-black"
                        onClick={onNewConversationClick}
                    >
                        <PlusIcon width={15} height={15} />
                        <div className="ml-2 text-s">New Chat</div>
                    </Button>
                </div>

                <div
                    id="sidebar-scroll"
                    className="mb-12 h-[calc(100%-130px)] w-full overflow-y-auto"
                >
                    {conversationsList?.data?.length ? (
                        <InfiniteScroll
                            dataLength={conversationsList?.data?.length}
                            next={loadMore}
                            hasMore={
                                conversationsList?.data?.length <
                                conversationsList?.meta?.totalCount
                            }
                            loader={false}
                            scrollableTarget="sidebar-scroll"
                            endMessage={
                                <div className="my-4">
                                    <DividerWithText
                                        text={'It is all, nothing more 🤐'}
                                    />
                                </div>
                            }
                            className="!overflow-hidden"
                        >
                            <ConversationPanel data={conversationsList?.data} />
                            {isCreateConversationsListLoading ? (
                                <Loader />
                            ) : null}
                        </InfiniteScroll>
                    ) : null}
                </div>
            </div>
        </div>
    )
}

export default ChatSidebar
