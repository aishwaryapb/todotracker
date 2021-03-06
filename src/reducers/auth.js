const INITIAL_STATE = {
    loggingIn: false,
    loggedIn: false,
    user: undefined
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case "REQUEST_LOGIN":
        case "REQUEST_SIGN_UP":
            return { ...state, loggingIn: true };
        case "LOGIN_SUCCESS":
            return { ...state, loggedIn: true, loggingIn: false, user: action.payload };
        case "LOGIN_FAILED":
        case "SIGN_UP_FAILED":
            return { ...state, loggingIn: false };
        case "LOG_OUT":
        case "LOGIN_REQUIRED":
            return INITIAL_STATE;
        default:
            return state;
    }
}