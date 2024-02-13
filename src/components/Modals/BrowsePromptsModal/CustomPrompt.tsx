import { PromptCategoryEnum } from '@/src/enums'
import Loader from '@/src/components/Loader/Loader'
import { v4 } from 'uuid'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { promptMiddleware, promptSelector } from '@/src/redux/slices/prompts'
import { IPromptCategory } from '@/src/manager/prompt/promptManagerTypes'
import { dispatch } from '@/src/redux/hooks'

const CustomPrompt = () => {
    const isPromptsCategoriesLoading = useSelector(
        promptSelector.isPromptsCategoriesLoading
    )
    const activeCategoryIndex = useSelector(promptSelector.activeCategoryIndex)
    const promptsList = useSelector(promptSelector.promptsList)
    const promptsCategories = useSelector(promptSelector.promptsCategories)
    const [promptsCategoriesState, setPromptsCategoriesState] = useState<
        IPromptCategory[] | null
    >(null)
    const [selectedCategory, setSelectedCategory] = useState<string>(
        PromptCategoryEnum.Custom
    )

    const onCategoryClick = (index: number, category: string) => {
        dispatch(promptMiddleware.updateSearchValue(''))
        dispatch(promptMiddleware.updateSelectedPrompt(null))
        dispatch(promptMiddleware.updateActivePromptId(''))
        if (category === PromptCategoryEnum.Custom) {
            dispatch(promptMiddleware.updateIsCustomPromptActive(true))
        } else {
            dispatch(promptMiddleware.updateIsCustomPromptActive(false))
        }
        dispatch(promptMiddleware.updateActiveCategoryIndex(index))
        setSelectedCategory(category)
    }

    useEffect(() => {
        setPromptsCategoriesState(promptsCategories)
    }, [promptsCategories])

    useEffect(() => {
        const filteredTempArr = promptsList?.filter((item) =>
            item.categories.includes(selectedCategory)
        )
        if (filteredTempArr && filteredTempArr?.length) {
            dispatch(promptMiddleware.updateFilteredList(filteredTempArr))
        }
    }, [selectedCategory])

    return (
        <div className="w-3/12 self-stretch overflow-scroll border-r border-gray-300 pr-3">
            <div className="my-1.5 pr-1.5 opacity-40">
                <div className="h-0 w-full border border-gray-300"></div>
            </div>
            {isPromptsCategoriesLoading ? (
                <div>
                    <Loader />
                </div>
            ) : (
                <div>
                    {promptsCategoriesState?.map((item, index) => (
                        <div
                            key={v4()}
                            onClick={() =>
                                onCategoryClick(index + 1, item.title)
                            }
                            className={`mb-1 cursor-pointer truncate rounded p-2.5 text-sm font-medium capitalize ${
                                activeCategoryIndex === index + 1 &&
                                'bg-primary-100'
                            } text-blue-dark`}
                        >
                            {item.title}
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default CustomPrompt
