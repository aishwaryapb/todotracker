import firebase from '../firebase';
import history from '../history';

export const verifyAuth = () => dispatch => {
    dispatch({ type: "REQUEST_LOGIN" });
    firebase
        .auth()
        .onAuthStateChanged(user => {
            if (user !== null) {
                dispatch({ type: "LOGIN_SUCCESS", payload: user.email });
            }
            else dispatch({ type: "LOGIN_REQUIRED" })
        });
};

export const login = (credentials) => (dispatch) => {
    dispatch({ type: "REQUEST_LOGIN" });
    firebase
        .auth()
        .signInWithEmailAndPassword(credentials.email, credentials.password)
        .then(({ user }) => {
            dispatch({ type: "LOGIN_SUCCESS", payload: user.email });
        })
        .catch(err => {
            let msg = err.code.split('/')[1].replace(/-/g, " ");
            msg = msg.replace(/\b\w/g, l => l.toUpperCase());
            dispatch({ type: "LOGIN_FAILED", payload: msg });
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