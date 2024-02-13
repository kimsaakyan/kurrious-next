import ChatBoard from '@/src/components/Messages/ChatBoard'
import React from 'react'
import Loader from '@/src/components/Loader/Loader'
import { useSelector } from 'react-redux'
import { messagesSelector } from '@/src/redux/slices/messages'
import { IChatBoardMessage } from '@/src/types/conversations'

const ChatBoardContainer = ({ messagesRef }: IChatBoardMessage) => {
    const isLoadingMessages = useSelector(messagesSelector.isLoadingMessages)

    return (
        <>
            {isLoadingMessages ? (
                <div className="flex h-full w-full items-center justify-center">
                    <Loader />
                </div>
            ) : (
                <div
                    className="flex flex-1 flex-col items-center overflow-y-auto"
                    ref={messagesRef}
                >
                    <div className="relative w-full">
                        <ChatBoard messagesRef={messagesRef} />
                    </div>
                </div>
            )}
        </>
    )
}

export default ChatBoardContainer
