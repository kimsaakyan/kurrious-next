import { cn } from '@/src/lib/utils'
import React from 'react'
import { Avatar, AvatarImage } from '@/src/components/ui/avatar'
import { itemsMenuBar } from '@/src/data/itemsMenuBarData'
import { useRouter } from 'next/router'

interface ITitlePanel {
    title: string
    activeChat?: string | null | number
    index: string | undefined | number
    image?: string | undefined
    text?: string
}

const TitlePanel = ({ title, index, text, activeChat, image }: ITitlePanel) => {
    const router = useRouter()

    return (
        <div className="relative flex w-full items-center">
            <div className="mr-4">
                <Avatar className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-deepDark">
                    {image ? <AvatarImage src={image} /> : <div>J</div>}
                </Avatar>
            </div>
            <div className="w-full">
                <div className="relative mr-2 flex w-full items-center">
                    <div className="two-line one-line cover-text relative z-20 w-full text-xs font-semibold text-blue-dark">
                        {title}
                        <div className="absolute bottom-0 right-0 z-30 h-5 w-16">
                            <div
                                className={cn(
                                    activeChat === index
                                        ? 'from-azure-light group-hover:from-azure-light'
                                        : 'from-azure-thin shadow-[4px_4px_4px_4px_#F8F9FC] group-hover:from-azure-thin',
                                    `absolute inset-0 h-full bg-gradient-to-l`
                                )}
                            />
                        </div>
                        {router.pathname === itemsMenuBar[1].key && (
                            <div className="mt-2 text-xs text-gray-50">
                                {text}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TitlePanel
