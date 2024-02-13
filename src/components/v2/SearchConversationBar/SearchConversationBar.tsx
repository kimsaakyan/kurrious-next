import React from 'react'
import { Input } from '@/src/components/ui/input'
import { Button } from '@/src/components/ui/button'
import SearchIcon from '@/src/components/Icons/SearchIcon'

const SearchConversationBar = (props: {
    onSearch: (event: React.ChangeEvent<HTMLInputElement>) => void
}): ReactNode => {
    const { onSearch } = props
    return (
        <div className="flex w-full items-center drop-shadow-sm">
            <Input
                className="rounded-l-md bg-azure-thin text-sm text-black-light shadow-sm"
                type="text"
                variant="secondary"
                placeholder="Search conversations..."
                onChange={(event) => onSearch(event)}
            />
            <Button
                size="baseLg"
                variant="azure"
                className="rounded-r-md border border-l-0 shadow-sm"
            >
                <SearchIcon />
            </Button>
        </div>
    )
}

export default SearchConversationBar
