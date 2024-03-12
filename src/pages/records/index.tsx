import React from 'react'
import RecordsLayout from '@/src/layouts/RecordsLayout/RecordsLayout'

const Records = (): ReactNode => {
    return <div></div>
}

Records.getLayout = function getLayout(page: ReactNode) {
    return <RecordsLayout>{page}</RecordsLayout>
}

export default Records
