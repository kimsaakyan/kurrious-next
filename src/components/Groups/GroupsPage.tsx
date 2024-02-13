import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { dispatch } from '@/src/redux/hooks'
import { useDebounce } from '@/src/utils/hooks/useDebounce'
import {
    companiesMiddleware,
    companiesSelector,
} from '@/src/redux/slices/companies/index'
import PageHeader from '@/src/components/PageHeader/PageHeader'
import CollapseTable from '@/src/components/CollapseTable/CollapseTable'
import { ColumnsGroupsPage } from '@/src/components/Groups/ColumnsGroupsPage'
import LoadingIcon from '@/src/components/Icons/LoadingIcon'
import { useRouter } from 'next/router'
import { CheckRoles } from '@/src/utils/hooks/checkRoles'
import { USER_ROLES } from '@/src/roles/roles'
import { authSelector } from '@/src/redux/slices/auth'

const GroupsPage = (): ReactNode => {
    const isCompanyListLoading = useSelector(
        companiesSelector.isCompaniesListLoading
    )
    const router = useRouter()
    const companiesList = useSelector(companiesSelector.companiesList)
    const currentUser = useSelector(authSelector.currentUser)
    const [searchText, setSearchText] = useState('')

    const debouncedSearchTerm = useDebounce(searchText, 300)

    const onAddOrganizationClick = () => {
        if (
            CheckRoles(
                [USER_ROLES.KURIOUS_SALES, USER_ROLES.KURIOUS_SUPERUSER],
                currentUser?.userType
            )
        ) {
            router.push('groups/createOrganization')
        } else {
            router.push('groups/createUser')
        }
    }

    useEffect(() => {
        if (debouncedSearchTerm !== null) {
            dispatch(companiesMiddleware.getCompanies(debouncedSearchTerm))
        }
    }, [debouncedSearchTerm])

    return (
        <>
            <PageHeader
                showButtonIcon
                title="Groups"
                {...(CheckRoles(
                    [
                        USER_ROLES.KURIOUS_SALES,
                        USER_ROLES.KURIOUS_SUPERUSER,
                        USER_ROLES.CLIENT_ADMIN,
                    ],
                    currentUser?.userType
                ) && {
                    showButton: true,
                })}
                buttonText={
                    CheckRoles(
                        [
                            USER_ROLES.KURIOUS_SALES,
                            USER_ROLES.KURIOUS_SUPERUSER,
                        ],
                        currentUser?.userType
                    )
                        ? 'Organization'
                        : 'Add Users'
                }
                onButtonClick={onAddOrganizationClick}
                showSearchBox
                searchValue={searchText}
                onSearchChange={(e) => setSearchText(e.target.value)}
            />
            <div className="h-full">
                {isCompanyListLoading ? (
                    <div className="relative flex h-4/5	 w-full items-center justify-center text-[40px]">
                        <LoadingIcon />
                    </div>
                ) : (
                    <CollapseTable
                        data={companiesList}
                        columns={ColumnsGroupsPage}
                    />
                )}
            </div>
        </>
    )
}

export default GroupsPage
