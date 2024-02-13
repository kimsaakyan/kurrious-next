import { ModalName } from '@/src/types/modals'

export interface ViewsProps {
    redirection: RedirectionProps
    menu: MenuProps
    // Temporary solution
    modals: IOpenedModal<any>[]
    toastNotificationPopUp: IOpenedAlert<any>
}

export interface RedirectionProps {
    path: string
    params?: string
    apply: boolean
}

export interface MenuProps {
    openItem: string[]
    drawerOpen: boolean
}

export interface IOpenedModal<P> {
    name: ModalName
    props: P
}

export interface IOpenedAlert<P> {
    open: boolean
    props: P
}

export interface IAddUserModalForm {
    firstName: string
    lastName: string
    email: string
    password: string
    role: string
}

export interface ISamsaraKeyModalProps {
    companyId: string
}

export interface IAddUserModalProps {
    companyName: string
}
