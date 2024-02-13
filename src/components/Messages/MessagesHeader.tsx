import { useSelector } from 'react-redux'
import { messagesSelector } from '@/src/redux/slices/messages'

const MessagesHeader = () => {
    const topic = useSelector(messagesSelector.topic)

    return (
        <div className="sticky z-10 w-full bg-secondary">
            <div className="flex h-14 items-center justify-between border-b border-b-gray-300 px-5 py-2">
                <div className="text-sm font-semibold text-black">
                    {topic?.title}
                </div>
                {/*TODO: Wait backend*/}
                {/*<div className="flex items-center  text-xs text-gray-50">*/}
                {/*    <div className="mr-2">*/}
                {/*        <MenuJennyIcon color="#718096" />*/}
                {/*    </div>*/}
                {/*    <div>Jenny responds automatically</div>*/}
                {/*    <div className="ml-3">*/}
                {/*        <Toggle />*/}
                {/*    </div>*/}
                {/*</div>*/}
            </div>
        </div>
    )
}

export default MessagesHeader
