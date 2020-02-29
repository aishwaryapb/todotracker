import firebase from '../firebase';
import history from '../history';

export const verifyAuth = () => dispatch => {
    dispatch({ type: "REQUEST_LOGIN" });
    firebase
        .auth()
        .onAuthStateChanged(user => {
            if (user !== null) {
                dispatch({ type: "LOGIN_SUCCESS" });
            }
            else dispatch({ type: "LOGIN_REQUIRED" })
        });
};

export const login = (credentials) => (dispatch) => {
    dispatch({ type: "REQUEST_LOGIN" });
    firebase
        .auth()
        .signInWithEmailAndPassword(credentials.email, credentials.password)
        .then(authResult => {
            dispatch({ type: "LOGIN_SUCCESS" });
        })
        .catch(err => {
            dispatch({ type: "LOGIN_FAILED" });
        })
}

export const logout = () => dispatch => {
    firebase
        .auth()
        .signOut()
        .then(res => {
            dispatch({ type: "LOG_OUT" });
            history.replace('/');
        })
        .catch(err => console.log(err));
}