export interface IWidget {
    id: string
    label?: string
    type?: string
}

export interface IGetWidgetsResponse {
    data: {
        widgets: IWidget[]
    }
    message: string
    succeed: boolean
}

export interface IUpdateWidgetsResponse {
    data: null
    message: string
    succeed: boolean
}