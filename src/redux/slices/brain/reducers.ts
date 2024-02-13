import { SliceCaseReducers } from '@reduxjs/toolkit/src/createSlice'
import { IAction } from '@/src/redux/store'
import {
    IContextMenuItems,
    IFile,
    ITreeNode,
    brainProps,
    ICreateFolderOrFileModal,
} from '@/src/types/redux/brain'

const createReducer = <T extends SliceCaseReducers<brainProps>>(
    reducer: T
) => ({ ...reducer })

const reducers = createReducer({
    setBrainListLoading(state, action: IAction<boolean>) {
        state.brainLoading = action.payload
    },
    setBrainList(state, action: IAction<ITreeNode[]>) {
        state.treeNode = action.payload
    },
    setSearchInRootFolder(state, action: IAction<ITreeNode[]>) {
        state.searchInRootFolder = action.payload
    },
    setContextMenuItems(state, action: IAction<IContextMenuItems[]>) {
        state.contextMenuItems = action.payload
    },
    setSelectedFile(state, action: IAction<IFile[] | null>) {
        state.selectedFiles = action.payload
    },
    setIsFolderOrFileDeleteLoading(state, action: IAction<boolean>) {
        state.isFolderOrFileDeleteLoading = action.payload
    },
    setFolderContentsCurrent(state, action: IAction<ITreeNode[]>) {
        state.folderContentsCurrent = action.payload
    },
    setFolderDataPreviousContents(state, action: IAction<ITreeNode[]>) {
        state.folderContentsPrevious = action.payload
    },
    setFolderDataNextContents(state, action: IAction<ITreeNode[]>) {
        state.folderContentsNext = action.payload
    },
    setActiveFinderFolderData(state, action: IAction<ITreeNode[]>) {
        state.activeFinderFolderData = action.payload
    },
    setActiveFinderFolderDataNext(state, action: IAction<ITreeNode[]>) {
        state.activeFinderFolderDataNext = action.payload
    },
    setShowTreeNodeInputName(state, action: IAction<boolean>) {
        state.showTreeNodeInputName = action.payload
    },
    setEditNameMode(state, action: IAction<ICreateFolderOrFileModal | null>) {
        state.editNameMode = action.payload
    },
    setTreeNodeLabelField(state, action: IAction<string>) {
        state.treeNodeLabelField = action.payload
    },
    setIsLoadingProfileFile(state, action: IAction<boolean>) {
        state.isLoadingFileView = action.payload
    },
    setFileContent(state, action: IAction<string | Blob>) {
        state.fileContent = action.payload
    },
    setFolderIdCurrent(state, action: IAction<string>) {
        state.folderIdCurrent = action.payload
    },
    setSearchText(state, action: IAction<string>) {
        state.searchText = action.payload
    },
    setHighlightId(state, action: IAction<string>) {
        state.highlightId = action.payload
    },
    setShouldExecuteScroll(state, action: IAction<boolean>) {
        state.showTreeNodeInputName = action.payload
    },
})

export default reducers
