import React from 'react'
import KurriousLogoIcon from '@/src/components/Icons/KurriousLogoIcon'
import { cn } from '@/src/lib/utils'
import Link from 'next/link'

interface IKurriousLogo {
    width: number
    height: number
    className?: string
}

const KurriousLogo = (props: IKurriousLogo): ReactNode => {
    const { width, height, className } = props
    return (
        <Link href={'/jenny/conversation'}>
            <div className="cursor-pointer">
                <div className="flex justify-center">
                    <KurriousLogoIcon width={width} height={height} />
                </div>
                <div className="flex justify-center">
                    <p className={cn(className, 'font-light text-black')}>
                        kurrious
                    </p>
                </div>
            </div>
        </Link>
    )
}

export default KurriousLogo
