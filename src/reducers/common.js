const initialState = {
    loading: false
};

export default (state = initialState, action) => {
    switch (action.type) {
        case "SET_LOADING":
            return { ...state, loading: action.payload };
        case "SET_ERROR":
            return {...state, error: action.payload};
        default:
            return state;
    }
}