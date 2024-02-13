import React from 'react'
import PageHeader from '@/src/components/PageHeader/PageHeader'
import ProfilePage from '@/src/pages/ProfilePage'
import SettingsLayout from '@/src/layouts/Settings/SettingsLayout'

const Profile = (): ReactNode => {
    return (
        <>
            <PageHeader title="Account settings" />
            <ProfilePage />
        </>
    )
}

export default Profile

Profile.getLayout = function getLayout(page: ReactNode) {
    return <SettingsLayout>{page}</SettingsLayout>
}
