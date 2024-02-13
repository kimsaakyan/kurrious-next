import React, { useMemo, useState } from 'react'
import { DataTable } from '@/src/components/ui/data-table'
import { ChevronDownIcon, ChevronUpIcon } from 'lucide-react'
import { ColumnDef } from '@tanstack/react-table'
import { Button } from '@/src/components/ui/button'
import { removeDotsFromKeys } from '@/src/columns/JennyColumn'

interface IProps {
    columns: any[]
    data: any[]
}

const SearchableTable = ({ columns, data }: IProps): ReactNode => {
    const [compData] = useState(data.map((item) => removeDotsFromKeys(item)))

    return (
        <div style={{ position: 'relative', width: 'fit-content' }}>
            {useMemo(() => {
                const updatedColumns = columns.map(
                    (col) =>
                        ({
                            accessorKey: col.dataIndex,
                            header: ({ column }) => {
                                return (
                                    <Button
                                        variant="ghost"
                                        onClick={() =>
                                            column.toggleSorting(
                                                column.getIsSorted() === 'asc'
                                            )
                                        }
                                        className="p-0 text-xs text-tertiary"
                                    >
                                        {col.title}
                                        <div className="flex flex-col p-4">
                                            <ChevronUpIcon
                                                color={
                                                    column.getIsSorted() ===
                                                    'asc'
                                                        ? 'blue'
                                                        : 'gray'
                                                }
                                                strokeWidth={3}
                                                className="h-3 w-3"
                                            />
                                            <ChevronDownIcon
                                                color={
                                                    column.getIsSorted() ===
                                                    'desc'
                                                        ? 'blue'
                                                        : 'gray'
                                                }
                                                strokeWidth={3}
                                                className="-mt-1 h-3 w-3"
                                            />
                                        </div>
                                    </Button>
                                )
                            },
                        } as ColumnDef<unknown>)
                )

                return <DataTable columns={updatedColumns} data={compData} />
            }, [compData])}
        </div>
    )
}

export default SearchableTable
