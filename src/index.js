import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';
import './index.css';
import './style.scss'
import App from './App';
import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'
import { createStore , applyMiddleware } from 'redux'
import rootReducer from './store/reducers/rootReducer'
import * as serviceWorker from './serviceWorker';
import {Provider} from "react-redux";
const loggerMiddleware = createLogger()
const store = createStore(rootReducer,
    applyMiddleware(
        thunkMiddleware, // lets us dispatch() functions
        loggerMiddleware // neat middleware that logs actions
    )
    )

ReactDOM.render(<Provider store={store}><App />></Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
