import { CheckIcon } from 'lucide-react'
import CloseIcon from '@/src/components/Icons/CloseIcon'
import React, { MouseEventHandler } from 'react'
import LoadingIcon from '@/src/components/Icons/LoadingIcon'

interface IConfirmCancelControls {
    onConfirmClick: MouseEventHandler<HTMLDivElement>
    onCloseClick: MouseEventHandler<HTMLDivElement>
    isLoading?: boolean
}

const ConfirmCancelControls = ({
    onConfirmClick,
    onCloseClick,
    isLoading,
}: IConfirmCancelControls) => {
    return (
        <div className="flex w-full items-center">
            {isLoading ? (
                <div className="relative flex h-4/5	w-full items-center justify-center text-[20px]">
                    <LoadingIcon />
                </div>
            ) : (
                <>
                    <div className="cursor-pointer" onClick={onConfirmClick}>
                        <CheckIcon width={18} height={18} />
                    </div>
                    <div className="ml-2 cursor-pointer" onClick={onCloseClick}>
                        <CloseIcon width={12} height={12} />
                    </div>
                </>
            )}
        </div>
    )
}

export default ConfirmCancelControls
