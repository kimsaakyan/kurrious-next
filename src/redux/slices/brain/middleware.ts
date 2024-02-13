import slice from './slice'
import { AppDispatch } from '@/src/redux/store'
import {
    IContextMenuItems,
    ICreateFolderOrFileModal,
    IFile,
    ITextBrain,
    ITreeNode,
} from '@/src/types/redux/brain'
import { viewsMiddleware } from '@/src/redux/slices/views'
import { ModalName } from '@/src/types/modals'
import API from '@/src/manager/API'
import { FileTypes, LanuageModelListStatus, SeveritiesType } from '@/src/enums'
import { LanuageModelListStatusProp } from '@/src/types/brain'
import { AxiosResponse } from 'axios'
import { handleErrorActions } from '@/src/manager/axiosUtils'

const {
    setBrainListLoading,
    setContextMenuItems,
    setBrainList,
    setSearchInRootFolder,
    setSelectedFile,
    setFolderContentsCurrent,
    setIsFolderOrFileDeleteLoading,
    setFolderDataPreviousContents,
    setFolderDataNextContents,
    setActiveFinderFolderData,
    setActiveFinderFolderDataNext,
    setShowTreeNodeInputName,
    setEditNameMode,
    setTreeNodeLabelField,
    setIsLoadingProfileFile,
    setFileContent,
    setFolderIdCurrent,
    setSearchText,
    setHighlightId,
} = slice.actions

const getBrainList = () => async (dispatch: AppDispatch) => {
    try {
        dispatch(setBrainListLoading(true))
        const response = await API.brain.getBrainList()
        if (response.data.brainItems[0].folderItems) {
            dispatch(setBrainList(response.data.brainItems[0].folderItems))
        }
        dispatch(setSearchInRootFolder([]))
    } catch (error) {
        const axiosError = error as {
            response: AxiosResponse
        }
        handleErrorActions(axiosError)
    } finally {
        dispatch(setBrainListLoading(false))
    }
}

const downloadFile =
    (data: ICreateFolderOrFileModal) => async (dispatch: AppDispatch) => {
        try {
            await API.brain
                .downloadFile(data.id ?? '', 'blob')
                .then((response: AxiosResponse) => {
                    const url = window.URL.createObjectURL(
                        new Blob([response.data])
                    )
                    const link = document.createElement('a')
                    link.href = url
                    link.setAttribute('download', data.name as string)
                    document.body.appendChild(link)
                    link.click()
                })
        } catch (error) {
            console.error(error)
        } finally {
            dispatch(setBrainListLoading(false))
        }
    }

const updateBrainList =
    (data: any, status?: LanuageModelListStatusProp) =>
    async (dispatch: AppDispatch) => {
        if (status === LanuageModelListStatus.current) {
            dispatch(setFolderContentsCurrent(data))
        } else if (status === LanuageModelListStatus.previous) {
            dispatch(setFolderDataPreviousContents(data))
        } else if (status === LanuageModelListStatus.next) {
            dispatch(setFolderDataNextContents(data))
        } else {
            dispatch(setBrainList(data))
        }
    }

const updateFolderIdCurrent =
    (value: string) => async (dispatch: AppDispatch) => {
        dispatch(setFolderIdCurrent(value))
    }

const updateBrainHeader =
    (folderSelected: ITreeNode[], status: LanuageModelListStatusProp) =>
    async (dispatch: AppDispatch) => {
        try {
            if (status === LanuageModelListStatus.previous) {
                dispatch(setActiveFinderFolderData(folderSelected))
            } else {
                dispatch(setActiveFinderFolderDataNext(folderSelected))
            }
        } catch (error) {
            console.error(error)
        }
    }

const displayRootFolderContentsDefault =
    () => async (dispatch: AppDispatch) => {
        dispatch(getBrainList())
        dispatch(updateBrainList(null, LanuageModelListStatus.current))
        dispatch(updateBrainHeader([], LanuageModelListStatus.previous))
    }

