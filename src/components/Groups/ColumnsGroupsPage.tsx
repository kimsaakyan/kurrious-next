import { CellContext, ColumnDef } from '@tanstack/react-table'
import { ICompany, IUser } from '@/src/manager/companies/companiesManagerTypes'
import { Button } from '@/src/components/ui/button'
import { cn } from '@/src/lib/utils'
import { dispatch } from '@/src/redux/hooks'
import { viewsMiddleware } from '@/src/redux/slices/views'
import { ModalName } from '@/src/types/modals'
import { companiesMiddleware } from '@/src/redux/slices/companies'
import React from 'react'
import DropDownActionMenu from '@/src/components/DropDownActionMenu/DropDownActionMenu'
import { IDropDownActionMenuOnClick } from '@/src/types/companies'
import { CheckRoles } from '@/src/utils/hooks/checkRoles'
import { USER_ROLES } from '@/src/roles/roles'
import DownwardsArrowIcon from '@/src/components/Icons/DownwardsArrowIcon'
import ChevronDownIcon from '@/src/components/Icons/ChevronDownIcon'
export const ColumnsGroupsPage: ColumnDef<ICompany>[] = [
    {
        accessorKey: 'companyName',
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    className="flex w-full justify-between p-0 text-[10px] font-semibold uppercase text-gray-50"
                    onClick={() => {
                        column.toggleSorting(column.getIsSorted() === 'asc')
                    }}
                >
                    Company Name
                    {!column.getIsSorted() || column.getIsSorted() === 'asc' ? (
                        <div className="ml-4">
                            <DownwardsArrowIcon />
                        </div>
                    ) : (
                        <div className="ml-4 rotate-180">
                            <DownwardsArrowIcon />
                        </div>
                    )}
                </Button>
            )
        },
        id: 'select',
        cell: ({ row }) => (
            <div
                className="flex h-full w-full cursor-pointer items-center justify-between bg-transparent px-6 py-0 text-left text-xs font-semibold text-black-250 hover:bg-transparent"
                onClick={() => {
                    row.toggleSelected(!row.getIsSelected())
                }}
            >
                {row.original.companyName}
                <div
                    className={`w-[20px] ${
                        row.getIsSelected()
                            ? '-rotate-90 transition-transform'
                            : ''
                    }`}
                >
                    <ChevronDownIcon />
                </div>
            </div>
        ),
    },
    {
        accessorKey: 'email',
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    className="flex w-full justify-between p-0 text-[10px] font-semibold uppercase text-gray-50"
                    onClick={() => {
                        column.toggleSorting(column.getIsSorted() === 'asc')
                    }}
                >
                    Email
                    {!column.getIsSorted() || column.getIsSorted() === 'asc' ? (
                        <div className="ml-4">
                            <DownwardsArrowIcon />
                        </div>
                    ) : (
                        <div className="ml-4 rotate-180">
                            <DownwardsArrowIcon />
                        </div>
                    )}
                </Button>
            )
        },
    },
    {
        accessorKey: 'tokenUsage',
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    className="flex w-full justify-between p-0 text-[10px] font-semibold uppercase text-gray-50"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === 'asc')
                    }
                >
                    Token Usage
                    {!column.getIsSorted() || column.getIsSorted() === 'asc' ? (
                        <div className="ml-4">
                            <DownwardsArrowIcon />
                        </div>
                    ) : (
                        <div className="ml-4 rotate-180">
                            <DownwardsArrowIcon />
                        </div>
                    )}
                </Button>
            )
        },
    },
    {
        accessorKey: 'tokenAllotment',
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    className="flex w-full justify-between p-0 text-[10px] font-semibold uppercase text-gray-50"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === 'asc')
                    }
                >
                    Token Allotment
                    {!column.getIsSorted() || column.getIsSorted() === 'asc' ? (
                        <div className="ml-4">
                            <DownwardsArrowIcon />
                        </div>
                    ) : (
                        <div className="ml-4 rotate-180">
                            <DownwardsArrowIcon />
                        </div>
                    )}
                </Button>
            )
        },
    },
    {
        accessorKey: 'isActive',
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    className="flex w-full justify-between p-0 text-[10px] font-semibold uppercase text-gray-50"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === 'asc')
                    }
                >
                    Status
                    {!column.getIsSorted() || column.getIsSorted() === 'asc' ? (
                        <div className="ml-4">
                            <DownwardsArrowIcon />
                        </div>
                    ) : (
                        <div className="ml-4 rotate-180">
                            <DownwardsArrowIcon />
                        </div>
                    )}
                </Button>
            )
        },
        cell: ({ row }) => (
            <div className="flex items-center justify-start space-x-2">
                <span
                    className={cn('h-2 w-2 rounded-full', [
                        row.original.isActive ? 'bg-green' : 'bg-red',
                    ])}
                ></span>
                <p>{row.original.isActive ? 'Active' : 'Inactive'}</p>
            </div>
        ),
    },
    {
        accessorKey: 'action',
        header: 'Action',
        cell: (propsCompany) => {
            const { row, currentUser } = propsCompany as CellContext<
                ICompany,
                any
            > & { currentUser: IUser }
            const company = row.original
            const menuItems = [
                {
                    key: 'adduser',
                    label: 'Add user',
                    onClick: (): void => {
                        const currentCompany = row.original
                        dispatch(
                            companiesMiddleware.updateCurrentCompany(
                                currentCompany
                            )
                        )
                        dispatch(
                            viewsMiddleware.setRedirectionState({
                                path: '/settings/groups/createUser',
                                params: '',
                                apply: true,
                            })
                        )
                    },
                },
                {
                    key: 'deactivate',
                    label: company.isActive ? 'Deactivate' : 'Activate',
                    disabled: false,
                    onClick: (): void => {
                        dispatch(
                            companiesMiddleware.updateCompanyStatus(
                                company.companyId,
                                !company.isActive
                            )
                        )
                    },
                },
                // TODO: Under the "Action" tab on the admin pannel there is the "Samsara Key" remove this as this will be configured under intergrations
                // {
                //     key: 'samsaraKey',
                //     label: 'Samsara key',
                //     onClick: async () => {
                //         const currentCompany = row.original
                //         await dispatch(
                //             companiesMiddleware.getCompanySamsaraKey(
                //                 currentCompany.companyId
                //             )
                //         )
                //         dispatch(
                //             viewsMiddleware.openModal({
                //                 name: ModalName.SamsaraKeyModal,
                //                 props: currentCompany,
                //             })
                //         )
                //     },
                // },
                {
                    key: 'delete',
                    label: 'Delete',
                    danger: true,
                    onClick: (): void => {
                        const currentCompany = row.original
                        dispatch(
                            viewsMiddleware.openModal({
                                name: ModalName.DeleteCompanyModal,
                                props: currentCompany,
                            })
                        )
                    },
                },
            ]

            if (
                CheckRoles(
                    [USER_ROLES.KURIOUS_SALES, USER_ROLES.KURIOUS_SUPERUSER],
                    currentUser.userType
                )
            ) {
                menuItems.unshift({
                    key: 'edit',
                    label: 'Edit',
                    onClick: (props?: IDropDownActionMenuOnClick): void => {
                        const data = row.original
                        const editProps = {
                            companyName: data.companyName,
                            firstName: data.firstName,
                            lastName: data.lastName,
                            email: data.email,
                            tokenAllotment: data.tokenAllotment,
                            companyId: data.companyId,
                            adminId: data.adminId,
                            isActive: data.isActive,
                        }
                        dispatch(
                            companiesMiddleware.editOrganizationData(
                                editProps as ICompany
                            )
                        )
                        if (props?.router) {
                            props.router.push('groups/createOrganization')
                        }
                    },
                })
            }

            return <DropDownActionMenu data={menuItems} />
        },
    },
]
