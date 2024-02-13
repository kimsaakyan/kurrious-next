import React from 'react'
import { useRouter } from 'next/router'
import {
    conversationMiddleware,
    conversationSelector,
} from '@/src/redux/slices/conversations'
import { dispatch } from '@/src/redux/hooks'
import { cn } from '@/src/lib/utils'
import { viewsMiddleware } from '@/src/redux/slices/views'
import { ModalName } from '@/src/types/modals'
import { useSelector } from 'react-redux'
import TitlePanel from '@/src/components/v2/ConversationTab/TitlePanel'
import ActionPanel from '@/src/components/v2/ConversationTab/ActionPanel'

interface IConversationPanelProps {
    data: IConversation[]
}
const ConversationPanel = ({ data }: IConversationPanelProps): ReactNode => {
    const router = useRouter()
    const activeChat = useSelector(conversationSelector.activeChat)
    const isChatMessagingInProgress = useSelector(
        conversationSelector.isChatMessagingInProgress
    )
    const onClickListItem = (item: IConversation, index: number): void => {
        router.replace({
            query: { ...router.query, key: item?.conversationId },
        })

        dispatch(conversationMiddleware.updateActiveChat(index))
        dispatch(
            conversationMiddleware.updateConversationTopic({
                id: item.conversationId,
                title: item.title,
            })
        )
        dispatch(
            conversationMiddleware.updateSelectedConversationId(
                item.conversationId
            )
        )
    }

    const onClickDeleteItem = (conversationId: string) => {
        dispatch(
            viewsMiddleware.openModal({
                name: ModalName.DeleteConversationModal,
                props: { conversationId },
            })
        )
    }

    return (
        <div>
            {data?.length > 0
                ? data.map((item: IConversation, index: number) => (
                      <div
                          className="group-text-container group cursor-pointer border-b border-b-gray-300"
                          onClick={() => onClickListItem(item, index)}
                          key={item.conversationId}
                      >
                          <div
                              className={cn(
                                  'flex items-center px-3 py-4 hover:bg-azure-small',
                                  activeChat === index &&
                                      'bg-azure-light hover:bg-azure-light'
                              )}
                          >
                              <TitlePanel
                                  title={item.title}
                                  activeChat={activeChat}
                                  index={index}
                                  image={item?.image}
                              />
                              <div className="flex w-26 justify-end">
                                  <div className="flex items-center">
                                      <ActionPanel
                                          onClick={() =>
                                              onClickDeleteItem(
                                                  item.conversationId
                                              )
                                          }
                                          disabled={isChatMessagingInProgress}
                                          createdAt={item.createdAt}
                                      />
                                      {/*TODO: Clarify why we need message count button*/}
                                      {/*<div className="mt-4">*/}
                                      {/*    <div className="flex justify-center">*/}
                                      {/*        <Button*/}
                                      {/*            className="rounded-full border-none bg-primary text-xs"*/}
                                      {/*            size="sm"*/}
                                      {/*        >*/}
                                      {/*            1*/}
                                      {/*        </Button>*/}
                                      {/*    </div>*/}
                                      {/*</div>*/}
                                  </div>
                              </div>
                          </div>
                      </div>
                  ))
                : null}
        </div>
    )
}

export default ConversationPanel
