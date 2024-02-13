import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '@/src/components/ui/avatar'
import AvatarManIcon from '@/src/components/Icons/AvatarManIcon'

export interface IResponseSection {
    avatarUrl: string
    desc: string
    name: string
    title?: string
    timeStamp: string
}

const ResponseSection = ({
    desc,
    name,
    title,
    timeStamp,
    avatarUrl,
}: IResponseSection): ReactNode => {
    return (
        <div className="flex w-full overflow-y-auto px-6 py-2.5">
            <div className="flex">
                <div className="mr-1">
                    <div className="flex">
                        <div className="mr-3">
                            <Avatar className="h-8 w-8">
                                <AvatarImage src={avatarUrl} />
                                <AvatarFallback>
                                    <AvatarManIcon />
                                </AvatarFallback>
                            </Avatar>
                        </div>
                        <div className="flex items-center space-x-1.5 pb-2">
                            <p className="text-s font-semibold text-black">
                                {name}
                            </p>
                            <p className="text-xs font-normal text-black-light">
                                {timeStamp}
                            </p>
                        </div>
                    </div>
                    <div className="ml-10 flex rounded-xl border border-gray-light bg-secondary-light p-2.5 text-xs">
                        <div>{desc}</div>
                        <div>{title}</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ResponseSection
