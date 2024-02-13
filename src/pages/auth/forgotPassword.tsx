import KurriousLogo from '@/src/components/Icons/KurriousLogo'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/src/components/ui/form'
import { Input } from '@/src/components/ui/input'
import { Button } from '@/src/components/ui/button'
import React from 'react'
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'
import { authMiddleware, authSelector } from '@/src/redux/slices/auth'
import { SubmitHandler, useForm } from 'react-hook-form'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { IForgotPassword } from '@/src/manager/auth/authManagerTypes'
import { dispatch } from '@/src/redux/hooks'
import { ArrowLeftIcon } from 'lucide-react'

const formSchema = z.object({
    email: z
        .string()
        .min(1, { message: 'This field has to be filled.' })
        .email('This is not a valid email.'),
})

const ForgotPassword = () => {
    const router = useRouter()
    const isLoadingAuth = useSelector(authSelector.isLoadingAuth)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: '',
        },
    })

    const onSubmit: SubmitHandler<IForgotPassword> = (data) => {
        dispatch(authMiddleware.forgotPassword(data.email))
        router.push('/')
    }

    const onCancelClick = () => {
        router.back()
    }

    return (
        <div className="w-full">
            <div className="inset-0 mt-20 flex items-center justify-center">
                <div className="w-full max-w-[425px]">
                    <div className="relative">
                        <Button
                            className="absolute left-0 top-0 p-0"
                            variant="transparent"
                            onClick={onCancelClick}
                        >
                            <ArrowLeftIcon />
                        </Button>
                        <div className="flex justify-center">
                            <KurriousLogo
                                width={150}
                                height={100}
                                className="text-[36px]"
                            />
                        </div>
                    </div>
                    <div className="mt-3 text-center text-[18px] font-semibold">
                        Forgot Password
                    </div>
                    <div className="mt-7.5">
                        <Form {...form}>
                            <form
                                className="space-y-7.5"
                                onSubmit={form.handleSubmit(onSubmit)}
                            >
                                <FormField
                                    control={form.control}
                                    name="email"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="quaternary text-[14px] font-normal">
                                                Email
                                            </FormLabel>
                                            <FormControl>
                                                <Input type="text" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <Button
                                    isLoading={isLoadingAuth}
                                    type="submit"
                                    size="fullLg"
                                    className="font-semibold"
                                    disabled={
                                        isLoadingAuth ||
                                        !form.getValues('email')
                                    }
                                >
                                    Forgot Password
                                </Button>
                            </form>
                        </Form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ForgotPassword
