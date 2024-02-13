import { AppDispatch } from '@/src/redux/store'
import API from '@/src/manager/API'
import slice from '@/src/redux/slices/integrations/slice'
import { ICreateIntegrationsApiToken } from '@/src/types/redux/integrations'
import { viewsMiddleware } from '@/src/redux/slices/views'
import { ModalName } from '@/src/types/modals'
import { SeveritiesType } from '@/src/enums'

const {
    setIntegrationsList,
    setIntegrationsApiTokensList,
    setIntegrationsLoading,
} = slice.actions

const getIntegrationsList = () => async (dispatch: AppDispatch) => {
    try {
        dispatch(setIntegrationsLoading(true))
        const response = await API.integrations.getIntegrationsList()

        dispatch(setIntegrationsList(response.data.data.integrations))
    } catch (error) {
        console.error(error)
    } finally {
        dispatch(setIntegrationsLoading(false))
    }
}

const getIntegrationsApiTokensList =
    (id: string) => async (dispatch: AppDispatch) => {
        try {
            dispatch(setIntegrationsLoading(true))
            const response =
                await API.integrations.getIntegrationsApiTokensList(id)

            dispatch(setIntegrationsApiTokensList(response.data.data.APITokens))
        } catch (error) {
            console.error(error)
        } finally {
            dispatch(setIntegrationsLoading(false))
        }
    }

const createIntegrationsApiTokens =
    (data: ICreateIntegrationsApiToken) => async (dispatch: AppDispatch) => {
        try {
            dispatch(setIntegrationsLoading(true))
            await API.integrations.createIntegrationsApiToken(data)
            dispatch(viewsMiddleware.closeModal(ModalName.ApiTokenModal))
            dispatch(
                viewsMiddleware.setToastNotificationPopUpState({
                    open: true,
                    props: {
                        severityType: SeveritiesType.success,
                        title: 'New API Token added!',
                    },
                })
            )
        } catch (error) {
            console.error(error)
        } finally {
            dispatch(setIntegrationsLoading(false))
        }
    }

const deactivateAPIToken =
    (data: { id: string }) => async (dispatch: AppDispatch) => {
        try {
            dispatch(setIntegrationsLoading(true))
            await API.integrations.deactivateApiToken(data)
            dispatch(
                viewsMiddleware.setToastNotificationPopUpState({
                    open: true,
                    props: {
                        severityType: SeveritiesType.success,
                        title: 'API Token Deactivated!',
                    },
                })
            )
        } catch (error) {
            console.error(error)
        } finally {
            dispatch(setIntegrationsLoading(false))
        }
    }
export default {
    getIntegrationsList,
    getIntegrationsApiTokensList,
    createIntegrationsApiTokens,
    deactivateAPIToken,
}
