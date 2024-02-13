import CloseIcon from '@/src/components/Icons/CloseIcon'
import SuccessIcon from '@/src/components/Icons/SuccessIcon'
import InformationIcon from '@/src/components/Icons/InformationIcon'
import LoadingIcon from '@/src/components/Icons/LoadingIcon'
import { dispatch } from '@/src/redux/hooks'
import { viewsMiddleware, viewsSelector } from '@/src/redux/slices/views'
import { useSelector } from 'react-redux'
import { SeveritiesType } from '@/src/enums/index'
import { useEffect } from 'react'
import { Button } from '@/src/components/ui/button'

const ToastNotification = () => {
    const toastNotificationPopUp = useSelector(
        viewsSelector.toastNotificationPopUp
    )
    const notificationType = toastNotificationPopUp.props.severityType
    const notificationDescription = toastNotificationPopUp.props?.description
    const notificationTitle = toastNotificationPopUp.props?.title

    const closeModal = () => {
        dispatch(
            viewsMiddleware.setToastNotificationPopUpState({
                open: false,
                props: {},
            })
        )
    }

    useEffect(() => {
        if (notificationType !== SeveritiesType.info) {
            const autoHideDuration = 7000

            const timerId = setTimeout(() => {
                closeModal()
            }, autoHideDuration)

            return () => clearTimeout(timerId)
        }
    }, [])

    return (
        <div
            className={`absolute  ${
                notificationType === SeveritiesType.info
                    ? 'bottom-2 left-48 top-auto'
                    : null
            } left-1/2 top-14 z-50 -translate-x-1/2 transform`}
        >
            <div
                className={`relative inset-0 flex h-auto items-start rounded-2xl ${
                    notificationType === SeveritiesType.success
                        ? 'w-[520px] bg-green-500'
                        : null
                }
                ${
                    notificationType === SeveritiesType.error
                        ? 'w-[520px] bg-red-500'
                        : null
                }
                ${
                    notificationType === SeveritiesType.info
                        ? 'bg-black-100'
                        : null
                } 
                flex items-center justify-between px-10 text-base text-white shadow-lg`}
            >
                <div>
                    {notificationType === SeveritiesType.success && (
                        <SuccessIcon />
                    )}
                    {notificationType === SeveritiesType.error && (
                        <InformationIcon />
                    )}
                    {notificationType === SeveritiesType.info && (
                        <LoadingIcon />
                    )}
                </div>
                <div
                    className={`${
                        notificationType === SeveritiesType.info
                            ? ' ml-6'
                            : 'mx-6'
                    } h-auto max-h-96 w-full flex-col justify-center overflow-auto py-5`}
                >
                    <div className="h-auto break-words text-sm">
                        {notificationType !== SeveritiesType.info ? (
                            notificationTitle
                        ) : (
                            <div className="flex items-center">
                                <div>Reconnecting...</div>
                                <Button
                                    variant="transparent"
                                    className="ml-2 text-blue-light"
                                    onClick={() => {
                                        window.location.reload()
                                    }}
                                >
                                    Refresh
                                </Button>
                            </div>
                        )}
                    </div>
                    {notificationDescription && (
                        <div className="mt-4 h-auto break-words text-xs">
                            {notificationDescription}
                        </div>
                    )}
                </div>
                {notificationType !== SeveritiesType.info && (
                    <div onClick={closeModal} className="cursor-pointer">
                        <CloseIcon color="white" />
                    </div>
                )}
            </div>
        </div>
    )
}

export default ToastNotification
