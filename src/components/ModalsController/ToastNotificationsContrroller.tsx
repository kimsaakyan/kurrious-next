import React from 'react'
import { viewsSelector } from '@/src/redux/slices/views/index'
import { useSelector } from 'react-redux'
import ToastNotification from '../Tooltip/ToastNotification'

export const ToastNotificationsController = () => {
    const toastNotificationPopUp = useSelector(
        viewsSelector.toastNotificationPopUp
    )

    return !toastNotificationPopUp.open ? null : <ToastNotification />
}
