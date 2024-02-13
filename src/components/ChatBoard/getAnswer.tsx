import { IMessage } from '@/src/types/redux/conversations'
import ResponseSection from '@/src/components/v2/ResponseSection/ResponseSection'
import moment from 'moment/moment'
import React from 'react'
import getMetaDescription from '@/src/components/ChatBoard/getMetaDescription'
import getMetaTitle from '@/src/components/ChatBoard/getMetaTitle'
import { SendJsonMessage } from 'react-use-websocket/src/lib/types'
import { NextRouter } from 'next/router'

const getAnswer = (
    item: IMessage,
    index: number,
    route: NextRouter,
    sendJsonMessage: SendJsonMessage | null,
    conversationMessages: IMessage[] | null,
    disabled: boolean
): ReactNode => {
    const getDisabledState = (indexProp: number): boolean => {
        return !!(
            conversationMessages && conversationMessages.length > indexProp + 1
        )
    }

    const onResponseButtonClick = (button: {
        buttonText: string
        body: Record<string, never>
    }): void => {
        const dataToSend = {
            conversationId: route?.query?.key,
            ...button.body,
        }

        if (sendJsonMessage) {
            sendJsonMessage(dataToSend)
        }
    }

    return (
        <ResponseSection
            avatarUrl="/images/jennylogo.svg"
            title={getMetaTitle(item, disabled)}
            desc={getMetaDescription(
                item,
                index,
                getDisabledState,
                onResponseButtonClick
            )}
            name="Jenny"
            timeStamp={moment(item?.timestamp).format('LT')}
        />
    )
}

export default getAnswer
