const initialState = {
    data: []
};

export default (state = initialState, action) => {
    switch(action.type) {
        case "FETCH_TASKS":
        case "UPDATE_TASKS":
            return {...state, data: action.payload || []};
        case "DELETE_TASK":
            return {...state, data: state.data?.filter(task => task.id !== action.payload)};
        case "SELECT_CATEGORY":
            return {...state, selectedCategory: action.payload};
        default:
            return state;
    }
}