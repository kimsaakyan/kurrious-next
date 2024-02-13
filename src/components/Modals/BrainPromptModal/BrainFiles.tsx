import React, { ChangeEvent } from 'react'
import UploadFileIcon from '@/src/components/Icons/UploadFileIcon'
import { getFileIcon } from '@/src/utils/common/GetFileIcon'
import { useSelector } from 'react-redux'
import { brainMiddleware, brainSelector } from '../../../redux/slices/brain'
import { CheckValidFileTypes } from '@/src/utils/hooks/checkValidFileTypes'
import { dispatch } from '@/src/redux/hooks'

const BrainFiles = () => {
    const selectedFiles = useSelector(brainSelector.selectedFiles)

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files && e.target.files
        if (files && files.length > 0) {
            const fileArray = Array.from(files)
            if (CheckValidFileTypes(fileArray)) {
                dispatch(brainMiddleware.updateSelectedFile(fileArray))
            }
        }
    }

    const handleOnDrop = (e: React.DragEvent) => {
        e.preventDefault()
        e.stopPropagation()

        if (e.dataTransfer.files.length > 0) {
            const fileArray = Array.from(e.dataTransfer.files)
            if (CheckValidFileTypes(fileArray)) {
                dispatch(brainMiddleware.updateSelectedFile(fileArray))
            }
        }
    }

    const handleOnDragOver = (e: React.DragEvent) => {
        e.preventDefault()
        e.stopPropagation()
    }

    return (
        <div className="w-full">
            <label
                className="cursor-pointer"
                onDrop={handleOnDrop}
                onDragOver={handleOnDragOver}
            >
                <input
                    type="file"
                    multiple
                    className="hidden"
                    onChange={handleFileChange}
                />
                <div className="flex h-80 w-full flex-col items-center justify-center rounded-md border border-gray-300 p-10 text-gray-600">
                    <div className="flex flex-col items-center justify-center">
                        <div className="mb-3.5">
                            <UploadFileIcon />
                        </div>
                        <div className="text-center text-blue-dark">
                            <div>
                                Drag & drop files here, or click to select files
                            </div>
                            <div>Supported File Types: .pdf, .xls</div>
                        </div>
                    </div>
                </div>
            </label>
            {selectedFiles && selectedFiles.length > 0 && (
                <div className="mt-3.5 w-full rounded-md border border-gray-300 px-3.5 py-2.5 text-gray-600">
                    <div className="mt-2 text-gray-500">
                        <div className="font-semibold text-blue-dark">
                            Attached files
                        </div>
                        <div className="mt-1.5 max-h-16	overflow-y-auto">
                            {selectedFiles.map((item, index) => (
                                <div key={index} className="mb-2 flex text-xs">
                                    <span className="pr-1.5">
                                        {getFileIcon(
                                            item.name
                                                .split('.')
                                                ?.pop()
                                                ?.toLowerCase()
                                        )}
                                    </span>
                                    <span className="flex items-center pr-4">
                                        {item.name}
                                    </span>
                                    <span className="flex items-center">
                                        ({item.size} chars)
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default BrainFiles
