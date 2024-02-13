import React, { ReactElement } from 'react'
import SearchBox from '@/src/components/Search/Search'
import { cn } from '@/src/lib/utils'
import { Button } from '@/src/components/ui/button'
import PlusIcon from '@/src/components/Icons/PlusIcon'

interface IProps {
    title: string | ReactElement
    showButton?: boolean
    showButtonIcon?: boolean
    showSearchBox?: boolean
    buttonText?: string
    searchValue?: string
    onButtonClick?: () => void
    onSearchChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const PageHeader = ({
    title,
    showButtonIcon,
    showButton,
    showSearchBox,
    buttonText,
    searchValue,
    onButtonClick,
    onSearchChange,
}: IProps): ReactNode => {
    return (
        <div
            className={cn(
                'flex min-h-[60px] items-center justify-between border-b border-t border-b-gray-300  border-t-gray-300 text-sm font-semibold',
                'px-6'
            )}
        >
            <div className="whitespace-nowrap text-sm font-semibold text-blue-dark">
                {title}
            </div>
            <div className="ml-2 flex	w-9/12 items-center justify-end space-x-3">
                {showSearchBox && (
                    <div className="w-full max-w-[318px]">
                        <SearchBox
                            value={searchValue}
                            onChange={onSearchChange}
                        />
                    </div>
                )}
                {showButton && (
                    <Button
                        size="lg"
                        className="mr-6 whitespace-nowrap text-[12px] font-semibold"
                        onClick={onButtonClick}
                    >
                        {showButtonIcon && (
                            <div className="mr-2">
                                <PlusIcon color="#FFF" />
                            </div>
                        )}
                        {buttonText}
                    </Button>
                )}
            </div>
        </div>
    )
}

export default PageHeader
