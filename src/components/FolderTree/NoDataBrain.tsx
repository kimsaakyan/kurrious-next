import GraphicIcon from '@/src/components/Icons/GraphicIcon'
import { Button } from '@/src/components/ui/button'
import React from 'react'
import { dispatch } from '@/src/redux/hooks'
import { viewsMiddleware } from '@/src/redux/slices/views'
import { ModalName } from '@/src/types/modals'

const NoDataBrain = () => {
    const onAddNewDataClick = () => {
        dispatch(
            viewsMiddleware.openModal({
                name: ModalName.BrainPromptModal,
                props: {},
            })
        )
    }

    return (
        <div className="flex flex-col items-center">
            <GraphicIcon />
            <div className="mb-3 mt-8 text-s font-medium text-black-150	">
                You don´t have any data in this folder
            </div>
            <Button
                size="lg"
                className="whitespace-nowrap text-xs"
                onClick={onAddNewDataClick}
            >
                Add new Data
            </Button>
        </div>
    )
}

export default NoDataBrain
