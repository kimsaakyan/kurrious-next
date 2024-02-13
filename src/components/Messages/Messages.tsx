import React, {
    ChangeEvent,
    FormEvent,
    useEffect,
    useRef,
    useState,
} from 'react'
import dynamic from 'next/dynamic'
import MessagesHeader from '@/src/components/Messages/MessagesHeader'
import { useSelector } from 'react-redux'
import {
    messagesMiddleware,
    messagesSelector,
} from '@/src/redux/slices/messages'
import NoData from '@/src/components/v2/NoData/NoData'
import ChatBoardContainer from '@/src/components/Messages/ChatBoardContainer'
import { Textarea } from '@/src/components/ui/textarea'
import { Button } from '@/src/components/ui/button'
import SendIcon from '@/src/components/Icons/SendIcon'
import { dispatch } from '@/src/redux/hooks'
import { SenderType } from '@/src/enums'
import ToastJenny from '@/src/components/Tooltip/ToastJenny'

const Messages = (): ReactNode => {
    const isLoadingMessages = useSelector(messagesSelector.isLoadingMessages)
    const [questionValue, setQuestionValue] = useState('')
    const showToastJenny = useSelector(messagesSelector.showToastJenny)
    const messagesRef = useRef<HTMLDivElement | null>(null)

    const messagesConversation = useSelector(
        messagesSelector.messagesConversation
    )
    const topic = useSelector(messagesSelector.topic)

    const onSendMessageSubmit = (
        event: FormEvent<HTMLFormElement> | React.KeyboardEvent
    ) => {
        event.preventDefault()
        const trimmedValue = questionValue.trim()

        if (!trimmedValue) return
        dispatch(
            messagesMiddleware.createMessagesConversation(
                topic?.id,
                trimmedValue
            )
        )
        const loadingMessage = {
            text: trimmedValue,
            createdAt: new Date().toISOString(),
            sender: { name: 'You', type: SenderType.DISPATCH },
        }
        const dataBeforeResponse = [
            ...(messagesConversation ?? []),
            loadingMessage,
        ]

        dispatch(
            messagesMiddleware.updateMessagesConversation(dataBeforeResponse)
        )
        setQuestionValue('')
        dispatch(messagesMiddleware.updateShouldExecuteScroll(true))
    }

    useEffect(() => {
        setQuestionValue('')
    }, [topic])

    const handleQuestionUpdate = (event: ChangeEvent<HTMLTextAreaElement>) => {
        setQuestionValue(event.target.value)
    }

    return (
        <>
            <div className="relative flex h-full flex-col">
                <MessagesHeader />
                <div className="flex flex-1 flex-col items-center overflow-y-auto">
                    <div className="h-full w-full">
                        {!messagesConversation?.length && !isLoadingMessages ? (
                            <div className="flex h-full items-center justify-center">
                                <NoData />
                            </div>
                        ) : (
                            <ChatBoardContainer messagesRef={messagesRef} />
                        )}
                    </div>
                </div>
                {showToastJenny && <ToastJenny />}
                <div className="my-2.5 px-4">
                    <form onSubmit={(event) => onSendMessageSubmit(event)}>
                        <div className="flex w-full items-center">
                            <div className="mr-4 flex w-full items-center justify-between rounded-2xl	border border-gray-300">
                                <Textarea
                                    className="bg-secondary px-5 placeholder-gray-500"
                                    placeholder="Write your question..."
                                    value={questionValue}
                                    disabled={isLoadingMessages || !topic}
                                    onChange={handleQuestionUpdate}
                                    onEnter={onSendMessageSubmit}
                                />
                            </div>
                            <Button
                                disabled={isLoadingMessages || !topic}
                                className="rounded-lg"
                                size="square"
                                type="submit"
                            >
                                <SendIcon />
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default dynamic(() => Promise.resolve(Messages), {
    ssr: false,
})
