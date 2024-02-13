import React from 'react'
import Messages from '@/src/components/Messages/Messages'
import MessagesLayout from '@/src/layouts/MessagesLayout/MessagesLayout'

const Conversation = (): ReactNode => {
    return <Messages></Messages>
}

Conversation.getLayout = function getLayout(page: ReactNode) {
    return <MessagesLayout>{page}</MessagesLayout>
}

export default Conversation
