import { AppDispatch } from '@/src/redux/store'
import API from '@/src/manager/API'
import { viewsMiddleware } from '@/src/redux/slices/views'
import { SeveritiesType } from '@/src/enums'
import slice from '@/src/redux/slices/chatbotMessages/slice'

const { setIsLoadingChatbot } = slice.actions
const updateFeedBack =
    (messageId: string, feedbackType: 'thumbs_up' | 'thumbs_down') =>
    async (dispatch: AppDispatch) => {
        try {
            dispatch(setIsLoadingChatbot(true))
            await API.chatbotMessages.updateFeedback(messageId, feedbackType)
            dispatch(
                viewsMiddleware.setToastNotificationPopUpState({
                    open: true,
                    props: {
                        severityType: SeveritiesType.success,
                        title: 'Success!',
                    },
                })
            )
        } catch (error) {
            console.error(error)
        } finally {
            dispatch(setIsLoadingChatbot(true))
        }
    }

export default {
    updateFeedBack,
}
