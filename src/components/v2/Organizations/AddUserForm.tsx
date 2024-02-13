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

import { Input } from '@/src/components/ui/input'
import { SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { dispatch } from '@/src/redux/hooks'
import {
    companiesMiddleware,
    companiesSelector,
} from '@/src/redux/slices/companies/index'
import { IAddUserModalForm } from '@/src/types/redux/views'
import { useSelector } from 'react-redux'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/src/components/ui/select'
import { roles } from '@/src/data/roleData'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { CheckRoles } from '@/src/utils/hooks/checkRoles'
import { USER_ROLES } from '@/src/roles/roles'
import { authSelector } from '@/src/redux/slices/auth'

const formSchema = z.object({
    firstName: z.string().min(2, {
        message: 'First name must be at least 2 characters.',
    }),
    lastName: z.string().min(2, {
        message: 'Last name must be at least 2 characters.',
    }),
    email: z
        .string()
        .min(1, { message: 'This field has to be filled.' })
        .email('This is not a valid email.'),
    role: z.string(),
})

export function AddUserForm() {
    const isAddUserLoading = useSelector(
        companiesSelector.isCompanyAddUserLoading
    )
    const currentUser = useSelector(authSelector.currentUser)
    const currentCompany = useSelector(companiesSelector.currentCompany)
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
    })
    const router = useRouter()

    const onSubmit: SubmitHandler<Omit<IAddUserModalForm, 'password'>> = (
        data
    ) => {
        const body = {
            email: data.email,
            firstName: data.firstName,
            lastName: data.lastName,
            userType: data.role,
            companyName: CheckRoles(
                [USER_ROLES.CLIENT_ADMIN],
                currentUser?.userType
            )
                ? currentUser?.companyName
                : currentCompany?.companyName,
        }

        dispatch(companiesMiddleware.addCompanyUsers(body))
    }

    const onCancelClick = () => {
        router.back()
    }

    useEffect(() => {
        if (
            CheckRoles(
                [USER_ROLES.KURIOUS_SALES, USER_ROLES.KURIOUS_SUPERUSER],
                currentUser?.userType
            ) &&
            !currentCompany?.companyName
        ) {
            router.push('/settings/groups')
        }
    }, [])

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="mt-6 space-y-5"
            >
                <div className="flex w-full justify-between">
                    <div className="w-2/4">
                        <FormField
                            control={form.control}
                            name="firstName"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="mb-[8px] block text-[14px] text-quaternary">
                                        First name
                                    </FormLabel>
                                    <FormControl>
                                        <Input size="sm" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <div className="ml-5 w-2/4">
                        <FormField
                            control={form.control}
                            name="lastName"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="mb-[8px] block text-[14px] text-quaternary">
                                        Last Name
                                    </FormLabel>
                                    <FormControl>
                                        <Input size="sm" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                </div>
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="mb-[8px] block text-[14px] text-quaternary">
                                Email
                            </FormLabel>
                            <FormControl>
                                <Input size="sm" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="role"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="mb-[8px] block text-[14px] text-quaternary">
                                Role
                            </FormLabel>
                            <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                            >
                                <FormControl className="h-[46px] w-52">
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select a role" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    {roles.map((role) => (
                                        <SelectItem
                                            key={role.value}
                                            value={role.value}
                                        >
                                            {role.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>

                            <FormMessage />
                        </FormItem>
                    )}
                />
                <div className="flex">
                    <Button
                        type="button"
                        variant="outline"
                        className="mr-2.5 border-gray-450 text-[12px] font-semibold"
                        size="sm"
                        onClick={onCancelClick}
                    >
                        Cancel
                    </Button>
                    <Button
                        isLoading={isAddUserLoading}
                        disabled={isAddUserLoading}
                        type="submit"
                        className="text-[12px] font-semibold"
                        size="sm"
                    >
                        Add
                    </Button>
                </div>
            </form>
        </Form>
    )
}
