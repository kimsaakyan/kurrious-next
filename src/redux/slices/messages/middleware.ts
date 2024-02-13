import { AppDispatch } from '@/src/redux/store'
import slice from '@/src/redux/slices/messages/slice'
import API from '@/src/manager/API'
import { ITopic } from '@/src/types/redux/conversations'
import { IMessagesConversations } from '@/src/types/redux/messages'
import { messagesMiddleware } from '@/src/redux/slices/messages/index'

const {
    setIsLoading,
    setConversationTopic,
    setMessagesConversations,
    setMessagesConversation,
    setMessagesSuggestion,
    setShowToastJenny,
    setShouldExecuteScroll,
} = slice.actions
const getMessagesConversations = () => async (dispatch: AppDispatch) => {
    try {
        dispatch(setIsLoading(true))
        const response = await API.messages.getMessagesConversations()
        dispatch(setMessagesConversations(response.data))
    } catch (error) {
        console.error(error)
    } finally {
        dispatch(setIsLoading(false))
    }
}

const getIntervalMessagesConversations =
    (key: string | undefined, topic: ITopic | null) =>
    async (dispatch: AppDispatch) => {
        try {
            const response = await API.messages.getMessagesConversations()
            if (key && topic?.id) {
                const responseConversation =
                    await API.messages.getMessagesConversation(key)
                dispatch(
                    setMessagesConversation(
                        responseConversation.data.data.reverse()
                    )
                )
            }
            dispatch(setMessagesConversations(response.data))
        } catch (error) {
            console.error(error)
        }
    }

const getMessagesConversation =
    (driverId: string | undefined) => async (dispatch: AppDispatch) => {
        try {
            dispatch(setIsLoading(true))
            const response = await API.messages.getMessagesConversation(
                driverId
            )
            dispatch(setMessagesConversation(response.data.data.reverse()))
        } catch (error) {
            console.error(error)
        } finally {
            dispatch(setIsLoading(false))
        }
    }

const createMessagesConversation =
    (driverId: string | undefined, text: string | undefined) =>
    async (dispatch: AppDispatch) => {
        try {
            await API.messages.createMessagesConversation(driverId, text)
            const response = await API.messages.getMessagesConversations()
            dispatch(setMessagesConversations(response.data))
        } catch (error) {
            console.error(error)
        }
    }

const getSuggestion =
    (driverId: string | undefined) => async (dispatch: AppDispatch) => {
        try {
            const response = await API.messages.getSuggestion(driverId)
            dispatch(
                setMessagesSuggestion({
                    text: response.data.data.answer,
                    driverId,
                })
            )
            dispatch(messagesMiddleware.updateShowToastJenny(true))
        } catch (error) {
            console.error(error)
        }
    }

const updateMessagesTopic =
    (topic: ITopic | null) => async (dispatch: AppDispatch) => {
        dispatch(setConversationTopic(topic))
    }

const updateMessagesConversation =
    (data: IMessagesConversations[]) => async (dispatch: AppDispatch) => {
        dispatch(setMessagesConversation(data))
    }

const updateShowToastJenny =
    (value: boolean) => async (dispatch: AppDispatch) => {
        dispatch(setShowToastJenny(value))
    }

const updateShouldExecuteScroll =
    (value: boolean) => async (dispatch: AppDispatch) => {
        dispatch(setShouldExecuteScroll(value))
    }

export default {
    getMessagesConversations,
    updateMessagesTopic,
    getMessagesConversation,
    updateMessagesConversation,
    updateShouldExecuteScroll,
    createMessagesConversation,
    getSuggestion,
    updateShowToastJenny,
    getIntervalMessagesConversations,
}
