import { createSelector } from '@reduxjs/toolkit'
import { RootState } from '@/src/redux/store'

const selector = (state: RootState) => state.widgets

export const allWidgetsList = createSelector(
    [selector],
    (state) => state.allWidgetsList
)

export const isUpdating = createSelector(
    [selector],
    (state) => state.isUpdating
)

export default {
    allWidgetsList,
	isUpdating
}
