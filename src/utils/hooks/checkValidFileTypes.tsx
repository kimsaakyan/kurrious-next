import { IFile } from '@/src/types/redux/brain'
import { validFileTypes } from '@/src/data/validate'
import { dispatch } from '@/src/redux/hooks'
import { viewsMiddleware } from '@/src/redux/slices/views'
import { SeveritiesType } from '@/src/enums'

export const CheckValidFileTypes = (fileArray: IFile[]) => {
    const maxFileCount = 10
    const validFiles = fileArray.filter((file) => {
        const fileName = file.name
        const lastDotIndex = fileName.lastIndexOf('.')
        const extensionStart = lastDotIndex >= 0 ? lastDotIndex + 1 : 0
        const fileExtension = fileName.slice(extensionStart).toLowerCase()
        return validFileTypes.includes(`.${fileExtension}`)
    })

    if (validFiles.length > maxFileCount) {
        dispatch(
            viewsMiddleware.setToastNotificationPopUpState({
                open: true,
                props: {
                    severityType: SeveritiesType.error,
                    title: `You can select a maximum of ${maxFileCount} files.`,
                },
            })
        )
        return false
    } else if (validFiles.length === 0) {
        dispatch(
            viewsMiddleware.setToastNotificationPopUpState({
                open: true,
                props: {
                    severityType: SeveritiesType.error,
                    title: 'Invalid file type. Please select PDF, Excel, or TXT files.',
                },
            })
        )
        return false
    }
    return true
}
