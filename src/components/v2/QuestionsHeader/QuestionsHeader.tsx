import React, { useEffect, useState } from 'react'
import { Button } from '@/src/components/ui/button'
import ConfirmCancelControls from '@/src/components/ConfirmCancelControls/ConfirmCancelControls'
import { Input } from '@/src/components/ui/input'
import { dispatch } from '@/src/redux/hooks'
import {
    conversationMiddleware,
    conversationSelector,
} from '@/src/redux/slices/conversations'
import { useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import EditPencilIcon from '@/src/components/Icons/EditPencilIcon'

const QuestionsHeader = (): ReactNode => {
    const topic = useSelector(conversationSelector.topic)
    const [title, setTitle] = useState<string>('')
    const [editMode, setEditMode] = useState<boolean>(false)
    const route = useRouter()
    const onEditClick = (): void => {
        if (route.query.key) {
            setEditMode(true)
        }
    }

    const onConfirmClick = () => {
        dispatch(
            conversationMiddleware.updateConversationTopicProps(
                topic?.id as string,
                {
                    id: topic?.id,
                    title,
                }
            )
        )
        setEditMode(false)
    }

    const onCloseClick = () => {
        setEditMode(false)
    }

    useEffect(() => {
        if (topic?.title) {
            setTitle(topic?.title)
        }
    }, [topic])

    return (
        <div className="flex h-14 items-center border-b border-b-gray-300 p-4">
            {!editMode ? (
                <div
                    className="flex cursor-pointer items-center"
                    onClick={onEditClick}
                >
                    <p className="text-sm font-semibold text-black">
                        {topic?.title ?? 'New chat'}
                    </p>
                    {route.query.key && (
                        <div>
                            <Button variant="transparent" size="square">
                                <span>
                                    <EditPencilIcon />
                                </span>
                            </Button>
                        </div>
                    )}
                </div>
            ) : (
                <div className="flex items-center">
                    <Input
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="bg-whtie h-8 text-xs text-gray-550"
                        size="base"
                    />
                    <div className="ml-2">
                        <ConfirmCancelControls
                            onConfirmClick={onConfirmClick}
                            onCloseClick={onCloseClick}
                        />
                    </div>
                </div>
            )}
        </div>
    )
}

export default QuestionsHeader
