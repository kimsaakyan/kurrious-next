import {
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/src/components/ui/select'
import React from 'react'
import { Select } from '@radix-ui/react-select'
import { IRole } from '@/src/types/modals'

interface ISelectComponent {
    placeholder: string
    list: IRole[]
    onChange: (value: string) => void
}

const SelectRoles = ({ placeholder, list, onChange }: ISelectComponent) => {
    return (
        <Select onValueChange={onChange}>
            <SelectTrigger
                widthIcon={16}
                className="... h-8 max-w-2xl truncate border border-gray-300 bg-white px-2 text-xs text-gray-550"
            >
                <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent side="bottom" className="rounded-md">
                {list.map((item, index) => (
                    <SelectItem
                        key={index}
                        className="h-15 rounded-md"
                        value={`${item.value}`}
                    >
                        {item.label}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    )
}

export default SelectRoles
