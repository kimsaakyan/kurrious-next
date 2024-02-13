import React from 'react'
import KurriousLogoIcon from '@/src/components/Icons/KurriousLogoIcon'

const KuiriousLogo = (): ReactNode => {
    return (
        <div className="cursor-pointer">
            <div className="flex justify-center">
                <KurriousLogoIcon width={59} height={40} />
            </div>
            <div className="flex justify-center">
                <p className="text-s font-light text-black">KUIRIUS</p>
            </div>
        </div>
    )
}

export default KuiriousLogo
