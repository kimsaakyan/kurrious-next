import { dispatch } from '@/src/redux/hooks'
import { viewsMiddleware } from '@/src/redux/slices/views'
import { ModalName } from '@/src/types/modals'
import { brainMiddleware } from '@/src/redux/slices/brain'
import { ICreateFolderOrFileModal } from '@/src/types/redux/brain'
import TrashSecondaryIcon from '@/src/components/Icons/TrashSecondaryIcon'
import EditPencilIcon from '@/src/components/Icons/EditPencilIcon'
import DownloadIcon from '@/src/components/Icons/DownloadIcon'
import { EyeIcon, PlusIcon } from 'lucide-react'

export const contextMenuItems = [
    {
        label: 'Create Folder',
        icon: <PlusIcon size={15} />,
        onClick: () => {
            dispatch(
                viewsMiddleware.openModal({
                    name: ModalName.CreateFolderModal,
                    props: {},
                })
            )
        },
    },
]

export const contextMenuItemsSecondary = [
    {
        label: 'Rename',
        icon: <EditPencilIcon />,
        onClick: (props?: Record<string, any>) => {
            dispatch(
                brainMiddleware.updateNameMode(
                    props as ICreateFolderOrFileModal
                )
            )
            dispatch(brainMiddleware.updateShowTreeNodeInputName(true))
        },
    },
    {
        icon: <TrashSecondaryIcon />,
        label: 'Delete',
        onClick: (props?: Record<string, any>) => {
            dispatch(
                viewsMiddleware.openModal({
                    name: ModalName.DeleteFolderOrFileModal,
                    props,
                })
            )
        },
    },
]

export const contextMenuItemDelete = {
    icon: <TrashSecondaryIcon />,
    label: 'Delete',
    onClick: (props?: Record<string, any>) => {
        dispatch(
            viewsMiddleware.openModal({
                name: ModalName.DeleteFolderOrFileModal,
                props,
            })
        )
    },
}

export const contextMenuItemsFile = [
    {
        label: 'Rename',
        icon: <EditPencilIcon />,
        onClick: (props?: Record<string, any>) => {
            dispatch(brainMiddleware.updateShowTreeNodeInputName(true))
            dispatch(
                brainMiddleware.updateNameMode(
                    props as ICreateFolderOrFileModal
                )
            )
        },
    },
    {
        icon: <EyeIcon width={18} />,
        label: 'Preview',
        onClick: (props?: Record<string, any>) => {
            dispatch(
                viewsMiddleware.openModal({
                    name: ModalName.PreviewFileModal,
                    props: props,
                })
            )
        },
    },
    {
        icon: <DownloadIcon />,
        label: 'Download',
        onClick: (props?: Record<string, any>) => {
            dispatch(
                brainMiddleware.downloadFile(props as ICreateFolderOrFileModal)
            )
        },
    },
    contextMenuItemDelete,
]

export const contextMenuItemsOnlyDownload = [
    {
        icon: <EyeIcon width={18} />,
        label: 'Preview',
        onClick: (props?: Record<string, any>) => {
            dispatch(
                viewsMiddleware.openModal({
                    name: ModalName.PreviewFileModal,
                    props: props,
                })
            )
        },
    },
    {
        icon: <DownloadIcon />,
        label: 'Download',
        onClick: (props?: Record<string, any>) => {
            dispatch(
                brainMiddleware.downloadFile(props as ICreateFolderOrFileModal)
            )
        },
    },
]
