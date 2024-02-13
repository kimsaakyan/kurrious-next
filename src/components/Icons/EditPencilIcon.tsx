import React from 'react'

const EditPencilIcon = ({ color }: { color?: string }) => {
    return (
        <svg
            width="16"
            height="16"
            viewBox="0 0 18 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M3.59999 11.6998L6.74999 14.3998M8.99999 16.6498H16.2M3.14999 11.6998L12.0235 2.51637C12.9789 1.56095 14.528 1.56095 15.4834 2.51637C16.4388 3.4718 16.4388 5.02085 15.4834 5.97628L6.29999 14.8498L1.79999 16.1998L3.14999 11.6998Z"
                stroke={color ?? '#636A8F'}
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    )
}

export default EditPencilIcon
