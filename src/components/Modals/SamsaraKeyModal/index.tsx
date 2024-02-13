import React from 'react'
import CloseIcon from '@/src/components/Icons/CloseIcon'
import { useSelector } from 'react-redux'
import {
    companiesMiddleware,
    companiesSelector,
} from '@/src/redux/slices/companies/index'
import { dispatch } from '@/src/redux/hooks'
import { viewsMiddleware } from '@/src/redux/slices/views/index'
import { ModalName } from '@/src/types/modals'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/src/components/ui/form'
import { Input } from '@/src/components/ui/input'
import * as z from 'zod'
import { SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/src/components/ui/button'
import { ISamsaraKeyModalProps } from '@/src/types/redux/views'

const SamsaraKeyModal = ({ companyId }: ISamsaraKeyModalProps) => {
    const samsaraKey = useSelector(companiesSelector.samsaraKey)
    const samsaraKeyUpdateLoading = useSelector(
        companiesSelector.isCompanySamsaraKeyUpdateLoading
    )
    const samsaraKeyAddLoading = useSelector(
        companiesSelector.isCompanySamsaraKeyAddLoading
    )
    const formSchema = z.object({
        samsaraKey: z.string().min(12, {
            message: 'Samsara key must be at least 12 characters.',
        }),
    })

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            samsaraKey: samsaraKey,
        },
    })

    const closeModal = () => {
        dispatch(viewsMiddleware.closeModal(ModalName.SamsaraKeyModal))
        dispatch(companiesMiddleware.resetCompanySamsaraKey())
    }

    const onSubmit: SubmitHandler<Partial<{ samsaraKey: string }>> = (data) => {
        if (data.samsaraKey) {
            const body = {
                apiKey: data.samsaraKey,
            }
            if (samsaraKey) {
                dispatch(
                    companiesMiddleware.updateCompanySamsaraKey(companyId, body)
                )
            } else {
                dispatch(
                    companiesMiddleware.addCompanySamsaraKey(companyId, body)
                )
            }
        }
    }

    return (
        <div
            id="modalContainer"
            className="fixed inset-0 z-50 flex items-center justify-center bg-gray-transparent drop-shadow"
        >
            <div className="relative  w-[510px] rounded-xl bg-white p-6 text-blue-dark shadow-lg">
                <div className="mb-9 flex items-center justify-between">
                    <h2 className="text-medium font-semibold leading-normal text-blue-dark">
                        {samsaraKey ? 'Edit' : 'Add'} Samsara Key
                    </h2>
                    <div onClick={closeModal} className="cursor-pointer p-2">
                        <CloseIcon />
                    </div>
                </div>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-7.5"
                    >
                        <FormField
                            control={form.control}
                            name="samsaraKey"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="block text-[14px] text-quaternary">
                                        Samsara Key
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder={
                                                samsaraKey || '****************'
                                            }
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button
                            disabled={
                                samsaraKeyUpdateLoading || samsaraKeyAddLoading
                            }
                            isLoading={
                                samsaraKeyUpdateLoading || samsaraKeyAddLoading
                            }
                            size="medium"
                            type="submit"
                        >
                            {samsaraKey ? 'Update' : 'Save'}
                        </Button>
                    </form>
                </Form>
            </div>
        </div>
    )
}

export default SamsaraKeyModal
