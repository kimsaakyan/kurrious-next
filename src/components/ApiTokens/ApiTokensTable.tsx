import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/src/components/ui/table'
import HelpCircleIcon from '@/src/components/Icons/HelpCircleIcon'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/src/components/ui/dropdown-menu'
import { Button } from '@/src/components/ui/button'
import ThreeDotsVerticalIcon from '@/src/components/Icons/ThreeDotsVerticalIcon'
import { cn } from '@/src/lib/utils'
import React from 'react'
import TooltipIconButton from '@/src/components/v2/TooltipIconButton/TooltipIconButton'
import { useSelector } from 'react-redux'
import {
    integrationsMiddleware,
    integrationsSelector,
} from '@/src/redux/slices/integrations'
import { dispatch } from '@/src/redux/hooks'

const headerGroup = [
    {
        name: 'Token Name',
        showIcon: true,
        tooltipTitle:
            "This column displays the unique names you've assigned to each API token for easy reference. These names help you identify and manage different tokens.",
    },
    {
        name: 'API KEY',
        showIcon: true,
        tooltipTitle:
            'This column displays the unique API keys associated with each token name. API keys are confidential identifiers that grant access to specific services. For security, ensure these keys remain private.',
    },
    {
        name: 'SCOPE',
        showIcon: true,
        tooltipTitle:
            "This column indicates the count of 'read' and 'write' access levels granted within various granular scopes for each API token. Scopes define specific areas of data that a token can interact with, such as reading certain logs or modifying driver app settings. For detailed information on which particular access is granted beyond this count, consult your administrator or refer to the integration partner dashboard settings page.",
    },
    { name: '', showIcon: false },
]

const ApiTokensTable = () => {
    const integrationsApiTokenList = useSelector(
        integrationsSelector.integrationsApiTokenList
    )

    const handleTokenDeactivate = (id: string) => {
        dispatch(integrationsMiddleware.deactivateAPIToken({ id }))
    }

    return (
        <Table className="mt-5">
            <TableHeader className="border-0 bg-slate">
                <TableRow>
                    {headerGroup.map((header, key) => {
                        return (
                            <TableHead
                                key={key}
                                className="border-b border-gray-300 bg-gray-bg px-6 py-4 text-xs uppercase text-tertiary"
                            >
                                <span className="flex items-center">
                                    <span>{header.name}</span>
                                    {header.showIcon && (
                                        <span className="ml-2 flex items-center">
                                            <TooltipIconButton
                                                className="w-[400px] rounded-lg border border-gray-750 bg-white p-2.5 text-[12px] font-normal text-quaternary"
                                                title={header.tooltipTitle}
                                                icon={<HelpCircleIcon />}
                                            />
                                        </span>
                                    )}
                                </span>
                            </TableHead>
                        )
                    })}
                </TableRow>
            </TableHeader>
            <TableBody>
                {integrationsApiTokenList.map((row) => (
                    <TableRow key={row.id}>
                        <TableCell className="border-b border-gray-300 px-6 py-4 text-xs text-quaternary">
                            {row.name}
                        </TableCell>
                        <TableCell className="border-b border-gray-300 px-6 py-4 text-xs text-quaternary">
                            {row.APIKey}
                        </TableCell>
                        <TableCell className="border-b border-gray-300 px-6 py-4 text-xs text-quaternary">
                            <div>
                                <div>Read: {row.Score.read}</div>
                                <div>Write: {row.Score.write}</div>
                            </div>
                        </TableCell>
                        <TableCell className="flex justify-center border-b border-gray-300 px-6 py-4 text-xs text-quaternary">
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild className="flex">
                                    <Button variant="ghost" className="p-0">
                                        <span className="sr-only">
                                            Open menu
                                        </span>
                                        <ThreeDotsVerticalIcon />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent
                                    align="end"
                                    className="rounded-md bg-white p-2 shadow-md"
                                >
                                    <DropdownMenuItem
                                        className={cn(
                                            'cursor-pointer rounded-md px-3 text-s text-quaternary hover:bg-gray-300'
                                        )}
                                        onClick={() =>
                                            handleTokenDeactivate(row.id)
                                        }
                                    >
                                        Deactivate
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}

export default ApiTokensTable
