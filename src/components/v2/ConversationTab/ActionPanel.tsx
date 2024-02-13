import { Button } from '@/src/components/ui/button'
import TrashIcon from '@/src/components/Icons/TrashIcon'
import { getMessageTime } from '@/src/utils/common/DateTime'
import moment from 'moment/moment'
import React from 'react'
import { itemsMenuBar } from '@/src/data/itemsMenuBarData'
import { useRouter } from 'next/router'
import { IActionPanel } from '@/src/types/conversations'

const ActionPanel = ({ disabled, onClick, createdAt }: IActionPanel) => {
    const router = useRouter()

    return (
        <div className="flex w-26 justify-end">
            <div className="flex items-center">
                {router.pathname === itemsMenuBar[0].key && (
                    <Button
                        disabled={disabled}
                        onClick={onClick}
                        variant="transparent"
                        className="m-0 mr-2 hidden h-5 w-5 p-0 group-hover:block"
                    >
                        <TrashIcon />
                    </Button>
                )}
                <p className="text-[9px] font-normal text-black-light">
                    {getMessageTime(moment(createdAt).unix())}
                </p>
            </div>
        </div>
    )
}

export default ActionPanel
