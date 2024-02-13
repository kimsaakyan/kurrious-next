import ArrowLeftChevronIcon from '@/src/components/Icons/ArrowLeftChevronIcon'
import React from 'react'
import { dispatch } from '@/src/redux/hooks'
import { brainMiddleware, brainSelector } from '@/src/redux/slices/brain'
import { LanuageModelListStatus } from '@/src/enums'
import { useSelector } from 'react-redux'

const LeftChevron = () => {
    const folderContentsNext = useSelector(brainSelector.folderContentsNext)
    const folderContentsPrevious = useSelector(
        brainSelector.folderContentsPrevious
    )
    const activeFinderFolderData = useSelector(
        brainSelector.activeFinderFolderData
    )
    const activeFinderFolderDataNext = useSelector(
        brainSelector.activeFinderFolderDataNext
    )
    const folderContentsCurrent = useSelector(
        brainSelector.folderContentsCurrent
    )

    const handleLeftClick = () => {
        if (activeFinderFolderData) {
            const folderSelected = activeFinderFolderData.slice(
                0,
                activeFinderFolderData.length - 1
            )

            dispatch(
                brainMiddleware.updateBrainList(
                    [...folderContentsNext, [...folderContentsCurrent]],
                    LanuageModelListStatus.next
                )
            )
            dispatch(
                brainMiddleware.updateBrainList(
                    folderContentsPrevious[folderContentsPrevious.length - 1],
                    LanuageModelListStatus.current
                )
            )
            dispatch(
                brainMiddleware.updateBrainList(
                    folderContentsPrevious.slice(
                        0,
                        folderContentsPrevious.length - 1
                    ),
                    LanuageModelListStatus.previous
                )
            )
            dispatch(
                brainMiddleware.updateBrainHeader(
                    folderSelected,
                    LanuageModelListStatus.previous
                )
            )
            dispatch(brainMiddleware.updateNameMode(null))
            if (!(activeFinderFolderData.length - 1)) {
                dispatch(
                    brainMiddleware.updateBrainHeader(
                        [],
                        LanuageModelListStatus.next
                    )
                )
                dispatch(
                    brainMiddleware.updateBrainList(
                        [],
                        LanuageModelListStatus.current
                    )
                )
                dispatch(brainMiddleware.updateFolderIdCurrent(''))
            } else {
                dispatch(
                    brainMiddleware.updateBrainHeader(
                        [
                            ...activeFinderFolderDataNext,
                            activeFinderFolderData[
                                activeFinderFolderData.length - 1
                            ],
                        ],
                        LanuageModelListStatus.next
                    )
                )
                dispatch(
                    brainMiddleware.updateFolderIdCurrent(
                        folderSelected[folderSelected.length - 1].id
                    )
                )
            }
        }
    }

    return (
        <div
            className="cursor-pointer text-[#D0D0D2]"
            onClick={handleLeftClick}
        >
            <ArrowLeftChevronIcon
                className={
                    folderContentsPrevious && folderContentsPrevious.length
                        ? 'stroke-gray-550'
                        : 'stroke-gray-800'
                }
            />
        </div>
    )
}

export default LeftChevron
