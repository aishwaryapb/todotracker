import { combineReducers } from "redux";
import { firebaseReducer } from 'react-redux-firebase'

import auth from './auth';
import categories from './categories';
import common from './common';

export default combineReducers({
    firebase: firebaseReducer,
    auth,
    categories,
    common
});