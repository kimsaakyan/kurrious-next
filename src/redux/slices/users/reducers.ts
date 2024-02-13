import { SliceCaseReducers } from '@reduxjs/toolkit/src/createSlice'
import { IAction } from '@/src/redux/store'
import { UsersStateProps } from '@/src/types/redux/users'

const createReducer = <T extends SliceCaseReducers<UsersStateProps>>(
    reducer: T
) => ({ ...reducer })

const reducers = createReducer({
    setIsLoadingUsers(state, action: IAction<boolean>) {
        state.isLoadingUsers = action.payload
    },
    setAvatar(state, action: IAction<string>) {
        state.avatar = action.payload
    },
})

export default reducers
