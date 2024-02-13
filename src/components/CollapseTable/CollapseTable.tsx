import React from 'react'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/src/components/ui/table'
import {
    ColumnDef,
    SortingState,
    flexRender,
    getCoreRowModel,
    getSortedRowModel,
    useReactTable,
} from '@tanstack/react-table'
import { cn } from '@/src/lib/utils'
import SubCollapseTable from '@/src/components/CollapseTable/SubCollapseTable'
import NoData from '@/src/components/CollapseTable/NoData'
import { useSelector } from 'react-redux'
import { authSelector } from '@/src/redux/slices/auth'

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
}

function CollapseTable<TData, TValue>({
    columns,
    data,
}: DataTableProps<TData, TValue>) {
    const [rowSelection, setRowSelection] = React.useState({})
    const [sorting, setSorting] = React.useState<SortingState>([])
    const currentUser = useSelector(authSelector.currentUser)

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        enableMultiRowSelection: false,
        onRowSelectionChange: setRowSelection,
        onSortingChange: setSorting,
        getSortedRowModel: getSortedRowModel(),
        state: {
            rowSelection,
            sorting,
        },
    })

    return (
        <Table>
            <TableHeader>
                {table.getHeaderGroups().map((headerGroup) => (
                    <TableRow key={headerGroup.id}>
                        {headerGroup.headers.map((header) => {
                            return (
                                <TableHead
                                    key={header.id}
                                    className="whitespace-nowrap border-b border-r border-gray-300 bg-primary-100 px-6 py-2 text-[10px] font-semibold uppercase text-gray-50"
                                >
                                    {header.isPlaceholder
                                        ? null
                                        : flexRender(
                                              header.column.columnDef.header,
                                              header.getContext()
                                          )}
                                </TableHead>
                            )
                        })}
                    </TableRow>
                ))}
            </TableHeader>
            <TableBody>
                {table.getRowModel().rows?.length ? (
                    table.getRowModel().rows.map((row) => (
                        <>
                            <TableRow
                                key={row.id}
                                data-state={row.getIsSelected() && 'selected'}
                            >
                                {row.getVisibleCells().map((cell, i) => (
                                    <TableCell
                                        key={cell.id}
                                        className={cn(
                                            'border-b border-gray-300 px-6 py-2',
                                            i ? 'px-6 py-2' : 'p-0'
                                        )}
                                    >
                                        <div className="text-[14px] font-normal text-black-250">
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                {
                                                    ...cell.getContext(),
                                                    currentUser,
                                                }
                                            )}
                                        </div>
                                    </TableCell>
                                ))}
                            </TableRow>
                            {row.getIsSelected() && (
                                <>
                                    <TableRow key={row.id}>
                                        {[
                                            '',
                                            'First Name',
                                            'Last Name',
                                            'User Name',
                                            'Email',
                                            'Phone Number',
                                            'Token Usage',
                                            'User Status',
                                            'Role',
                                            '',
                                        ].map((header, i) => {
                                            return (
                                                <TableHead
                                                    key={i}
                                                    className="whitespace-nowrap border-b border-gray-300 bg-primary-100 px-6 py-2 text-[10px] font-semibold uppercase text-gray-50"
                                                >
                                                    {header}
                                                </TableHead>
                                            )
                                        })}
                                    </TableRow>
                                    <SubCollapseTable row={row} />
                                </>
                            )}
                        </>
                    ))
                ) : (
                    <NoData columnsLength={columns.length} />
                )}
            </TableBody>
        </Table>
    )
}

export default CollapseTable
