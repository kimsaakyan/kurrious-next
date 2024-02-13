import React from 'react'
import { Textarea } from '@/src/components/ui/textarea'
import SendIcon from '@/src/components/Icons/SendIcon'
import BrowsePromptsIcon from '@/src/components/Icons/BrowsePromptsIcon'
import { dispatch } from '@/src/redux/hooks'
import { viewsMiddleware } from '@/src/redux/slices/views/index'
import { ModalName } from '@/src/types/modals'
import {
    conversationMiddleware,
    conversationSelector,
} from '@/src/redux/slices/conversations'
import { Button } from '@/src/components/ui/button'
import { useSelector } from 'react-redux'
import { itemsMenuBar } from '@/src/data/itemsMenuBarData'
import { useRouter } from 'next/router'

interface ISendMessageProps {
    disabled?: boolean
    inputValue?: string
    onSendMessageSubmit: (event: React.KeyboardEvent) => void
    onQuestionUpdate: (question: string) => void
    question: string
}
const SendMessage = ({
    disabled,
    onSendMessageSubmit,
    onQuestionUpdate,
    question,
}: ISendMessageProps): ReactNode => {
    const route = useRouter()
    const isChatMessagingInProgress = useSelector(
        conversationSelector.isChatMessagingInProgress
    )
    const isConversationMessagesListLoading = useSelector(
        conversationSelector.isConversationMessagesLoading
    )

    const onBrowsePromptsClick = () => {
        dispatch(
            viewsMiddleware.openModal({
                name: ModalName.BrowsePromptsModal,
                props: {},
            })
        )
    }

    const handleQuestionUpdate = (questionValue: string) => {
        dispatch(
            conversationMiddleware.updateCurrentQuestionValue(questionValue)
        )
        onQuestionUpdate(questionValue)
    }
    return (
        <div className="px-4">
            <div className="flex w-full items-center">
                <div className="mr-4 flex w-full items-center justify-between rounded-2xl	border border-gray-300">
                    <Textarea
                        className="bg-secondary px-5 placeholder-gray-500"
                        placeholder="Write your question..."
                        value={question}
                        disabled={disabled}
                        onChange={(event) =>
                            handleQuestionUpdate(event.target.value)
                        }
                        onEnter={onSendMessageSubmit}
                    />
                </div>

                <Button
                    disabled={disabled}
                    className="rounded-lg"
                    size="square"
                    type="submit"
                >
                    <SendIcon />
                </Button>
            </div>
            {route.pathname === itemsMenuBar[0].key && (
                <Button
                    size="baseSm"
                    type="button"
                    onClick={onBrowsePromptsClick}
                    className="mt-3 space-x-2 rounded-lg"
                    disabled={
                        isChatMessagingInProgress ||
                        isConversationMessagesListLoading
                    }
                >
                    <BrowsePromptsIcon />
                    <span className="text-xs font-normal text-secondary">
                        Browse prompts
                    </span>
                </Button>
            )}
        </div>
    )
}

export default SendMessage
