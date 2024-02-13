import ArrowLeftChevronIcon from '@/src/components/Icons/ArrowLeftChevronIcon'
import React from 'react'
import { useSelector } from 'react-redux'
import { brainMiddleware, brainSelector } from '@/src/redux/slices/brain'
import { dispatch } from '@/src/redux/hooks'
import { LanuageModelListStatus } from '@/src/enums'

const RightChevron = () => {
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

    const handleRightClick = () => {
        if (activeFinderFolderDataNext && activeFinderFolderDataNext.length) {
            const folderSelected = [
                ...activeFinderFolderDataNext.slice(
                    0,
                    activeFinderFolderDataNext.length - 1
                ),
            ]
            dispatch(
                brainMiddleware.updateFolderIdCurrent(
                    activeFinderFolderDataNext[
                        activeFinderFolderDataNext.length - 1
                    ]?.id
                )
            )
            dispatch(
                brainMiddleware.updateBrainList(
                    [...folderContentsPrevious, [...folderContentsCurrent]],
                    LanuageModelListStatus.previous
                )
            )
            dispatch(
                brainMiddleware.updateBrainList(
                    folderContentsNext[folderContentsNext.length - 1],
                    LanuageModelListStatus.current
                )
            )
            dispatch(
                brainMiddleware.updateBrainList(
                    folderContentsNext.slice(0, folderContentsNext.length - 1),
                    LanuageModelListStatus.next
                )
            )
            dispatch(brainMiddleware.updateNameMode(null))
            dispatch(
                brainMiddleware.updateBrainHeader(
                    folderSelected,
                    LanuageModelListStatus.next
                )
            )
            dispatch(
                brainMiddleware.updateBrainHeader(
                    [
                        ...activeFinderFolderData,
                        activeFinderFolderDataNext[
                            activeFinderFolderDataNext.length - 1
                        ],
                    ],
                    LanuageModelListStatus.previous
                )
            )
        }
    }

    return (
        <div
            className="mr-2 rotate-180 cursor-pointer"
            onClick={handleRightClick}
        >
            <ArrowLeftChevronIcon
                className={
                    folderContentsNext && folderContentsNext.length
                        ? 'stroke-gray-550'
                        : 'stroke-gray-800'
                }
            />
        </div>
    )
}

export default RightChevron
