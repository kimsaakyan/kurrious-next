import TreeNode from '@/src/components/FolderTree/TreeNode'
import {
    IContextMenuItems,
    ICreateFolderOrFileModal,
    ITreeNode,
} from '@/src/types/redux/brain'
import React, { MouseEvent } from 'react'
import { useSelector } from 'react-redux'
import { brainSelector } from '@/src/redux/slices/brain'
import Loader from '@/src/components/Loader/Loader'
import NoDataBrain from '@/src/components/FolderTree/NoDataBrain'

const CollapsibleTree = ({
    data,
    handleContextMenu,
}: {
    data: ITreeNode[]
    handleContextMenu: (
        e: MouseEvent<HTMLDivElement>,
        data: IContextMenuItems[],
        item: ICreateFolderOrFileModal
    ) => void
}) => {
    const isBrainListLoading = useSelector(brainSelector.isBrainListLoading)

    return (
        <div
            className={`[&>*:nth-child(even)]:bg-slate ${
                !data.length && 'h-full'
            }`}
        >
            {!isBrainListLoading && data && data.length ? (
                data.map((item, index) => (
                    <TreeNode
                        key={item.id}
                        treeNode={item}
                        data={data}
                        index={index}
                        handleContextMenu={handleContextMenu}
                    />
                ))
            ) : (
                <div className="flex h-full items-center justify-center text-[18px] text-quaternary">
                    {isBrainListLoading ? <Loader /> : <NoDataBrain />}
                </div>
            )}
        </div>
    )
}

export default CollapsibleTree
