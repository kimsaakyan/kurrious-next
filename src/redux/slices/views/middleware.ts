import slice from './slice'
import {
    IOpenedAlert,
    IOpenedModal,
    RedirectionProps,
} from '@/src/types/redux/views'
import { AppDispatch } from '@/src/redux/store'
import { ModalName } from '@/src/types/modals'

const {
    setRedirection,
    setMenuActiveItem,
    setMenuOpenDrawer,
    addModalToList,
    removeModalFromList,
    updateToastNotificationState,
    removeAllModalsFromList,
} = slice.actions

const setRedirectionState =
    (value: RedirectionProps) => (dispatch: AppDispatch) => {
        dispatch(setRedirection(value))
    }

const activateMenuItem = (value: string[]) => (dispatch: AppDispatch) => {
    dispatch(setMenuActiveItem(value))
}

const openMenuDrawer = (value: boolean) => (dispatch: AppDispatch) => {
    dispatch(setMenuOpenDrawer(value))
}

const openModal =
    <P>(value: IOpenedModal<P>) =>
    (dispatch: AppDispatch) => {
        dispatch(addModalToList(value))
    }

const closeModal = (name: ModalName) => (dispatch: AppDispatch) => {
    dispatch(removeModalFromList(name))
}

const closeAllModals = () => (dispatch: AppDispatch) => {
    dispatch(removeAllModalsFromList([]))
}

const setToastNotificationPopUpState =
    <P>(value: IOpenedAlert<P>) =>
    (dispatch: AppDispatch) => {
        dispatch(updateToastNotificationState(value))
    }

export default {
    setRedirectionState,
    activateMenuItem,
    openMenuDrawer,
    openModal,
    closeModal,
    setToastNotificationPopUpState,
    closeAllModals,
}
