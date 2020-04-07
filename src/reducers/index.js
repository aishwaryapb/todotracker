import { combineReducers } from "redux";

import auth from './auth';
import categories from './categories';
import common from './common';
import tasks from './tasks';

export default combineReducers({
    auth,
    categories,
    common,
    tasks
});