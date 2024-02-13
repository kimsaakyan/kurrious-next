import React, { MouseEvent, useEffect, useState } from 'react'
import SettingsLayout from '@/src/layouts/Settings/SettingsLayout'
import CollapsibleTree from '@/src/components/FolderTree/CollapsibleTree'
import { dispatch } from '@/src/redux/hooks'
import { useSelector } from 'react-redux'
import LoadingIcon from '@/src/components/Icons/LoadingIcon'
import { brainMiddleware, brainSelector } from '../../redux/slices/brain'
import ContextMenu from '@/src/components/ContextMenu/ContextMenu'
import {
    IContextMenuItems,
    ICreateFolderOrFileModal,
} from '@/src/types/redux/brain'
import { contextMenuItems } from '@/src/data/contextMenuData'
import BrainHeader from '@/src/components/Brain/BrainHeader'
import { CheckRoles } from '@/src/utils/hooks/checkRoles'
import { USER_ROLES } from '@/src/roles/roles'
import { authSelector } from '@/src/redux/slices/auth'
import { CheckAuth } from '@/src/utils/hooks/checkAuth'
import { useRouter } from 'next/router'
import { CheckMaxFolderDepth } from '@/src/utils/hooks/checkMaxFolderDepth'
import { CheckValidFileTypes } from '@/src/utils/hooks/checkValidFileTypes'

const Brain = () => {
    const router = useRouter()
    const brainList = useSelector(brainSelector.brainList)
    const searchInRootFolder = useSelector(brainSelector.searchInRootFolder)
    const currentUser = useSelector(authSelector.currentUser)
    const isLoadingAuth = useSelector(authSelector.isLoadingAuth)

    const isBrainListLoading = useSelector(brainSelector.isBrainListLoading)
    const folderContentsCurrent = useSelector(
        brainSelector.folderContentsCurrent
    )
    const activeFinderFolderData = useSelector(
        brainSelector.activeFinderFolderData
    )
    const [selectedItem, setSelectedItem] =
        useState<ICreateFolderOrFileModal | null>()
    const contextMenuList = useSelector(brainSelector.contextMenuList)
    const [menuPosition, setMenuPosition] = useState<{ x: number; y: number }>({
        x: 0,
        y: 0,
    })
    const [isMenuVisible, setMenuVisible] = useState<boolean>(false)

    const handleContextMenu = (
        e: MouseEvent<HTMLDivElement>,
        contextMenuItemsProp: IContextMenuItems[],
        item?: ICreateFolderOrFileModal | null
    ) => {
        e.preventDefault()

        const position = {
            x: e.clientX,
            y: e.clientY,
        }

        dispatch(brainMiddleware.updateContextMenuItems(contextMenuItemsProp))
        if (item) {
            setSelectedItem(item)
        } else {
            setSelectedItem(null)
        }

        setMenuPosition(position)
        setMenuVisible(true)
    }

    const closeMenu = () => {
        setMenuVisible(false)
    }

    const getCollapsibleTreeData = () => {
        if (searchInRootFolder && searchInRootFolder.length) {
            return searchInRootFolder
        }
        if (activeFinderFolderData && activeFinderFolderData.length) {
            return folderContentsCurrent
        }
        return brainList
    }

    useEffect(() => {
        CheckAuth(
            [
                USER_ROLES.KURIOUS_SALES,
                USER_ROLES.KURIOUS_SUPERUSER,
                USER_ROLES.CLIENT_ADMIN,
            ],
            currentUser,
            isLoadingAuth
        )
    }, [router, isLoadingAuth])

    useEffect(() => {
        dispatch(brainMiddleware.displayRootFolderContentsDefault())
        dispatch(brainMiddleware.updateHighlightId(''))
    }, [])

    const handleOnDrop = (e: React.DragEvent) => {
        e.preventDefault()
        e.stopPropagation()
        const fileArray = Array.from(e.dataTransfer.files)
        if (CheckValidFileTypes(fileArray)) {
            fileArray.forEach((file) => {
                const formData = new FormData()
                formData.append('file', file)
                dispatch(brainMiddleware.uploadFile(formData))
            })
        }
    }

    const handleOnDragOver = (e: React.DragEvent) => {
        e.preventDefault()
        e.stopPropagation()
    }

    return (
        <div
            className="h-full"
            onDrop={handleOnDrop}
            onDragOver={handleOnDragOver}
        >
            <div className="flex w-full items-center">
                <div className="flex w-full items-center">
                    <BrainHeader />
                </div>
            </div>
            <div className="flex w-full items-center justify-between bg-slate px-6 py-3.5 text-xs font-semibold text-gray-550">
                <span>Name</span>
                <span>Tokens</span>
                <span>Description</span>
            </div>
            {isBrainListLoading ? (
                <div className="relative flex h-4/5	 w-full items-center justify-center text-[40px]">
                    <LoadingIcon />
                </div>
            ) : (
                <div
                    className="h-5/6 overflow-y-auto pb-2"
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
                                    id: null,
                                    name: null,
                                })
                            },
                        })}
                >
                    <CollapsibleTree
                        data={getCollapsibleTreeData()}
                        handleContextMenu={handleContextMenu}
                    />
                    <ContextMenu
                        isVisible={isMenuVisible}
                        position={menuPosition}
                        items={contextMenuList}
                        onClose={closeMenu}
                        props={selectedItem}
                    />
                </div>
            )}
        </div>
    )
}

export default Brain

Brain.getLayout = function getLayout(page: ReactNode) {
    return <SettingsLayout>{page}</SettingsLayout>
}
