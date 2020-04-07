const initialState = {
    data: []
};

//@todo: Change below structure from {} to []
export default (state = initialState, action) => {
    switch (action.type) {
        case "FETCH_CATEGORIES":
        case "UPDATE_CATEGORIES":
            return { ...state, data: action.payload || [] };
        case "DELETE_CATEGORY":
            return { ...state, data: state.data?.filter(category => category.id !== action.payload) }
        default:
            return state;
    }
}