import { Button } from '@/src/components/ui/button'
import React from 'react'
import { useSelector } from 'react-redux'
import { websocketSelector } from '@/src/redux/slices/websocket'
import { conversationSelector } from '@/src/redux/slices/conversations'
import { MessageActions } from '@/src/enums'

const StopGeneratingConversation = () => {
    const sendJsonMessage = useSelector(websocketSelector.sendJsonMessage)
    const selectedConversationId = useSelector(
        conversationSelector.selectedConversationId
    )

    return (
        <div className="absolute bottom-[130px] right-[18px]">
            <Button
                variant="upload"
                onClick={() =>
                    sendJsonMessage
                        ? sendJsonMessage({
                              conversationId: selectedConversationId,
                              action: MessageActions.stopGenerating,
                          })
                        : null
                }
                className="w-30 p-0 text-xs text-tertiary"
            >
                Stop generating
            </Button>
        </div>
    )
}

export default StopGeneratingConversation
