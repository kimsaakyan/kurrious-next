import React from 'react'
import { viewsSelector } from '@/src/redux/slices/views/index'
import { useSelector } from 'react-redux'
import { ModalName } from '@/src/types/modals'
import {
    IAddUserModalProps,
    IOpenedModal,
    ISamsaraKeyModalProps,
} from '@/src/types/redux/views'
import BrowsePromptsModal from '@/src/components/Modals/BrowsePromptsModal/index'
import SamsaraKeyModal from '@/src/components/Modals/SamsaraKeyModal/index'
import DeleteCompanyModal from '@/src/components/Modals/DeleteCompanyModal/index'
import DeleteConversationTopicModal from '@/src/components/Modals/DeleteConversationTopicModal'
import { IDeleteConversationTopicModalProps } from '@/src/types/redux/conversations'
import CreateFolderModal from '@/src/components/Modals/CreateFolderModal'
import ApiTokenModal from '@/src/components/Modals/ApiTokenModal'
import DeleteFolderOrFileModal from '@/src/components/Modals/DeleteFolderOrFileModal'
import {
    ICreateFolderOrFileModal,
    IDeleteFolderOrFileModalProps,
    IBrainPromptModal,
    ITreeNode,
} from '@/src/types/redux/brain'
import { v4 } from 'uuid'
import DevToolsModal from '@/src/components/Modals/DevToolsModal/DevToolsModal'
import BrainPromptModal from '../Modals/BrainPromptModal'
import PreviewFileModal from '@/src/components/Modals/PreviewFileModal'

const getCreateFolderModal = (
    modal: IOpenedModal<ICreateFolderOrFileModal>
) => {
    return <CreateFolderModal key={modal.name} {...modal.props} />
}

const getBrainPromptModal = (modal: IOpenedModal<IBrainPromptModal>) => {
    return <BrainPromptModal key={modal.name} {...modal.props} />
}

const getBrowsePromptsModal = (modal: IOpenedModal<void>) => (
    <BrowsePromptsModal key={modal.name} />
)

const getApiTokenModal = (modal: IOpenedModal<IAddUserModalProps>) => (
    <ApiTokenModal key={modal.name} {...modal.props} />
)

const getSamsaraKeyModal = (modal: IOpenedModal<ISamsaraKeyModalProps>) => (
    <SamsaraKeyModal key={modal.name} {...modal.props} />
)

const getPreviewFileModal = (modal: IOpenedModal<ITreeNode>) => (
    <PreviewFileModal key={modal.name} {...modal.props} />
)

const getDeleteCompanyModal = (modal: IOpenedModal<ISamsaraKeyModalProps>) => (
    <DeleteCompanyModal key={modal.name} {...modal.props} />
)

const getDeleteConversationModal = (
    modal: IOpenedModal<IDeleteConversationTopicModalProps>
) => <DeleteConversationTopicModal key={modal.name} {...modal.props} />

const getDeleteFolderOrFileModal = (
    modal: IOpenedModal<IDeleteFolderOrFileModalProps>
) => <DeleteFolderOrFileModal key={modal.name} {...modal.props} />

// dev
const getDevToolsModal = () => <DevToolsModal key={v4()} />

export const ModalsController = () => {
    const modals = useSelector(viewsSelector.modals)

    return (
        <>
            {modals.map((modal) => {
                switch (modal.name) {
                    case ModalName.CreateFolderModal: {
                        return getCreateFolderModal(modal)
                    }
                    case ModalName.BrowsePromptsModal: {
                        return getBrowsePromptsModal(modal)
                    }
                    case ModalName.DeleteConversationModal: {
                        return getDeleteConversationModal(modal)
                    }
                    case ModalName.ApiTokenModal: {
                        return getApiTokenModal(modal)
                    }
                    case ModalName.BrainPromptModal: {
                        return getBrainPromptModal(modal)
                    }
                    case ModalName.SamsaraKeyModal: {
                        return getSamsaraKeyModal(modal)
                    }
                    case ModalName.PreviewFileModal: {
                        return getPreviewFileModal(modal)
                    }
                    case ModalName.DeleteCompanyModal: {
                        return getDeleteCompanyModal(modal)
                    }
                    case ModalName.DeleteFolderOrFileModal: {
                        return getDeleteFolderOrFileModal(modal)
                    }
                    case ModalName.DevToolsModal: {
                        return getDevToolsModal()
                    }
                    default:
                        return null
                }
            })}
        </>
    )
}
