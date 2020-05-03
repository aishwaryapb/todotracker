import { batch } from 'react-redux'

import firebase from '../firebase';
import history from '../history';
import { setError, setSuccess } from '.';
import { initializeInterceptor } from '../api';

export const verifyAuth = () => dispatch => {
    dispatch({ type: "REQUEST_LOGIN" });
    firebase
        .auth()
        .onAuthStateChanged(user => {
            if (user !== null && user.emailVerified === true) {
                user.getIdToken(true).then((idToken) => {
                    initializeInterceptor(idToken);
                    dispatch({ type: "LOGIN_SUCCESS", payload: user.email });
                });
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
            if (user.emailVerified === true) {
                user.getIdToken(true).then((idToken) => {
                    initializeInterceptor(idToken);
                    dispatch({ type: "LOGIN_SUCCESS", payload: user.email })
                });
            }
            else {
                batch(() => {
                    dispatch({ type: "LOGIN_FAILED" });
                    dispatch(setError('Email not verified'));
                });
            }
        })
        .catch(err => {
            let msg = err.code.split('/')[1].replace(/-/g, " ");
            msg = msg.replace(/\b\w/g, l => l.toUpperCase());
            batch(() => {
                dispatch(setError(msg));
                dispatch({ type: "LOGIN_FAILED" })
            });
        })
}

export const signUp = ({ email, password }) => dispatch => {
    dispatch({ type: "REQUEST_SIGN_UP" });
    firebase.auth()
        .createUserWithEmailAndPassword(email, password)
        .then(() => {
            firebase.auth().currentUser
                .sendEmailVerification()
                .then(() => dispatch(setSuccess('Email Verification sent!')))
        })
        .catch(err => {
            let msg = err.code.split('/')[1].replace(/-/g, " ");
            msg = msg.replace(/\b\w/g, l => l.toUpperCase());
            batch(() => {
                dispatch(setError(msg));
                dispatch({ type: "SIGN_UP_FAILED" })
            });
        })
}

export const logout = () => dispatch => {
    firebase
        .auth()
        .signOut()
        .then(res => {
            batch(() => {
                dispatch({ type: "LOG_OUT" });
                dispatch(setSuccess("Logged out successfully"));
            })
            history.replace('/');
        })
        .catch(err => console.error(err));
}