import { createSelector } from '@reduxjs/toolkit'
import { RootState } from '@/src/redux/store'

const selector = (state: RootState) => state.brain

export const brainList = createSelector([selector], (state) => state.treeNode)

export const contextMenuList = createSelector(
    [selector],
    (state) => state.contextMenuItems
)

export const selectedFiles = createSelector(
    [selector],
    (state) => state.selectedFiles
)

export const isFolderOrFileDeleteLoading = createSelector(
    [selector],
    (state) => state.isFolderOrFileDeleteLoading
)

export const isBrainListLoading = createSelector(
    [selector],
    (state) => state.brainLoading
)

export const folderContentsCurrent = createSelector(
    [selector],
    (state) => state.folderContentsCurrent
)

export const folderContentsPrevious = createSelector(
    [selector],
    (state) => state.folderContentsPrevious
)

export const folderContentsNext = createSelector(
    [selector],
    (state) => state.folderContentsNext
)

export const activeFinderFolderData = createSelector(
    [selector],
    (state) => state.activeFinderFolderData
)

export const activeFinderFolderDataNext = createSelector(
    [selector],
    (state) => state.activeFinderFolderDataNext
)

export const showTreeNodeInputName = createSelector(
    [selector],
    (state) => state.showTreeNodeInputName
)

export const editNameMode = createSelector(
    [selector],
    (state) => state.editNameMode
)

export const treeNodeLabelField = createSelector(
    [selector],
    (state) => state.treeNodeLabelField
)

export const isLoadingFileView = createSelector(
    [selector],
    (state) => state.isLoadingFileView
)

export const fileContent = createSelector(
    [selector],
    (state) => state.fileContent
)

export const folderIdCurrent = createSelector(
    [selector],
    (state) => state.folderIdCurrent
)

export const searchInRootFolder = createSelector(
    [selector],
    (state) => state.searchInRootFolder
)

export const searchText = createSelector(
    [selector],
    (state) => state.searchText
)

export const highlightId = createSelector(
    [selector],
    (state) => state.highlightId
)

export default {
    brainList,
    contextMenuList,
    selectedFiles,
    folderIdCurrent,
    isFolderOrFileDeleteLoading,
    isBrainListLoading,
    folderContentsCurrent,
    folderContentsNext,
    folderContentsPrevious,
    activeFinderFolderData,
    activeFinderFolderDataNext,
    showTreeNodeInputName,
    editNameMode,
    treeNodeLabelField,
    isLoadingFileView,
    fileContent,
    searchInRootFolder,
    searchText,
    highlightId,
}
