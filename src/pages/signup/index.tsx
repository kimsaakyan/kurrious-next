import React, { useState } from 'react'
import { useRouter } from 'next/router'
import { Button } from '@/src/components/ui/button'
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
    Form,
} from '@/src/components/ui/form'
import { Input } from '@/src/components/ui/input'
import { SubmitHandler, useForm } from 'react-hook-form'
import { ISignInForm } from '@/src/types/redux/auth'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import KurriousLogo from '@/src/components/Icons/KurriousLogo'

const formSchema = z.object({
    email: z
        .string()
        .min(4, { message: 'This field has to be filled.' })
        .email('This is not a valid email.'),
    password: z.string().min(8, { message: 'This field has to be filled.' }),
})

export default function Signup(): ReactNode {
    const router = useRouter()
    const [loading, setLoading] = useState(false)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
    })

    const onSubmit: SubmitHandler<ISignInForm> = (data): void => {
        setLoading(true)
        router.push('/')
    }

    return (
        <>
            <div className="flex h-full w-full items-center justify-center">
                <div className="m-4 flex w-[425px] max-w-[425px] flex-col">
                    <div className="flex w-full justify-center">
                        <KurriousLogo
                            width={150}
                            height={100}
                            className="text-[36px]"
                        />
                    </div>
                    <div className="weig pb-14 pt-9 text-center text-medium font-semibold	">
                        Create your account
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
                                                        placeholder="Please type your E-mail!"
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
                                                        placeholder="Please type your Password!"
                                                        {...field}
                                                        type="password"
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <div className="mt-2 w-full cursor-pointer text-xs font-medium text-gray-50">
                                        Must be 8 character at least
                                    </div>
                                </div>
                                <div className="mb-4 flex items-center">
                                    <div className="mr-2.5">
                                        <input
                                            type="checkbox"
                                            value=""
                                            className="h-4 w-4 cursor-pointer rounded-md border border-gray-150"
                                        />
                                    </div>
                                    <div className="w-full text-xs text-quaternary">
                                        By creating an account means you agree
                                        to the{' '}
                                        <span className="font-bold text-blue-dark">
                                            Terms and Conditions
                                        </span>
                                        , and our{' '}
                                        <span className="font-bold text-blue-dark">
                                            Privacy Policy
                                        </span>
                                    </div>
                                </div>
                                <div className="w-full">
                                    <Button
                                        size="full"
                                        isLoading={loading}
                                        disabled={
                                            loading ||
                                            !form.watch('password') ||
                                            !form.watch('email')
                                        }
                                    >
                                        Sign up
                                    </Button>
                                </div>
                            </form>
                        </Form>
                        <div className="flex w-full items-center justify-between text-[10px]">
                            <div className="w-full border border-gray-300" />
                            <div className="w-40 px-6">or do it via</div>
                            <div className="w-full border border-gray-300" />
                        </div>
                        <div>
                            <Button size="iconSquare" variant="link">
                                <img src="/images/google.svg" />
                            </Button>
                        </div>
                        <div>
                            <span className="mr-1 text-gray-50">
                                Already have an account?
                            </span>
                            <span
                                className="cursor-pointer font-semibold text-blue-dark"
                                onClick={() => router.push('/')}
                            >
                                Sign in
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
