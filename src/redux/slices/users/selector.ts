import { createSelector } from '@reduxjs/toolkit'
import { RootState } from '@/src/redux/store'

const selector = (state: RootState) => state.users

export const isLoadingUsers = createSelector(
    [selector],
    (state) => state.isLoadingUsers
)

export const avatar = createSelector([selector], (state) => state.avatar)

export default {
    isLoadingUsers,
    avatar,
}
