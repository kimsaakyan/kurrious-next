import { AppDispatch } from '@/src/redux/store'
import API from '@/src/manager/API'
import slice from './slice'
import { IWidget } from '@/src/types/redux/widget'

const { setWidgetsList, setUpdatingStatus } =
    slice.actions

const getWidgets =
    (companyId: string, currentWidgets: IWidget[]) =>
    async (dispatch: AppDispatch) => {
        try {
            const response = await API.widgets.getWidgets(companyId)
            dispatch(setWidgetsList(response.data.data.widgets))
        } catch (error) {
            console.error(error)
        }
    }

const updateWidgets =
    (companyId: string, selectedWidgets: IWidget[]) =>
    async (dispatch: AppDispatch) => {
        try {
            dispatch(setUpdatingStatus(true))

            const response = await API.widgets.updateWidgets(
                companyId,
                selectedWidgets
            )

            console.log(response)
        } catch (error) {
            console.error(error)
        } finally {
            dispatch(setUpdatingStatus(false))
        }
    }

export default { getWidgets, updateWidgets }
