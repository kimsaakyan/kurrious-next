import slice from './slice'
import { AppDispatch } from '@/src/redux/store'
import API from '@/src/manager/API'
import {
    IPrompt,
    IPromptCreateReqBody,
} from '@/src/manager/prompt/promptManagerTypes'
import { promptMiddleware } from '@/src/redux/slices/prompts/index'

const {
    setCustomPrompts,
    setPromptsCategories,
    setPromptList,
    setPromptListLoading,
    setPromptCategoriesLoading,
    setPromptCreateLoading,
    setPromptUpdateLoading,
    setPromptDeleteLoading,
    setCurrentPrompt,
    setIsCustomPromptActive,
    setActiveCategoryIndex,
    setSelectedPrompt,
    setActivePromptId,
    setFilteredList,
    setSearchValue,
} = slice.actions

const getPromptsCategories = () => async (dispatch: AppDispatch) => {
    try {
        dispatch(setPromptCategoriesLoading(true))

        const response = await API.prompt.getPromptsCategories()

        const readyResponse = response.data.data.map((item) => {
            return {
                title: item.title.toLowerCase(),
            }
        })

        dispatch(setPromptsCategories(readyResponse))
    } catch (error) {
        console.error(error)
    } finally {
        dispatch(setPromptCategoriesLoading(false))
    }
}

const getPromptsList = () => async (dispatch: AppDispatch) => {
    try {
        dispatch(setPromptListLoading(true))

        const response = await API.prompt.getPromptsList()

        const readyResponse = response.data.data.map((item) => {
            const lowerCaseCategories = item.categories.map((category) => {
                return category.toLowerCase()
            })
            return {
                ...item,
                categories: lowerCaseCategories,
            }
        })

        dispatch(setPromptList(readyResponse))
    } catch (error) {
        console.error(error)
    } finally {
        dispatch(setPromptListLoading(false))
    }
}

const getCustomPrompts = () => async (dispatch: AppDispatch) => {
    try {
        dispatch(setPromptListLoading(true))

        const response = await API.prompt.getCustomPrompts()

        const readyResponse = response.data.data.map((item) => {
            const lowerCaseCategories = item.categories.map((category) => {
                return category.toLowerCase()
            })
            return {
                ...item,
                categories: lowerCaseCategories,
            }
        })

        dispatch(setCustomPrompts(readyResponse))
    } catch (error) {
        console.error(error)
    } finally {
        dispatch(setPromptListLoading(false))
    }
}

const createPrompt =
    (data: IPromptCreateReqBody) => async (dispatch: AppDispatch) => {
        try {
            dispatch(setPromptCreateLoading(true))

            await API.prompt.createPrompt(data)
            dispatch(promptMiddleware.getPromptsList())
            dispatch(promptMiddleware.getCustomPrompts())
        } catch (error) {
            console.error(error)
        } finally {
            dispatch(setPromptCreateLoading(false))
        }
    }
const updatePrompt =
    (id: string, data: IPromptCreateReqBody) =>
    async (dispatch: AppDispatch) => {
        try {
            dispatch(setPromptUpdateLoading(true))

            await API.prompt.updatePrompt(id, data)
            dispatch(promptMiddleware.getPromptsList())
        } catch (error) {
            console.error(error)
        } finally {
            dispatch(setPromptUpdateLoading(false))
        }
    }

const deletePrompt = (id: string) => async (dispatch: AppDispatch) => {
    try {
        dispatch(setPromptDeleteLoading(true))

        await API.prompt.deletePrompt(id)
        dispatch(promptMiddleware.getPromptsList())
    } catch (error) {
        console.error(error)
    } finally {
        dispatch(setPromptDeleteLoading(false))
    }
}

const updateCurrentPrompt = (prompt: IPrompt) => (dispatch: AppDispatch) => {
    dispatch(setCurrentPrompt(prompt))
}

const updateIsCustomPromptActive =
    (value: boolean) => (dispatch: AppDispatch) => {
        dispatch(setIsCustomPromptActive(value))
    }

const updateSelectedPrompt =
    (data: IPrompt | null) => (dispatch: AppDispatch) => {
        dispatch(setSelectedPrompt(data))
    }

const updateActiveCategoryIndex =
    (value: number) => (dispatch: AppDispatch) => {
        dispatch(setActiveCategoryIndex(value))
    }

const updateActivePromptId = (value: string) => (dispatch: AppDispatch) => {
    dispatch(setActivePromptId(value))
}

const updateFilteredList =
    (value: IPrompt[] | null) => (dispatch: AppDispatch) => {
        dispatch(setFilteredList(value))
    }

const updateSearchValue = (value: string) => (dispatch: AppDispatch) => {
    dispatch(setSearchValue(value))
}

const clearSelectedPrompt = () => (dispatch: AppDispatch) => {
    dispatch(setCurrentPrompt(null))
}

export default {
    getCustomPrompts,
    getPromptsCategories,
    getPromptsList,
    createPrompt,
    updatePrompt,
    deletePrompt,
    updateCurrentPrompt,
    clearSelectedPrompt,
    updateIsCustomPromptActive,
    updateActiveCategoryIndex,
    updateSelectedPrompt,
    updateFilteredList,
    updateActivePromptId,
    updateSearchValue,
}
