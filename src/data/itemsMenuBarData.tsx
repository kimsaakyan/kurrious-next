import MenuJennyIcon from '@/src/components/Icons/MenuJennyIcon'
import MenuMessagesIcon from '@/src/components/Icons/MenuMessagesIcon'
import React from 'react'

export const itemsMenuBar = [
    {
        key: '/jenny/conversation',
        icon: <MenuJennyIcon color="#16192C" />,
        activeIcon: <MenuJennyIcon color="#00ADFF" />,
        label: 'Jenny',
    },
    {
        key: '/messages',
        icon: <MenuMessagesIcon color="#16192C" />,
        activeIcon: <MenuMessagesIcon color="#00ADFF" />,
        label: 'Messages',
    },
]
