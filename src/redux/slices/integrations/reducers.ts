import { SliceCaseReducers } from '@reduxjs/toolkit/src/createSlice'
import { IAction } from '@/src/redux/store'
import {
    IIntegrations,
    IIntegrationsApiToken,
    IIntegrationsProps,
} from '@/src/types/redux/integrations'

const createReducer = <T extends SliceCaseReducers<IIntegrationsProps>>(
    reducer: T
) => ({ ...reducer })

const reducers = createReducer({
    setIntegrationsList(state, action: IAction<IIntegrations[]>) {
        state.integrations = action.payload
    },
    setIntegrationsApiTokensList(
        state,
        action: IAction<IIntegrationsApiToken[]>
    ) {
        state.integrationsApiToken = action.payload
    },
    setIntegrationsLoading(state, action: IAction<boolean>) {
        state.integrationsLoading = action.payload
    },
})

export default reducers
