import React, { CSSProperties, useEffect, useRef, useState } from 'react'
import { IContextMenuItems } from '@/src/types/redux/brain'

interface ContextMenuProps {
    isVisible: boolean
    position: { x: number; y: number }
    items: IContextMenuItems[] | null
    onClose: () => void
    props?: Record<string, any> | null
}

const ContextMenu: React.FC<ContextMenuProps> = ({
    isVisible,
    position,
    items,
    onClose,
    props,
}) => {
    const [isMenuVisible, setMenuVisible] = useState<boolean>(isVisible)
    const menuRef = useRef<HTMLDivElement | null>(null)

    const dropdownStyles: CSSProperties = {
        display: isVisible ? 'block' : 'none',
        boxShadow:
            '0px 1px 3px 0px rgba(50, 50, 71, 0.10), 0px 0px 1px 0px rgba(12, 26, 75, 0.20)',
        top: `${position.y}px`,
        left: `${position.x}px`,
    }

    const closeMenu = () => {
        setMenuVisible(false)
        onClose()
    }

    const handleClickOutside = (e: MouseEvent) => {
        if (
            isMenuVisible &&
            menuRef.current &&
            !menuRef.current.contains(e.target as Node)
        ) {
            closeMenu()
        }
    }

    const onItemClick = (item: IContextMenuItems) => {
        onClose()
        if (props) {
            item.onClick(props)
        }
    }

    useEffect(() => {
        if (isVisible) {
            setMenuVisible(true)
        }
    }, [isVisible, position])

    useEffect(() => {
        document.addEventListener('click', handleClickOutside)

        return () => {
            document.removeEventListener('click', handleClickOutside)
        }
    }, [isMenuVisible])

    useEffect(() => {
        return () => {
            closeMenu()
        }
    }, [])

    return (
        <div
            style={dropdownStyles}
            ref={menuRef}
            className="absolute z-10 w-44 divide-y divide-gray-100 rounded-lg border border-gray-100 bg-white shadow dark:bg-gray-700"
        >
            <ul
                className="px-1 py-1.5 text-s text-gray-700 dark:text-gray-200"
                aria-labelledby="doubleDropdownButton"
            >
                {items &&
                    items.map((item, index) => (
                        <li
                            key={index}
                            className="flex cursor-pointer items-center rounded-lg p-2.5 text-s font-medium text-quaternary hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white"
                            onClick={() => onItemClick(item)}
                        >
                            {item.icon && item.icon}
                            <div className="ml-2">{item.label}</div>
                        </li>
                    ))}
            </ul>
        </div>
    )
}

export default ContextMenu
