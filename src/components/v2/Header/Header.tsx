import React from 'react'
import ProfileSection from '@/src/components/v2/ProfileSection/ProfileSection'
import KurriousLogo from '@/src/components/Icons/KurriousLogo'

const Header = (): ReactNode => {
    return (
        <div className="h-[11%] bg-secondary text-base">
            <div className="flex justify-between px-8 pt-2.5">
                <KurriousLogo width={59} height={40} className="text-sm	" />
                <ProfileSection />
            </div>
        </div>
    )
}

export default Header
