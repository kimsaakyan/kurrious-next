import { SliceCaseReducers } from '@reduxjs/toolkit/src/createSlice'
import { IAction } from '@/src/redux/store'
import {
    IPrompt,
    IPromptCategory,
} from '@/src/manager/prompt/promptManagerTypes'
import { IPromptsStateProps } from '@/src/types/redux/prompts'

const createReducer = <T extends SliceCaseReducers<IPromptsStateProps>>(
    reducer: T
) => ({ ...reducer })

const reducers = createReducer({
    setPromptsCategories(state, action: IAction<IPromptCategory[]>) {
        state.promptsCategories = action.payload
    },
    setPromptList(state, action: IAction<IPrompt[]>) {
        state.promptsList = action.payload
    },
    setCurrentPrompt(state, action: IAction<IPrompt | null>) {
        state.currentPrompt = action.payload
    },
    setCustomPrompts(state, action: IAction<IPrompt[] | null>) {
        state.customPrompts = action.payload
    },
    setPromptListLoading(state, action: IAction<boolean>) {
        state.loading.promptsList = action.payload
    },
    setPromptCategoriesLoading(state, action: IAction<boolean>) {
        state.loading.promptsCategories = action.payload
    },
    setPromptCreateLoading(state, action: IAction<boolean>) {
        state.loading.promptCreate = action.payload
    },
    setPromptUpdateLoading(state, action: IAction<boolean>) {
        state.loading.promptUpdate = action.payload
    },
    setPromptDeleteLoading(state, action: IAction<boolean>) {
        state.loading.promptDelete = action.payload
    },
    setIsCustomPromptActive(state, action: IAction<boolean>) {
        state.isCustomPromptActive = action.payload
    },
    setActiveCategoryIndex(state, action: IAction<number>) {
        state.activeCategoryIndex = action.payload
    },
    setSelectedPrompt(state, action: IAction<IPrompt | null>) {
        state.selectedPrompt = action.payload
    },
    setActivePromptId(state, action: IAction<string>) {
        state.activePromptId = action.payload
    },
    setFilteredList(state, action: IAction<IPrompt[] | null>) {
        state.filteredList = action.payload
    },
    setSearchValue(state, action: IAction<string>) {
        state.searchValue = action.payload
    },
})

export default reducers
