export const setLoading = (loading) => {
    return {
        type: "SET_LOADING",
        payload: loading
    }
}

export const setBtnLoading = (loading) => {
    return {
        type: "SET_BTN_LOADING",
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

export const setSuccess = (msg) => {
    return {
        type: "SET_SUCCESS",
        payload: msg
    }
}