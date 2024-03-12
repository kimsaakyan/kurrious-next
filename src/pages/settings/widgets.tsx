import React from 'react'
import PageHeader from '@/src/components/PageHeader/PageHeader'
import SettingsLayout from '@/src/layouts/Settings/SettingsLayout'
import ComingSoon from '@/src/components/Widgets/Widgets'

const Widgets = (): ReactNode => {
    return (
        <>
            <PageHeader title="Widgets" />
            <ComingSoon />
        </>
    )
}

export default Widgets

Widgets.getLayout = function getLayout(page: ReactNode) {
    return <SettingsLayout>{page}</SettingsLayout>
}
