import TypingLoader from '@/src/components/TypingLoader/TypingLoader'
import { Button } from '@/src/components/ui/button'
import SearchableTable from '@/src/components/SearchableTable/SearchableTable'
import { columns } from '@/src/columns/JennyColumn'
import ReactMarkdown from 'react-markdown'
import rehypeRaw from 'rehype-raw'
import React from 'react'
import { IMessage } from '@/src/types/redux/conversations'
import ShowSource from '@/src/components/ChatBoard/ShowSource'

const getMetaDescription = (
    itemProp: IMessage,
    indexProp: number,
    getDisabledState: (indexProp: number) => boolean,
    onResponseButtonClick: (button: {
        buttonText: string
        body: Record<string, never>
    }) => void
): ReactNode => {
    return (
        (itemProp?.answerType === 'loading' && <TypingLoader />) ||
        (itemProp?.answerType === 'busy' && (
            <>
                <p className="text-xs">Jenny is busy. {itemProp.answer}</p>
            </>
        )) ||
        (itemProp?.answerType === 'error' && (
            <>
                <p className="text-xs">{itemProp.answer}</p>
            </>
        )) ||
        (itemProp.answerType === 'mixed' &&
            itemProp.data[1]?.type === 'buttons' && (
                <>
                    <p className="mb-4">{itemProp.data[0]?.content}</p>
                    <div className="flex space-x-2">
                        {itemProp.data[1]?.content.map(
                            (
                                buttonData: {
                                    buttonText: string
                                    body: Record<string, never>
                                },
                                buttonsIndex: number
                            ) => (
                                <Button
                                    disabled={getDisabledState(indexProp)}
                                    // type={ind === 1 ? 'default' : 'primary'}
                                    key={Math.random()}
                                    variant={
                                        buttonsIndex === 0
                                            ? 'default'
                                            : 'outline'
                                    }
                                    size="auto"
                                    onClick={() =>
                                        onResponseButtonClick(buttonData)
                                    }
                                >
                                    {buttonData.buttonText}
                                </Button>
                            )
                        )}
                    </div>
                </>
            )) ||
        (itemProp.answerType === 'mixed' &&
            itemProp.data[1]?.type === 'table' && (
                <>
                    <p className="mb-2">{itemProp.data[0]?.content}</p>

                    <SearchableTable
                        data={itemProp?.data[1]?.content}
                        columns={columns(itemProp?.data[1]?.content || [])}
                    />
                </>
            )) || (
            <>
                <ReactMarkdown
                    className="prose prose-xl text-xs"
                    rehypePlugins={[rehypeRaw]}
                >
                    {itemProp?.answer}
                </ReactMarkdown>
                {itemProp?.reference_docs &&
                    itemProp?.reference_docs.length > 0 && (
                        <ShowSource docs={itemProp.reference_docs} />
                    )}
            </>
        )
    )
}

export default getMetaDescription
