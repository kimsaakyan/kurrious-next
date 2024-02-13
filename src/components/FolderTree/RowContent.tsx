import DownArrowIcon from '@/src/components/Icons/DownArrowIcon'
import RightArrowIcon from '@/src/components/Icons/RightArrowIcon'
import { getFileIcon } from '@/src/utils/common/GetFileIcon'
import RenameField from '@/src/components/FolderTree/RenameField'
import React from 'react'
import { ITreeNode } from '@/src/types/redux/brain'
import { useSelector } from 'react-redux'
import { brainSelector } from '@/src/redux/slices/brain'
import { FileTypes } from '@/src/enums'

const RowContent = ({
    textMaxLength,
    isOpen,
    treeNode,
}: {
    textMaxLength: number
    isOpen: boolean
    treeNode: ITreeNode
}) => {
    const showTreeNodeInputName = useSelector(
        brainSelector.showTreeNodeInputName
    )
    const editNameMode = useSelector(brainSelector.editNameMode)

    return (
        <>
            {treeNode.folderItems && treeNode.folderItems.length > 0 && (
                <span className="absolute left-0">
                    {isOpen ? <DownArrowIcon /> : <RightArrowIcon />}
                </span>
            )}
            <div>{getFileIcon(treeNode.fileType, treeNode.type)}</div>
            {showTreeNodeInputName && editNameMode?.id === treeNode.id ? (
                <RenameField treeNode={treeNode} />
            ) : (
                <span
                    className={`${
                        treeNode.name.length > textMaxLength
                            ? 'truncate'
                            : 'flex items-center'
                    } pl-2 text-xs	font-medium text-gray-550`}
                >
                    {treeNode.type === FileTypes.URL ? (
                        <a
                            href={treeNode.fileUri}
                            target="_blank"
                            rel="noreferrer"
                        >
                            {treeNode.name}
                        </a>
                    ) : (
                        treeNode.name
                    )}
                </span>
            )}
        </>
    )
}

export default RowContent
