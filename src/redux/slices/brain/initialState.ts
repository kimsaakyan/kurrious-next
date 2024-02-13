import { brainProps } from '@/src/types/redux/brain'

export const getInitialState = (): brainProps => ({
    brainLoading: false,
    contextMenuItems: null,
    selectedFiles: null,
    folderContentsCurrent: [],
    folderContentsPrevious: [],
    folderContentsNext: [],
    activeFinderFolderData: [],
    showTreeNodeInputName: false,
    activeFinderFolderDataNext: [],
    treeNode: [],
    highlightId: '',
    isFolderOrFileDeleteLoading: false,
    editNameMode: null,
    treeNodeLabelField: '',
    isLoadingFileView: false,
    fileContent: '',
    folderIdCurrent: '',
    searchInRootFolder: [],
    searchText: '',
})
