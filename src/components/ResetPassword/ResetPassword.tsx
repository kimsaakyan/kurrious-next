import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/src/components/ui/form'
import { Input } from '@/src/components/ui/input'
import {
    lowercaseRegex,
    numberRegex,
    symbolRegex,
    uppercaseRegex,
} from '@/src/utils/regex'
import { Button } from '@/src/components/ui/button'
import React from 'react'
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'
import { authMiddleware, authSelector } from '@/src/redux/slices/auth'
import { SubmitHandler, useForm } from 'react-hook-form'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { ICreateYourPassword } from '@/src/manager/auth/authManagerTypes'
import { dispatch } from '@/src/redux/hooks'

const formSchema = z
    .object({
        password: z
            .string()
            .min(6, {
                message: 'Password must be at least 6 characters.',
            })
            .refine((value) => uppercaseRegex.test(value), {
                message: 'Password must contain at least one uppercase letter.',
            })
            .refine((value) => lowercaseRegex.test(value), {
                message: 'Password must contain at least one lowercase letter.',
            })
            .refine((value) => numberRegex.test(value), {
                message: 'Password must contain at least one number.',
            })
            .refine((value) => symbolRegex.test(value), {
                message: 'Password must contain at least one symbol.',
            }),
        reEnterPassword: z.string().min(6, {
            message: 'Re Enter Password must be at least 6 characters.',
        }),
    })
    .refine((data) => data.password === data.reEnterPassword, {
        path: ['password'],
        message: 'Passwords do not match',
    })

const ResetPassword = () => {
    const router = useRouter()
    const isLoadingAuth = useSelector(authSelector.isLoadingAuth)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            password: '',
            reEnterPassword: '',
        },
    })

    const passwordValue = form.watch('password', '')

    const onSubmit: SubmitHandler<ICreateYourPassword> = (data) => {
        dispatch(authMiddleware.resetPassword(data.password, router))
    }

    return (
        <Form {...form}>
            <form className="space-y-2" onSubmit={form.handleSubmit(onSubmit)}>
                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="quaternary text-[14px] font-normal">
                                New Password
                            </FormLabel>
                            <FormControl>
                                <Input type="password" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="reEnterPassword"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="quaternary text-[14px] font-normal">
                                Confirm password
                            </FormLabel>
                            <FormControl>
                                <Input type="password" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <div className="space-y-2 text-[11px]">
                    <div
                        className={`${
                            uppercaseRegex.test(passwordValue)
                                ? 'text-green-dark'
                                : 'text-gray-50'
                        }`}
                    >
                        1 Uppercase letter
                    </div>
                    <div
                        className={`${
                            lowercaseRegex.test(passwordValue)
                                ? 'text-green-dark'
                                : 'text-gray-50'
                        }`}
                    >
                        1 lowercase letter
                    </div>
                    <div
                        className={`${
                            numberRegex.test(passwordValue)
                                ? 'text-green-dark'
                                : 'text-gray-50'
                        }`}
                    >
                        1 number
                    </div>
                    <div
                        className={`${
                            symbolRegex.test(passwordValue)
                                ? 'text-green-dark'
                                : 'text-gray-50'
                        }`}
                    >
                        1 symbol
                    </div>
                </div>
                <Button
                    isLoading={isLoadingAuth}
                    type="submit"
                    size="fullLg"
                    className="font-semibold"
                    disabled={
                        isLoadingAuth ||
                        !form.getValues('password') ||
                        !form.getValues('reEnterPassword')
                    }
                >
                    Reset Password
                </Button>
            </form>
        </Form>
    )
}

export default ResetPassword
