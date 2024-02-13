import React from 'react'
import { InboxIcon } from 'lucide-react'

const NoData = () => {
    return (
        <div>
            <div className="flex items-center justify-center">
                <InboxIcon className="h-14 w-14 text-gray-300" />
            </div>
            <div className="flex items-center justify-center">
                <p className="text-base text-gray-300">No Data</p>
            </div>
        </div>
    )
}

export default NoData
