const initialState = {
    data: []
};

export default (state = initialState, action) => {
    switch (action.type) {
        case "FETCH_CATEGORIES":
        case "UPDATE_CATEGORIES":
            return { ...state, data: action.payload };
        case "CATEGORIES_ERROR":
            return { ...state, error: action.payload, data: undefined };
        default:
            return state;
    }
}