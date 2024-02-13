import React from 'react'
import { useRouter } from 'next/router'
import { USER_ROLES } from '@/src/roles/roles'
import GridIcon from '@/src/components/Icons/GridIcon'
import { useSelector } from 'react-redux'
import { authSelector } from '@/src/redux/slices/auth'

const items = [
    {
        key: '/analytics',
        icon: <img src="/images/analytics.svg" />,
        activeIcon: <img src="/images/analytics-active.svg" />,
        label: 'Analytics',
        role: [
            USER_ROLES.KURIOUS_SALES,
            USER_ROLES.KURIOUS_SUPERUSER,
            USER_ROLES.CLIENT_ADMIN,
        ],
    },
    {
        key: '/profile',
        icon: <img src="/images/user.svg" />,
        activeIcon: <img src="/images/user-active.svg" />,
        label: 'Profile',
        role: [
            USER_ROLES.CLIENT_USER,
            USER_ROLES.KURIOUS_SALES,
            USER_ROLES.KURIOUS_SUPERUSER,
            USER_ROLES.CLIENT_ADMIN,
        ],
    },
    {
        key: '/groups',
        icon: <img src="/images/group.svg" />,
        activeIcon: <img src="/images/group-active.svg" />,
        label: 'Groups',
        role: [
            USER_ROLES.KURIOUS_SALES,
            USER_ROLES.KURIOUS_SUPERUSER,
            USER_ROLES.CLIENT_ADMIN,
        ],
    },
    {
        key: '/widgets',
        icon: <img src="/images/widgets.svg" />,
        activeIcon: <img src="/images/widgets-active.svg" />,
        label: 'Widgets',
        role: [
            USER_ROLES.KURIOUS_SALES,
            USER_ROLES.CLIENT_USER,
            USER_ROLES.KURIOUS_SUPERUSER,
            USER_ROLES.CLIENT_ADMIN,
        ],
    },
    {
        key: '/brain',
        icon: <img src="/images/box.svg" />,
        activeIcon: <img src="/images/group-active.svg" />,
        label: 'Brain',
        role: [
            USER_ROLES.KURIOUS_SALES,
            USER_ROLES.KURIOUS_SUPERUSER,
            USER_ROLES.CLIENT_ADMIN,
        ],
    },
    {
        key: '/integrations',
        icon: <GridIcon />,
        activeIcon: <img src="/images/group-active.svg" />,
        label: 'Integrations',
        role: [USER_ROLES.KURIOUS_SALES, USER_ROLES.KURIOUS_SUPERUSER],
    },
    {
        type: 'divider',
        role: [
            USER_ROLES.KURIOUS_SALES,
            USER_ROLES.CLIENT_USER,
            USER_ROLES.KURIOUS_SUPERUSER,
            USER_ROLES.CLIENT_ADMIN,
        ],
    },
    {
        key: '/supportTickets',
        icon: <img src="/images/group.svg" />,
        activeIcon: <img src="/images/group-active.svg" />,
        label: 'Support tickets',
        role: [
            USER_ROLES.KURIOUS_SALES,
            USER_ROLES.CLIENT_USER,
            USER_ROLES.KURIOUS_SUPERUSER,
            USER_ROLES.CLIENT_ADMIN,
        ],
    },
    {
        key: '/feedback',
        icon: <img src="/images/feedback.svg" />,
        activeIcon: <img src="/images/feedback-active.svg" />,
        label: 'Feedback',
        role: [
            USER_ROLES.KURIOUS_SALES,
            USER_ROLES.CLIENT_USER,
            USER_ROLES.KURIOUS_SUPERUSER,
            USER_ROLES.CLIENT_ADMIN,
        ],
    },
]

const Sidebar = (): ReactNode => {
    const router = useRouter()
    const currentUser = useSelector(authSelector.currentUser)
    const role = USER_ROLES[currentUser?.userType as keyof typeof USER_ROLES]

    return (
        <>
            <div className="m-0 border-b border-gray-300 p-[17px] text-sm font-semibold">
                Settings
            </div>
            <div className="mx-1">
                {items.map(
                    (item) =>
                        item.role.find((roleItem) => roleItem === role) &&
                        (item.type ? (
                            <div
                                key={item.key}
                                className="border-b border-gray-300"
                            />
                        ) : (
                            <div
                                className="my-1 w-full"
                                onClick={() =>
                                    item.key &&
                                    router.push(
                                        '/' +
                                            router.pathname.split('/')[1] +
                                            item.key
                                    )
                                }
                                key={item.key}
                            >
                                <div
                                    className={`flex h-10 ${
                                        router.pathname === item.key
                                            ? 'bg-blue-100 text-primary'
                                            : 'hover:bg-gray-350'
                                    } w-full cursor-pointer items-center rounded-2xl px-6 text-s	text-gray-600 transition delay-100 ease-in-out`}
                                >
                                    <div>
                                        {router.pathname === item.key
                                            ? item.activeIcon
                                            : item.icon}
                                    </div>
                                    <div className="ml-2">{item.label}</div>
                                </div>
                            </div>
                        ))
                )}
            </div>
        </>
    )
}

export default Sidebar
