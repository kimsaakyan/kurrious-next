import React from 'react'
import { Button } from '@/src/components/ui/button'
import ApiTokensTable from '@/src/components/ApiTokens/ApiTokensTable'
import { dispatch } from '@/src/redux/hooks'
import { viewsMiddleware } from '@/src/redux/slices/views'
import { ModalName } from '@/src/types/modals'

const ApiTokens = () => {
    const onAddApiTokenClick = () => {
        dispatch(
            viewsMiddleware.openModal({
                name: ModalName.ApiTokenModal,
                props: {},
            })
        )
    }

    return (
        <div>
            <div className="flex items-center justify-between px-6 text-[20px] font-semibold">
                <div>Api Tokens</div>
                <Button
                    size="lg"
                    onClick={onAddApiTokenClick}
                    className="mr-6 w-52"
                >
                    Add API Token
                </Button>
            </div>
            <ApiTokensTable />
        </div>
    )
}

export default ApiTokens
