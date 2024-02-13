import React from 'react'
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from '@/src/components/ui/tooltip'

interface IProps {
    disabled?: boolean
    title: string | undefined
    icon: ReactNode
    onClick?: () => void
    className?: string
}

const TooltipIconButton = ({
    disabled,
    title,
    icon,
    onClick,
    className,
}: IProps): ReactNode => {
    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger disabled={disabled} onClick={onClick}>
                    {icon}
                </TooltipTrigger>
                <TooltipContent className={className}>
                    <p>{title}</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    )
}

export default TooltipIconButton
