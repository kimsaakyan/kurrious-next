import React from 'react'
import SearchIcon from '@/src/components/Icons/SearchIcon'
import EditPencilIcon from '@/src/components/Icons/EditPencilIcon'
import MessageIconWithDots from '@/src/components/Icons/MessageIconWithDots'

const ChatWelcome = () => {
    return (
        <div className="pt-8">
            <div>
                <div className="mb-2 flex justify-center">
                    <p className="text-[36px] font-semibold">
                        Welcome to Kurrious
                    </p>
                </div>
                <div className="flex max-w-3xl justify-center">
                    <p className="text-center text-[16px]">
                        Get started by writting and Jenny can do the rest. Not
                        sure where to start? Chech out the Prompt library for
                        inspiration.
                    </p>
                </div>
            </div>
            <div className="mt-18">
                <div className="flex items-center justify-center py-6">
                    <div className="mr-[25px]">
                        <SearchIcon color="black" />
                    </div>
                    <div>
                        <p className="text-[18px]">Real-time search</p>
                        <p className="text-[14px]">
                            Summarize the latest news on generative AI.{' '}
                        </p>
                    </div>
                </div>
                <div className="flex items-center justify-center py-6">
                    <div className="mr-[25px]">
                        <EditPencilIcon color="black" />
                    </div>
                    <div>
                        <p className="text-[18px]">Long form content</p>
                        <p className="text-[14px]">
                            Summarize the latest news on generative AI.{' '}
                        </p>
                    </div>
                </div>
                <div className="flex items-center justify-center py-6">
                    <div className="mr-[25px]">
                        <MessageIconWithDots color="black" />
                    </div>
                    <div>
                        <p className="text-[18px]">Brainstorm ideas</p>
                        <p className="text-[14px]">
                            Summarize the latest news on generative AI.{' '}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ChatWelcome
