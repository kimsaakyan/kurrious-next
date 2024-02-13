import { ViewsProps } from '@/src/types/redux/views'

export const getInitialState = (): ViewsProps => ({
    redirection: {
        path: '/',
        params: '',
        apply: false,
    },
    menu: {
        openItem: ['dashboard'],
        drawerOpen: false,
    },
    modals: [],
    toastNotificationPopUp: {
        open: false,
        props: {},
    },
})
