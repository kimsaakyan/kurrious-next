import { Button } from '@/src/components/ui/button'
import React, { useEffect, useState } from 'react'
import CloseIcon from '@/src/components/Icons/CloseIcon'
import { dispatch } from '@/src/redux/hooks'
import { viewsMiddleware } from '@/src/redux/slices/views/index'
import { ModalName } from '@/src/types/modals'
import { PromptCategoryEnum } from '@/src/enums'
import { brainMiddleware, brainSelector } from '../../../redux/slices/brain'
import { useSelector } from 'react-redux'
import BrainText from '@/src/components/Modals/BrainPromptModal/BrainText'
import BrainFiles from '@/src/components/Modals/BrainPromptModal/BrainFiles'
import BrainWebsite from '@/src/components/Modals/BrainPromptModal/BrainWebsite'

const BrainPromptModal = () => {
    const [isActive, setIsActive] = useState<string>(PromptCategoryEnum.Text)
    const [prompt, setPrompt] = useState<string>('')
    const [completion, setCompletion] = useState<string>('')
    const selectedFiles = useSelector(brainSelector.selectedFiles)
    const folderIdCurrent = useSelector(brainSelector.folderIdCurrent)
    const isBrainLoading = useSelector(brainSelector.isBrainListLoading)

    const closeModal = () => {
        dispatch(viewsMiddleware.closeModal(ModalName.BrainPromptModal))
    }
    const onAddPromptClick = () => {
        if (isActive === PromptCategoryEnum.Text) {
            dispatch(
                brainMiddleware.createNewText(
                    { name: prompt, completion },
                    folderIdCurrent
                )
            )
        } else if (isActive === PromptCategoryEnum.Files) {
            if (selectedFiles) {
                selectedFiles.forEach((file) => {
                    const form = new FormData()
                    form.append('file', file as Blob)
                    dispatch(
                        brainMiddleware.createNewFile(form, folderIdCurrent)
                    )
                })
            }
        }
    }

    useEffect(() => {
        dispatch(brainMiddleware.updateSelectedFile(null))
    }, [])

    return (
        <div
            id="modalContainer"
            className={`fixed  inset-0 z-50 flex items-center justify-center bg-gray-transparent drop-shadow`}
        >
            <div className="relative h-auto w-[800px] rounded-xl bg-white text-blue-dark shadow-lg">
                <div className="relative flex w-full items-center justify-center px-7 py-5 text-xl">
                    <div className="text-lg font-medium text-blue-dark">
                        Create prompt
                    </div>
                    <div
                        onClick={closeModal}
                        className="absolute right-6 cursor-pointer p-2"
                    >
                        <CloseIcon />
                    </div>
                </div>
                <div className="px-6 pb-5">
                    <div className="flex w-full  justify-center space-x-7.5">
                        <div
                            className={`${
                                isActive === PromptCategoryEnum.Text
                                    ? 'border-b-2 border-primary text-primary'
                                    : 'text-blue-dark'
                            } leading-4.5 cursor-pointer text-xs font-normal`}
                            onClick={() => setIsActive(PromptCategoryEnum.Text)}
                        >
                            Text
                        </div>
                        <div
                            className={`${
                                isActive === PromptCategoryEnum.Files
                                    ? 'border-b-2 border-primary text-primary'
                                    : 'text-blue-dark'
                            } leading-4.5 cursor-pointer text-xs font-normal`}
                            onClick={() =>
                                setIsActive(PromptCategoryEnum.Files)
                            }
                        >
                            Files
                        </div>
                        <div
                            className={`${
                                isActive === PromptCategoryEnum.Website
                                    ? 'border-b-2 border-primary text-primary'
                                    : 'text-blue-dark'
                            } leading-4.5 cursor-pointer text-xs font-normal`}
                            onClick={() =>
                                setIsActive(PromptCategoryEnum.Website)
                            }
                        >
                            Website
                        </div>
                    </div>
                    <div className="w-full py-5">
                        {isActive === PromptCategoryEnum.Text && (
                            <BrainText
                                setPrompt={setPrompt}
                                setDescription={setCompletion}
                                description={completion}
                                prompt={prompt}
                            />
                        )}
                        {isActive === PromptCategoryEnum.Files && (
                            <BrainFiles />
                        )}
                        {isActive === PromptCategoryEnum.Website && (
                            <BrainWebsite />
                        )}
                    </div>
                    <div className="flex items-center justify-start">
                        <Button
                            variant="outline"
                            onClick={closeModal}
                            className="mr-2.5 border-gray-450"
                            size="base"
                        >
                            Cancel
                        </Button>
                        {isActive !== PromptCategoryEnum.Website && (
                            <Button
                                size="base"
                                disabled={isBrainLoading}
                                onClick={onAddPromptClick}
                                isLoading={isBrainLoading}
                            >
                                Add prompt
                            </Button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BrainPromptModal
