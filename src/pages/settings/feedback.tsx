import React from 'react'
import PageHeader from '@/src/components/PageHeader/PageHeader'
import SettingsLayout from '@/src/layouts/Settings/SettingsLayout'
import ComingSoon from '@/src/components/ComingSoon/ComingSoon'

const Feedback = (): ReactNode => {
    return (
        <>
            <PageHeader title="Feedback" />
            <ComingSoon />
        </>
    )
}

export default Feedback

Feedback.getLayout = function getLayout(page: ReactNode) {
    return <SettingsLayout>{page}</SettingsLayout>
}
