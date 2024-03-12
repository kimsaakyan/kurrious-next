import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuList,
    NavigationMenuTrigger,
} from '@/src/components/ui/navigation-menu'
import { useRouter } from 'next/router'
import { itemsMenuBar } from '@/src/data/itemsMenuBarData'
import { useSelector } from 'react-redux'
import { authSelector } from '@/src/redux/slices/auth'
import { useMemo } from 'react'

const MenuBar = (): ReactNode => {
    const router = useRouter()
    const currentUser = useSelector(authSelector.currentUser)

    const currentItemsMenuBar = useMemo(() => {
        return itemsMenuBar.filter((item) =>
            currentUser?.widgets.some((widget) => widget.label === item.label)
        )
    }, [currentUser?.widgets, itemsMenuBar])

    return (
        <NavigationMenu>
            <NavigationMenuList>
                {currentItemsMenuBar.map((item) => (
                    <NavigationMenuItem key={item.key}>
                        <NavigationMenuTrigger>
                            <div
                                className={`flex h-10 items-center space-x-3 ${
                                    router.pathname === item.key
                                        ? 'text-primary'
                                        : ''
                                }`}
                                onClick={() => router.push(item.key)}
                            >
                                <div>
                                    {router.pathname === item.key
                                        ? item.activeIcon
                                        : item.icon}
                                </div>
                                <p>{item.label}</p>
                            </div>
                        </NavigationMenuTrigger>
                    </NavigationMenuItem>
                ))}
            </NavigationMenuList>
        </NavigationMenu>
    )
}

export default MenuBar
