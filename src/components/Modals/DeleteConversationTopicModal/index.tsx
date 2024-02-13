import React from 'react'
import { useSelector } from 'react-redux'
import { dispatch } from '@/src/redux/hooks'
import DeleteModal from '@/src/components/Modals/DeleteModal'
import {
    conversationMiddleware,
    conversationSelector,
} from '@/src/redux/slices/conversations'
import { IDeleteConversationTopicModalProps } from '@/src/types/redux/conversations'
import { viewsMiddleware } from '@/src/redux/slices/views'
import { ModalName } from '@/src/types/modals'
import { useRouter } from 'next/router'

const DeleteConversationTopicModal = ({
    conversationId,
}: IDeleteConversationTopicModalProps) => {
    const router = useRouter()

    const isConversationDeleteLoading = useSelector(
        conversationSelector.isConversationDeleteLoading
    )

    const onConfirmDelete = () => {
        dispatch(
            conversationMiddleware.deleteConversationTopic(
                conversationId,
                router
            )
        )
    }

    const onCloseModal = () => {
        dispatch(viewsMiddleware.closeModal(ModalName.DeleteConversationModal))
    }

    return (
        <DeleteModal
            onCloseModal={onCloseModal}
            onConfirmDelete={onConfirmDelete}
            isCompanyDeleteLoading={isConversationDeleteLoading}
        />
    )
}

export default DeleteConversationTopicModal
