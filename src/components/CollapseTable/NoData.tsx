import { TableCell, TableRow } from '@/src/components/ui/table'
import { PackageOpenIcon } from 'lucide-react'
import React from 'react'

const NoData = ({ columnsLength }: { columnsLength: number }) => {
    return (
        <TableRow>
            <TableCell colSpan={columnsLength} className="h-80">
                <div className="flex h-24 flex-col items-center justify-center text-gray-500">
                    <PackageOpenIcon className="h-24 w-24" />
                    No data
                </div>
            </TableCell>
        </TableRow>
    )
}

export default NoData
