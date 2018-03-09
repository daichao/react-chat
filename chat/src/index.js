import React from 'react';
import ReactDOM from 'react-dom';
import thunk from 'redux-thunk';
import {createStore, applyMiddleware, compose} from 'redux';
import {Provider} from 'react-redux';
import {BrowserRouter, Route, Link, Redirect, Switch} from 'react-router-dom';

import reducer from './reducer';
import  './config'
//redux 异步，使用applyMiddleware和redux-thunk

const reduxDevtools = window.devToolsExtension ? window.devToolsExtension() : () => {};

const store = createStore(reducer, compose(
    applyMiddleware(thunk),
    reduxDevtools
));
ReactDOM.render(
    (<Provider store={store}>
        <BrowserRouter>
        </BrowserRouter>
    </Provider>),
    document.getElementById('root'));
