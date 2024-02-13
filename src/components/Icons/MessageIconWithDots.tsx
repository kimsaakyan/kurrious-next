import React from 'react'

const MessageIconWithDots = ({ color }: { color?: string }) => {
    return (
        <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M7.19844 9.69014V9.5999M11.9984 9.69014V9.5999M16.7984 9.69014V9.5999M14.6071 16.5912L11.9984 21.5999L9.59844 16.5912H4.79844C3.47295 16.5912 2.39844 15.5167 2.39844 14.1912V4.7999C2.39844 3.47442 3.47295 2.3999 4.79844 2.3999H19.1984C20.5239 2.3999 21.5984 3.47442 21.5984 4.7999V14.1912C21.5984 15.5167 20.5239 16.5912 19.1984 16.5912H14.6071Z"
                stroke={color ?? 'black'}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    )
}

export default MessageIconWithDots