const createNewFolder =
    (name: string, folderContentsCurrent: ITreeNode[], folderId: string) =>
    async (dispatch: AppDispatch) => {
        try {
            dispatch(setBrainListLoading(true))
            await API.brain.createFolder(name, folderId)
            dispatch(displayRootFolderContentsDefault())
            dispatch(viewsMiddleware.closeModal(ModalName.CreateFolderModal))
            dispatch(
                viewsMiddleware.setToastNotificationPopUpState({
                    open: true,
                    props: {
                        severityType: SeveritiesType.success,
                        title: 'The Folder has been created successfully!',
                    },
                })
            )
        } catch (error) {
            const axiosError = error as {
                response: AxiosResponse
            }
            handleErrorActions(axiosError)
        } finally {
            dispatch(setBrainListLoading(false))
        }
    }

const createNewFile =
    (file: FormData, folderId: string) => async (dispatch: AppDispatch) => {
        try {
            dispatch(setBrainListLoading(true))
            await API.brain.createFile(file, folderId)
            dispatch(displayRootFolderContentsDefault())
            dispatch(viewsMiddleware.closeModal(ModalName.BrainPromptModal))
            dispatch(
                viewsMiddleware.setToastNotificationPopUpState({
                    open: true,
                    props: {
                        severityType: SeveritiesType.success,
                        title: 'The File has been created successfully!',
                    },
                })
            )
        } catch (error) {
            const axiosError = error as {
                response: AxiosResponse
            }
            handleErrorActions(axiosError)
        } finally {
            dispatch(setBrainListLoading(false))
        }
    }

const uploadFile =
    (data: FormData, folderId?: string) => async (dispatch: AppDispatch) => {
        try {
            dispatch(setBrainListLoading(true))
            await API.brain.createFile(data, folderId)
            dispatch(displayRootFolderContentsDefault())
            dispatch(
                viewsMiddleware.setToastNotificationPopUpState({
                    open: true,
                    props: {
                        severityType: SeveritiesType.success,
                        title: 'The File has been uploaded successfully!',
                    },
                })
            )
        } catch (error) {
            const axiosError = error as {
                response: AxiosResponse
            }
            handleErrorActions(axiosError)
        } finally {
            dispatch(setBrainListLoading(false))
        }
    }

const createNewText =
    (data: ITextBrain, folderId: string) => async (dispatch: AppDispatch) => {
        try {
            dispatch(setBrainListLoading(true))
            await API.brain.createText(data, folderId)
            dispatch(displayRootFolderContentsDefault())
            dispatch(viewsMiddleware.closeModal(ModalName.BrainPromptModal))
            dispatch(
                viewsMiddleware.setToastNotificationPopUpState({
                    open: true,
                    props: {
                        severityType: SeveritiesType.success,
                        title: 'The File has been created successfully!',
                    },
                })
            )
        } catch (error) {
            const axiosError = error as {
                response: AxiosResponse
            }
            handleErrorActions(axiosError)
        } finally {
            dispatch(setBrainListLoading(false))
        }
    }

const createCrawlUrl =
    (url: string, depth: string) => async (dispatch: AppDispatch) => {
        try {
            dispatch(setBrainListLoading(true))
            await API.brain.crawlUrl(url, depth)
            dispatch(displayRootFolderContentsDefault())
            dispatch(viewsMiddleware.closeModal(ModalName.BrainPromptModal))
            dispatch(
                viewsMiddleware.setToastNotificationPopUpState({
                    open: true,
                    props: {
                        severityType: SeveritiesType.success,
                        title: 'Website loaded successfully',
                    },
                })
            )
        } catch (error) {
            const axiosError = error as {
                response: AxiosResponse
            }
            handleErrorActions(axiosError)
        } finally {
            dispatch(setBrainListLoading(false))
        }
    }

const updateContextMenuItems =
    (data: IContextMenuItems[]) => async (dispatch: AppDispatch) => {
        try {
            dispatch(setContextMenuItems(data))
        } catch (error) {
            console.error(error)
        }
    }

const updateSelectedFile =
    (data: IFile[] | null) => async (dispatch: AppDispatch) => {
        try {
            dispatch(setSelectedFile(data))
        } catch (error) {
            console.error(error)
        }
    }

