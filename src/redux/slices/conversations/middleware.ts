import slice from './slice'
import store, { AppDispatch } from '@/src/redux/store'
import API from '@/src/manager/API'
import { IMessage, ITopic } from '@/src/types/redux/conversations'
import { conversationMiddleware } from '@/src/redux/slices/conversations/index'
import { viewsMiddleware } from '@/src/redux/slices/views/index'
import { ModalName } from '@/src/types/modals'
import { SeveritiesType } from '@/src/enums'
import { NextRouter } from 'next/router'

const {
    setIsSmaller,
    setConversationTopic,
    setNewCreatedConversation,
    setCreateConversationsListLoading,
    setCreateConversationLoading,
    setDeleteConversationLoading,
    setUpdateConversationLoading,
    setConversationsList,
    setConversationMessages,
    setConversationMessagesListLoading,
    setSelectedConversationId,
    setCurrentQuestion,
    setConversationMessagesTotalCount,
    setIsChatMessagingInProgress,
    setConversationFetchIsLoading,
    setActiveChat,
} = slice.actions

const updateConversationTopic = (topic: ITopic) => (dispatch: AppDispatch) => {
    dispatch(setConversationTopic(topic))
}

const updateIsSmaller = (value: boolean) => (dispatch: AppDispatch) => {
    dispatch(setIsSmaller(value))
}

const updateSelectedConversationId =
    (conversationId: string) => (dispatch: AppDispatch) => {
        dispatch(setSelectedConversationId(conversationId))
    }

const updateActiveChat = (value: number | null) => (dispatch: AppDispatch) => {
    dispatch(setActiveChat(value))
}

const getConversations =
    (pagination: IPagination, regex = '') =>
    async (dispatch: AppDispatch) => {
        try {
            dispatch(setCreateConversationsListLoading(true))

            const response = await API.conversations.getConversations(
                pagination,
                regex
            )

            dispatch(setConversationsList(response.data))
        } catch (error) {
            console.error(error)
        } finally {
            dispatch(setCreateConversationsListLoading(false))
        }
    }

const fetchConversations =
    (pagination: IPagination, regex?: string) =>
    async (dispatch: AppDispatch) => {
        try {
            dispatch(setCreateConversationsListLoading(true))

            const response = await API.conversations.getConversations(
                pagination,
                regex
            )

            dispatch(
                setConversationsList({
                    data: [
                        ...(store.getState().conversations.conversationsList
                            ?.data as IConversation[]),
                        ...response.data.data,
                    ],
                    meta: response.data.meta,
                })
            )
        } catch (error) {
            console.error(error)
        } finally {
            dispatch(setCreateConversationsListLoading(false))
        }
    }

const getConversationMessages =
    (id: string, page: number, previousConversationMessages?: any) =>
    async (dispatch: AppDispatch) => {
        try {
            if (previousConversationMessages) {
                dispatch(setConversationFetchIsLoading(true))
            } else {
                dispatch(setConversationMessagesListLoading(true))
            }
            const response = await API.conversations.getConversationMessages(
                id,
                page
            )

            if (previousConversationMessages) {
                dispatch(
                    setConversationMessages([
                        ...(response.data.data && response.data.data.reverse()),

                        ...previousConversationMessages,
                    ])
                )
            } else {
                dispatch(setConversationMessages(response.data?.data.reverse()))
                dispatch(
                    setConversationMessagesTotalCount(
                        response.data?.meta?.totalCount
                    )
                )
            }
        } catch (error) {
            console.error(error)
        } finally {
            dispatch(setConversationMessagesListLoading(false))
            dispatch(setConversationFetchIsLoading(false))
        }
    }

const updateConversationListMessages =
    (messages: IMessage[]) => (dispatch: AppDispatch) => {
        try {
            dispatch(setConversationMessages(messages))
        } catch (error) {
            console.error(error)
        } finally {
            dispatch(setConversationMessagesListLoading(false))
        }
    }

const updateCurrentQuestionValue =
    (question: string) => (dispatch: AppDispatch) => {
        try {
            dispatch(setCurrentQuestion(question))
        } catch (error) {
            console.error(error)
        }
    }
