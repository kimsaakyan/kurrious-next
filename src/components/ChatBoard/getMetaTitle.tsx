import { IMessage } from '@/src/types/redux/conversations'
import TooltipIconButton from '@/src/components/v2/TooltipIconButton/TooltipIconButton'
import { CopyIcon, ThumbsDownIcon, ThumbsUpIcon } from 'lucide-react'
import React from 'react'
import { dispatch } from '@/src/redux/hooks'
import { viewsMiddleware } from '@/src/redux/slices/views'
import { SeveritiesType } from '@/src/enums'
import copy from 'copy-to-clipboard'
import { chatbotMessagesMiddleware } from '@/src/redux/slices/chatbotMessages'

const getMetaTitle = (item: IMessage, disabled: boolean): ReactNode => {
    const handleFeedback = (
        msgId: string,
        status: 'thumbs_up' | 'thumbs_down'
    ): void => {
        dispatch(chatbotMessagesMiddleware.updateFeedBack(msgId, status))
    }

    const copyTextToClipboard = (text: string): void => {
        copy(text)
        dispatch(
            viewsMiddleware.setToastNotificationPopUpState({
                open: true,
                props: {
                    severityType: SeveritiesType.success,
                    title: 'Copied to clipboard!',
                },
            })
        )
    }

    return item?.answerType === 'loading' ||
        item?.answerType === 'busy' ||
        item?.answerType === 'error' ||
        (item.answerType === 'mixed' &&
            (item.data[1]?.type === 'hos_graph' ||
                item.data[1]?.type === 'buttons' ||
                item.data[1]?.type === 'table')) ? (
        ''
    ) : (
        <div className="ml-2 flex space-x-2">
            <TooltipIconButton
                title="Copy to clipboard!"
                onClick={() => {
                    copyTextToClipboard(item.answer)
                }}
                icon={<CopyIcon color="#636A8F" size={18} />}
            />
            <TooltipIconButton
                disabled={disabled}
                title="Like"
                onClick={() => {
                    handleFeedback(item.messageId, 'thumbs_up')
                }}
                icon={<ThumbsUpIcon color="#636A8F" size={18} />}
            />
            <TooltipIconButton
                disabled={disabled}
                title="Dislike"
                onClick={() => {
                    handleFeedback(item.messageId, 'thumbs_down')
                }}
                icon={<ThumbsDownIcon color="#636A8F" size={18} />}
            />
        </div>
    )
}

export default getMetaTitle
