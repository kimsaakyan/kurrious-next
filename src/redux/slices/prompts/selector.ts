import { createSelector } from '@reduxjs/toolkit'
import { RootState } from '@/src/redux/store'

const selector = (state: RootState) => state.prompts

export const promptsList = createSelector(
    [selector],
    (state) => state.promptsList
)

export const promptsCategories = createSelector(
    [selector],
    (state) => state.promptsCategories
)

export const isPromptsCategoriesLoading = createSelector(
    [selector],
    (state) => state.loading.promptsCategories
)

export const isPromptsListLoading = createSelector(
    [selector],
    (state) => state.loading.promptsList
)

export const isPromptDeleteLoading = createSelector(
    [selector],
    (state) => state.loading.promptDelete
)

export const currentPrompt = createSelector(
    [selector],
    (state) => state.currentPrompt
)

export const customPrompts = createSelector(
    [selector],
    (state) => state.customPrompts
)

export const isCustomPromptActive = createSelector(
    [selector],
    (state) => state.isCustomPromptActive
)

export const activeCategoryIndex = createSelector(
    [selector],
    (state) => state.activeCategoryIndex
)

export const selectedPrompt = createSelector(
    [selector],
    (state) => state.selectedPrompt
)

export const activePromptId = createSelector(
    [selector],
    (state) => state.activePromptId
)

export const filteredList = createSelector(
    [selector],
    (state) => state.filteredList
)

export const searchValue = createSelector(
    [selector],
    (state) => state.searchValue
)

export default {
    customPrompts,
    promptsList,
    promptsCategories,
    isPromptsCategoriesLoading,
    isPromptsListLoading,
    currentPrompt,
    isPromptDeleteLoading,
    selectedPrompt,
    isCustomPromptActive,
    activeCategoryIndex,
    activePromptId,
    filteredList,
    searchValue,
}
