import { OrganizationForm } from '@/src/components/v2/Organizations/OrganizationForm'
import React, { useEffect } from 'react'
import SettingsLayout from '@/src/layouts/Settings/SettingsLayout'
import PageHeader from '@/src/components/PageHeader/PageHeader'
import { useSelector } from 'react-redux'
import { companiesSelector } from '@/src/redux/slices/companies'
import { CheckAuth } from '@/src/utils/hooks/checkAuth'
import { USER_ROLES } from '@/src/roles/roles'
import { authSelector } from '@/src/redux/slices/auth'
import { useRouter } from 'next/router'

const CreateOrganizations = () => {
    const editOrganizationData = useSelector(
        companiesSelector.editOrganizationData
    )
    const router = useRouter()
    const currentUser = useSelector(authSelector.currentUser)
    const isLoadingAuth = useSelector(authSelector.isLoadingAuth)

    useEffect(() => {
        CheckAuth(
            [USER_ROLES.KURIOUS_SALES, USER_ROLES.KURIOUS_SUPERUSER],
            currentUser,
            isLoadingAuth
        )
    }, [router, isLoadingAuth])

    return (
        <>
            <PageHeader
                title={
                    <div className="text-sm">
                        <span
                            onClick={() => router.push('/settings/groups')}
                            className="mr-1 cursor-pointer font-medium text-gray-50"
                        >
                            Groups /
                        </span>
                        <span className="font-semibold">
                            {editOrganizationData?.companyId ? 'Edit' : 'New'}{' '}
                            organization
                        </span>
                    </div>
                }
            />
            <div className="relative w-[510px] rounded-xl bg-white p-5 text-blue-dark">
                <div className="flex items-center justify-between">
                    <h2 className="text-s font-medium leading-normal text-quaternary">
                        {editOrganizationData?.companyId ? 'Edit' : 'New'}{' '}
                        Organization
                    </h2>
                </div>
                <OrganizationForm />
            </div>
        </>
    )
}

export default CreateOrganizations

CreateOrganizations.getLayout = function getLayout(page: ReactNode) {
    return <SettingsLayout>{page}</SettingsLayout>
}
