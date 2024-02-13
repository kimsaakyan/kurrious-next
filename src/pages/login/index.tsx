import React from 'react'
import { useRouter } from 'next/router'
import { dispatch } from '@/src/redux/hooks'
import { authMiddleware, authSelector } from '@/src/redux/slices/auth/index'
import { Button } from '@/src/components/ui/button'
import { useSelector } from 'react-redux'
import { SubmitHandler, useForm } from 'react-hook-form'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/src/components/ui/form'
import { Input } from '@/src/components/ui/input'
import { ISignInForm } from '@/src/types/redux/auth'
import KurriousLogo from '@/src/components/Icons/KurriousLogo'

const formSchema = z.object({
    email: z
        .string()
        .min(1, { message: 'This field has to be filled.' })
        .email('This is not a valid email.'),
    password: z.string().min(1, { message: 'This field has to be filled.' }),
})

export default function Login(): ReactNode {
    const isLoadingAuth = useSelector(authSelector.isLoadingAuth)
    const router = useRouter()

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
    })

    const onSubmit: SubmitHandler<ISignInForm> = (data): void => {
        dispatch(authMiddleware.login(data))
    }

    const onForgotPassword = () => {
        router.push('auth/forgotPassword')
    }

    return (
        <>
            <div className="mb-6 mt-12 flex h-full w-full items-center justify-center">
                <div className="flex w-[425px] max-w-[425px] flex-col">
                    <div className="flex w-full justify-center">
                        <KurriousLogo
                            width={150}
                            height={100}
                            className="text-[36px]"
                        />
                    </div>
                    <div className="weig pb-14 pt-9 text-center text-medium font-semibold	">
                        Welcome back!
                    </div>

                    <div className="flex w-full flex-col items-center justify-between space-y-7.5">
                        <Form {...form}>
                            <form
                                className="flex w-full flex-col items-center justify-between space-y-7.5"
                                onSubmit={form.handleSubmit(onSubmit)}
                            >
                                <div className="w-full">
                                    <FormField
                                        control={form.control}
                                        name="email"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="mb-[8px] block text-[14px] text-quaternary">
                                                    E-mail
                                                </FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder="Type your e-mail"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <div className="w-full">
                                    <FormField
                                        control={form.control}
                                        name="password"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="mb-[8px] block text-[14px] text-quaternary">
                                                    Password
                                                </FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder="Type your password"
                                                        {...field}
                                                        type="password"
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <div className="mt-2 flex w-full justify-end">
                                        <Button
                                            type="button"
                                            variant="transparent"
                                            onClick={onForgotPassword}
                                            className="m-0 h-auto p-0 font-medium text-blue-dark"
                                        >
                                            Forgot password?
                                        </Button>
                                    </div>
                                </div>
                                <div className="w-full">
                                    <Button
                                        isLoading={isLoadingAuth}
                                        type="submit"
                                        size="fullLg"
                                        disabled={
                                            isLoadingAuth ||
                                            !form.watch('password') ||
                                            !form.watch('email')
                                        }
                                    >
                                        Sign in
                                    </Button>
                                </div>
                            </form>
                        </Form>
                        {/*TODO: For now, Hide the Google Icon b/c backend not ready and not a priority*/}
                        {/*<div className="flex w-full items-center justify-between text-[10px]">*/}
                        {/*    <div className="w-full border border-gray-300" />*/}
                        {/*    <div className="w-48 px-6">or do it via</div>*/}
                        {/*    <div className="w-full border border-gray-300" />*/}
                        {/*</div>*/}
                        {/*<div>*/}
                        {/*    <Button size="iconSquare" variant="link">*/}
                        {/*        <img src="/images/google.svg" />*/}
                        {/*    </Button>*/}
                        {/*</div>*/}
                    </div>
                </div>
            </div>
        </>
    )
}
