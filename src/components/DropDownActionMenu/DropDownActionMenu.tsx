import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/src/components/ui/dropdown-menu'
import { Button } from '@/src/components/ui/button'
import { MoreVertical } from 'lucide-react'
import React from 'react'
import { ICollapseTableDropdown } from '@/src/types/companies'
import { useRouter } from 'next/router'
import { IUser } from '@/src/manager/companies/companiesManagerTypes'

const DropDownActionMenu = ({
    data,
    id,
    user,
}: {
    data: ICollapseTableDropdown[]
    id?: string
    user?: IUser
}) => {
    const router = useRouter()

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild className="flex">
                <Button variant="ghost" className="p-0">
                    <span className="sr-only">Open menu</span>
                    <MoreVertical color="#A0AEC0" className="h-6 w-6" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
                align="end"
                className="rounded-md bg-white py-3 shadow-md"
            >
                {data.map((item) => (
                    <DropdownMenuItem
                        key={item.key}
                        className="cursor-pointer rounded-md px-3 py-1 text-[14px] font-normal text-black-150 hover:bg-gray-300"
                        onClick={() => item.onClick({ id, router, user })}
                    >
                        {item.label}
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default DropDownActionMenu
