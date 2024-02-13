import React, { useState } from 'react'
import CloseIcon from '@/src/components/Icons/CloseIcon'
import { dispatch } from '@/src/redux/hooks'
import { viewsMiddleware } from '@/src/redux/slices/views'
import { ModalName } from '@/src/types/modals'
import { Button } from '@/src/components/ui/button'
import { Input } from '@/src/components/ui/input'
import { HelpCircleIcon } from 'lucide-react'
import TooltipIconButton from '@/src/components/v2/TooltipIconButton/TooltipIconButton'
import { integrationsMiddleware } from '@/src/redux/slices/integrations'

const ApiTokenModal = () => {
    const [apiKey, setApiKey] = useState<string>('')
    const [tokenName, setTokenName] = useState<string>('')

    const closeModal = () => {
        dispatch(viewsMiddleware.closeModal(ModalName.ApiTokenModal))
    }

    const onSaveClick = () => {
        dispatch(
            integrationsMiddleware.createIntegrationsApiTokens({
                tokenName,
                apiKey,
            })
        )
    }

    return (
        <div
            id="modalContainer"
            className="fixed inset-0 z-50 flex items-center justify-center bg-gray-transparent drop-shadow"
        >
            <div className="relative w-[510px] rounded-xl bg-white p-6 text-blue-dark shadow-lg">
                <div className="mb-3.5 flex items-center justify-between">
                    <h2 className="text-sm font-semibold leading-normal text-blue-dark">
                        API Token
                    </h2>
                    <div onClick={closeModal} className="cursor-pointer p-2">
                        <CloseIcon />
                    </div>
                </div>
                <div>
                    <div className="mb-3">
                        <label className="mb-1 flex items-center text-xs font-normal text-quaternary	">
                            <span className="mr-1">Token Name</span>
                            <TooltipIconButton
                                className="bg-white text-[10px] font-normal text-quaternary"
                                title="Choose a descriptive name to easily identify this API token in the future."
                                icon={<HelpCircleIcon width={16} height={16} />}
                            />
                        </label>
                        <Input
                            className="text-xs font-normal text-gray-650"
                            type="text"
                            name="Name"
                            size="base"
                            onChange={(e) => setTokenName(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <label className="mb-1 flex items-center text-xs font-normal text-quaternary	">
                            <span className="mr-1">API Key</span>
                            <TooltipIconButton
                                className="w-[400px] rounded-lg border border-gray-750 bg-white p-2.5 text-[10px] font-normal text-quaternary"
                                title="Enter the unique API key provided to you, usually obtained from the service's dashboard or settings page. This key grants secure access and permissions to interact with the service. Ensure you keep it confidential and never share it publicly."
                                icon={<HelpCircleIcon width={16} height={16} />}
                            />
                        </label>
                        <Input
                            className="text-xs font-normal text-gray-650"
                            type="text"
                            name="Name"
                            size="base"
                            onChange={(e) => setApiKey(e.target.value)}
                        />
                    </div>
                </div>
                <div className="flex items-center justify-start">
                    <Button
                        variant="outline"
                        onClick={closeModal}
                        className="mr-2.5 border-gray-450"
                    >
                        Cancel
                    </Button>
                    <Button onClick={onSaveClick}>Save</Button>
                </div>
            </div>
        </div>
    )
}

export default ApiTokenModal
