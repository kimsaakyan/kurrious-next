/* eslint-disable prettier/prettier */

declare global {
    type ReactNode =
        | React.ReactElement<unknown>
        | FunctionComponent<unknown>
        | React.ComponentClass<unknown>
        | null

    interface IPagination {
        currentPage: number
        pageSize: number
    }

    interface IMeta {
        page: number
        pageSize: number
        totalCount: number
    }

    interface IConversation {
        image?: string
        title: string
        summary: string
        userId: string
        firstMessageDate?: any
        lastMessageDate?: any
        conversationId: string
        createdAt?: string | number | Date
        updatedAt?: string
    }

    interface INewConversationTopic {
        id?: string
        title: string
    }

    interface IFeedbackData {
        key: string
        username?: string
        dataIndex?: string
        email?: string
        date?: number
        title?: string
        render?: () => JSX.Element
    }
    interface ISupportData {
        key: string
        username?: string
        Ticketnumber?: number
        dataIndex: string
        userid?: number
        Subject?: string
        title?: string
        render?: () => JSX.Element
    }

    interface ExpandedDataType {
        name: string
        email: string
        tokenusage: string
        role: string
    }
    interface ITablePorps {
        companyname: string
        email: string
        tokenusage: string
        tokenallotment: number
        status: string
        id: string
        userList: ExpandedDataType[]
    }
    interface IPagination {
        currentPage: number
        pageSize: number
    }
    interface IWidget {
        key: number
        title: string
    }
    interface IDetailColumn {
        title: string
        dataIndex: string
        key: string
        render?: (text: string, user: string) => void
    }
}

export {}
