import ChatWelcome from '@/src/components/v2/ChatWelcome/ChatWelcome'
import ChatBoard from '@/src/components/ChatBoard/ChatBoard'
import React from 'react'
import { IChatBoardConversation } from '@/src/types/conversations'

const ChatBoardConversation = ({
    autoScroll,
    conversationRef,
    selectedConversationId,
    conversationMessages,
    threshold,
    setAutoScroll,
}: IChatBoardConversation) => {
    return (
        <div
            className="flex flex-1 flex-col items-center overflow-y-auto"
            ref={conversationRef}
        >
            <div className="w-full">
                {!selectedConversationId && conversationMessages === null ? (
                    <div className="m-auto mt-10 flex h-full max-w-[400px] justify-center">
                        <ChatWelcome />
                    </div>
                ) : null}
                <ChatBoard
                    conversationRef={conversationRef}
                    threshold={threshold}
                    autoScroll={autoScroll}
                    setAutoScroll={setAutoScroll}
                />
            </div>
        </div>
    )
}

export default ChatBoardConversation
