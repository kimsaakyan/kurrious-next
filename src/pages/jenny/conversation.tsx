import JennyLayout from '@/src/layouts/JennyLayout/JennyLayout'
import React from 'react'
import ConversationContent from '@/src/components/Conversation/ConversationContent'

const Conversation = (): ReactNode => {
    return <ConversationContent></ConversationContent>
}

Conversation.getLayout = function getLayout(page: ReactNode) {
    return <JennyLayout>{page}</JennyLayout>
}

export default Conversation
