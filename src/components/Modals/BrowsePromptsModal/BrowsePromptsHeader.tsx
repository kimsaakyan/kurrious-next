import { Input } from '@/src/components/ui/input'
import CloseIcon from '@/src/components/Icons/CloseIcon'
import React, { useEffect } from 'react'
import { ModalName } from '@/src/types/modals'
import { dispatch } from '@/src/redux/hooks'
import { viewsMiddleware } from '@/src/redux/slices/views'
import { promptMiddleware, promptSelector } from '@/src/redux/slices/prompts'
import { useSelector } from 'react-redux'

const BrowsePromptsHeader = () => {
    const searchValue = useSelector(promptSelector.searchValue)
    const promptsList = useSelector(promptSelector.promptsList)

    useEffect(() => {
        if (searchValue) {
            dispatch(promptMiddleware.updateSelectedPrompt(null))
        }

        const searchedFilterDataList = promptsList?.filter((item) =>
            item.name.toLowerCase().includes(searchValue.toLowerCase())
        )

        if (searchedFilterDataList?.length) {
            dispatch(
                promptMiddleware.updateFilteredList(searchedFilterDataList)
            )
        } else {
            dispatch(promptMiddleware.updateFilteredList([]))
        }
    }, [searchValue])

    return (
        <div className="flex items-center justify-between px-7 pb-3 pt-4 text-xl">
            <div className="flex w-full items-center justify-start">
                <div className="w-40 text-sm font-semibold">Prompts</div>
                <Input
                    value={searchValue}
                    onChange={(event) => {
                        dispatch(
                            promptMiddleware.updateSearchValue(
                                event.target.value
                            )
                        )
                    }}
                    size="sm"
                    placeholder="Search..."
                    className="flex w-64 resize-none items-center rounded-lg bg-gray-300 text-xs text-gray-450 shadow-sm transition-all placeholder:text-gray-450
                        focus:border-blue-light focus:outline-none focus:ring-0"
                />
            </div>
            <div
                onClick={() =>
                    dispatch(
                        viewsMiddleware.closeModal(ModalName.BrowsePromptsModal)
                    )
                }
                className="cursor-pointer p-2"
            >
                <CloseIcon />
            </div>
        </div>
    )
}

export default BrowsePromptsHeader
