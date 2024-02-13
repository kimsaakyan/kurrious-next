import { useState, useEffect } from 'react'

let timeOut: NodeJS.Timeout
export function useDebounce(
    value: string | null,
    delay: number
): string | null {
    const [debouncedValue, setDebouncedValue] = useState(value)

    useEffect(() => {
        clearInterval(timeOut)
        timeOut = setTimeout(() => {
            setDebouncedValue(value)
        }, delay)

        return () => {
            clearTimeout(timeOut)
        }
    }, [value, delay])

    return debouncedValue
}
