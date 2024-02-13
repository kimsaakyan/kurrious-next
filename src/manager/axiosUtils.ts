import { AxiosResponse } from 'axios'
import store from '@/src/redux/store'
import { viewsMiddleware } from '@/src/redux/slices/views/index'
import { SeveritiesType } from '@/src/enums'

export const handleErrorActions = (error: {
    response: AxiosResponse
}): void => {
    switch (error?.response?.status) {
        default:
            store.dispatch(
                viewsMiddleware.setToastNotificationPopUpState({
                    open: true,
                    props: {
                        severityType: SeveritiesType.error,
                        title:
                            error.response?.data?.detail ||
                            'Something went wrong',
                    },
                })
            )
    }
}
