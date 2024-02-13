import { Dispatch, MutableRefObject, RefObject } from 'react'
import { IMessage } from '@/src/types/redux/conversations'

export interface IChatBoard {
    conversationRef: RefObject<HTMLDivElement>
    setAutoScroll: Dispatch<boolean>
    threshold: number
    autoScroll: boolean
}

export interface ISendMessageConversation {
    conversationRef: RefObject<HTMLDivElement>
    threshold: number
    setAutoScroll: Dispatch<boolean>
}

export interface IChatBoardConversation {
    autoScroll: boolean
    conversationRef: RefObject<HTMLDivElement>
    selectedConversationId: string
    conversationMessages: IMessage[] | null
    threshold: number
    setAutoScroll: Dispatch<boolean>
}

export interface IToastJenny {
    driverId: string | undefined
    text: string
}

export interface IActionPanel {
    disabled?: boolean
    onClick?: () => void
    createdAt: string | number | Date | undefined
}

export interface IChatBoardMessage {
    messagesRef: MutableRefObject<HTMLDivElement | null>
}
