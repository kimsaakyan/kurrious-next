import React from 'react'
import { useSelector } from 'react-redux'
import {
    companiesMiddleware,
    companiesSelector,
} from '@/src/redux/slices/companies/index'
import { dispatch } from '@/src/redux/hooks'
import DeleteModal from '@/src/components/Modals/DeleteModal'
import { ISamsaraKeyModalProps } from '@/src/types/redux/views'
import { viewsMiddleware } from '@/src/redux/slices/views'
import { ModalName } from '@/src/types/modals'

const DeleteCompanyModal = ({ companyId }: ISamsaraKeyModalProps) => {
    const isCompanyDeleteLoading = useSelector(
        companiesSelector.isCompanyDeleteLoading
    )

    const onConfirmDelete = () => {
        dispatch(companiesMiddleware.deleteCompany(companyId))
    }

    const onCloseModal = () => {
        dispatch(viewsMiddleware.closeModal(ModalName.DeleteCompanyModal))
    }

    return (
        <DeleteModal
            isCompanyDeleteLoading={isCompanyDeleteLoading}
            onCloseModal={onCloseModal}
            onConfirmDelete={onConfirmDelete}
        />
    )
}

export default DeleteCompanyModal
