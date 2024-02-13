import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { viewsMiddleware, viewsSelector } from '@/src/redux/slices/views/index'
import { dispatch } from '@/src/redux/hooks'
import { useSelector } from 'react-redux'

const RedirectionHandler = () => {
    const redirection = useSelector(viewsSelector.redirection)
    const router = useRouter()

    useEffect(() => {
        if (redirection.apply) {
            dispatch(
                viewsMiddleware.setRedirectionState({
                    ...redirection,
                    apply: false,
                })
            )

            const finalPath =
                redirection.path +
                (redirection.params ? `?${redirection.params}` : '')

            router.push(`${finalPath}`, undefined, { shallow: true })
        }
    }, [router, redirection])

    return null
}

export default RedirectionHandler
