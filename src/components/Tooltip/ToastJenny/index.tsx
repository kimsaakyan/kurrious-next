import { dispatch } from '@/src/redux/hooks'
import MenuJennyIcon from '@/src/components/Icons/MenuJennyIcon'
import {
    messagesMiddleware,
    messagesSelector,
} from '@/src/redux/slices/messages'
import { useSelector } from 'react-redux'
import { SenderType } from '@/src/enums'
import { IMessagesConversations } from '@/src/types/redux/messages'

const ToastJenny = () => {
    const messagesConversation = useSelector(
        messagesSelector.messagesConversation
    )
    const messagesSuggestion = useSelector(messagesSelector.messagesSuggestion)

    const closeToastJenny = () => {
        dispatch(messagesMiddleware.updateShowToastJenny(false))
    }

    const onToastJennyClick = () => {
        closeToastJenny()
        const dataMessage = {
            text: messagesSuggestion?.text,
            createdAt: new Date().toISOString(),
            sender: { name: 'You', type: SenderType.DISPATCH },
        }
        dispatch(
            messagesMiddleware.createMessagesConversation(
                messagesSuggestion?.driverId,
                messagesSuggestion?.text
            )
        )
        dispatch(
            messagesMiddleware.updateMessagesConversation([
                ...messagesConversation,
                dataMessage,
            ] as IMessagesConversations[])
        )
    }

    return (
        <div
            onClick={onToastJennyClick}
            className={`absolute bottom-20 left-1/2 z-50 -translate-x-1/2 transform cursor-pointer rounded border border-primary`}
        >
            <div
                className={`relative inset-0 flex h-auto items-center justify-between rounded bg-primary-100 text-base text-black-300 shadow-lg`}
            >
                <div className="pl-2.5">
                    <MenuJennyIcon color="#718096" />
                </div>
                <div className="ml-2.5 h-auto max-h-96 w-full flex-col justify-center overflow-auto py-2.5 pr-2.5">
                    <div className="h-auto break-words text-xs font-normal">
                        {messagesSuggestion?.text}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ToastJenny
