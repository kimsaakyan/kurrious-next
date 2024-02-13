import { IIntegrationsProps } from '@/src/types/redux/integrations'

export const getInitialState = (): IIntegrationsProps => ({
    integrations: [],
    integrationsApiToken: [],
    integrationsLoading: false,
})
