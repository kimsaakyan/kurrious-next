import React, { ChangeEvent } from 'react'
import { Input } from '@/src/components/ui/input'
import { SearchIcon } from 'lucide-react'
interface IProps {
    value: string | undefined
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void
}
const SearchBox = ({ onChange, value }: IProps): ReactNode => {
    return (
        <Input
            type="email"
            onChange={onChange}
            variant="search"
            size="sm"
            value={value}
            placeholder="Search..."
            icon={<SearchIcon size={18} color="gray" />}
        />
    )
}
export default SearchBox
