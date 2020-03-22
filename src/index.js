import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import './index.css';
import App from './App';
import reducers from './reducers';
import { verifyAuth } from './actions/auth';

const store = createStore(reducers, applyMiddleware(thunk));
store.dispatch(verifyAuth())

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);