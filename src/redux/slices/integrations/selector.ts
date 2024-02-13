import { createSelector } from '@reduxjs/toolkit'
import { RootState } from '@/src/redux/store'

const selector = (state: RootState) => state.integrations

export const integrationsList = createSelector(
    [selector],
    (state) => state.integrations
)

export const integrationsApiTokenList = createSelector(
    [selector],
    (state) => state.integrationsApiToken
)

export default {
    integrationsList,
    integrationsApiTokenList,
}
