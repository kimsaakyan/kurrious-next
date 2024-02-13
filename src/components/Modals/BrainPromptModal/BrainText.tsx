import { Input } from '@/src/components/ui/input'
import React, { Dispatch, SetStateAction } from 'react'

const BrainText = ({
    setPrompt,
    setDescription,
    prompt,
    description,
}: {
    setPrompt: Dispatch<SetStateAction<string>>
    setDescription: Dispatch<SetStateAction<string>>
    prompt: string
    description: string
}) => {
    return (
        <div className="w-full">
            <div className="mb-6">
                <label className="mb-1 block text-xs font-normal text-blue-dark	">
                    Prompt
                </label>
                <Input
                    onChange={(e) => setPrompt(e.target.value)}
                    className="text-xs font-normal text-gray-650"
                    type="text"
                    value={prompt}
                    name="Name"
                    size="base"
                />
            </div>
            <div className="mb-3">
                <label className="mb-1 block text-xs font-normal text-blue-dark	">
                    Completion
                </label>
                <textarea
                    onChange={(e) => setDescription(e.target.value)}
                    rows={14}
                    value={description}
                    className="focus:shadow-outline w-full resize-none appearance-none overflow-scroll rounded-md border border-gray-300 bg-gray-300 px-5 py-2 text-[16px] text-xs font-normal leading-tight text-gray-650  placeholder:text-gray-250 hover:border hover:border-blue-light focus:border-blue-light focus:outline-none focus:ring-0 focus:ring-transparent disabled:cursor-not-allowed disabled:opacity-50"
                />
            </div>
        </div>
    )
}

export default BrainText
