export default (state = {}, action) => {
    switch (action.type) {
        case "FETCH_CATEGORIES":
            return { ...state, data: action.payload };
        case "CATEGORIES_ERROR":
            return { ...state, error: action.payload, data: undefined };
        default:
            return state;
    }
}