import * as React from 'react'

import { cn } from '@/src/lib/utils'
import { RichTextarea, createRegexRenderer } from 'rich-textarea'
import { useRef } from 'react'

export interface TextareaProps
    extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    onEnter: (event: React.KeyboardEvent) => void
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
    ({ className, onEnter, ...props }) => {
        const ref = useRef(null)
        const renderer = createRegexRenderer([
            [
                /\[[^\]]+\]/g,
                {
                    borderRadius: '4px',
                    backgroundColor: '#F9F0FF',
                    color: '#531DAB',
                    cursor: 'pointer',
                },
            ],
        ])

        const onCheckEnter = (eventKey: React.KeyboardEvent): void => {
            if (
                eventKey.key === 'Enter' &&
                !eventKey.shiftKey &&
                !eventKey.ctrlKey &&
                !eventKey.altKey
            ) {
                onEnter(eventKey)
            }
        }

        const handleWordSelection = (): void => {
            const textareaRef = ref as React.RefObject<HTMLTextAreaElement>

            if (textareaRef.current) {
                const textarea = textareaRef.current
                const textValue = textarea.value
                const caretPosition = textarea.selectionStart || 0

                const wordRegex = /\[([^\]]+)\]/g
                let match
                let wordStart = 0
                let wordEnd = textValue.length
                while ((match = wordRegex.exec(textValue))) {
                    const currentWordStart = match.index
                    const currentWordEnd = match.index + match[0].length

                    if (
                        caretPosition >= currentWordStart &&
                        caretPosition <= currentWordEnd
                    ) {
                        wordStart = currentWordStart
                        wordEnd = currentWordEnd
                        textarea.setSelectionRange(wordStart, wordEnd)
                        textarea.focus()
                        break
                    }
                }
            }
        }

        return (
            <RichTextarea
                className={cn(
                    'bg-background placeholder:text-muted-foreground flex max-h-40 w-full resize-none p-3 ' +
                        'text-s file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none ' +
                        'disabled:cursor-not-allowed disabled:opacity-50',
                    className
                )}
                autoHeight
                style={{ width: '100%' }}
                {...props}
                ref={ref}
                onClick={handleWordSelection}
                rows={1}
                onKeyDown={onCheckEnter}
            >
                {renderer}
            </RichTextarea>
        )
    }
)
Textarea.displayName = 'Textarea'

export { Textarea }
