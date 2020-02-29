import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { ReactReduxFirebaseProvider } from 'react-redux-firebase';
import thunk from 'redux-thunk';

import './index.css';
import App from './App';
import reducers from './reducers';
import firebase, { rfConfig } from './firebase';
import { verifyAuth } from './actions/auth';

const store = createStore(reducers, applyMiddleware(thunk));
store.dispatch(verifyAuth())

ReactDOM.render(
    <Provider store={store}>
        <ReactReduxFirebaseProvider
            firebase={firebase}
            config={rfConfig}
            dispatch={store.dispatch}
        >
            <App />
        </ReactReduxFirebaseProvider>
    </Provider>,
    document.getElementById('root')
);