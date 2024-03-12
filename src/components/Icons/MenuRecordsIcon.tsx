import React from 'react'

const MenuRecordsIcon = ({ color }: { color?: string }) => {
    return (
        <svg
            width="24"
            height="24"
            viewBox="0 0 64 64"
            xmlns="http://www.w3.org/2000/svg"
            strokeWidth="3"
            stroke={color ?? 'black'}
            fill="none"
        >
            <path d="M19.55,43.93H38.1a2,2,0,0,0,2-2V16.28a2,2,0,0,0-2-2H8.68a2,2,0,0,0-2,2V41.91a2,2,0,0,0,2,2h2.6" />
            <path d="M44.33,43.93H40.19V23.23H50a1,1,0,0,1,.76.35l6.3,7.55a1,1,0,0,1,.23.64V43.93H53" />
            <ellipse cx="15.53" cy="45.23" rx="4.44" ry="4.5" />
            <ellipse cx="48.58" cy="45.23" rx="4.44" ry="4.5" />
        </svg>
    )
}

export default MenuRecordsIcon
