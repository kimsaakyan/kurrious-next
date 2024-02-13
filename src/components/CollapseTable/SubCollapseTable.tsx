import { ICompany, IUser } from '@/src/manager/companies/companiesManagerTypes'
import { TableCell, TableRow } from '@/src/components/ui/table'
import { Input } from '@/src/components/ui/input'
import { dispatch } from '@/src/redux/hooks'
import {
    companiesMiddleware,
    companiesSelector,
} from '@/src/redux/slices/companies'
import SelectRoles from '@/src/components/Select/SelectRoles'
import { USER_ROLES } from '@/src/roles/roles'
import { roles } from '@/src/data/roleData'
import ConfirmCancelControls from '@/src/components/ConfirmCancelControls/ConfirmCancelControls'
import DropDownActionMenu from '@/src/components/DropDownActionMenu/DropDownActionMenu'
import { collapseTableDropdown } from '@/src/data/collapseTableDropdown'
import React from 'react'
import { useSelector } from 'react-redux'
import { AccountStatus } from '@/src/enums'
import NoData from '@/src/components/CollapseTable/NoData'
import PhoneInput from 'react-phone-number-input/input'

const SubCollapseTable = ({ row }: { row: any }) => {
    const activeFinderId = useSelector(companiesSelector.activeFinderId)
    const isLoadingCompanyUser = useSelector(
        companiesSelector.isLoadingCompanyUser
    )
    const companyUser = useSelector(companiesSelector.companyUser)

    const onConfirmClick = (userId: string) => {
        dispatch(companiesMiddleware.updateActiveFinderId(''))
        dispatch(companiesMiddleware.updateCompanyUser(userId, companyUser))
    }

    const onCloseClick = () => {
        dispatch(companiesMiddleware.updateActiveFinderId(''))
    }

    const onSelectRolesChange = (value: string) => {
        dispatch(
            companiesMiddleware.updateCompanyUserData({
                ...companyUser,
                userType: value,
            })
        )
    }

    return (
        <>
            {(row.original as ICompany).users.length ? (
                (row.original as ICompany).users.map((user: IUser) => (
                    <TableRow key={user.id}>
                        <TableCell className="border-b border-gray-300 px-6"></TableCell>
                        <TableCell className="border-b border-gray-300 px-6 text-[14px] text-black-250">
                            {activeFinderId === user.id ? (
                                <Input
                                    onChange={(e) =>
                                        dispatch(
                                            companiesMiddleware.updateCompanyUserData(
                                                {
                                                    ...companyUser,
                                                    firstName: e.target.value,
                                                }
                                            )
                                        )
                                    }
                                    value={companyUser.firstName}
                                    className="bg-whtie h-8 text-xs text-gray-550"
                                    size="base"
                                />
                            ) : (
                                user.firstName
                            )}
                        </TableCell>
                        <TableCell className="border-b border-gray-300 px-6 text-[14px] text-black-250">
                            {activeFinderId === user.id ? (
                                <Input
                                    onChange={(e) =>
                                        dispatch(
                                            companiesMiddleware.updateCompanyUserData(
                                                {
                                                    ...companyUser,
                                                    lastName: e.target.value,
                                                }
                                            )
                                        )
                                    }
                                    value={companyUser.lastName}
                                    className="bg-whtie h-8 text-xs text-gray-550"
                                    size="base"
                                />
                            ) : (
                                user.lastName
                            )}
                        </TableCell>
                        <TableCell className="border-b border-gray-300 px-6 text-[14px] text-black-250">
                            {activeFinderId === user.id ? (
                                <Input
                                    onChange={(e) =>
                                        dispatch(
                                            companiesMiddleware.updateCompanyUserData(
                                                {
                                                    ...companyUser,
                                                    userName: e.target.value,
                                                }
                                            )
                                        )
                                    }
                                    value={companyUser.userName}
                                    className="bg-whtie h-8 text-xs text-gray-550"
                                    size="base"
                                />
                            ) : (
                                user.username
                            )}
                        </TableCell>
                        <TableCell className="border-b border-gray-300 px-6 text-[14px] text-black-250">
                            {user.email}
                        </TableCell>
                        <TableCell className="border-b border-gray-300 px-6 text-[14px] text-black-250">
                            <PhoneInput
                                disabled={activeFinderId !== user.id}
                                placeholder="Phone Number"
                                country="US"
                                international
                                withCountryCallingCode
                                onChange={(value) =>
                                    dispatch(
                                        companiesMiddleware.updateCompanyUserData(
                                            {
                                                ...companyUser,
                                                phoneNumber: value as string,
                                            }
                                        )
                                    )
                                }
                                value={
                                    activeFinderId === user.id
                                        ? companyUser.phoneNumber
                                        : user.phoneNumber
                                }
                                className="phoneNumberSecondary h-8 rounded-md border border-gray-300 bg-white px-4 text-xs text-gray-550"
                            />
                        </TableCell>
                        <TableCell className="border-b border-gray-300 px-6 py-2 text-[14px] text-black-250"></TableCell>
                        <TableCell className="border-b border-gray-300">
                            <div
                                className={`flex justify-center rounded-full p-1.5 text-[10px] font-medium text-black-250 ${
                                    user.accountStatus ===
                                        AccountStatus.active &&
                                    'bg-green-light text-green-deepDark'
                                } ${
                                    user.accountStatus ===
                                        AccountStatus.pending &&
                                    'bg-yellow-light text-yellow'
                                } ${
                                    user.accountStatus ===
                                        AccountStatus.deactivate &&
                                    'bg-gray-bright text-gray-50'
                                }`}
                            >
                                {user.accountStatus}
                            </div>
                        </TableCell>
                        <TableCell className="border-b border-gray-300 px-5 text-[14px] text-black-250">
                            {activeFinderId === user.id ? (
                                <div>
                                    <SelectRoles
                                        onChange={onSelectRolesChange}
                                        placeholder={
                                            USER_ROLES[
                                                user.userType as keyof typeof USER_ROLES
                                            ]
                                        }
                                        list={roles}
                                    />
                                </div>
                            ) : (
                                USER_ROLES[
                                    user.userType as keyof typeof USER_ROLES
                                ]
                            )}
                        </TableCell>
                        <TableCell className="border-b border-gray-300 px-5 text-[14px] text-black-250">
                            {activeFinderId === user.id ? (
                                <ConfirmCancelControls
                                    onConfirmClick={() =>
                                        onConfirmClick(user.id)
                                    }
                                    onCloseClick={onCloseClick}
                                    isLoading={isLoadingCompanyUser}
                                />
                            ) : (
                                <DropDownActionMenu
                                    data={collapseTableDropdown}
                                    user={user}
                                />
                            )}
                        </TableCell>
                    </TableRow>
                ))
            ) : (
                <NoData columnsLength={7} />
            )}
        </>
    )
}

export default SubCollapseTable
