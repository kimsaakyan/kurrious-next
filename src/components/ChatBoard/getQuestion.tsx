import { IGetQuestion } from '@/src/types/redux/conversations'
import moment from 'moment/moment'
import { Avatar } from '@/src/components/ui/avatar'
import React from 'react'

const getQuestion = ({
    timestamp,
    question,
    firstName,
}: IGetQuestion): ReactNode => {
    return (
        <div className="flex justify-end px-6 py-2.5">
            <div className="flex">
                <div className="flex w-full">
                    <div className="w-full">
                        <div className="flex justify-end">
                            <div>
                                <div className="flex w-full items-center justify-end space-x-1.5 pb-2">
                                    <p className="text-s font-semibold text-blue-dark">
                                        You
                                    </p>
                                    <p className="text-xs font-normal text-gray-battleship">
                                        {moment(timestamp).format('LT')}
                                    </p>
                                </div>
                                <div className="w-full rounded-xl bg-primary p-3">
                                    <p className="text-xs font-normal text-secondary">
                                        {question}
                                    </p>
                                </div>
                            </div>
                            <div className="ml-3">
                                <Avatar className="mr-4 h-9 w-9 max-w-full items-center justify-center rounded-full bg-blue-bright object-contain text-xs text-white">
                                    {firstName?.charAt(0) || 'A'}
                                </Avatar>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default getQuestion
