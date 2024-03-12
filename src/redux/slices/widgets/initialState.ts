import { IWidgetsState } from '@/src/types/redux/widget'

export const getInitialState = (): IWidgetsState => ({
    allWidgetsList: [],
	isUpdating: false
})
