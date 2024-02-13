'use client'
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
import { ICompany } from '@/src/manager/companies/companiesManagerTypes'
import { useSelector } from 'react-redux'
import { useRouter } from 'next/router'

const formSchema = z.object({
    companyName: z.string().min(2, {
        message: 'Company name must be at least 1 characters.',
    }),
    firstName: z.string().min(2, {
        message: 'First name must be at least 1 characters.',
    }),
    lastName: z.string().min(2, {
        message: 'Last name must be at least 1 characters.',
    }),
    email: z
        .string()
        .min(1, { message: 'This field has to be filled.' })
        .email('This is not a valid email.'),
    tokenAllotment: z.number().min(0).max(10000000),
})

export function OrganizationForm() {
    const router = useRouter()
    const editOrganizationData = useSelector(
        companiesSelector.editOrganizationData
    )
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            companyName: editOrganizationData?.companyName ?? '',
            firstName: editOrganizationData?.firstName ?? '',
            lastName: editOrganizationData?.lastName ?? '',
            email: editOrganizationData?.email ?? '',
            tokenAllotment: Number(editOrganizationData?.tokenAllotment) ?? 0,
        },
    })
    const isCompanyCreateLoading = useSelector(
        companiesSelector.isCompanyCreateLoading
    )

    const isCompanyEditLoading = useSelector(
        companiesSelector.isCompanyUpdateLoading
    )

    const onSubmit: SubmitHandler<Partial<ICompany>> = (data) => {
        if (editOrganizationData?.companyId) {
            dispatch(
                companiesMiddleware.updateCompany(
                    editOrganizationData.companyId,
                    {
                        ...data,
                        adminId: editOrganizationData?.adminId,
                        isActive: editOrganizationData?.isActive,
                    } as ICompany,
                    router
                )
            )
        } else {
            dispatch(
                companiesMiddleware.createCompany(data as ICompany, router)
            )
        }
    }

    const onCancelClick = () => {
        router.back()
    }

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="mt-6 space-y-5"
            >
                <FormField
                    control={form.control}
                    name="companyName"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="mb-[8px] block text-[14px] text-quaternary">
                                Company Name
                            </FormLabel>
                            <FormControl>
                                <Input size="sm" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <div className="flex w-full justify-between">
                    <div className="w-2/4">
                        <FormField
                            control={form.control}
                            name="firstName"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="mb-[8px] block text-[14px] text-quaternary">
                                        First Name
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            size="sm"
                                            {...field}
                                            disabled={
                                                !!editOrganizationData?.companyId
                                            }
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <div className="ml-4 w-2/4">
                        <FormField
                            control={form.control}
                            name="lastName"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="mb-[8px] block text-[14px] text-quaternary">
                                        Last Name
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            size="sm"
                                            {...field}
                                            disabled={
                                                !!editOrganizationData?.companyId
                                            }
                                        />
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

                <div className="w-[120px]">
                    <FormField
                        control={form.control}
                        name="tokenAllotment"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="mb-[8px] block text-[14px] text-quaternary">
                                    Token Allotment
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        size="sm"
                                        {...field}
                                        {...form.register('tokenAllotment', {
                                            valueAsNumber: true,
                                        })}
                                        type="number"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
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
                        type="submit"
                        size="sm"
                        className="text-[12px] font-semibold"
                        isLoading={
                            isCompanyCreateLoading || isCompanyEditLoading
                        }
                        disabled={
                            isCompanyCreateLoading || isCompanyEditLoading
                        }
                    >
                        {editOrganizationData?.companyId ? 'Save' : 'Create'}
                    </Button>
                </div>
            </form>
        </Form>
    )
}
