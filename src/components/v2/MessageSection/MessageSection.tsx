import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '@/src/components/ui/avatar'
import AvatarManIcon from '@/src/components/Icons/AvatarManIcon'
import moment from 'moment/moment'
import { IMessage } from '@/src/types/redux/conversations'

const MessageSection = (item: IMessage): ReactNode => {
    return (
        <div className="flex justify-end p-10">
            <div className="flex">
                <div className="flex w-full">
                    <div className="w-full">
                        <div className="flex justify-end">
                            <div className="flex items-center space-x-3 pb-5">
                                <p className="text-s font-semibold text-black">
                                    You
                                </p>
                                <p className="text-xs font-normal text-black-light">
                                    {moment(item?.timestamp).format('LT')}
                                </p>
                            </div>
                            <div className="ml-4">
                                <Avatar className="h-16 w-16">
                                    <AvatarImage src="" />
                                    <AvatarFallback>
                                        <AvatarManIcon />
                                    </AvatarFallback>
                                </Avatar>
                            </div>
                        </div>
                        <div className="mr-16 rounded-3xl bg-primary p-5">
                            <p className="text-xs font-normal text-secondary">
                                {item?.question}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MessageSection
