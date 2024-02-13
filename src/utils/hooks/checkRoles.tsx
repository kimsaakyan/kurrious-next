import { USER_ROLES } from '@/src/roles/roles'

export const CheckRoles = (
    userRoles: string[],
    currentRole: string | undefined
) => {
    return userRoles.includes(
        USER_ROLES[currentRole as keyof typeof USER_ROLES] || ''
    )
}
