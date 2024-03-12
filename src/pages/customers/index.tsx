import React from 'react'
import CustomersLayout from '@/src/layouts/CustomersLayout/CustomersLayout'

const Customers = (): ReactNode => {
    return <div></div>
}

Customers.getLayout = function getLayout(page: ReactNode) {
    return <CustomersLayout>{page}</CustomersLayout>
}

export default Customers
