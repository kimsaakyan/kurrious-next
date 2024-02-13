import React, { useEffect } from 'react'
import { dispatch } from '@/src/redux/hooks'
import {
    promptMiddleware,
    promptSelector,
} from '@/src/redux/slices/prompts/index'
import { useSelector } from 'react-redux'
import Loader from '@/src/components/Loader/Loader'
import { PromptCategoryEnum } from '@/src/enums'
import BrowsePromptsFooter from '@/src/components/Modals/BrowsePromptsModal/BrowsePromptsFooter'
import BrowsePromptsHeader from '@/src/components/Modals/BrowsePromptsModal/BrowsePromptsHeader'
import PreviewPrompt from '@/src/components/Modals/BrowsePromptsModal/PreviewPrompt'
import CustomPrompt from '@/src/components/Modals/BrowsePromptsModal/CustomPrompt'
import CreateCustomPrompt from '@/src/components/Modals/BrowsePromptsModal/CreateCustomPrompt'

const BrowsePromptsModal = () => {
    const isPromptsListLoading = useSelector(
        promptSelector.isPromptsListLoading
    )
    const isPromptDeleteLoading = useSelector(
        promptSelector.isPromptDeleteLoading
    )
    const promptsList = useSelector(promptSelector.promptsList)
    const customPrompts = useSelector(promptSelector.customPrompts)
    const activePromptId = useSelector(promptSelector.activePromptId)

    useEffect(() => {
        if (activePromptId) {
            const isCustom = customPrompts?.find(
                (item) => item._id === activePromptId
            )
            if (isCustom) {
                dispatch(promptMiddleware.updateIsCustomPromptActive(true))
            } else {
                dispatch(promptMiddleware.updateIsCustomPromptActive(false))
            }
        }
    }, [activePromptId])

    useEffect(() => {
        if (promptsList?.length) {
            const tempArrCustomPrompts = promptsList?.filter((item) =>
                item.categories.includes(PromptCategoryEnum.Custom)
            )
            dispatch(promptMiddleware.updateFilteredList(tempArrCustomPrompts))
            if (activePromptId) {
                dispatch(
                    promptMiddleware.updateSelectedPrompt(
                        promptsList?.filter(
                            (item) => item._id === activePromptId && item
                        )[0]
                    )
                )
            }
        }
    }, [promptsList])

    useEffect(() => {
        dispatch(promptMiddleware.getPromptsCategories())
        dispatch(promptMiddleware.getPromptsList())
        dispatch(promptMiddleware.getCustomPrompts())
    }, [])

    return (
        <div
            id="modalContainer"
            className={`fixed inset-0 z-50 flex items-center justify-center drop-shadow`}
        >
            <div className="relative h-[550px] w-[1000px] rounded-xl bg-white text-blue-dark shadow-lg">
                <BrowsePromptsHeader />
                <div className="-mx-8 opacity-40">
                    <div className="h-0 w-full border border-gray-300"></div>
                </div>
                <div className="flex w-full items-start justify-start pl-3.5">
                    <CustomPrompt />
                    {isPromptsListLoading || isPromptDeleteLoading ? (
                        <div className="flex h-[360px] w-4/12 items-center justify-center">
                            <Loader />
                        </div>
                    ) : (
                        <CreateCustomPrompt />
                    )}

                    <div className="flex w-5/12 flex-col items-end self-stretch p-3">
                        <PreviewPrompt />
                        <div>
                            <BrowsePromptsFooter />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BrowsePromptsModal
