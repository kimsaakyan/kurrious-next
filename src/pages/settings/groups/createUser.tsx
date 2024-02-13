import React from 'react'
import SettingsLayout from '@/src/layouts/Settings/SettingsLayout'
import PageHeader from '@/src/components/PageHeader/PageHeader'
import { AddUserForm } from '@/src/components/v2/Organizations/AddUserForm'
import { useRouter } from 'next/router'

const CreateUser = () => {
    const router = useRouter()

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
                        <span className="font-semibold">Add user</span>
                    </div>
                }
            />
            <div className="relative w-[510px] rounded-xl bg-white p-5 text-blue-dark">
                <div className="flex items-center justify-between">
                    <h2 className="text-s font-medium leading-normal text-quaternary">
                        Add user
                    </h2>
                </div>
                <div>
                    <AddUserForm />
                </div>
            </div>
        </>
    )
}

export default CreateUser

CreateUser.getLayout = function getLayout(page: ReactNode) {
    return <SettingsLayout>{page}</SettingsLayout>
}
