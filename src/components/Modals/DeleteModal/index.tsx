import React from 'react'
import InformationIcon from '@/src/components/Icons/InformationIcon'
import { Button } from '@/src/components/ui/button'

interface IDeleteModal {
    isCompanyDeleteLoading: boolean
    onConfirmDelete: () => void
    onCloseModal: () => void
}

const DeleteModal = ({
    onConfirmDelete,
    isCompanyDeleteLoading,
    onCloseModal,
}: IDeleteModal) => {
    return (
        <div
            id="modalContainer"
            className="fixed inset-0 z-50 flex items-center justify-center bg-gray-transparent drop-shadow"
        >
            <div className="relative w-[400px] rounded-xl bg-white p-6 text-blue-dark shadow-lg">
                <div className="flex">
                    <div className="pr-4">
                        <InformationIcon color="red" />
                    </div>
                    <div>
                        <h2 className="mb-2 text-base font-semibold leading-normal text-blue-dark">
                            Confirm
                        </h2>
                        <p className="text-sm text-gray-600">
                            Are you sure you want to delete this?
                        </p>
                    </div>
                </div>
                <div className="mt-7.5 flex w-full justify-end">
                    <div className="flex space-x-4">
                        <Button
                            variant="outline"
                            onClick={onCloseModal}
                            size="medium"
                        >
                            Cancel
                        </Button>
                        <Button
                            disabled={isCompanyDeleteLoading}
                            onClick={onConfirmDelete}
                            isLoading={isCompanyDeleteLoading}
                            size="medium"
                        >
                            Yes
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DeleteModal
