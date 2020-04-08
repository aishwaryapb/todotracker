export default (state = [], action) => {
    switch (action.type) {
        case "FETCH_CATEGORIES":
        case "UPDATE_CATEGORIES":
            return action.payload || [];
        case "DELETE_CATEGORY":
            return state.filter(category => category.id !== action.payload);
        default:
            return state;
    }
}