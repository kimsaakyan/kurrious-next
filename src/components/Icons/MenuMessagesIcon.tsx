import React from 'react'

const MenuMessagesIcon = ({ color }: { color: string }): ReactNode => {
    return (
        <svg
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M7.20005 7.1998L8.55005 8.5498L11.7 5.3998M8.76527 12.4433L5.00874 16.1998V12.4433H3.60005C2.60594 12.4433 1.80005 11.6374 1.80005 10.6433V3.59981C1.80005 2.60569 2.60594 1.7998 3.60005 1.7998H14.4C15.3942 1.7998 16.2 2.60569 16.2 3.5998V10.6433C16.2 11.6374 15.3942 12.4433 14.4 12.4433H8.76527Z"
                stroke={color}
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    )
}

export default MenuMessagesIcon
