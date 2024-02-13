import React from 'react'
import { itemsMenuBar } from '@/src/data/itemsMenuBarData'
import { useRouter } from 'next/router'

const ConversationsHeader = (): ReactNode => {
    const route = useRouter()

    return (
        <div className="flex h-14 items-center justify-between border-b border-b-gray-300 p-2 pl-4">
            <p className="text-sm font-semibold text-black">
                {route.pathname === itemsMenuBar[0].key
                    ? 'Conversations'
                    : 'Messages'}
            </p>
        </div>
    )
}

export default ConversationsHeader
