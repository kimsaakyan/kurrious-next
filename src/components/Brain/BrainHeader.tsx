import PageHeader from '@/src/components/PageHeader/PageHeader'
import ArrowLeftChevronIcon from '@/src/components/Icons/ArrowLeftChevronIcon'
import React from 'react'
import { dispatch } from '@/src/redux/hooks'
import { brainMiddleware, brainSelector } from '../../redux/slices/brain'
import { viewsMiddleware } from '@/src/redux/slices/views'
import { ModalName } from '@/src/types/modals'
import { useSelector } from 'react-redux'
import ArrowsChevron from '@/src/components/Brain/ArrowsChevron'
import { ITreeNode } from '@/src/types/redux/brain'
import { LanuageModelListStatus } from '@/src/enums'
import { CheckRoles } from '@/src/utils/hooks/checkRoles'
import { authSelector } from '@/src/redux/slices/auth'
import { USER_ROLES } from '@/src/roles/roles'

const BrainHeader = () => {
    const activeFinderFolderData = useSelector(
        brainSelector.activeFinderFolderData
    )
    const searchText = useSelector(brainSelector.searchText)
    const folderContentsPrevious = useSelector(
        brainSelector.folderContentsPrevious
    )
    const currentUser = useSelector(authSelector.currentUser)
    const brainList = useSelector(brainSelector.brainList)

    const findInFolderItems = (
        folder: ITreeNode,
        searchTerm: string
    ): ITreeNode[] => {
        const results: ITreeNode[] = []

        if (folder.name && folder.name.includes(searchTerm)) {
            results.push(folder)
        }

        if (folder.folderItems) {
            results.push(
                ...folder.folderItems.flatMap((subItem) =>
                    findInFolderItems(subItem, searchTerm)
                )
            )
        }

        return results
    }

    const searchInRootFolder = (
        rootFolder: ITreeNode | ITreeNode[],
        searchTerm: string
    ): ITreeNode[] => {
        if (!searchTerm) {
            return []
        }

        if (Array.isArray(rootFolder)) {
            return rootFolder.flatMap((folder) =>
                findInFolderItems(folder, searchTerm)
            )
        }

        return findInFolderItems(rootFolder, searchTerm)
    }

    const onSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(brainMiddleware.updateSearchText(e.target.value))
        const result = searchInRootFolder(brainList, e.target.value)
        dispatch(brainMiddleware.searchFolderOrFile(result))
        dispatch(brainMiddleware.searchFolderOrFile(result))
        dispatch(
            brainMiddleware.updateBrainList([], LanuageModelListStatus.current)
        )
        dispatch(
            brainMiddleware.updateBrainHeader(
                [],
                LanuageModelListStatus.previous
            )
        )
    }

    const onAddNewDataClick = () => {
        dispatch(
            viewsMiddleware.openModal({
                name: ModalName.BrainPromptModal,
                props: {},
            })
        )
    }

    const removeObjectsToRight = (
        array: ITreeNode[],
        itemToken: string | null
    ) => {
        const index = array.findIndex((item) => item.id === itemToken)
        dispatch(
            brainMiddleware.updateBrainList(
                index !== -1
                    ? folderContentsPrevious.slice(0, index + 1)
                    : folderContentsPrevious,
                LanuageModelListStatus.previous
            )
        )
        return index !== -1 ? array.slice(0, index + 1) : array
    }

    const onFolderNameClick = (itemProp: ITreeNode) => {
        const activeFinderItem: ITreeNode | undefined =
            activeFinderFolderData.find((item) => item.id === itemProp.id)

        if (activeFinderItem) {
            dispatch(
                brainMiddleware.updateBrainList(
                    activeFinderItem.folderItems,
                    LanuageModelListStatus.current
                )
            )
            dispatch(brainMiddleware.updateNameMode(null))
            dispatch(
                brainMiddleware.updateBrainHeader(
                    [],
                    LanuageModelListStatus.next
                )
            )
            dispatch(
                brainMiddleware.updateBrainList([], LanuageModelListStatus.next)
            )
            const newArray = removeObjectsToRight(
                activeFinderFolderData,
                activeFinderItem.id
            )

            dispatch(
                brainMiddleware.updateBrainHeader(
                    newArray,
                    LanuageModelListStatus.previous
                )
            )
            dispatch(brainMiddleware.updateFolderIdCurrent(activeFinderItem.id))
        }
    }

    return (
        <div className="w-full">
            <PageHeader
                {...(CheckRoles(
                    [
                        USER_ROLES.KURIOUS_SALES,
                        USER_ROLES.KURIOUS_SUPERUSER,
                        USER_ROLES.CLIENT_ADMIN,
                    ],
                    currentUser?.userType
                ) && {
                    showButton: true,
                })}
                buttonText="Add new Data"
                onButtonClick={onAddNewDataClick}
                title={
                    <div className="flex items-center">
                        {activeFinderFolderData &&
                        activeFinderFolderData.length > 0 ? (
                            <>
                                <ArrowsChevron />
                                <div className="... flex items-center	truncate">
                                    {activeFinderFolderData.map(
                                        (item, index) => (
                                            <div
                                                onClick={() =>
                                                    onFolderNameClick(item)
                                                }
                                                key={index}
                                                className="flex cursor-pointer items-center"
                                            >
                                                <div>{item.name}</div>
                                                {activeFinderFolderData.length -
                                                    1 !==
                                                    index && (
                                                    <div className="rotate-180">
                                                        <ArrowLeftChevronIcon className="stroke-gray-550" />
                                                    </div>
                                                )}
                                            </div>
                                        )
                                    )}
                                </div>
                            </>
                        ) : (
                            <div className="...	flex items-center truncate">
                                <div>Brain</div>
                                <div className="m-1 rotate-180">
                                    <ArrowLeftChevronIcon className="stroke-gray-550" />
                                </div>
                                <div>Root</div>
                            </div>
                        )}
                    </div>
                }
                showSearchBox
                searchValue={searchText}
                onSearchChange={onSearchChange}
            />
        </div>
    )
}

export default BrainHeader
