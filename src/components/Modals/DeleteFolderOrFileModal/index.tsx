import React from 'react'
import { useSelector } from 'react-redux'
import { dispatch } from '@/src/redux/hooks'
import DeleteModal from '@/src/components/Modals/DeleteModal'
import { viewsMiddleware } from '@/src/redux/slices/views'
import { ModalName } from '@/src/types/modals'
import { brainMiddleware, brainSelector } from '../../../redux/slices/brain'

const DeleteFolderOrFileModal = ({
    id,
    type,
}: {
    id: string
    type: string
}) => {
    const isFolderOrFileDeleteLoading = useSelector(
        brainSelector.isFolderOrFileDeleteLoading
    )

    const onConfirmDelete = () => {
        dispatch(brainMiddleware.deleteFolderOrFile(id, type))
    }

    const onCloseModal = () => {
        dispatch(viewsMiddleware.closeModal(ModalName.DeleteFolderOrFileModal))
    }

    return (
        <DeleteModal
            isCompanyDeleteLoading={isFolderOrFileDeleteLoading}
            onCloseModal={onCloseModal}
            onConfirmDelete={onConfirmDelete}
        />
    )
}

export default DeleteFolderOrFileModal
