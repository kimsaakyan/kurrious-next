import { SliceCaseReducers } from '@reduxjs/toolkit/src/createSlice'
import { AuthStateProps } from '@/src/types/redux/auth'
import { IAction } from '@/src/redux/store'
import { IUser } from '@/src/manager/companies/companiesManagerTypes'

const createReducer = <T extends SliceCaseReducers<AuthStateProps>>(
    reducer: T
) => ({ ...reducer })

const reducers = createReducer({
    setLoginLoading(state, action: IAction<boolean>) {
        state.loading.login = action.payload
    },
    setCurrentUser(state, action: IAction<IUser>) {
        state.currentUser = action.payload
    },
})

export default reducers
