import { Input } from '@/src/components/ui/input'
import { dispatch } from '@/src/redux/hooks'
import { brainMiddleware, brainSelector } from '@/src/redux/slices/brain'
import ConfirmCancelControls from '@/src/components/ConfirmCancelControls/ConfirmCancelControls'
import React from 'react'
import { useSelector } from 'react-redux'
import { ITreeNode } from '@/src/types/redux/brain'

const RenameField = ({ treeNode }: { treeNode: ITreeNode }) => {
    const treeNodeLabelField = useSelector(brainSelector.treeNodeLabelField)

    const onConfirmClick = (e: React.MouseEvent<HTMLDivElement>) => {
        e.preventDefault()
        e.stopPropagation()
        dispatch(brainMiddleware.updateShowTreeNodeInputName(false))
        if (treeNode.id && treeNodeLabelField) {
            const formData = new FormData()
            formData.append('new_name', treeNodeLabelField)
            dispatch(
                brainMiddleware.renameFolderOrFileName(
                    treeNode.id,
                    formData,
                    treeNode.type
                )
            )
        }
    }

    const onRowClick = (e: React.MouseEvent<HTMLDivElement>) => {
        e.preventDefault()
        e.stopPropagation()
    }

    const onCloseClick = (e: React.MouseEvent<HTMLDivElement>) => {
        e.preventDefault()
        e.stopPropagation()
        dispatch(brainMiddleware.updateShowTreeNodeInputName(false))
        dispatch(brainMiddleware.updateTreeNodeLabelField(''))
        dispatch(brainMiddleware.updateNameMode(null))
    }

    return (
        <div className="flex items-center" onClick={onRowClick}>
            <Input
                value={treeNodeLabelField || ''}
                onChange={(e) =>
                    dispatch(
                        brainMiddleware.updateTreeNodeLabelField(e.target.value)
                    )
                }
                className="bg-whtie ml-2 h-8 text-xs text-gray-550"
                size="base"
            />
            <div className="ml-4">
                <ConfirmCancelControls
                    onConfirmClick={onConfirmClick}
                    onCloseClick={onCloseClick}
                />
            </div>
        </div>
    )
}

export default RenameField
