import React from 'react'
import { useSelector } from 'react-redux'
import { promptSelector } from '@/src/redux/slices/prompts'

const PreviewPrompt = () => {
    const selectedPrompt = useSelector(promptSelector.selectedPrompt)

    return (
        <div className="h-[360px] w-full overflow-y-auto rounded-lg bg-primary-100 p-2.5">
            <div className="flex text-xs font-medium text-gray-500 placeholder-gray-500">
                PREVIEW (WORKSPACE PROMPT)
                <div className="ml-2 flex h-2 w-2 cursor-pointer items-center justify-center rounded-full border-2 border-gray-100 bg-transparent p-2 font-bold text-gray-100">
                    i
                </div>
            </div>
            <p className="mt-4 text-[15px] text-gray-500">
                {selectedPrompt?.text}
            </p>
        </div>
    )
}

export default PreviewPrompt
