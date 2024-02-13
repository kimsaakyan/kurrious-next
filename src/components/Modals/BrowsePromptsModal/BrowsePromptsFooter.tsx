import { Button } from '@/src/components/ui/button'
import React from 'react'
import { dispatch } from '@/src/redux/hooks'
import { promptMiddleware, promptSelector } from '@/src/redux/slices/prompts'
import { ModalName } from '@/src/types/modals'
import { useSelector } from 'react-redux'
import { viewsMiddleware } from '@/src/redux/slices/views'

const BrowsePromptsFooter = () => {
    const selectedPrompt = useSelector(promptSelector.selectedPrompt)

    const onPromptsModalSubmit = () => {
        if (selectedPrompt?.text) {
            dispatch(promptMiddleware.updateCurrentPrompt(selectedPrompt))
            dispatch(viewsMiddleware.closeModal(ModalName.BrowsePromptsModal))
            dispatch(promptMiddleware.updateSelectedPrompt(null))
            dispatch(promptMiddleware.updateActivePromptId(''))
            dispatch(promptMiddleware.updateIsCustomPromptActive(false))
            dispatch(promptMiddleware.updateSearchValue(''))
            dispatch(promptMiddleware.updateActiveCategoryIndex(0))
        }
    }

    return (
        <div className="mt-3 flex w-full">
            <Button onClick={onPromptsModalSubmit} size="full">
                Use Prompt
            </Button>
        </div>
    )
}

export default BrowsePromptsFooter
