import store from './store'
import type { TypedUseSelectorHook } from 'react-redux' //1
import { useSelector } from 'react-redux'
import type { RootState, AppDispatch } from './store'

const { dispatch } = store

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector // 1

export { dispatch }
