import {
    IPrompt,
    IPromptCategory,
} from '@/src/manager/prompt/promptManagerTypes'

export interface IPromptsStateProps {
    promptsCategories: IPromptCategory[] | null
    promptsList: IPrompt[] | null
    customPrompts: IPrompt[] | null
    currentPrompt: IPrompt | null
    isCustomPromptActive: boolean
    activeCategoryIndex: number
    selectedPrompt: IPrompt | null
    activePromptId: string
    searchValue: string
    filteredList: IPrompt[] | null
    loading: {
        promptsCategories: boolean
        promptsList: boolean
        promptCreate: boolean
        promptUpdate: boolean
        promptDelete: boolean
    }
}
