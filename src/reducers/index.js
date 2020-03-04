import { combineReducers } from "redux";
import { firebaseReducer } from 'react-redux-firebase'

import authReducer from './auth';
import categoriesReducer from './categories';

export default combineReducers({
    firebase: firebaseReducer,
    auth: authReducer,
    categories: categoriesReducer
});