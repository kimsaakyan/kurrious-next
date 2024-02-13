import React from 'react'

const MenuJennyIcon = ({ color }: { color: string }): ReactNode => {
    return (
        <svg
            width="18"
            height="23"
            viewBox="0 0 18 23"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <g id="message-square-plus">
                <path
                    id="Vector"
                    d="M12.6576 22L8.74456 18.3478H2.875C1.83947 18.3478 1 17.5643 1 16.5978V9.75C1 8.7835 1.83947 8 2.875 8H14.125C15.1605 8 16 8.7835 16 9.75V16.5978C16 17.5643 15.1605 18.3478 14.125 18.3478H12.6576V22Z"
                    stroke={color}
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                <path
                    id="Vector_2"
                    d="M7 12.5C7 11.9444 6.5 11 5.5 11C4.5 11 4 11.9444 4 12.5"
                    stroke={color}
                    strokeMiterlimit="10"
                    strokeLinecap="round"
                />
                <path
                    id="Vector_3"
                    d="M13 12.5C13 11.9444 12.5 11 11.5 11C10.5 11 10 11.9444 10 12.5"
                    stroke={color}
                    strokeMiterlimit="10"
                    strokeLinecap="round"
                />
                <path
                    id="Vector_4"
                    d="M9.93116 5.0383H7.82293C7.42987 5.0383 7.10828 5.35989 7.10828 5.75295V7.28946C7.10828 7.68252 7.42987 8.00411 7.82293 8.00411H9.93116C10.3242 8.00411 10.6458 7.68252 10.6458 7.28946V5.75295C10.6458 5.35989 10.3242 5.0383 9.93116 5.0383Z"
                    fill={color}
                />
                <path
                    id="Vector_5"
                    d="M8.85863 5.03837C8.85863 5.03837 8.82289 2.07256 6.78613 1.35791"
                    stroke={color}
                    strokeWidth="0.714653"
                    strokeMiterlimit="10"
                />
                <path
                    id="Vector_6"
                    d="M6.03625 2.07249C6.60855 2.07249 7.07249 1.60855 7.07249 1.03625C7.07249 0.463944 6.60855 0 6.03625 0C5.46394 0 5 0.463944 5 1.03625C5 1.60855 5.46394 2.07249 6.03625 2.07249Z"
                    fill={color}
                />
            </g>
        </svg>
    )
}

export default MenuJennyIcon
