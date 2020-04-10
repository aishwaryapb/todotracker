export default (state = [], action) => {
    switch (action.type) {
        case "FETCH_CATEGORIES":
        case "UPDATE_CATEGORIES":
            return action.payload || [];
        case "DELETE_CATEGORY":
            return state.filter(category => category.id !== action.payload);
        case "LOG_OUT":
            return [];
        default:
            return state;
    }
}