const renameFolderOrFileName =
    (id: string, formData: FormData, type: string | undefined) =>
    async (dispatch: AppDispatch) => {
        try {
            dispatch(setIsFolderOrFileDeleteLoading(true))
            await API.brain.renameFolderOrFile(id, formData)

            dispatch(viewsMiddleware.closeModal(ModalName.CreateFolderModal))
            dispatch(displayRootFolderContentsDefault())
            dispatch(
                viewsMiddleware.setToastNotificationPopUpState({
                    open: true,
                    props: {
                        severityType: SeveritiesType.success,
                        title: `The ${type} has been updated successfully!`,
                    },
                })
            )
        } catch (error) {
            const axiosError = error as {
                response: AxiosResponse
            }
            handleErrorActions(axiosError)
        } finally {
            dispatch(setIsFolderOrFileDeleteLoading(false))
        }
    }

const searchFolderOrFile =
    (searchData: ITreeNode[]) => async (dispatch: AppDispatch) => {
        dispatch(setSearchInRootFolder(searchData))
    }

const updateSearchText = (value: string) => async (dispatch: AppDispatch) => {
    dispatch(setSearchText(value))
}

const fetchAndDisplayFile =
    (assetId: string, fileType: string | undefined) =>
    async (dispatch: AppDispatch) => {
        dispatch(setIsLoadingProfileFile(true))
        try {
            const response = await API.brain.downloadFile(
                assetId,
                fileType === FileTypes.PDF ? 'blob' : ''
            )

            if (fileType === FileTypes.PDF) {
                const blob = new Blob([response.data], {
                    type: 'application/pdf',
                })
                dispatch(setFileContent(blob))
            } else {
                dispatch(setFileContent(response.data as string))
            }

            dispatch(setIsLoadingProfileFile(false))
        } catch (error) {
            const axiosError = error as {
                response: AxiosResponse
            }
            handleErrorActions(axiosError)
            dispatch(setIsLoadingProfileFile(false))
        }
        dispatch(setIsLoadingProfileFile(false))
    }

const deleteFolderOrFile =
    (id: string, type: string) => async (dispatch: AppDispatch) => {
        try {
            dispatch(setIsFolderOrFileDeleteLoading(true))
            await API.brain.deleteFolderOrFile(id)
            dispatch(displayRootFolderContentsDefault())

            dispatch(
                viewsMiddleware.closeModal(ModalName.DeleteFolderOrFileModal)
            )
            dispatch(
                viewsMiddleware.setToastNotificationPopUpState({
                    open: true,
                    props: {
                        severityType: SeveritiesType.success,
                        title: `The ${type} is successfully deleted!`,
                    },
                })
            )
        } catch (error) {
            const axiosError = error as {
                response: AxiosResponse
            }
            handleErrorActions(axiosError)
        } finally {
            dispatch(setIsFolderOrFileDeleteLoading(false))
        }
    }

const updateShowTreeNodeInputName =
    (value: boolean) => async (dispatch: AppDispatch) => {
        dispatch(setShowTreeNodeInputName(value))
    }

const updateNameMode =
    (value: ICreateFolderOrFileModal | null) =>
    async (dispatch: AppDispatch) => {
        dispatch(setEditNameMode(value))
    }

const updateTreeNodeLabelField =
    (value: string) => async (dispatch: AppDispatch) => {
        dispatch(setTreeNodeLabelField(value))
    }

const updateHighlightId = (value: string) => async (dispatch: AppDispatch) => {
    dispatch(setHighlightId(value))
}

export default {
    getBrainList,
    createNewFolder,
    downloadFile,
    createNewFile,
    searchFolderOrFile,
    createNewText,
    updateSelectedFile,
    updateContextMenuItems,
    renameFolderOrFileName,
    deleteFolderOrFile,
    updateBrainList,
    updateBrainHeader,
    updateShowTreeNodeInputName,
    updateNameMode,
    updateTreeNodeLabelField,
    uploadFile,
    fetchAndDisplayFile,
    updateFolderIdCurrent,
    updateSearchText,
    displayRootFolderContentsDefault,
    updateHighlightId,
    createCrawlUrl,
}
