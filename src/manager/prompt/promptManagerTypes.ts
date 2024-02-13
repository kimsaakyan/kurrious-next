export interface IPromptCategory {
    title: string
}

export interface IPrompt {
    _id?: string
    text: string
    categories: string[]
    name: string
    published: boolean
    createdAt: Date | string
}

export interface IPromptCreateReqBody {
    name: string
    text: string
}

export interface IPromptDeleteResponse {
    message: string
}
