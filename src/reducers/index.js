import { combineReducers } from "redux";

import auth from './auth';
import categories from './categories';
import common from './common';

export default combineReducers({
    auth,
    categories,
    common
});