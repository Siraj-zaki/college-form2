import { LOADING, ERROR, FONT } from './types'

export const setLoading = (val) => (
    {
        type: LOADING,
        val: val
    }
)
export const setError = (val) => (
    {
        type: ERROR,
        val: val
    }
)

