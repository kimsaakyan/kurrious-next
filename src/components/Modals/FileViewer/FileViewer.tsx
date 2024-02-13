import { useEffect } from 'react'
import { FileTypes } from '@/src/enums'
import Loader from '@/src/components/Loader/Loader'
import { dispatch } from '@/src/redux/hooks'
import { brainMiddleware, brainSelector } from '@/src/redux/slices/brain'
import { useSelector } from 'react-redux'

const FileViewer = ({
    fileType,
    assetId,
}: {
    fileType: string | undefined
    assetId: string
}) => {
    const isLoadingFileView = useSelector(brainSelector.isLoadingFileView)
    const fileContent = useSelector(brainSelector.fileContent)

    useEffect(() => {
        dispatch(brainMiddleware.fetchAndDisplayFile(assetId, fileType))
    }, [assetId, fileType])

    return (
        <div className="h-full">
            {isLoadingFileView ? (
                <div className="mt-2">
                    <Loader />
                </div>
            ) : (
                <div className="h-full">
                    {fileType === FileTypes.PDF &&
                        fileContent instanceof Blob && (
                            <embed
                                className="h-full w-full"
                                src={URL.createObjectURL(fileContent)}
                                type="application/pdf"
                            />
                        )}

                    {fileType === FileTypes.TXT &&
                        typeof fileContent === 'string' && (
                            <div>{fileContent}</div>
                        )}
                </div>
            )}
        </div>
    )
}

export default FileViewer
