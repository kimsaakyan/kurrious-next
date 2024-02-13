import { IPromptsStateProps } from '@/src/types/redux/prompts'

export const getInitialState = (): IPromptsStateProps => ({
    promptsList: null,
    customPrompts: null,
    promptsCategories: null,
    currentPrompt: null,
    isCustomPromptActive: false,
    selectedPrompt: null,
    filteredList: null,
    searchValue: '',
    activeCategoryIndex: 0,
    activePromptId: '',
    loading: {
        promptsCategories: false,
        promptsList: false,
        promptCreate: false,
        promptUpdate: false,
        promptDelete: false,
    },
})
