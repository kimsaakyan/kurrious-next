import React from 'react'

interface IDividerWithTextProps {
    text: string
}

const DividerWithText = ({ text }: IDividerWithTextProps) => {
    return (
        <div className="flex items-center">
            <div className="h-px flex-grow bg-gray-light"></div>
            <div className="px-8 text-[14px] text-gray-500">{text}</div>
            <div className="h-px flex-grow bg-gray-light"></div>
        </div>
    )
}

export default DividerWithText
