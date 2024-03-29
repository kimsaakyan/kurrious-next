interface ICloseIcon {
    color?: string
    width?: number
    height?: number
}

const CloseIcon = ({ color, width, height }: ICloseIcon) => (
    <svg
        width={width || 14}
        height={height || 14}
        viewBox="0 0 14 14"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            d="M13 1L1 13M13 13L1 1"
            stroke={color || 'black'}
            strokeWidth="2"
            strokeLinecap="round"
        />
    </svg>
)

export default CloseIcon
