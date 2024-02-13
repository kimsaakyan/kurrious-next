import { createSelector } from '@reduxjs/toolkit'
import { RootState } from '@/src/redux/store'

const selector = (state: RootState) => state.auth

export const isLoadingAuth = createSelector(
    [selector],
    (state) => state.loading.login
)

export const currentUser = createSelector(
    [selector],
    (state) => state.currentUser
)

export default {
    isLoadingAuth,
    currentUser,
}
