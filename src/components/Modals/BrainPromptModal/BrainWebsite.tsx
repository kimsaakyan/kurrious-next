import { Input } from '@/src/components/ui/input'
import React, { useState } from 'react'
import { Button } from '@/src/components/ui/button'
import { dispatch } from '@/src/redux/hooks'
import { brainMiddleware, brainSelector } from '@/src/redux/slices/brain'
import { useSelector } from 'react-redux'

const BrainWebsite = () => {
    const isBrainLoading = useSelector(brainSelector.isBrainListLoading)
    const [url, setUrl] = useState('')

    const onFetchLinksClick = () => {
        dispatch(brainMiddleware.createCrawlUrl(url, '1'))
    }

    return (
        <div className="w-full">
            <div className="">
                <label className="mb-1 block text-xs font-normal text-blue-dark	">
                    Crawl
                </label>
                <div className="flex space-x-4">
                    <Input
                        className="text-xs font-normal text-gray-650"
                        type="text"
                        name="Name"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        size="base"
                        placeholder="https://www.example.com"
                    />
                    <Button
                        disabled={isBrainLoading || !url}
                        size="base"
                        onClick={onFetchLinksClick}
                        className="w-52"
                    >
                        Fetch Links
                    </Button>
                </div>
                {/* Todo: It should be discuss then */}
                {/*{isFetchedLinks && (*/}
                {/*    <div>*/}
                {/*        <div className="mt-3.5">0%</div>*/}
                {/*        <div className="mt-5 w-full rounded-md border border-gray-300 px-4 py-2.5 text-gray-600">*/}
                {/*            <div className="font-semibold	text-blue-dark">*/}
                {/*                Included links*/}
                {/*            </div>*/}
                {/*            <div className="mt-2 flex items-center">*/}
                {/*                <Input*/}
                {/*                    className="text-xs font-normal text-gray-650"*/}
                {/*                    type="text"*/}
                {/*                    name="Name"*/}
                {/*                    size="base"*/}
                {/*                    placeholder="https://www.example.com"*/}
                {/*                />*/}
                {/*                <div*/}
                {/*                    className="cursor-pointer pl-3"*/}
                {/*                    onClick={onTrashSecondaryClick}*/}
                {/*                >*/}
                {/*                    <TrashSecondaryIcon />*/}
                {/*                </div>*/}
                {/*            </div>*/}
                {/*        </div>*/}
                {/*    </div>*/}
                {/*)}*/}
            </div>
        </div>
    )
}

export default BrainWebsite
