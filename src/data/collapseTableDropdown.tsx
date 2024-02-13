import { dispatch } from '@/src/redux/hooks'
import { companiesMiddleware } from '@/src/redux/slices/companies'
import { ICollapseTableDropdown } from '@/src/types/companies'

export const collapseTableDropdown: ICollapseTableDropdown[] = [
    {
        key: 'edit',
        label: 'Edit',
        onClick: (props) => {
            const { user } = props
            if (user) {
                dispatch(
                    companiesMiddleware.updateCompanyUserData({
                        firstName: user.firstName,
                        lastName: user.lastName,
                        userType: user.userType,
                        userName: user.username,
                        phoneNumber: user.phoneNumber,
                    })
                )
                dispatch(companiesMiddleware.updateActiveFinderId(user.id))
            }
        },
    },
    {
        key: 'delete',
        label: 'Delete',
        danger: true,
        onClick: (props): void => {
            if (props?.user?.id) {
                dispatch(companiesMiddleware.deleteCompanyUser(props.user.id))
            }
        },
    },
]