const updateIsChatMessagingInProgress =
    (status: boolean) => (dispatch: AppDispatch) => {
        try {
            dispatch(setIsChatMessagingInProgress(status))
        } catch (error) {
            console.error(error)
        }
    }

const createNewConversation =
    (data: INewConversationTopic) => async (dispatch: AppDispatch) => {
        try {
            dispatch(setCreateConversationLoading(true))

            const response = await API.conversations.createConversationTopic(
                data
            )
            const pagination = {
                currentPage: 1,
                pageSize: 20,
            }

            dispatch(getConversations(pagination))
            dispatch(
                viewsMiddleware.setRedirectionState({
                    path: `/jenny/conversation?key=${response.data.conversationId}`,
                    params: '',
                    apply: true,
                })
            )
            dispatch(
                conversationMiddleware.getConversationMessages(
                    response.data.conversationId,
                    1
                )
            )
            dispatch(conversationMiddleware.updateActiveChat(0))
            dispatch(setNewCreatedConversation(response.data))
        } catch (error) {
            console.error(error)
        } finally {
            dispatch(setCreateConversationLoading(false))
        }
    }

const createNewConversationWithMessage =
    (data: INewConversationTopic, message: string, wsService: any) =>
    async (dispatch: AppDispatch) => {
        try {
            dispatch(setCreateConversationLoading(true))

            const response = await API.conversations.createConversationTopic(
                data
            )

            const dataWithMessage = {
                conversationId: response.data.conversationId,
                text: message,
            }

            wsService(dataWithMessage)

            const pagination = {
                currentPage: 1,
                pageSize: 20,
            }
            dispatch(getConversations(pagination))
            dispatch(setNewCreatedConversation(response.data))
            dispatch(
                setConversationTopic({
                    ...response.data,
                    id: response.data.conversationId,
                })
            )
        } catch (error) {
            console.error(error)
        } finally {
            dispatch(setCreateConversationLoading(false))
        }
    }

const deleteConversationTopic =
    (id: string, router: NextRouter) => async (dispatch: AppDispatch) => {
        try {
            dispatch(setDeleteConversationLoading(true))

            await API.conversations.deleteConversationTopic(id)
            const pagination = {
                currentPage: 1,
                pageSize: 20,
            }
            dispatch(getConversations(pagination))
            dispatch(updateSelectedConversationId(''))
            dispatch(setConversationMessages(null))
            dispatch(updateActiveChat(null))
            dispatch(
                viewsMiddleware.setToastNotificationPopUpState({
                    open: true,
                    props: {
                        severityType: SeveritiesType.success,
                        title: 'Conversation is successfully deleted!',
                    },
                })
            )
            router.push('/jenny/conversation')
        } catch (error) {
            console.error(error)
        } finally {
            dispatch(setDeleteConversationLoading(false))
            dispatch(
                viewsMiddleware.closeModal(ModalName.DeleteConversationModal)
            )
        }
    }

const updateConversationTopicProps =
    (id: string, data: INewConversationTopic) =>
    async (dispatch: AppDispatch) => {
        try {
            dispatch(setUpdateConversationLoading(true))

            const response = await API.conversations.updateConversationTopic(
                id,
                data
            )
            dispatch(setConversationTopic({ id, ...response.data }))
            dispatch(
                conversationMiddleware.getConversations(
                    {
                        currentPage: 1,
                        pageSize: 20,
                    },
                    ''
                )
            )
        } catch (error) {
            console.error(error)
        } finally {
            dispatch(setUpdateConversationLoading(false))
        }
    }

export default {
    updateConversationTopic,
    updateIsSmaller,
    updateSelectedConversationId,
    createNewConversation,
    getConversations,
    fetchConversations,
    createNewConversationWithMessage,
    getConversationMessages,
    updateConversationListMessages,
    deleteConversationTopic,
    updateConversationTopicProps,
    updateCurrentQuestionValue,
    updateIsChatMessagingInProgress,
    updateActiveChat,
}
