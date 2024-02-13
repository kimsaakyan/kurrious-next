import { SliceCaseReducers } from '@reduxjs/toolkit/src/createSlice'
import {
    IOpenedAlert,
    IOpenedModal,
    RedirectionProps,
    ViewsProps,
} from '@/src/types/redux/views'
import { ModalName } from '@/src/types/modals'
import { IAction } from '@/src/redux/store'

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const createReducer = <T extends SliceCaseReducers<ViewsProps>>(
    reducer: T
) => ({ ...reducer })

const reducers = createReducer({
    setRedirection(state, action: IAction<RedirectionProps>) {
        state.redirection = action.payload
    },
    setMenuActiveItem(state, action: IAction<string[]>) {
        state.menu.openItem = action.payload
    },
    setMenuOpenDrawer(state, action: IAction<boolean>) {
        state.menu.drawerOpen = action.payload
    },
    addModalToList<P>(state: ViewsProps, action: IAction<IOpenedModal<P>>) {
        if (!state.modals.find((modal) => modal.name === action.payload.name)) {
            state.modals.push(action.payload)
        }
    },
    removeModalFromList(state: ViewsProps, action: IAction<ModalName>) {
        state.modals = state.modals.filter(
            (modal) => modal.name !== action.payload
        )
    },
    removeAllModalsFromList<P>(
        state: ViewsProps,
        action: IAction<IOpenedModal<P>[]>
    ) {
        state.modals = action.payload
    },
    updateToastNotificationState<P>(
        state: ViewsProps,
        action: IAction<IOpenedAlert<P>>
    ) {
        state.toastNotificationPopUp = action.payload
            ? action.payload
            : { open: false, props: {} }
    },
})

export default reducers
