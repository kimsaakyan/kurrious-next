import { cn } from '@/src/lib/utils'
import React from 'react'
import { useSelector } from 'react-redux'
import { promptMiddleware, promptSelector } from '@/src/redux/slices/prompts'
import { dispatch } from '@/src/redux/hooks'

const CreateCustomPrompt = () => {
    const activePromptId = useSelector(promptSelector.activePromptId)
    const filteredList = useSelector(promptSelector.filteredList)

    const onPromptClick = (id: string) => {
        dispatch(promptMiddleware.updateActivePromptId(id))
        if (filteredList?.length) {
            dispatch(
                promptMiddleware.updateSelectedPrompt(
                    filteredList.filter((item) => item._id === id && item)[0]
                )
            )
        }
    }

    return (
        <div className="w-4/12 self-stretch overflow-scroll border-r border-gray-300 px-2.5 pt-1.5 text-sm">
            <div style={{ maxHeight: 360 }} className="overscroll-y-auto">
                {filteredList?.map((item) => (
                    <div
                        key={item['_id']}
                        onClick={() => onPromptClick(item['_id'] ?? '')}
                        className={cn(
                            'mb-1 cursor-pointer rounded p-2 text-sm font-medium',
                            [
                                activePromptId === item['_id']
                                    ? 'bg-primary text-white'
                                    : 'text-black hover:bg-primary-100',
                            ]
                        )}
                    >
                        {item.name}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default CreateCustomPrompt
