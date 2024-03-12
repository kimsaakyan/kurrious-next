import MenuJennyIcon from '@/src/components/Icons/MenuJennyIcon'
import MenuMessagesIcon from '@/src/components/Icons/MenuMessagesIcon'
import MenuCustomersIcon from '../components/Icons/MenuCustomersIcon'
import MenuRecordsIcon from '../components/Icons/MenuRecordsIcon'
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
    {
        key: '/records',
        icon: <MenuRecordsIcon color="#16192C" />,
        activeIcon: <MenuRecordsIcon color="#00ADFF" />,
        label: 'Records',
    },
    {
        key: '/customers',
        icon: <MenuCustomersIcon color="#16192C" />,
        activeIcon: <MenuCustomersIcon color="#00ADFF" />,
        label: 'Customers',
    },
]
