import React, { useEffect, useState } from 'react'
import { dispatch } from '@/src/redux/hooks'
import { viewsMiddleware } from '@/src/redux/slices/views/index'
import { ModalName } from '@/src/types/modals'
import { Button } from '@/src/components/ui/button'
import { Input } from '@/src/components/ui/input'
import { brainMiddleware, brainSelector } from '../../../redux/slices/brain'
import { ICreateFolderOrFileModal } from '@/src/types/redux/brain'
import { useSelector } from 'react-redux'

const CreateFolderModal = ({ name }: ICreateFolderOrFileModal) => {
    const folderContentsCurrent = useSelector(
        brainSelector.folderContentsCurrent
    )
    const folderIdCurrent = useSelector(brainSelector.folderIdCurrent)
    const isBrainLoading = useSelector(brainSelector.isBrainListLoading)

    const [value, setValue] = useState<string>('')
    const closeModal = () => {
        dispatch(viewsMiddleware.closeModal(ModalName.CreateFolderModal))
    }

    const onCreateClick = () => {
        dispatch(
            brainMiddleware.createNewFolder(
                value,
                folderContentsCurrent,
                folderIdCurrent
            )
        )
    }

    useEffect(() => {
        if (name) {
            setValue(name)
        }
    }, [name])

    return (
        <div
            id="modalContainer"
            className="fixed inset-0 z-50 flex items-center justify-center bg-gray-transparent drop-shadow"
        >
            <div className="relative w-[520px] rounded-xl bg-white p-6 text-blue-dark shadow-lg">
                <div className="mb-6 flex items-center justify-between">
                    <div className="text-base font-semibold leading-normal text-blue-dark">
                        Create folder
                    </div>
                </div>
                <div>
                    <div className="mb-6">
                        <label className="mb-1 block text-xs font-normal text-gray-650	">
                            Name
                        </label>
                        <Input
                            type="text"
                            name="Name"
                            size="base"
                            value={value}
                            onChange={(e) => setValue(e.target.value)}
                        />
                    </div>
                    <div className="flex items-center">
                        <Button
                            variant="outline"
                            size="base"
                            onClick={closeModal}
                        >
                            Cancel
                        </Button>
                        <Button
                            className="ml-2.5"
                            size="base"
                            variant="default"
                            onClick={onCreateClick}
                            disabled={!value}
                            isLoading={isBrainLoading}
                        >
                            Create
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CreateFolderModal
