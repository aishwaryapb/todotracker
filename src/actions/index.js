export const setLoading = (loading) => {
    return {
        type: "SET_LOADING",
        payload: loading
    }
}

export const setError = (error) => {
    return {
        type: "SET_ERROR",
        payload: error
    }
}

export const clearTracker = () => ({
    type: "CLEAR_TRACKER"
})