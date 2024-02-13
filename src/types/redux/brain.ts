import React from 'react'

export interface IResponseBrainList {
    brainItems: ITreeNode[]
}

export interface ITreeNode {
    type?: string
    fileType?: string
    name: string
    tokens?: number | null
    id: string
    description?: string
    fileUri?: string
    folderItems?: folderItems[]
}

export interface folderItems {
    type: string
    name: string
    tokens: number
    id: string
    fileType?: string
    description: string
    fileUri: string
}

export interface IContextMenuItems {
    label: string
    icon?: JSX.Element
    onClick: (props?: Record<string, any>) => void
}

export interface IFile {
    name: string
    size: number
}
export interface ITextBrain {
    name: string | null
    completion: string | null
}

export interface brainProps {
    treeNode: ITreeNode[]
    searchInRootFolder: ITreeNode[]
    contextMenuItems: IContextMenuItems[] | null
    brainLoading: boolean
    folderContentsCurrent: ITreeNode[]
    folderContentsPrevious: ITreeNode[]
    folderContentsNext: ITreeNode[]
    selectedFiles: IFile[] | null
    isFolderOrFileDeleteLoading: boolean
    showTreeNodeInputName: boolean
    activeFinderFolderData: ITreeNode[]
    activeFinderFolderDataNext: ITreeNode[]
    editNameMode: ICreateFolderOrFileModal | null
    treeNodeLabelField: string
    isLoadingFileView: boolean
    fileContent: string | Blob
    folderIdCurrent: string
    highlightId: string
    searchText: string
}

export interface IDeleteFolderOrFileModalProps {
    id: string
    type: string
}

export interface ICreateFolderOrFileModal {
    id: string | null
    name: string | null
    type?: string
    fileType?: string
}

export interface IBrainPromptModal {
    setOpenModal: (openModal: boolean) => void
    newConversation: INewConversationTopic
    isCreateConversationLoading: boolean
    onSubmit: () => void
    handleChange: (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => void
}
