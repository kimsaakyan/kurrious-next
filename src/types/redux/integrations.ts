export interface IIntegrationsProps {
    integrations: IIntegrations[]
    integrationsApiToken: IIntegrationsApiToken[]
    integrationsLoading: boolean
}

export interface IIntegrations {
    name: string
    icon: string
    status: boolean
    id: string
}

export interface IIntegrationsApiToken {
    name: string
    APIKey: string
    Score: {
        read: number
        write: number
    }
    id: string
}

export interface ICreateIntegrationsApiToken {
    tokenName: string
    apiKey: string
}
