const INITIAL_STATE = {
    error: null,
    loggingIn: false,
    loggedIn: false,
    user: undefined
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case "REQUEST_LOGIN":
            return { ...state, loggingIn: true };
        case "LOGIN_SUCCESS":
            return { ...state, loggedIn: true, loggingIn: false, error: null, user: action.payload };
        case "LOGIN_FAILED":
            return { ...state, error: action.payload, loggingIn: false };
        case "LOG_OUT":
        case "LOGIN_REQUIRED":
            return INITIAL_STATE;
        default:
            return state;
    }
}