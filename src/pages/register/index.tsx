import React from 'react'
import KurriousLogo from '@/src/components/Icons/KurriousLogo'
import ResetPassword from '@/src/components/ResetPassword/ResetPassword'

export default function Register(): ReactNode {
    return (
        <>
            <div className="inset-0 mt-10 flex items-center justify-center">
                <div className="max-w-[425px]">
                    <div className="flex justify-center">
                        <KurriousLogo
                            width={150}
                            height={100}
                            className="text-[36px]"
                        />
                    </div>
                    <div className="my-10 flex px-10 text-center text-[24px] font-semibold">
                        You have been invited to join Organization
                    </div>
                    <ResetPassword />
                </div>
            </div>
        </>
    )
}
