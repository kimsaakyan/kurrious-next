import { RefObject, useEffect } from 'react'

export const useClickAway = (
    refs: RefObject<HTMLElement>[],
    onClickAway: () => void
) => {
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            let clickedOutside = true
            for (const ref of refs) {
                if (ref.current && ref.current.contains(event.target as Node)) {
                    clickedOutside = false
                    break
                }
            }

            if (clickedOutside) {
                onClickAway()
            }
        }

        document.addEventListener('click', handleClickOutside)

        return () => {
            document.removeEventListener('click', handleClickOutside)
        }
    }, [refs, onClickAway])
}
