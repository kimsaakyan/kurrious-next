import React from 'react'
import { useRouter } from 'next/router'
import { dispatch } from '@/src/redux/hooks'
import { cn } from '@/src/lib/utils'
import { useSelector } from 'react-redux'
import ActionPanel from '@/src/components/v2/ConversationTab/ActionPanel'
import TitlePanel from '@/src/components/v2/ConversationTab/TitlePanel'
import { IMessagesConversations } from '@/src/types/redux/messages'
import {
    messagesMiddleware,
    messagesSelector,
} from '@/src/redux/slices/messages'

interface IMessagePanelProps {
    data: IMessagesConversations[]
}
const MessagePanel = ({ data }: IMessagePanelProps): ReactNode => {
    const router = useRouter()
    const topic = useSelector(messagesSelector.topic)
    const onClickListItem = (item: IMessagesConversations): void => {
        router.replace({
            query: { ...router.query, key: item?.driverId },
        })

        dispatch(
            messagesMiddleware.updateMessagesTopic({
                id: item.driverId,
                title: item.sender.name,
            })
        )
        dispatch(messagesMiddleware.getMessagesConversation(item.driverId))
        dispatch(messagesMiddleware.updateShouldExecuteScroll(true))
    }

    return (
        <div>
            {data && data?.length
                ? data.map((item) => (
                      <div
                          className="group-text-container group cursor-pointer border-b border-b-gray-300"
                          onClick={() => onClickListItem(item)}
                          key={item.driverId}
                      >
                          <div
                              className={cn(
                                  'flex items-center px-3 py-4 hover:bg-azure-small',
                                  topic?.id === item.driverId &&
                                      'bg-azure-light hover:bg-azure-light'
                              )}
                          >
                              <TitlePanel
                                  title={item.sender.name}
                                  activeChat={topic?.id}
                                  index={item.driverId}
                                  text={item.text}
                              />
                              <ActionPanel createdAt={item.createdAt} />
                          </div>
                      </div>
                  ))
                : null}
        </div>
    )
}

export default MessagePanel
