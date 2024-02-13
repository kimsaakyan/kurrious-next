import PDFIcon from '@/src/components/Icons/PDFIcon'
import FolderIcon from '@/src/components/Icons/FolderIcon'
import React from 'react'
import { FileTypes } from '@/src/enums'
import FileIcon from '@/src/components/Icons/FileIcon'
import WordIcon from '@/src/components/Icons/WordIcon'
import ExcelIcon from '@/src/components/Icons/ExcelIcon'
import InternetIcon from '@/src/components/Icons/InternetIcon'

export const getFileIcon = (
    fileType: string | undefined,
    type?: string | undefined
) => {
    if (fileType === FileTypes.PDF.toLowerCase()) {
        return <PDFIcon />
    } else if (fileType === FileTypes.WORD.toLowerCase()) {
        return <WordIcon />
    } else if (type === FileTypes.FOLDER.toLowerCase()) {
        return <FolderIcon />
    } else if (
        fileType === FileTypes.XLSX.toLowerCase() ||
        fileType === FileTypes.XLS.toLowerCase()
    ) {
        return <ExcelIcon />
    } else if (fileType === FileTypes.URL.toLowerCase()) {
        return <InternetIcon />
    } else {
        return <FileIcon />
    }
}
