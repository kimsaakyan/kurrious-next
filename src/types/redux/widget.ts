export interface IWidget {
    id: string
    label?: string
    type?: string
}

export interface IWidgetsState {
    allWidgetsList: IWidget[]
    isUpdating: boolean
}
