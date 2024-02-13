import React, { useEffect } from 'react'
import AvatarProfile from '@/src/components/AvatarProfile/AvatarProfile'
import SuperAdminLayout from '@/src/layouts/SuperAdminLayout/SuperAdminLayout'
import * as z from 'zod'
import { Button } from '@/src/components/ui/button'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/src/components/ui/form'
import { SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { IUserForm } from '@/src/manager/users/usersManagerTypes'
import { Input } from '@/src/components/ui/input'
import { dispatch } from '@/src/redux/hooks'
import { useSelector } from 'react-redux'
import { authMiddleware, authSelector } from '@/src/redux/slices/auth'
import { usersMiddleware, usersSelector } from '@/src/redux/slices/users'
import PhoneInputCustomer from '@/src/components/PhoneInput/PhoneInput'

const formSchema = z.object({
    email: z
        .string()
        .min(1, { message: 'Please input your E-mail!' })
        .email('This is not a valid email.'),
    username: z.string().min(1, { message: 'Please input your Username!' }),
    phoneNumber: z
        .string()
        .min(1, { message: 'Please input your Phone Number!' }),
})

const ProfilePage = (): ReactNode => {
    const currentUser = useSelector(authSelector.currentUser)
    const isLoadingUsers = useSelector(usersSelector.isLoadingUsers)
    const isLoadingAuth = useSelector(authSelector.isLoadingAuth)
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: currentUser?.email,
            username: currentUser?.username,
            phoneNumber: currentUser?.phoneNumber,
        },
    })

    const onSubmit: SubmitHandler<Partial<IUserForm>> = (data) => {
        const userData = {
            username: data.username,
            phoneNumber: data.phoneNumber,
            lastName: currentUser?.lastName,
            firstName: currentUser?.firstName,
        }

        dispatch(usersMiddleware.updateUsers(userData, currentUser?.id))
    }

    const onResetPasswordClick = () => {
        dispatch(authMiddleware.forgotPassword(currentUser?.email))
    }

    useEffect(() => {
        form.reset({
            email: currentUser?.email,
            username: currentUser?.username,
            phoneNumber: currentUser?.phoneNumber,
        })
    }, [currentUser])

    return (
        <div className="px-4 py-5">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <AvatarProfile />
                    <div className="mt-[22px] w-[425px] space-y-5">
                        <FormField
                            control={form.control}
                            name="username"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="mb-[8px] block text-[14px] text-quaternary">
                                        Username
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            className="pr-11"
                                            size="sm"
                                            icon={
                                                <img
                                                    src="/images/edit.svg"
                                                    width={15}
                                                    alt="Logo"
                                                    className="text-blue-300"
                                                />
                                            }
                                            {...field}
                                            type="text"
                                            placeholder="Username"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="mb-[8px] block text-[14px] text-quaternary">
                                        Email
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            className="pr-32"
                                            disabled
                                            size="sm"
                                            {...field}
                                            type="email"
                                            placeholder="Email"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="phoneNumber"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="mb-[8px] block text-[14px] text-quaternary">
                                        Phone number
                                    </FormLabel>
                                    <FormControl>
                                        <PhoneInputCustomer
                                            icon={
                                                <img
                                                    src="/images/edit.svg"
                                                    width={15}
                                                    alt="Logo"
                                                    className="text-blue-300"
                                                />
                                            }
                                            field={field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div>
                            <div className="mb-[8px] block text-[14px] font-medium text-quaternary">
                                Password
                            </div>
                            <Button
                                type="button"
                                disabled={isLoadingAuth}
                                isLoading={isLoadingAuth}
                                onClick={onResetPasswordClick}
                                size="mediumSm"
                                variant="destructive"
                                className="rounded-md bg-gray-300 text-xs"
                            >
                                Reset Password
                            </Button>
                        </div>
                        <Button
                            type="submit"
                            size="sm"
                            isLoading={isLoadingUsers}
                            disabled={isLoadingUsers}
                            className="w-28 text-xs"
                        >
                            Save
                        </Button>
                    </div>
                </form>
            </Form>
        </div>
    )
}

export default ProfilePage

ProfilePage.getLayout = function getLayout(page: ReactNode) {
    return <SuperAdminLayout>{page}</SuperAdminLayout>
}
