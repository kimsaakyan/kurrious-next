import React, { useRef, ChangeEvent } from 'react'
import { Button } from '@/src/components/ui/button'

interface UploadButtonProps {
    onFileChange: (file: File | null) => void
    title: string
    size: 'mediumSm' | 'default'
    selectFile?: string
}

const UploadButton: React.FC<UploadButtonProps> = ({
    selectFile,
    onFileChange,
    title,
    size,
}) => {
    const inputRef = useRef<HTMLInputElement | null>(null)

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        const selectedFiles = event.target.files?.[0] || null

        if (selectedFiles) {
            onFileChange(selectedFiles)
        } else {
            onFileChange(null)
        }
    }

    return (
        <div className="relative">
            {selectFile ? (
                <Button
                    variant="transparent"
                    size={size}
                    type="button"
                    className="p-0 text-xs text-primary"
                    onClick={() => inputRef.current?.click()}
                >
                    {selectFile}
                </Button>
            ) : (
                <Button
                    variant="upload"
                    size={size}
                    type="button"
                    onClick={() => inputRef.current?.click()}
                >
                    {title}
                </Button>
            )}
            <input
                type="file"
                className="hidden"
                ref={inputRef}
                onChange={handleFileChange}
            />
        </div>
    )
}

export default UploadButton
