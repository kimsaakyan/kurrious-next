import React, { MouseEvent, useEffect, useState } from 'react'
import {
    IContextMenuItems,
    ICreateFolderOrFileModal,
    ITreeNode,
} from '@/src/types/redux/brain'
import {
    contextMenuItemDelete,
    contextMenuItems,
    contextMenuItemsFile,
    contextMenuItemsOnlyDownload,
    contextMenuItemsSecondary,
} from '@/src/data/contextMenuData'
import { useSelector } from 'react-redux'
import { brainMiddleware, brainSelector } from '../../redux/slices/brain'
import { dispatch } from '@/src/redux/hooks'
import { FileTypes, LanuageModelListStatus } from '@/src/enums'
import RowContent from '@/src/components/FolderTree/RowContent'
import { viewsMiddleware } from '@/src/redux/slices/views'
import { ModalName } from '@/src/types/modals'
import { CheckRoles } from '@/src/utils/hooks/checkRoles'
import { USER_ROLES } from '@/src/roles/roles'
import { authSelector } from '@/src/redux/slices/auth'
import { CheckValidFileTypes } from '@/src/utils/hooks/checkValidFileTypes'
import { CheckMaxFolderDepth } from '@/src/utils/hooks/checkMaxFolderDepth'

const TreeNode = ({
    index,
    data,
    handleContextMenu,
    treeNode,
}: {
    index: number
    data: ITreeNode[]
    treeNode: ITreeNode
    handleContextMenu: (
        e: MouseEvent<HTMLDivElement>,
        data: IContextMenuItems[],
        item: ICreateFolderOrFileModal
    ) => void
}) => {
    const textMaxLength = 90
    const [isOpen, setIsOpen] = useState(false)
    const backgroundColors = ['bg-white', 'bg-slate']
    const folderContentsPrevious = useSelector(
        brainSelector.folderContentsPrevious
    )
    const highlightId = useSelector(brainSelector.highlightId)
    const currentUser = useSelector(authSelector.currentUser)
    const showTreeNodeInputName = useSelector(
        brainSelector.showTreeNodeInputName
    )
    const activeFinderFolderData = useSelector(
        brainSelector.activeFinderFolderData
    )
    const editNameMode = useSelector(brainSelector.editNameMode)

    const toggleNode = () => {
        setIsOpen(!isOpen)
        dispatch(brainMiddleware.updateHighlightId(treeNode.id))
    }

    const handleDoubleClick = () => {
        if (!showTreeNodeInputName && treeNode.type === FileTypes.FOLDER) {
            dispatch(brainMiddleware.updateSearchText(''))
            dispatch(brainMiddleware.searchFolderOrFile([]))
            dispatch(
                brainMiddleware.updateBrainList(
                    treeNode.folderItems,
                    LanuageModelListStatus.current
                )
            )
            dispatch(
                brainMiddleware.updateBrainList(
                    [...folderContentsPrevious, [...data]],
                    LanuageModelListStatus.previous
                )
            )
            dispatch(
                brainMiddleware.updateBrainList([], LanuageModelListStatus.next)
            )
            dispatch(
                brainMiddleware.updateBrainHeader(
                    [...activeFinderFolderData, { ...treeNode }],
                    LanuageModelListStatus.previous
                )
            )
            dispatch(
                brainMiddleware.updateBrainHeader(
                    [],
                    LanuageModelListStatus.next
                )
            )
            dispatch(brainMiddleware.updateFolderIdCurrent(treeNode.id))
            dispatch(brainMiddleware.updateHighlightId(''))
        } else if (!editNameMode) {
            dispatch(
                viewsMiddleware.openModal({
                    name: ModalName.PreviewFileModal,
                    props: treeNode,
                })
            )
        }
    }

    const getContextMenuData = () => {
        dispatch(brainMiddleware.updateHighlightId(treeNode.id))
        if (
            CheckRoles([USER_ROLES.CLIENT_USER], currentUser?.userType) &&
            treeNode.type !== FileTypes.FOLDER
        ) {
            return contextMenuItemsOnlyDownload
        } else if (
            CheckRoles(
                [
                    USER_ROLES.KURIOUS_SALES,
                    USER_ROLES.KURIOUS_SUPERUSER,
                    USER_ROLES.CLIENT_ADMIN,
                ],
                currentUser?.userType
            )
        ) {
            if (treeNode.type === FileTypes.FOLDER) {
                return contextMenuItemsSecondary
            } else if (treeNode.type === FileTypes.URL) {
                return [contextMenuItemDelete]
            } else {
                return contextMenuItemsFile
            }
        } else {
            return null
        }
    }

    const handleRowClick = (e: React.MouseEvent<HTMLDivElement>) => {
        e.preventDefault()
        e.stopPropagation()

        const menuData = getContextMenuData()
        if (menuData) {
            handleContextMenu(e, menuData, {
                name: treeNode.name,
                id: treeNode.id,
                type: treeNode.type,
                fileType: treeNode.fileType,
            })
        }
    }

    const handleOnDrop = (e: React.DragEvent) => {
        e.preventDefault()
        e.stopPropagation()

        if (
            e.dataTransfer.files.length > 0 &&
            treeNode.type === FileTypes.FOLDER
        ) {
            const fileArray = Array.from(e.dataTransfer.files)
            if (CheckValidFileTypes(fileArray)) {
                fileArray.forEach((file) => {
                    const formData = new FormData()
                    formData.append('file', file)
                    dispatch(brainMiddleware.uploadFile(formData, treeNode.id))
                })
            }
        }
    }

    const handleOnDragOver = (e: React.DragEvent) => {
        e.preventDefault()
        e.stopPropagation()
    }

    useEffect(() => {
        if (editNameMode?.id === treeNode.id) {
            dispatch(brainMiddleware.updateTreeNodeLabelField(treeNode.name))
        }
    }, [editNameMode])

    return (
        <div>
            <div
                onDrop={handleOnDrop}
                onDragOver={handleOnDragOver}
                className={`flex items-center px-4 ${
                    highlightId === treeNode.id && '!bg-blue-400'
                }`}
            >
                <div
                    onDoubleClick={handleDoubleClick}
                    onClick={toggleNode}
                    onContextMenu={handleRowClick}
                    className={`relative flex ${
                        treeNode.name.length > textMaxLength && 'w-2/4'
                    } cursor-pointer items-center whitespace-nowrap py-2 pl-4`}
                >
                    <RowContent
                        textMaxLength={textMaxLength}
                        isOpen={isOpen}
                        treeNode={treeNode}
                    />
                </div>
                <div
                    {...(CheckRoles(
                        [
                            USER_ROLES.KURIOUS_SALES,
                            USER_ROLES.KURIOUS_SUPERUSER,
                            USER_ROLES.CLIENT_ADMIN,
                        ],
                        currentUser?.userType
                    ) &&
                        CheckMaxFolderDepth(activeFinderFolderData) && {
                            onContextMenu: (e) => {
                                handleContextMenu(e, contextMenuItems, {
                                    name: treeNode.name,
                                    id: treeNode.id,
                                })
                            },
                        })}
                    className="h-5 w-full"
                />
            </div>
            <div>
                {isOpen && (
                    <div className="pl-8">
                        {treeNode.folderItems &&
                            treeNode.folderItems.map((child, indexChild) => (
                                <div
                                    key={indexChild}
                                    className={`${
                                        backgroundColors[
                                            (indexChild + index) %
                                                backgroundColors.length
                                        ]
                                    }`}
                                >
                                    <TreeNode
                                        index={indexChild}
                                        data={data}
                                        treeNode={child}
                                        handleContextMenu={handleContextMenu}
                                    />
                                </div>
                            ))}
                    </div>
                )}
            </div>
        </div>
    )
}

export default TreeNode
