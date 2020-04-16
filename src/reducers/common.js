const initialState = {
    loading: false,
    btnLoading: false
};

export default (state = initialState, action) => {
    switch (action.type) {
        case "SET_LOADING":
            return { ...state, loading: action.payload };
        case "SET_ERROR":
            return { ...state, error: action.payload };
        case "SET_SUCCESS":
            return { ...state, success: action.payload };
        case "SET_BTN_LOADING":
            return { ...state, btnLoading: action.payload };
        default:
            return state;
    }
}