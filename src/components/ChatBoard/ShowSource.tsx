import { ChevronDownIcon, ChevronRightIcon } from 'lucide-react'
import React, { useState } from 'react'
import { IReferenceDocs } from '@/src/types/redux/conversations'
import { dispatch } from '@/src/redux/hooks'
import { viewsMiddleware } from '@/src/redux/slices/views'
import { ModalName } from '@/src/types/modals'

const ShowSource = ({ docs }: { docs: IReferenceDocs[] }) => {
    const [showSource, setShowSource] = useState<boolean>(false)

    const onSourceClick = (doc: IReferenceDocs) => {
        dispatch(
            viewsMiddleware.openModal({
                name: ModalName.PreviewFileModal,
                props: { name: doc.source, ...doc },
            })
        )
    }

    return (
        <div className="mt-4">
            <div
                className="flex cursor-pointer items-center text-xs text-gray-50"
                onClick={() => setShowSource(!showSource)}
            >
                <div>Show sources</div>
                {showSource ? (
                    <ChevronRightIcon size={15} className="ml-1" />
                ) : (
                    <ChevronDownIcon size={15} className="ml-1" />
                )}
            </div>
            <div className={`${showSource && 'mt-4'}`}>
                {showSource &&
                    docs.map((item) => (
                        <div
                            key={item.tokens}
                            onClick={() => onSourceClick(item)}
                            className="mt-1.5 flex items-center"
                        >
                            <div className="mr-2 text-secondary-dark">
                                Source:
                            </div>
                            <div className="cursor-pointer text-xs text-primary">
                                {item.source}
                            </div>
                        </div>
                    ))}
            </div>
        </div>
    )
}

export default ShowSource
