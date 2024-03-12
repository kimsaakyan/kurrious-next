import React from 'react'
import PageHeader from '@/src/components/PageHeader/PageHeader'
import SettingsLayout from '@/src/layouts/Settings/SettingsLayout'
import ComingSoon from '@/src/components/Widgets/Widgets'

const SupportTickets = (): ReactNode => {
    return (
        <>
            <PageHeader title="Support Tickets" showSearchBox />
            <ComingSoon />
        </>
    )
}

export default SupportTickets

SupportTickets.getLayout = function getLayout(page: ReactNode) {
    return <SettingsLayout>{page}</SettingsLayout>
}
