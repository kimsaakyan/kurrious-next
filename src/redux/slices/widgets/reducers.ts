import { SliceCaseReducers } from '@reduxjs/toolkit/src/createSlice'
import { IAction } from '@/src/redux/store'
import { IWidgetsState } from '@/src/types/redux/widget'
import { IWidget } from '@/src/types/redux/widget'

const createReducer = <T extends SliceCaseReducers<IWidgetsState>>(
    reducer: T
) => ({ ...reducer })

const reducers = createReducer({
    setWidgetsList(state, action: IAction<IWidget[]>) {
        state.allWidgetsList = action.payload
    },
    setUpdatingStatus(state, action: IAction<boolean>) {
        state.isUpdating = action.payload
    },
})

export default reducers
