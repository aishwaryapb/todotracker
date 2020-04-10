const initialState = {
    data: []
};

export default (state = initialState, action) => {
    switch (action.type) {
        case "FETCH_TASKS":
        case "UPDATE_TASKS":
            return { ...state, data: action.payload || [] };
        case "DELETE_TASK":
            return { ...state, data: state.data?.filter(task => task.id !== action.payload) };
        case "SELECT_CATEGORY":
            return { ...state, selectedCategory: action.payload, data: [] };
        case "TOGGLE_TASK":
            return {
                ...state,
                data: state.data.map(task => {
                    return action.payload.id === task.id
                        ? { ...action.payload, completed: !action.payload.completed }
                        : task
                })
            }
        case "CLEAR_TRACKER":
        case "LOG_OUT":
            return initialState;
        case "ADD_TASK":
            return { ...state, data: [...state.data, action.payload] };
        case "TOGGLE_SELECTED_CATEGORY":
            return { ...state, selectedCategory: { ...state.selectedCategory, completed: action.payload } };
        default:
            return state;
    }
}