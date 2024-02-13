import KurriousLogo from '@/src/components/Icons/KurriousLogo'
import React from 'react'
import ResetPassword from '@/src/components/ResetPassword/ResetPassword'

const Index = () => {
    return (
        <div className="w-full">
            <div className="inset-0 mt-10 flex items-center justify-center">
                <div className="w-full max-w-[425px]">
                    <div className="flex justify-center">
                        <KurriousLogo
                            width={150}
                            height={100}
                            className="text-[36px]"
                        />
                    </div>
                    <div className="mt-3 text-center text-[18px] font-semibold">
                        Reset password
                    </div>
                    <div className="mt-7.5">
                        <ResetPassword />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Index
