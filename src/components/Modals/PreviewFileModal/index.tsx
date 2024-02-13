import React from 'react'
import { dispatch } from '@/src/redux/hooks'
import { viewsMiddleware } from '@/src/redux/slices/views/index'
import { ModalName } from '@/src/types/modals'
import CloseIcon from '@/src/components/Icons/CloseIcon'
import FileViewer from '@/src/components/Modals/FileViewer/FileViewer'
import { ITreeNode } from '@/src/types/redux/brain'

const PreviewFileModal = (file: ITreeNode) => {
    const closeModal = () => {
        dispatch(viewsMiddleware.closeModal(ModalName.PreviewFileModal))
    }

    return (
        <div
            id="modalContainer"
            className="absolute z-50 flex h-full w-full items-start justify-center drop-shadow"
        >
            <div className="relative h-full w-full overflow-y-auto rounded-xl bg-white px-6 pb-6 text-blue-dark shadow-lg">
                <div className="sticky top-0 flex w-full items-center justify-between bg-white p-6">
                    <div className="w-full text-center">
                        <div className="truncate pl-7.5 text-[20px] font-semibold leading-normal text-blue-dark">
                            {file.name}
                        </div>
                    </div>
                    <div onClick={closeModal} className="cursor-pointer p-2">
                        <CloseIcon />
                    </div>
                </div>
                <div className="mt-3 h-5/6 overflow-auto text-center text-quaternary">
                    <FileViewer fileType={file.fileType} assetId={file.id} />
                </div>
            </div>
        </div>
    )
}

export default PreviewFileModal
